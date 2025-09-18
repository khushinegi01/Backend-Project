import React from 'react'

function ProfileUpdate() {
    return (
         <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-[#0f0f0f] text-[#f1f1f1] border shadow-md shadow-white/20 border-white p-4 m-2 w-full max-w-md sm:max-w-lg rounded-2xl mt-5'>
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
    )
}

export default ProfileUpdate
