import * as React from 'react'
import axios  from 'src/config/axios'
import CountDown from './countDown'
import {Button,Input,Icon,Modal} from "antd"
import './TomatoAction.scss'

interface ITomatoActionState{
    description:string;
}

interface ITomatoActionProps{
  
    startTomato:()=>void;
    updateTomato:(payload:any)=>any;
    unfinishedTomato:any;
}

class Component extends React.Component<ITomatoActionProps, ITomatoActionState>{

  constructor(props){
      super(props)
      this.state={
          description:''
      }
  }

   onKeyUp=(e)=>{
      if(e.keyCode===13 && this.state.description!==''){
        this.updateTomato({
            description:this.state.description , ended_at:new Date()  
        })
        this.setState({description:''})
      }
   }

   showConfirm=()=>{
    Modal.confirm({
      title: '骚年，您是否要放弃掉当前的番茄?',
      onOk:()=>{
       this.abortTomato()
      },
      onCancel() {
        console.log('Cancel');
      },
      okText:'是' ,
      cancelText:'否'
    });
  }

   onFinish=()=>{
       this.forceUpdate()
   }

   abortTomato=async( )=>{
       try{
          this.updateTomato({aborted:true})
          document.title=`您刚刚取消了一个番茄时钟`
       }catch(e){
          throw new Error(e)
       }
   }

   updateTomato=async(params:any)=>{
    const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,params)
    this.props.updateTomato(response.data.resource)
    this.setState({description:'',})
   }


   public render(){
       let html =<div>1</div>
       if(this.props.unfinishedTomato===undefined){
           html=<Button className="startTomatoButton" onClick={()=>{this.props.startTomato()}}>  开始番茄</Button>
       }else{
        const startedAt =Date.parse(this.props.unfinishedTomato.started_at)
        const duration=this.props.unfinishedTomato.duration
        const timeNow=new Date().getTime()
          if(timeNow-startedAt>duration){
              html=   <div  className="inputWrapper" id="inputWrapper">
                  <Input value={this.state.description}
                         placeholder="请输入你刚刚完成的任务"
                         onChange={e=>this.setState({description:e.target.value})}
                         onKeyUp={e=>this.onKeyUp(e)}
                 />
                 <Icon className="abort" type="close-circle" onClick={this.showConfirm}/>
                 </div>
          } else if(timeNow-startedAt<duration){
              const timer=startedAt+duration-timeNow
              html =(
                  <div className="countDownWrapper" id="countDownWrapper">
                      <CountDown timer={timer} duration={duration} onFinish={this.onFinish}/>
                      <Icon className="abort" type="close-circle" onClick={this.showConfirm}/>
                  </div>
                )
          }
       }
       
       return(
           <div className="TomatoAction" id="TomatoAction">
             {html}
           </div>
       )
   }

}

export default Component