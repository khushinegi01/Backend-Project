import React from 'react'
import { useNavigate } from 'react-router-dom'
function LandingPage() {
    const navigate = useNavigate()
    return (
        <>
            <div className='bg-[#0f0f0f] w-full min-h-screen text-[#f1f1f1] flex flex-col justify-center p-2  items-center' >
                <div className="text-5xl mb-10 ">Welcome to <span className='text-amber-600 font-bold'>Youtube Clone</span></div>
                <div className='flex flex-row gap-5 w-full max-w-md sm:max-w-lg '>
                    <button 
                        className='p-2 bg-amber-600 hover:bg-amber-500 text-xl text-white rounded-xl w-full'
                        onClick={()=>navigate('/login')} 
                    >
                        Login 
                    </button>
                    <button 
                        className='p-2 bg-amber-600 hover:bg-amber-500 text-xl text-white rounded-xl w-full' 
                        onClick={()=>navigate('/register')}
                    >
                        Register Now
                    </button>
                </div>
            </div>

        </>
    )
}

export default LandingPage
