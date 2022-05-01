import React,{useState,useContext,useEffect} from 'react'
import {images} from '../../constants'
import {BiDotsVerticalRounded, BiErrorCircle} from 'react-icons/bi'
import {userContext} from './DashBoard'
import { Link, useNavigate } from 'react-router-dom'
import {FiEdit2} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import axios from 'axios';
import FileSaver from 'file-saver';


const Folder = ({title,category,href,link}) => {
  const navigate = useNavigate();
  const [ErrorToggle, setErrorToggle] = useState(false);
  const [Folder, setFolder] = useState({
    titleFolder : title,
    categoryFolder : category,
    hrefFolder : href,
    Link: link
  })
  const {ErrorPage,setErrorPage,EditMode,activeSubject,ShowOnlyCategory,SetInfo} = useContext(userContext)
  const ToggleNavBarOptions = () =>{
    //toggle navBarOptions
    setErrorToggle(!ErrorToggle)
  }

  const ErrorOnFile = () =>{
    setErrorPage(true)
  }

  const editFolder = (folder)=>{
    // send current folder and redirect to Admin , so he'll be able to update details
    navigate(`../AdminUpdateFile?folderName=${folder.titleFolder}`, {state: {file: folder }});
  }

  const GetHrefFromChunk = (link)=>{
    axios.get('http://localhost:5000/api/File/downloadFile/'+link ,{responseType: "blob"})
    .then((res) => {
      console.log(res)
      FileSaver.saveAs(res.data, `${link}.pdf`);
    }).catch((error) => {
      console.log("err")
        console.log(error)
    })
  }
  const deleteLink = (fileName) =>{
    // delete file
    axios.delete('http://localhost:5000/api/File/deleteLink/'+fileName)
    .then((res) => {
      console.log(res)
    }).catch((error) => {
        console.log(error)
    })
  }
  
  const deleteFile = (fileName) =>{
    // delete file
    axios.delete('http://localhost:5000/api/File/deleteFile/'+fileName)
    .then((res) => {
      console.log(res)
    }).catch((error) => {
        console.log(error)
    })
  }
  
  
  return (
    <div className='folder'>
      <div className='icons'>
        <BiDotsVerticalRounded className='settings-File' onClick={()=>{ToggleNavBarOptions()}}/>
        {(localStorage.getItem("isAdmin") && EditMode) ? 
        <>
          <FiEdit2 className='editBtn' onClick={()=>{editFolder(Folder)}}/>
          <AiOutlineDelete className='delete-folder' onClick={()=>{
            deleteLink(Folder.Link)
            deleteFile(Folder.titleFolder)
            if(activeSubject == "")
                SetInfo();
             else ShowOnlyCategory(activeSubject)
            }}/>
        </>
        : ""}
      </div>
     
      <div className='NavBar-settings'>
        {ErrorToggle ?( 
          <>
            <a className="download-option" onClick={()=>{GetHrefFromChunk(Folder.Link)}}>להורדה</a>
            <ul>
              <li onClick={()=>{ErrorOnFile()}}><BiErrorCircle/> דווח על שגיאה</li>
            </ul> 
          </>
        ):""}
      </div>              
        <a href={Folder.hrefFolder}>
            <img src={images.File} alt={title}/>  
        </a>

        <div className='folder__details'>
            <h3 className='h3-title-folder'>{title}</h3>
        </div>
    </div>
  )
}

export default Folder