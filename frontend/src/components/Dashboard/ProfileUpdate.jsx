import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileService } from '../../services/UserService';
import { setUser } from '../../features/auth/authSlice';

import { toast } from "react-toastify";
function ProfileUpdate() {
    const navigate = useNavigate()
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user) {
                    console.log("result consist ::", user)
                    setEmail(user.email)
                    setFullname(user.fullname)

                }
            } catch (err) {
                console.error("Failed to fetch user:", err.message);

            }
        };
        fetchUser();
    }, [])
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            fullname: fullname,
            email: email
        }
        const result = await updateUserProfileService(payload)
        if (result.success === true) {
            dispatch(setUser(result.data))
            toast.success("User Profile is Updated")
            setTimeout(() => {
            navigate("/dashboard");
            }, 1500);
        }
        else {
            console.log("ProfileUpdate Error in update ")
            toast.error("User Profile is not Updated")
        }

    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-[#0f0f0f] text-[#f1f1f1] border shadow-md shadow-white/20 border-white p-4 m-2 w-full max-w-md sm:max-w-lg rounded-2xl mt-5'>
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    onClick={() => navigate(-1)}
                >
                    ✕
                </button>
                <form className='space-y-2' onSubmit={handleProfileUpdate}  >

                    <label className='block'>
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder='Enter User Name'
                        className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                    <label className='block'>
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className='w-full bg-amber-600 outline-none hover:bg-amber-400 hover:text-black transition duration-200 text-white p-2 rounded-xl mb-4 mt-4'>Update Profile</button>
                </form>
            </div>
                
        </div>
    )
}

export default ProfileUpdate
