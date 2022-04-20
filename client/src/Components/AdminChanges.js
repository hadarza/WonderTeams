import React,{useState,useEffect} from 'react'
import Dropdown from 'react-dropdown';
import Folder from './Folder';
import {useLocation} from 'react-router-dom';
import 'react-dropdown/style.css';
import axios from 'axios';

const AdminChanges = (file) => {
  const location = useLocation();
  const [currentFile, setcurrentFile] = useState(location.state.file);
    const options = [
        'Animate', 'Storyline', 'Web','Unity'
      ];
      const defaultOption = options[0];


      const changeTitle = e =>{
        const {name,value} = e.currentTarget;
        console.log(name + " "+ value)
          setcurrentFile(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(currentFile)

      }

      const changeDropDown = e =>{
        const {value,label} = e;
         setcurrentFile(prevState => ({
           ...prevState,
           "categoryFolder": value
     }));
     console.log(currentFile)
      }

      useEffect(() => {
          setcurrentFile(location.state.file);
      }, [])


      const postChangeFile = async () =>{
      
        await axios.post("http://localhost:5000/api/user/upload",{currentFile})
         .then((res) => {
           console.log("success")
           console.log(res.data)

         }).catch((error) => {
             console.log(error.message)
         })
     }
     
  return (
    <div className='Update-File'>
     {( currentFile != null ) && (
        <>
      <form className='form-login'>
       <h2> {currentFile.titleFolder}  שינויים בקובץ </h2>
        
        <div className='sectionName'>
            <label>שם הקובץ</label>
            <input id="input-name" name="titleFolder" value={currentFile !== null ? currentFile.titleFolder : ""} onChange={(e)=>changeTitle(e)} />
        </div>

          <div className='sectionNewfile'>
              <label for="file" className='custom-file label'>בחר קובץ חדש</label>
              <input type="file" name="file" id="file" className='custom-file-input' onChange={(e)=>{changeTitle(e)}}/>
          </div>  

        <div className='sectionCategory'>
           <label>החלפת קטגורייה</label>
           <Dropdown options={options} placeholder="Select an option"  name="categoryFolder" value={currentFile.categoryFolder}  onChange={(e) =>{changeDropDown(e)}} />
        </div>
        <input type="submit" value='Submit' onClick={(e)=>{
                postChangeFile();
                e.preventDefault()
              }}/>
      
        </form>
        </>
      )}
       
  </div> 
      
  )
}

export default AdminChanges