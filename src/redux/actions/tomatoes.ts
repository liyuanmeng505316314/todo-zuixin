import {ADD_TOMATO,INIT_TOMATO,UPDATE_TOMATO} from '../name'



export const addTomato=(payload:number)=>{ 
    return {
        type:ADD_TOMATO,
        payload
       }
}

export const initTomato=(payload:number)=>{ 
    return {
        type:INIT_TOMATO,
        payload
       }
}

export const updateTomato=(payload:number)=>{ 
    return {
        type:UPDATE_TOMATO,
        payload
       }
}

