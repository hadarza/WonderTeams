import React,{useState,useEffect,useRef} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {axiosInstance} from '../../config';

const AdminFormFile = ({title,fileInfo}) => {
  const refInputs = useRef([])
  /* check if user enter exist name for file and check the extension of file - muse be PDF */
    const [currentFile, setcurrentFile] = useState(fileInfo);
    const [ErrorExistName, setErrorExistName] = useState(true)
    const [ClassBtnSubmit, setClassBtnSubmit] = useState("btnSubmit not-active")
    const options = [
      'Animate', 'Web'
    ];

    const changeTitle = e =>{
        const {name,value} = e.currentTarget;

        if(name == "titleFolder"){
          // check if there is already a file by this name
          if(value != ""){
            axiosInstance.get(`/File/CheckExist/${value}`)
              .then((res) => {
                if(res.data == true){
                  setErrorExistName(true)// don't let user to send the data - alert "file name is exist"
                }else setErrorExistName(false)
              }).catch((error) => {
                  console.log(error)
              })
          }
        }
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

      const isAllFieldFull = ()=>{
        return currentFile.titleFolder != "" && currentFile.hrefFolder != "" && currentFile.categoryFolder != "" && currentFile.Link != ""
      }

      // check if all field are full
      useEffect(() => {
        if(currentFile != null){
            if(isAllFieldFull() && !ErrorExistName) setClassBtnSubmit("btnSubmit")
        else setClassBtnSubmit("btnSubmit not-active")
        }
      }, [currentFile.titleFolder, currentFile.categoryFolder,currentFile.hrefFolder,currentFile.file,ErrorExistName])
      
      // at post file 
      const postChangeFile = async () =>{
        const action = fileInfo.titleFolder !== "" ? "update" : "upload";
        const form = document.querySelector("#formAdmin")
        const formData = new FormData(form);
        formData.append("categoryFolder",currentFile.categoryFolder)
        await axiosInstance.post(`/File/${action}File`,formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
         .then((res) => {
           console.log(res.data)
         }).catch((error) => {
             console.log(error)
         })
     }

  return (
    <div className='Update-File'>
      <form className='form-login' id="formAdmin">
      <h2>{fileInfo != null ? fileInfo.titleFolder : ""} {title}</h2>
        
        <div className='sectionName'>
            <label>שם הקובץ</label>
            <input id="input-name" name="titleFolder" ref={el => refInputs.current[0] = el} value={currentFile.titleFolder} onChange={(e)=>changeTitle(e)} />
        </div>

          <div className='sectionNewfile'>
              <label htmlFor="file" className='custom-file label'>בחר קובץ חדש</label>
              <input type="file" name="file" accept='application/pdf' id="file"  ref={el => refInputs.current[1] = el} className='custom-file-input' onChange={(e)=>{changeTitle(e)}}/>
          </div>  

          <div className='sectionLink'>
            <label> קובץ לינק</label>
            <input id="input-link" name="hrefFolder" ref={el => refInputs.current[2] = el} value={currentFile.hrefFolder} onChange={(e)=>changeTitle(e)} />
          </div>  

        <div className='sectionCategory'>
          <label>החלפת קטגורייה</label>
          <Dropdown options={options} placeholder="Select an option" id="categoryFolder" name="categoryFolder" ref={el => refInputs.current[3] = el} value={currentFile.categoryFolder}  onChange={(e) =>{changeDropDown(e)}} />
        </div>
          {ErrorExistName && <p>החלף שם לקובץ. קובץ בשם זה קיים</p>}
          <input className={ClassBtnSubmit} type="submit" value="צור קובץ" onClick={(e)=>{

            if(isAllFieldFull() && !ErrorExistName){
              postChangeFile(e);
              e.preventDefault()
            }
          }}/> 
        </form>
  </div> 
  )
}

export default AdminFormFile