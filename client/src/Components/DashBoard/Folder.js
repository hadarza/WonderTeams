import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {images} from '../../constants'
import {BiDotsVerticalRounded, BiErrorCircle} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import {FiEdit2} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import {axiosInstance} from '../../config';
import FileSaver from 'file-saver';
import { fetchFoldersByCategory,IsEditMode,getActiveSubject,fetchFolders } from '../../Redux/features/DashBoard/DashBoardSlice'


const Folder = ({title,category,href,link}) => {
  const navigate = useNavigate();
  const [ErrorToggle, setErrorToggle] = useState(false);
  const [Folder, setFolder] = useState({
    titleFolder : title,
    categoryFolder : category,
    hrefFolder : href,
    Link: link
  })
  const dispatch = useDispatch()
  const EditMode = useSelector(IsEditMode)
  const activeSubject = useSelector(getActiveSubject)

  const ToggleNavBarOptions = () =>{
    //toggle navBarOptions
    setErrorToggle(!ErrorToggle)
  }

  const ErrorOnFile = () =>{
    //setErrorPage(true)
  }

  const editFolder = (folder)=>{
    // send current folder and redirect to Admin , so he'll be able to update details
    navigate(`../AdminUpdateFile?folderName=${folder.titleFolder}`, {state: {file: folder }});
  }

  const GetHrefFromChunk = (link)=>{
    axiosInstance.get('/File/downloadFile/'+link ,{responseType: "blob"})
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
    axiosInstance.delete('/File/deleteLink/'+fileName)
    .then((res) => {
      console.log(res)
    }).catch((error) => {
        console.log(error)
    })
  }
  
  const deleteFile = (fileName) =>{
    // delete file
    axiosInstance.delete('/File/deleteFile/'+fileName)
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
              dispatch(fetchFolders())
             else dispatch(fetchFoldersByCategory(activeSubject))
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