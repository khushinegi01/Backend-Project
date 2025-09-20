import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { changeUserPasswordService } from '../../services/UserService'
import { toast } from 'react-toastify'

function UserPassword() {
    const [currentPassword , setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate();
    const handlePasswordChange = async(e)=>{
        e.preventDefault()
        const payload = {
            currentPassword,
            newPassword
        }
        try {
            const result = await changeUserPasswordService(payload);
            setCurrentPassword('');
            setNewPassword('');
            if(result.success === true){
                toast.success("Password Updates")
                setTimeout(()=>navigate('/dashboard'), 3000)
            }
            else{
                toast.error("Problem Occured ! Kindly Check input the correct Password.")
            }
        } catch (error) {
            toast.error("Problem Occured ! Kindly Check input the correct Password.")
        }

    }
    return (
        <>
           <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-[#0f0f0f] text-[#f1f1f1] border shadow-md shadow-white/20 border-white p-4 m-2 w-full max-w-md sm:max-w-lg rounded-2xl mt-5'>
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    onClick={() => navigate(-1)}
                >
                    ✕
                </button>
                <form className='space-y-2' onSubmit={handlePasswordChange}  >

                    <label className='block'>
                       Current Password
                    </label>
                    <input
                        type="text"
                        placeholder='Enter New Password'
                        className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <label className='block'>
                       New Password
                    </label>
                    <input
                        type="text"
                        placeholder='Enter New Password'
                        className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    
                    <button className='w-full bg-amber-600 outline-none hover:bg-amber-400 hover:text-black transition duration-200 text-white p-2 rounded-xl mb-4 mt-4'>Change Password</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default UserPassword
