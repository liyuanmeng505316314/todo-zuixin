import * as React from 'react';
import './statistics.scss'
import {connect} from 'react-redux'
import Polygon from './Polygon'
import _ from 'lodash'
import {format} from 'date-fns'
import TodoHistory from './TodoHistory/TodoHistory'
interface IStatisticsProps{
    todos:any[];
    tomatoes:any[];
}


class Component extends React.Component<any,IStatisticsProps>{
    get finishedTodos(){
        return this.props.todos.filter(t=>t.completed&&!t.deleted
        )
    }
    get finishedTomatoes(){
        return this.props.tomatoes.filter(t=>t.ended_at
        )
    }
  
    get dailyTodos(){
		return  _.groupBy(this.finishedTodos,(todo)=>{
			return format(todo.updated_at,'YYYY-MM-D')
		})
	}

    constructor(props){
        super(props)
    }
 
   public render(){

       return(
           <div className="statistics" id="statistics">
            <ul>
                <li>统计</li>
                <li>目标</li>
                <li> <h3>番茄时间历史</h3>
                    累计完成{this.finishedTomatoes.length}个项目
                </li>
                <li>
                    <h3>待办项历史</h3>
                    累计完成{this.finishedTodos.length}个项目
                    < Polygon  data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
                </li>
            </ul>
            <TodoHistory/>
           </div>

       )
   }
}

const mapStateToProps=(state:any,ownProps:any)=>({
    tomatoes: state.tomatoes,
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(Component)