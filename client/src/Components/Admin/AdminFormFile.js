import React,{useState,useEffect} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';

const AdminFormFile = ({title,file}) => {
    const [currentFile, setcurrentFile] = useState(file);
    const options = [
        'Animate', 'Storyline', 'Web','Unity'
      ];

    const changeTitle = e =>{
        const {name,value} = e.currentTarget;
        console.log(name + " , "+ value)
          setcurrentFile(prevState => ({
            ...prevState,
            [name]: value
        }));
      }

      const changeDropDown = e =>{
            const {value} = e;
            setcurrentFile(prevState => ({
            ...prevState,
            "categoryFolder": value
        }));
      }


      const postChangeFile = async () =>{
        const action = file !== null ? "update" : "upload";
        const form = document.querySelector("#formAdmin")
        const formData = new FormData(form);
        formData.append("categoryFolder",currentFile.categoryFolder)
        console.log(formData)

        await axios.post(`http://localhost:5000/api/File/${action}File`,formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
         .then((res) => {
           console.log(res.data)

         }).catch((error) => {
           console.log("err")
             console.log(error)
         })
        
     }

  return (
    <div className='Update-File'>
      <>
      <form className='form-login' id="formAdmin">
     <h2>{file != null ? file.titleFolder : ""} {title}</h2>
      
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
         <Dropdown options={options} placeholder="Select an option" id="categoryFolder" name="categoryFolder" value={currentFile != null ? currentFile.categoryFolder : ""}  onChange={(e) =>{changeDropDown(e)}} />
      </div>

      <input type="submit" value='Submit' onClick={(e)=>{
          postChangeFile(e);
          e.preventDefault()
        }}/> 

      </form>

      </>       
</div> 
  )
}

export default AdminFormFile