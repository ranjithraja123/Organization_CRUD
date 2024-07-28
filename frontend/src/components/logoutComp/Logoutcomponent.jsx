import React from 'react'
import useLogout from '../../hooks/useLogout'
import { BiLogOut } from "react-icons/bi";
import { Navigate, useNavigate } from 'react-router-dom';


const Logoutcomponent = () => {
  const {loading,logout} = useLogout()
  const navigate = useNavigate();

  const onLogout = () => {
    logout()
    navigate('/')

  }
  return (
    <div className=''>
      <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={onLogout}/>
    </div>
  )
}

export default Logoutcomponent
