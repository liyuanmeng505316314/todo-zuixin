import  React,{useEffect,useState,FunctionComponent} from 'react'

// 为了防止重新渲染的问题，故还是使用了类组件

interface ICountDownHookProps{
    timer:number;
    onFinish:()=>void;
}

let timeId:NodeJS.Timeout

const Component:FunctionComponent<ICountDownHookProps> =(props)=>{

   const [countDown,setCountDown]=useState(props.timer)
   const minus= Math.floor(countDown/60000)
   const second=Math.floor(countDown/1000)%60
   const time =`  ${minus<10? `0${minus}` :minus}:  ${second<10? `0${second}` :second}  `
 
   // 这个useEffect，不知道为什么，自己就会出现括号无效的现象

  useEffect(()=>{
        document.title=`${time}`
        timeId=setInterval(()=>{
        setCountDown(countDown-1000)
        if(countDown<0){
            props.onFinish()
            clearInterval(timeId)
            document.title=`已完成`
        }
   },1000)
   return function cleanup(){
    clearInterval(timeId)
   }
  })

   return(
    <div className="cuntDown">
        {time}
    </div>
 )
}


export default  Component

 