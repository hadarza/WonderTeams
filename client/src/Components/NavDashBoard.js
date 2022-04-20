import {React,useContext,useRef,useState,useEffect} from 'react'
import {images} from '../constants'
import {BiSearch} from 'react-icons/bi'
import {AiOutlineDown} from 'react-icons/ai'
import { userContext } from './DashBoard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const NavDashBoard = ({ShowFiles,setShowFiles}) => {
    const navigate = useNavigate();
    const BtnEditMode = useRef(null);
    const UploadingFolders = useRef(null)
    const [searchText, setsearchText] = useState("")
    BtnEditMode.current = "מצב עריכה";

    const {EditMode,setEditMode} = useContext(userContext)
    const [EditText, setEditText] = useState(BtnEditMode.current);

    // toggle edit mode for admin user
    const ToggleEditMode = () =>{
        setEditMode(!EditMode);
        
        if(!EditMode) BtnEditMode.current = "צא ממצב עריכה";
        else BtnEditMode.current = "מצב עריכה"

        setEditText(BtnEditMode.current)
    }
    useEffect(() => {
        if(!EditMode) UploadingFolders.current.style.visibility="hidden";
        else UploadingFolders.current.style.visibility="visible";
    }, [EditMode])
    

    const searchByName = ()=>{
        //search by name file in our DB
        axios.post("http://localhost:5000/api/user/search",{searchText})
        .then((res) => {
            setShowFiles(res.data)
          }).catch((error) => {
            //show error message - your name/password is wrong
            console.log(error);
        })
    }
  return (
    <div className='Nav-DashBoard'>
        <div className='name'>
            <img className='img-profile' src={images.Person} alt="Image-Person"/>
            <h5>{localStorage.getItem('NameUser')}</h5>
            <AiOutlineDown className='down'/>
        </div>
        <div className='search'>
            <input className='input-search' type="text" placeholder='חפש קובץ...'  value={searchText} onChange={(e)=>{setsearchText(e.currentTarget.value)}} />
            <BiSearch className='search-icon' onClick={()=>{searchByName()}}/>
        </div>

        {(localStorage.getItem("isAdmin")) && <button className='editMode' ref={UploadingFolders}>העלאת קבצים נוספים </button>}
        {(localStorage.getItem("isAdmin")) && <button ref={BtnEditMode} className='editMode' onClick={()=>{ToggleEditMode()}}>{EditText} </button>}

        <div className='logos'>
            <img className='WonderTeam_logo' src={images.WonderTeam}/>
            <img className="Hebet_logo" src={images.Hebet}/>
        </div>
    </div>
  )
}

export default NavDashBoard