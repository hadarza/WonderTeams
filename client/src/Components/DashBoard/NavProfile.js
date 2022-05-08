import React from 'react'
import {VscSignOut} from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
const NavProfile = () => {
    const navigate = useNavigate()

    const LogOutFunc =()=>{
        localStorage.setItem('isAdmin',false);
        localStorage.setItem('NameUser','')
        navigate('/')
    }
  return (
    <div className='div-profile'>
         <ul class="dropdown">
            <li>
                <a href="/" onClick={()=>{LogOutFunc()}}>יציאה</a>
                <VscSignOut/>
            </li>
        </ul>
    </div>
    )
}

export default NavProfile