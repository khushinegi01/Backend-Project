import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate()
    const [islogged, setIslogged] = useState(true);
    const [profileClicked, setProfileClicked] = useState(false)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    return (
        <>
            <div className='bg-[#0f0f0f] text-[#f1f1f1] p-2 flex flex-row w-full items-center cursor-pointer'>
                <img src='/image.png ' className='h-10 w-10' onClick={() => navigate('/')}></img>
                <h1 className='flex items-center text-xl font-bold hover:text-[#f1f1f19d] ' onClick={() => navigate('/')}>Youtube<span className='text-amber-600 hover:text-amber-700'>Clone</span></h1>
                {islogged &&
                    <div className='ml-auto'>
                        <img src='/profileLogo.png' alt='profileIcon' className='h-10 w-10 border-2 m-3 border-[#f1f1f1b4] rounded-full' onClick={(e) => setProfileClicked(prev => !prev)}></img>
                    </div>
                }
            </div>



            {profileClicked &&
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-[#0f0f0f] text-[#f1f1f1] border-1 border-white p-4 m-2 w-full max-w-md sm:max-w-lg rounded-2xl mt-5'>
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            onClick={() => setProfileClicked(false)}
                        >
                            ✕
                        </button>
                        <form className='space-y-2'  >

                            <label className='block'>
                                User Name
                            </label>
                            <input
                                type="text"
                                placeholder='Enter User Name'
                                className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                            <label className='block'>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <label className='block'>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder='Generate Password '
                                className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className='w-full bg-amber-600 outline-none hover:bg-amber-400 hover:text-black transition duration-200 text-white p-2 rounded-xl mb-4 mt-4'>Update Profile</button>
                        </form>
                    </div>
                </div>
            }
        </>


    )
}

export default Navbar
