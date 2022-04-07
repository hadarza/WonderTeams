import React,{useState,useContext,createContext} from 'react'
import {images} from '../constants'
import {BiDotsVerticalRounded, BiErrorCircle} from 'react-icons/bi'
import {userContext} from './DashBoard'
import {FiEdit2} from 'react-icons/fi'
const Folder = ({title,href}) => {
  const [ErrorToggle, setErrorToggle] = useState(false)

  const {ErrorPage,setErrorPage,EditMode,setEditMode} = useContext(userContext)
  const ToggleNavBarOptions = () =>{
    //toggle navBarOptions
    setErrorToggle(!ErrorToggle)
  }

  const ErrorOnFile = () =>{
    console.log(setErrorPage)
    setErrorPage(true)
    console.log(ErrorPage)
  }
  return (
    <div className='folder'>
      <BiDotsVerticalRounded className='settings-File' onClick={()=>{ToggleNavBarOptions()}}/>
      {(localStorage.getItem("isAdmin") && EditMode) ? <FiEdit2 className='editBtn'/> : ""}
      <div className='NavBar-settings'>
      {/* <a href={images.TryPPTX} target="_blank" download>Download</a> */}
        {ErrorToggle ?( 
          <ul>
            <li onClick={()=>{ErrorOnFile()}}><BiErrorCircle/> דווח על שגיאה</li>
          </ul> 
        ):""}
      </div>              
        <a href={href}>
            <img src={images.File} alt={title}/>  
        </a>

        <div className='folder__details'>
            <h3 className='h3-title-folder'>{title}</h3>
        </div>
    </div>
  )
}

export default Folder