import { useState } from 'react'
import { UserRegisterService } from '../services/UserService'

function Register() {
  const [username , setUsername] = useState('')
  const [fullname , setFullname] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [avatarImage , setAvatarImage] = useState(null)
  const [coverImage , setCoverImage] = useState(null)

  const handleRegisteration = async(e) =>{
    e.preventDefault()
    console.log({
        username,
        fullname,
        email,
        password,
        avatarImage,
        coverImage
    })
    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatarImage);
    formData.append("coverImage", coverImage);
    await UserRegisterService(formData)
  }
  
  return (
    <>
      <div className='bg-[#0f0f0f] w-full min-h-screen text-[#f1f1f1] flex flex-col justify-center p-2  items-center' >
        <h1 className='text-4xl'>Register Now to <span className='text-amber-600 font-bold'>Youtube Clone</span></h1>
        <div className='border-1 border-white p-4 m-2 w-full max-w-md sm:max-w-lg rounded-2xl mt-5'>
          <form className='space-y-2' onSubmit={handleRegisteration}>
            <label className='block mt-4'>
              Full Name
            </label>
            <input 
                type="text" 
                placeholder='Enter Full Name' 
                className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]' 
                value={fullname}
                onChange={(e)=>setFullname(e.target.value)} 
            />
            <label className='block'>
              User Name
            </label>
            <input 
                type="text" 
                placeholder='Enter User Name' 
                className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                onChange={(e)=>setUsername(e.target.value)} 
                value={username}
            />
            <label className='block'>
              Email
            </label>
            <input 
                type="email" 
                placeholder='Enter Email' 
                className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                onChange={(e)=>setEmail(e.target.value)} 
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
                onChange={(e)=>setPassword(e.target.value)} 
            />
            <label className='block'>
              Upload Avatar Image
            </label>
            <input 
                type="file" 
                placeholder='Upload Avatar Image' 
                className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                onChange={(e)=> setAvatarImage(e.target.files[0])}/>
            <label className='block'>
              Upload Cover Image
            </label>
            <input 
                type="file" 
                placeholder='Upload Cover Image' 
                className='w-full outline-none focus:border focus:border-white rounded-xl p-2 bg-[#121212]'
                onChange={(e)=> setCoverImage(e.target.files[0])}/>
            <button className='w-full bg-amber-600 outline-none hover:bg-amber-400 hover:text-black transition duration-200 text-white p-2 rounded-xl mb-4 mt-4'>Register Now</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
