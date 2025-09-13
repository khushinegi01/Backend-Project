import React from 'react'
import { API_URL } from '../config/config'

const URL = `${API_URL}/users`

export const UserRegisterService = async(payload) =>{
    try {
        const response = await fetch(`${URL}/register`,{
            method : 'POST' ,
            body : payload
        })
        const result = await response.json()
        if(!response.ok){
            console.log("UserRegisterService :: ",result.message)
            throw new Error(result.message)
        }
        return result ;
    } catch (error) {
        console.log("UserRegisterService :: ", error)
        throw new Error(error)
    }
}


