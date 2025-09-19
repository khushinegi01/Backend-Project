import React, { useState } from 'react'
import { LoginUserService } from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
function Login() {
    const navigate = useNavigate()
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [error, setError] = useState("");
    const dispatch = useDispatch()
    const handleLogin = async(e)=>{
        e.preventDefault()
        setError('')
        console.log("Login :", {
            username,
            password,
            email
        })
        try {
            const payload = {username, password, email}
            const result = await LoginUserService(payload)
            if(result.success === true){
                const user = result.data.loggedUser ;
                dispatch(setUser(user))
                navigate('/dashboard')
            }
        } catch (error) {
            console.log("Error in Logging :: ", error)
            setError(error)
        }
    }
    return (
        <>
            <div className='bg-[#0f0f0f] text-[#f1f1f1] p-2 flex flex-col min-h-screen w-full items-center justify-center'>
                <h1 className='text-5xl'>
                    User
                    <span className='text-amber-600 font-bold'> Login </span>
                </h1>
                <div className='border-1 border-white p-4 m-2 w-full max-w-md sm:max-w-lg rounded-2xl mt-5'>
                    <form onSubmit={handleLogin} className='space-y-2'>
                    <label>Email</label>
                    <input
                        className='w-full p-2 outline-none focus:border focus:border-white rounded-xl bg-[#121212]'
                        placeholder='Enter Email'
                        
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <label>User Name</label>
                    <input
                        className='w-full p-2 outline-none focus:border focus:border-white rounded-xl bg-[#121212]'
                        placeholder='Enter Username'
                        
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        className='w-full p-2 outline-none focus:border focus:border-white rounded-xl bg-[#121212] '
                        placeholder='Enter Password'
                        
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button className='w-full bg-amber-600 p-2 rounded-xl hover:bg-amber-500 mt-3'>Login</button>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default Login
