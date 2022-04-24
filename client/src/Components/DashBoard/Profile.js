import React,{useState} from 'react'
import {images} from '../../constants'
import {AiOutlineCaretDown,AiOutlineCaretUp} from 'react-icons/ai'
import NavProfile from './NavProfile'
const Profile = () => {
    const [SeeLogOut, setSeeLogOut] = useState(false)

  return (
    <div className='name'>
        <img className='img-profile' src={images.Person} alt="Image-Person"/>
        <h5>{localStorage.getItem('Name')}</h5>
        <AiOutlineCaretDown className='down' onClick={() =>{setSeeLogOut(!SeeLogOut)}}/> 
        {SeeLogOut && <NavProfile/>}
    </div>
  )
}

export default Profile