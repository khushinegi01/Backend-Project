import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../../services/UserService';
function UserDashboard() {
    const [user , setUser] = useState('');
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const result = await getUserProfile();
                if (result) {
                    setUser(result);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err.message);
            }
        };
        fetchUser();
    },[])
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
