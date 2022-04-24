import React,{useEffect,useState,useMemo,useContext, createContext} from 'react'
import {BsFolder,BsFolder2Open} from 'react-icons/bs'
import Folder from './Folder'
import ErrorFile from '../ReportErrors/ErrorFile';
import axios from 'axios'
import NavDashBoard from './NavDashBoard';
import {useLocation} from 'react-router-dom';
import Profile from './Profile'
import FilterFolders from './FilterFolders';
export const userContext = createContext();

const DashBoard = () => {
  const location = useLocation();
  const [EditMode, setEditMode] = useState(false)
  const [activeSubject, setactiveSubject] = useState('Animate');
  const [data,setData]=useState([]);
  const [ShowFiles,setShowFiles]=useState([]);
  const [HrefLists,setHrefLists] = useState() // list of href
  
  const [ErrorPage, setErrorPage] = useState(false)


    const ShowOnlyCategory = (category) =>{
      axios.get(`http://localhost:5000/api/DashBoard/${category}`)
      .then((res) => {
          setShowFiles(res.data)
        }).catch((error) => {
          console.log(error);
      })
  }

    
    const SetInfo = () =>{
      axios.get("http://localhost:5000/api/DashBoard/")
      .then((res) => {
          setShowFiles(res.data)
        }).catch((error) => {
          console.log(error);
      })
  }


    const getData=()=>{
      fetch('listsFiles.json'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
          return response.json();
        })
        .then(function(myJson) {
          setData(myJson)
        });
    }

    useEffect(()=>{
      if(localStorage.getItem("Name") == null){
        localStorage.setItem("Name",location.state.Name)
        localStorage.setItem("isAdmin",location.state.isAdmin)
      }

      SetInfo();
      getData();
    },[])


    const GetHrefFromChunk = (link)=>{
      console.log(link)
      axios.post('http://localhost:5000/api/File/downloadFile',{link})
      .then((res) => {
        console.log(res.data)
          
      }).catch((error) => {
        console.log("err")
          console.log(error)
      })
      
    }
    
    const value = useMemo(()=>([ErrorPage,setErrorPage,EditMode,setEditMode]),[ErrorPage,EditMode])

  return (
    <userContext.Provider value = {{ErrorPage,setErrorPage,EditMode,setEditMode}}>
      <div className='App_army'>  

      <div className='filter_section'>
        <Profile/>
        <FilterFolders ShowFiles={ShowFiles} setShowFiles={setShowFiles}/>
      </div>

      <div className='dashBoard_section'>
        <NavDashBoard ShowFiles={ShowFiles} setShowFiles={setShowFiles} />
        <div className='dashboard'>
            <div className="folders-ToShow">
                <div className="box-folders">{ShowFiles.map((object,key)=>(
                <Folder key={key} title={object.Name} category={object.Category} href={object.href} link={/*GetHrefFromChunk(object.Link)*/ "1234.com"}/>
              ))}</div>
            </div>
            {ErrorPage && <ErrorFile/>}
        </div>
      </div>

      
     

  </div>
      
</userContext.Provider>
  )
}

export default DashBoard;
