import React,{useState,useEffect} from 'react'
import Dropdown from 'react-dropdown';
import Folder from './Folder';
import {useLocation} from 'react-router-dom';
import 'react-dropdown/style.css';

const AdminChanges = () => {
  const [currentFile, setcurrentFile] = useState(null);
  const location = useLocation();

    const options = [
        'Animate', 'Storyline', 'Web','Unity'
      ];
      const defaultOption = options[0];
      

      const changeTitle = e =>{
        const {name,value} = e.currentTarget;
        setcurrentFile(prevState => ({
          ...prevState,
          [name]: value
      }));

      }
      useEffect(() => {
        setcurrentFile(location.state.file)
      }, [])


      
  return (
    <div className='Update-File'>
      {console.log(currentFile)}
    <form action="/upload" method="POST">
        <h2> {location.state.file.titleFolder}  שינויים בקובץ </h2>
        
        <div className='sectionName'>
            <label>שם הקובץ</label>


            <input id="input-name" name="titleFolder" value={currentFile !== null ? currentFile.titleFolder : ""} onChange={changeTitle} />
        </div>

        <div className='sectionNewfile'>
            <label for="file" className='custom-file label'>בחר קובץ חדש</label>
            <input type="file" name="file" id="file" className='custom-file-input' />
        </div>        

        <div className='sectionCategory'>
           <label>החלפת קטגורייה</label>
           <Dropdown options={options} placeholder="Select an option" value={currentFile !== null ? currentFile.categoryFolder : ""}  onChange={changeTitle} />

        </div>
        
        <input type="submit" value='Submit'/>
    </form>
  </div>
  )
}

export default AdminChanges