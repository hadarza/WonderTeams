import React,{useEffect,useState,useMemo,useContext, createContext} from 'react'
import {BsFolder,BsFolder2Open} from 'react-icons/bs'
import Folder from '../Components/Folder'
import ErrorFile from './ErrorFile';
import {images} from '../constants/'
import axios from 'axios'
import NavDashBoard from './NavDashBoard';
import {AiOutlineEdit} from 'react-icons/ai'

export const userContext = createContext();

const DashBoard = () => {
    const [EditMode, setEditMode] = useState(false)
    const [activeSubject, setactiveSubject] = useState('Animate');
    const [data,setData]=useState([]);
    const [ShowFiles,setShowFiles]=useState([]);
    const [HrefLists,setHrefLists] = useState([images.TryPPTX,images.TryPPTX]) // list of href
    
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
          //show error message - your name/password is wrong
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
      SetInfo();
      getData();
    },[])
    
    const value = useMemo(()=>([ErrorPage,setErrorPage,EditMode,setEditMode]),[ErrorPage,EditMode])

  return (
    <userContext.Provider value = {{ErrorPage,setErrorPage,EditMode,setEditMode}}>
      <>
      <NavDashBoard ShowFiles={ShowFiles} setShowFiles={setShowFiles} />
      <div className='dashboard'>
          <div className="navbar-folders">

              {['Animate','Web'].map((item)=>(
                  
                  <div className={`Btn-ShowFolder ${activeSubject === item ? 'active': ''}`} onClick={()=>{
                    setactiveSubject(item)
                    // request show only the active subject axios.get
                    ShowOnlyCategory(item);
                  }}>
                      <li className="p-text flex" key={`link-${item}`}>
                          <a href={`#${item}`}>{item}</a>
                      </li>
                      <BsFolder/>
                  </div>
              ))}
          </div>

          <div className="folders-ToShow">
              <div className="box-folders">{ShowFiles.map((object,key)=>(<Folder key={key} title={object.Name} category={object.category} href={object.href} link={object.link}/>))}</div>

          </div>
          {ErrorPage && <ErrorFile/>}
  </div>
  </>
      
</userContext.Provider>
  )
}

export default DashBoard;
