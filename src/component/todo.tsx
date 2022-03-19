import * as React from 'react';
import {connect} from 'react-redux';
import { initTodos,updateTodo } from 'src/redux/actions/todos';
import './todo.scss';
import TodoInputPart from './todoInputPart'
import axios from '../config/axios'
import TodoItem from './todoItem'


class Component extends React.Component<any>{
    constructor(props){
        super(props)    

    }
    get unDeletedTodos(){
        return this.props.todos.filter(t=>!t.deleted)
    }
    get unCompletedTodos(){
        return this.unDeletedTodos.filter(t=>!t.completed)
    }
    get CompletedTodos(){
        return this.unDeletedTodos.filter(t=>t.completed)
    }

    getTodo = async () => { 
        try{
            const response= await axios.get('todos')
            const todos=response.data.resources.map(t=>Object.assign({},t,{editing:false}))
            this.props.initTodos(todos)
        }catch(e){
           throw new Error(e)
        }
    }



    componentDidMount(){
        this.getTodo()
    }

 
    render(){
        return(
         <div id="Todos">
            {/* todoInput里面的div，类名是todo2 */}
            <div className="include">
               <TodoInputPart /> 
                {/* todoList里面的div，类名是todoList，同时有组件todoItem */}
               <div className="todoList">
                  { this.unCompletedTodos.map(t=>{  
                    return <TodoItem key={t.id} {...t} />  
                    }) 
                  }  
                {  this.CompletedTodos.map(t=>{  
                    return <TodoItem key={t.id} {...t} />  
                  }) 
                }  
                 </div>
            </div>
         </div>
        )
    }
}

const mapStateToProps=(state:any,ownProps:any)=>({
    todos: state.todos,
    ...ownProps
})

const mapDispatchToProps={
    initTodos,
    updateTodo,
}

export default connect(mapStateToProps,mapDispatchToProps)(Component)