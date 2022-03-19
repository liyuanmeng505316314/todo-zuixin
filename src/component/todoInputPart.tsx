import * as React from 'react';
import {Icon, Input } from "antd";
import {connect} from 'react-redux';
import axios from 'src/config/axios';
import { addTodo } from 'src/redux/actions/todos';

interface ITodoInputState{
    description:string;
}
interface ITodoInputProps{
    addTodo:(payload:any)=>any;
}

class Component extends React.Component<ITodoInputProps,ITodoInputState>{
        
    constructor(props){
        super(props)
        this.state={
            description:''
        }
    }
    
    onKeyUp=(e)=>{
        if(e.keyCode===13 && this.state.description!==''){
            this.postTodo()
        }
    }

    postTodo=async ()=>{
        try{
            const  response =await axios.post('todos',{description:this.state.description})
            this.props.addTodo(response.data.resource)
        }catch(e){
            throw new Error(e)
        }
        // this.props.addTodo({description:this.state.description})
        this.setState({description:''})
    }

    public  render(){

        const {description} =this.state; 
        const suffix=description?<Icon  type="enter" onClick={this.postTodo} /> : <span/>;

        return(
            
            <div className='todo2' id='todo2'>
                <div className='input'> 
                <Input
                placeholder="添加新任务"
                suffix={suffix}
                value={description}
                // onChange={e=>console.log(e.target.value)}
                onChange={e=>this.setState({description:e.target.value})}
                onKeyUp={this.onKeyUp}
                />
                </div>
          </div>
          

        )
    }
}

const mapStateToProps=(state:any,ownProps:any)=>({

    ...ownProps
})

const mapDispatchToProps={
    addTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Component)

