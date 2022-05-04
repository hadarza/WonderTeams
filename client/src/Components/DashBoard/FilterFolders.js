import React from 'react'
import { BsFolder } from 'react-icons/bs';
import { useSelector,useDispatch } from 'react-redux';
import {setActiveSubject,getActiveSubject} from '../../Redux/features/DashBoard/DashBoardSlice'

const FilterFolders = ({ShowOnlyCategory}) => {
    const activeSubject = useSelector(getActiveSubject)
    const dispatch = useDispatch()
    
    return (
    <div className="navbar-folders">
        {['Animate','Web'].map((item)=>(
            <div className={`Btn-ShowFolder ${activeSubject === item ? 'active': ''}`} onClick={()=>{
            dispatch(setActiveSubject(item))
            // request show only the active subject axios.get
            ShowOnlyCategory(item);
            }}>
                <li className="p-text flex li_filter" key={`link-${item}`}>
                    <a href={`#${item}`}>{item}</a>
                </li>
                <BsFolder/>
            </div>
        ))}
    </div>
  )
}

export default FilterFolders