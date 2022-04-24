import React,{useState} from 'react'
import axios from 'axios'
import { BsFolder } from 'react-icons/bs';

const FilterFolders = ({ShowFiles,setShowFiles}) => {
    const [activeSubject, setactiveSubject] = useState('Animate');
    
    const ShowOnlyCategory = (category) =>{
        axios.get(`http://localhost:5000/api/DashBoard/${category}`)
        .then((res) => {
            console.log(res.data)
            setShowFiles(res.data)
          }).catch((error) => {
            console.log(error);
        })
    }

    return (
    <div className="navbar-folders">
        {['Animate','Web'].map((item)=>(
            <div className={`Btn-ShowFolder ${activeSubject === item ? 'active': ''}`} onClick={()=>{
            setactiveSubject(item)
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