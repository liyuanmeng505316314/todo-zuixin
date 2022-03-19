import * as React from 'react';
import { Input,Icon ,Button} from 'antd';
import {Link} from 'react-router-dom'
import axios from 'src/config/axios'
import './Login.scss'
import { message } from 'antd';
// import { useHistory } from 'react-router';
interface ILoginState{
    account:string,
    password:string,
}
class Component extends React.Component<any,ILoginState>{

     constructor(props){
         super(props)
         this.state={
             account:"",
             password:""
         }
     }
    
     onChangeAccount=(e)=>{
        console.log(e.target.value)
         this.setState({...this.state, account:e.target.value })
     }
     onChangePassword=(e)=>{
        console.log(e.target.value)
        this.setState({...this.state, password:e.target.value })
    }

    submit=async()=>{
        const { account ,password}  =this.state;
        try{
          await axios.post('sign_in/user',{
            account,
            password
         })
         this.props.history.push('/')
          message.success('成功，回到首页')
       }catch(e){
       message.error('账号或者密码错误')
      }}

    render(){
        const { account ,password}  =this.state;
              return(
                <div className="Login" id="Login">

                    <h1>登录界面</h1>

                    <Input
                      id='username'
                      placeholder="请输入您的用户名"
                      prefix={<Icon type="user" style={{ color:'rgba(0,0,0,.25)'}} />}
                      value={account}
                      onChange={this.onChangeAccount}
                    />

                    <Input.Password
                      id='password'
                       value={password} 
                       placeholder="请输入密码"
                       onChange={this.onChangePassword}
                    />

                    <Button type="primary" className="LoginButton" onClick={this.submit}>登录</Button>
                    
                    <p> 没有账号请注册<Link to='/SignUP' >注册</Link></p>
                  </div>
        )}
}
export default Component