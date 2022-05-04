import React,{useEffect,useState,useMemo,useContext, createContext} from 'react'
import Folder from './Folder'
import ErrorFile from '../ReportErrors/ErrorFile';
import axios from 'axios'
import NavDashBoard from './NavDashBoard';
import Profile from './Profile'
import FilterFolders from './FilterFolders';
import NotFoundFolder from '../NotFoundFolders/NotFoundFolder'
import { useSelector,useDispatch } from 'react-redux';
import {getListFolders} from '../../../src/Redux/features/DashBoard/DashBoardSlice'
export const userContext = createContext();


const DashBoard = () => {
  const ListsFolders = useSelector(getListFolders)

  const [ShowFiles,setShowFiles]=useState([]);  
  const [ErrorPage, setErrorPage] = useState(false)
    const SetInfo = () =>{
      axios.get("http://localhost:5000/api/DashBoard/")
      .then((res) => {
          setShowFiles(res.data)
        }).catch((error) => {
          console.log(error);
      })
  }

  const ShowOnlyCategory = (category) =>{
    axios.get(`http://localhost:5000/api/DashBoard/${category}`)
    .then((res) => {
        setShowFiles(res.data)
      }).catch((error) => {
        console.log(error);
    })
  }

    useEffect(()=>{
      SetInfo();
    },[])
        
  return (
    <userContext.Provider value = {{ErrorPage,setErrorPage,ShowFiles,setShowFiles,ShowOnlyCategory,SetInfo}}>
      <div className='App_army'>  

      <div className='filter_section'>
        <Profile/>
        <FilterFolders ShowOnlyCategory={ShowOnlyCategory}/>
      </div>

      <div className='dashBoard_section'>
        <NavDashBoard ShowFiles={ShowFiles} setShowFiles={setShowFiles} />
        <div className='dashboard'>
            <div className="folders-ToShow">
                <div className="box-folders">
                  {ShowFiles.length == 0 && <NotFoundFolder/>}
                  {ShowFiles.map((object,key)=>(
                    <Folder key={key} title={object.Name} category={object.Category} href={object.href} link={object.Link}/>
                  ))}
                </div>
            </div>
            {ErrorPage && <ErrorFile/>}
        </div>
      </div>
  </div>
      
</userContext.Provider>
  )
}

export default DashBoard;
