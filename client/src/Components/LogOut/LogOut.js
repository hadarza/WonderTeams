import React from 'react'
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();
    const LogOutFunc =()=>{
        localStorage.setItem('isAdmin',false);
        localStorage.setItem('NameUser','')
        navigate('/')
    }
  return (
    <div className='div-LogOut'>
        <button className='btn-LogOut' onClick={()=>{LogOutFunc()}}>יציאה מהמשתמש</button>
    </div>
  )
}

export default LogOut