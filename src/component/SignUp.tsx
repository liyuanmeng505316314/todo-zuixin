import * as React from 'react';
import {Link} from 'react-router-dom'
import { Input,Icon ,Button} from 'antd';
import { message } from 'antd';
import axios from 'src/config/axios'
import './SignUp.scss'
// import { useHistory } from 'react-router';




interface ISignUpState{
    account:string,
    password:string,
    passwordConformation:string,
}
class Component extends React.Component<any,ISignUpState>{

     constructor(props){
         super(props)
         this.state={
             account:"",
             password:"",
             passwordConformation:""
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
    onChangePasswordConformation=(e)=>{
        console.log(e.target.value)
        this.setState({...this.state, passwordConformation:e.target.value })
    }
    submit=async()=>{
        const { account ,password,passwordConformation}  =this.state;
    try{
      await axios.post('sign_up/user',{
          account,
          password,
          password_confirmation:passwordConformation,
      })
      message.success('成功')
    }catch(e){
      message.warning('失败')
      }
    }
    
 

    render(){
        const { account ,password,passwordConformation}  =this.state;
              return(
                  <div className="SignUp" id="SignUp">

                      <h1>注册界面</h1>

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


                      <Input.Password
                      id='confirm'
                       value={passwordConformation}
                       onChange={this.onChangePasswordConformation}
                        placeholder="请确认密码"
                         />

                       <Button type="primary" className="SignUpButton" onClick={this.submit}>注册</Button>

                       <p> 已有账号，请登录<Link to='/login'>登录</Link></p>

                  </div>
        
              )
    }

}
export default Component