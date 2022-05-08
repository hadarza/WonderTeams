import React,{useEffect,useState} from 'react'
import Folder from './Folder'
import ErrorFile from '../ReportErrors/ErrorFile';
import NavDashBoard from './NavDashBoard';
import Profile from './Profile'
import FilterFolders from './FilterFolders';
import NotFoundFolder from '../NotFoundFolders/NotFoundFolder'
import { useSelector,useDispatch } from 'react-redux';
import {getListFolders,getstatusFolders,fetchFolders} from '../../../src/Redux/features/DashBoard/DashBoardSlice'


const DashBoard = () => {
  const dispatch = useDispatch()
  const ListsFolders = useSelector(getListFolders)
  const statusFolders = useSelector(getstatusFolders)
  const [ErrorPage, setErrorPage] = useState(false)
  
    useEffect(()=>{
      if(statusFolders == "idle")
        dispatch(fetchFolders())
    },[statusFolders,dispatch])
        
  return (
      <div className='App_army'>  

      <div className='filter_section'>
        <Profile/>
        <FilterFolders/>
      </div>

      <div className='dashBoard_section'>
        <NavDashBoard />
        <div className='dashboard'>
            <div className="folders-ToShow">
                <div className="box-folders">
                  {ListsFolders.length == 0 && <NotFoundFolder/>}
                  {ListsFolders.map((object,key)=>(
                    <Folder key={key} title={object.Name} category={object.Category} href={object.href} link={object.Link}/>
                  ))}
                </div>
            </div>
            {ErrorPage && <ErrorFile/>}
        </div>
      </div>
  </div>
)
}

export default DashBoard;
