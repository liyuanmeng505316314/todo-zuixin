import axios from 'axios'
import history from './history'

const appID='ajcC6CxT3E9pBaExVhbyqGCe';
const appSecret='52swBSJfBsFqDGQ33hLbcudP';

/* tslint:disable:no-string-literal*/

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

instance.interceptors.request.use(config => {
    const xToken = localStorage.getItem('x-token')
    if(xToken){
        if (!config?.headers) {
            throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    console.log('request成功')
    return config;
}, (error) =>{
    console.log('request错误')
    return Promise.reject(error);
});

instance.interceptors.response.use( (response)=> {
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
        console.log('x-token')
    }
    return response;
},  (error)=>{
    if(error.response.status===401){
        history.push('/login');
        window.location.reload();
    }
    return Promise.reject(error);
});

/* tslint:enable:no-string-literal*/

export default instance