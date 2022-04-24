import React from 'react'
import { useNavigate } from 'react-router-dom';
import {VscSignOut} from 'react-icons/vsc'

const LogOut = () => {
    const navigate = useNavigate();
    const LogOutFunc =()=>{
        localStorage.setItem('isAdmin',false);
        localStorage.setItem('NameUser','')
        navigate('/')
    }
  return (
    <button className='btn-LogOut' onClick={()=>{LogOutFunc()}}>
      יציאה מהמשתמש
      <VscSignOut/>
    </button>
  )
}

export default LogOut