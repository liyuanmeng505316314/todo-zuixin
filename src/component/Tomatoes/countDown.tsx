import * as React from 'react';

import './countDown.scss'
interface ICountDownProps{
    timer:number;
    duration:number;
    onFinish:()=>void;
}
interface ICountDownState{
    countDown:number;
}

// 该组件使用的是类组件，同时没有用hook，所以逻辑没有那么清晰，同时代码量会更多，故抛弃该代码，并不使用他,但是hooks也有其自己的缺点

let timeId:NodeJS.Timeout;


class Component extends React.Component<ICountDownProps,ICountDownState>{

    constructor(props){
        super(props)
        this.state={
            countDown:this.props.timer
        }
    }

    componentDidMount(){
        timeId=setInterval(()=>{
             this.setState({countDown:this.state.countDown-1000})
             document.title=`学习倒计时为：${this.countDown}`
             if(this.state.countDown<1000){
                document.title=`您刚刚完成了一个番茄`
                 this.props.onFinish()
                 clearInterval(timeId)
             }
        },1000)
    }
    get countDown(){
        const minus= Math.floor(this.state.countDown/60000)
        const second=Math.floor(this.state.countDown/1000)%60
       return `${minus<10? `0${minus}` :minus}:  ${second<10? `0${second}` :second}  `
    }

    componentWillUnmount(){
        clearInterval(timeId)
    }

    public render(){       
        const percent = 1 - this.state.countDown/this.props.duration
        return(
           <div className="countDown" id="countDown">
               <span className="restTime"> {this.countDown} </span>
               <div className="progress"  style={ {width:`${percent*100}%`}  }/>
           </div>
        )
    }
}



export default Component

