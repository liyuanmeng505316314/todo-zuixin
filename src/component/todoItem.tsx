import * as React from 'react';
import {Checkbox,Icon} from 'antd'
import {connect} from 'react-redux';    
import axios from '../config/axios';
import  {editTodo,updateTodo} from 'src/redux/actions/todos';
import './todoItem.scss'
import classNames from 'classnames'

// 接下来的是一个组件有的东西， description描述，completed是否完成，editing，是否编辑
interface ITodoItemProps{
    id:number;
    description:string;
    completed:boolean;
    editing:boolean;
    editTodo:(id:number)=>any;
    updateTodo:(payload:any)=>any;
}

interface ITOdoItemState {
    editText:string;
}


class Component extends React.Component<ITodoItemProps,ITOdoItemState>{
    constructor(props){
        super(props)
        this.state={
            editText:this.props.description
        }
    }
    updateTodo= async (params:any)=>{
        if(params.completed===true){
            params.completed_at=new Date()
        }
        try{
            const  response= await axios.put(`todos/${this.props.id}`,params)
            this.props.updateTodo(response.data.resource)
          }catch(e){
            throw new Error(e)
          }
    }   
    editTodo=()=>{
         this.props.editTodo(this.props.id)
    }
    onKeyUp=(e)=>{
        if(e.keyCode===13 && this.state.editText!==''){
           this.updateTodo({description:this.state.editText})
        }
    }
    public render(){
        // 这个前面是两个JSX元素，用于那个选择的
          const Editing= (
             <div className="editing">
                 <input className="input" type="text"  
                     value={this.state.editText}  
                     onChange={e=>this.setState({editText:e.target.value})}
                     onKeyUp={this.onKeyUp}
                 />
                 <div className="iconWrapper">
                     <Icon className="icon" type="enter"/>
                     <Icon className="icon" type="delete" theme="filled"
                     onClick={ e=>this.updateTodo({deleted:true})}
                     />
                 </div>
             </div>
          )
          const Text=(<span className="text" onDoubleClick={this.editTodo}> {this.props.description} </span>)
          const todoItemClass=classNames({
            completed:this.props.completed,         
            editing:this.props.editing,
            TodoItem:true,
          })
        return(
            <div className={todoItemClass} id="TodoItem">
            {/*  勾选框，表示是否已完成 */}
            <Checkbox className="checkbox" checked={this.props.completed} 
                    onChange={e=>this.updateTodo({completed:e.target.checked})}
            />
            {/* 下面是编辑框或者文本框 */}
            {this.props.editing?Editing:Text}
            </div>
        )
    }

}

const mapStateToProps=(state:any,ownProps:any)=>({
    ...ownProps
})

const mapDispatchToProps={
    editTodo,
    updateTodo,
}

export default connect( mapStateToProps,mapDispatchToProps)(Component)

