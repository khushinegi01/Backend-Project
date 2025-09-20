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

export const LoginUserService = async(payload)=>{
    try {
        const response = await fetch(`${URL}/login`,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify(payload),
            credentials: "include" 
        })
        const result = await response.json()
        if(!response.ok){
            console.log("LoginUserService :: ", result.message )
            throw new Error(result.message)
        }
        console.log("Login :: ",result)
        return result
    } catch (error) {
        console.log("LoginUserService :: ", error.message)
        throw new Error(error)   
    }
}


export const getUserProfile = async()=>{
    try {
        const response = await fetch(`${URL}/getUser`,{
            method: "Get",
            credentials : "include"
        })
        const result = await response.json()
        if(!response.ok){
            console.log("Get User :: ", result.message)
            throw new Error(result.message)
        }
        console.log("Get User Profile :: ", result)
        return result?.data
    } catch (error) {
        console.log("Get User Profile :: ", error.message)
        throw error
    }
}


export const logoutUserService = async()=>{
    try {
        const response = await fetch(`${URL}/logout`,{
            method : "POST",
            credentials : 'include'
        })
        const result = await response.json()
        if(!response.ok){
            console.log("Logout User :: ", result)
            throw new Error(result.message)
        }
        return result
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const updateUserProfileService = async (payload)=>{
    try {
        const response = await fetch(`${URL}/update-user-details`, {
            method : "PATCH",
            credentials : 'include',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(payload)
        })
        const result = response.json()
        if(!response.ok){
            console.log('Error in Updating :: ', result.message)
            throw new Error(result.message)
        }
        console.log("Update User Profile service :: ",result)
        return result ;
    } catch (error) {
        console.log("Update User Profile service :: ", error)
        throw error 
    }
}