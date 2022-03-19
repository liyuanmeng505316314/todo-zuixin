import * as React from 'react';
import {Dropdown,Icon,Menu} from 'antd';
import axios from 'src/config/axios'
import history from '../config/history'
import Tomatoes from './Tomatoes/Tomatoes'
import Statistics from './statistics/statistics'
import './Index.scss'
import Todo from './todo'
interface IRouter{
    history:any;
}

interface IIndexState{
    user:any
}

const logout=()=>{
  localStorage.setItem('x-token','')
  history.push('/login')
  
}

const menu = (
    <Menu>
      <Menu.Item key="1" ><Icon type="user"/>个人设置</Menu.Item>
      <Menu.Item key="2" onClick={logout} ><Icon type="logout"/>注销</Menu.Item>
    </Menu>
  );

class Component extends React.Component<IRouter, IIndexState>{
   constructor(props:any){
       super(props)
       this.state={
           user:{}
       }
   }
   async componentWillMount(){
     document.title=`请开始您的番茄学习之旅`
      await this.getMe()
   }

   getMe=async()=>{
        const response=await axios.get('me')
        this.setState({user:response.data})
   }
   
    render(){
              return(
                <div className="Index" id="Index"> 
                <header id="indexId">
                  <span className="Logo">番茄土豆时钟</span>
                  <Dropdown overlay={menu}>
                   <span>
                       {this.state.user&&this.state.user.account}<Icon type="down" style={{marginLeft:12}}/>
                   </span>
                  </Dropdown>
                </header>
                <main>
                  <Tomatoes/>
                  <Todo />
                </main>
                 <Statistics/>
                </div>
              )
    }

}
export default Component

