import React,{useState,useContext,createContext} from 'react'
import {images} from '../constants'
import {BiDotsVerticalRounded, BiErrorCircle} from 'react-icons/bi'
import {userContext} from './DashBoard'
import { useNavigate } from 'react-router-dom'
import {FiEdit2} from 'react-icons/fi'


const Folder = ({title,category,href}) => {
  const navigate = useNavigate();
  const [ErrorToggle, setErrorToggle] = useState(false);
  const [Folder, setFolder] = useState({
    titleFolder : title,
    categoryFolder : category,
    hrefFolder : href
  })

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

  const editFolder = (folder)=>{
    // send current folder and redirect to Admin , so he'll be able to update details
    navigate(`../AdminAddFiles?folderName=${folder.titleFolder}`, { state:{file: Folder} });

  }
  return (
    <div className='folder'>
      {console.log(href + " " + title + " "+ category)}
      <BiDotsVerticalRounded className='settings-File' onClick={()=>{ToggleNavBarOptions()}}/>
      {(localStorage.getItem("isAdmin") && EditMode) ? <FiEdit2 className='editBtn' onClick={()=>{editFolder(Folder)}}/> : ""}
      <div className='NavBar-settings'>
        {ErrorToggle ?( 
          <>
            <a href={images.TryPPTX} className="download-option" target="_blank" download>להורדה</a>
            <ul>
              <li onClick={()=>{ErrorOnFile()}}><BiErrorCircle/> דווח על שגיאה</li>
            </ul> 
          </>
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