import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/auth/authSlice';
import { logoutUserService } from '../services/UserService';
import { useEffect } from 'react';
function Navbar({
    user,
    isAuthenticated
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [profileClicked, setProfileClicked] = useState(false)
    
    const handleLogout = async () => {
        const result = await logoutUserService()
        try {
            dispatch(clearUser())
            setProfileClicked(false)
            navigate('/')
        } catch (error) {
            console.log("Error logout ")
        }
    }
    return (
        <>
            <div className='bg-[#0f0f0f] shadow-xl shadow-white/20 text-[#f1f1f1] p-2 flex flex-row w-full items-center cursor-pointer'>
                <img src='/image.png ' className='h-10 w-10' onClick={() => navigate('/')}></img>
                <h1 className='flex items-center text-xl font-bold hover:text-[#f1f1f19d] ' onClick={() => navigate('/')}>Youtube<span className='text-amber-600 hover:text-amber-700'>Clone</span></h1>
                {isAuthenticated &&
                    <div className='ml-auto'>
                        <img src='/profileLogo.png' alt='profileIcon' className='h-10 w-10 border-2 m-3 border-[#f1f1f1b4] rounded-full' onClick={(e) => setProfileClicked(prev => !prev)}></img>
                    </div>
                }

            </div>



            {profileClicked &&
                <div className='absolute bg-[#0f0f0f] text-[#f1f1f1] right-4 top-16 border border-white/20 shadow-lg rounded-xl w-50 z-50'>
                    <ul className='flex flex-col'>
                        <li className='px-4 py-2 hover:bg-gray-800 cursor-pointer hover:rounded-xl'
                            onClick={() => navigate('/profile')}>
                            Profile
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-800 cursor-pointer hover:rounded-xl' onClick={()=>navigate('/changeCurrentPassword')}>
                            Change Password
                        </li>
                        <li className='px-4 py-2 hover:bg-gray-800 cursor-pointer hover:rounded-xl'
                            onClick={handleLogout}>
                            Logout
                        </li>
                    </ul>
                </div>
            }
        </>


    )
}

export default Navbar
