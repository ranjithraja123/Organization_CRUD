import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import { useAuthContext } from '../../context/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const {authUser} = useAuthContext()

  const [email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  const {loading,login} = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email,password)
                // localStorage.setItem("org1-app", JSON.stringify(data))

    // setAuthUser()
    console.log('ramramram1')

    // const user = localStorage.getItem("org-app-login")
    // console.log(user.,'hereim')
    console.log(authUser,'hereim1')

    if(authUser?.user?.role === 'admin') {
      console.log('ramramram')
      navigate('/dataTable')
    } else if(authUser?.user?.role === 'user') {
      navigate(`user/${authUser?.user?._id}`)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'
     style={{
      boxShadow: 'inset -10px 0 10px -10px purple, inset 10px 0 10px -10px pink'
    }}>
      <h1 className='text-3xl font-semibold text-center text-gray-300'>
       Organization Login
      </h1>


      <form 
      onSubmit={handleSubmit}
      >
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>
              Email
            </span>
          </label>
          <input type='email' placeholder='Enter Email' className='w-full input input-bordered h-10'
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
           />
        </div>

        <div>
          <label className='label'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <Link to='/signup' className='text-sm hover:underline hover:text-green-600 mt-2 inline-block' >
        {"Don't"} have an account?
        </Link>
        {/* <a href='#' className='text-sm hover:underline hover:text-green-600 mt-2 inline-block'></a> */}

        <div>
          <button className='btn btn-block btn-sm mt-2 bg-pink-900 hover:bg-pink-700' >
            
            Login
            </button>
        </div>



      </form>

    </div>
  </div>
  )
}

export default Login
