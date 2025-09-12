import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-[#0f0f0f] w-full min-h-screen text-[#f1f1f1] flex flex-col justify-center p-2  items-center' >
        <h1 className='text-4xl'>This is youtube frontend.</h1>
        <div className='border-1 border-white p-4 m-2 w-xl'>
          <form className='space-y-2'>
            <label className='block'>
              Full Name
            </label>
            <input type="text" placeholder='Enter Full Name' className='w-full focus:border-1 focus:border-amber-50 rounded-xl p-2 bg-[#121212]'/>
            <label className='block'>
              User Name
            </label>
            <input type="text" placeholder='Enter User Name' className='w-full focus:border-1 focus:border-white rounded-xl p-2 bg-[#121212]'/>
            <label className='block'>
              Email
            </label>
            <input type="email" placeholder='Enter Email' className='w-full focus:border-1 focus:border-white rounded-xl p-2 bg-[#121212]'/>
            <label className='block'>
              Upload Avatar Image
            </label>
            <input type="file" placeholder='Upload Avatar Image' className='w-full focus:border-1 focus:border-white rounded-xl p-2 bg-[#121212]'/>
            <label className='block'>
              User Name
            </label>
            <input type="text" placeholder='Enter User Name' className='w-full focus:border-1 focus:border-white rounded-xl p-2 bg-[#121212]'/>
            <label className='block'>
              User Name
            </label>
            <input type="text" placeholder='Enter User Name' className='w-full focus:border-1 focus:border-white rounded-xl p-2 bg-[#121212]'/>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
