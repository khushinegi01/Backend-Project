import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../../services/UserService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../LoadingPage';
function UserDashboard() {
    const navigate = useNavigate()
    const { user, loading, isAuthenticated } = useSelector((state) => state.auth)
    if (!isAuthenticated) {
        return (
            <>
                <div className='bg-[#0f0f0f] text-[#f1f1f1] min-h-screen flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-bold mb-10'>Please  <span className='text-amber-600 font-bold'>
                        Login
                    </span> First !</h1>
                    <button className='w-full max-w-96 bg-amber-600 p-2 rounded-xl hover:bg-amber-500 mt-3'
                    onClick={()=>navigate('/login')}>Go to Login</button>
                </div>
            </>
        )
    }
    if(loading){
        return (
            <>
                <LoadingPage/>
            </>
        )
    }
    return (
        <>
            <div className='bg-[#0f0f0f] text-[#f1f1f1]  min-h-screen flex flex-col justify-center items-center'>
                <h1 className='text-5xl'>Welcome <span className='text-amber-600 font-bold'>
                    {user ? user.fullname : "User"}
                </span> </h1>
            </div>
        </>
    )
}

export default UserDashboard
