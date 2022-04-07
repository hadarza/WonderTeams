import React,{useContext,useRef} from 'react'
import {useForm} from 'react-hook-form'
import TitleAndInfoForm from './TitleAndInfoForm'
import {userContext} from './DashBoard'

import Xbtn from './Xbtn'

const ErrorFile = () => {
    const FormRef = useRef(null);

    const {ErrorPage,setErrorPage} = useContext(userContext)
    const {register,handleSubmit, formState:{errors}} = useForm({defaultValues:{
        firstName: '',
        Phone:'',
        MessageUser:''
    }})
  return (
    <div className='error-Form' ref={FormRef} >
        <button className='btn-container' onClick={()=>{
                setErrorPage(false);
                console.log(FormRef.current)
                FormRef.current.className.add("hide")
        }}>
            <Xbtn/>
        </button>

        <form className='form' onSubmit={handleSubmit((data)=>{
            console.log(data)
        })}>
            <div className='Form__section__login'>
            <TitleAndInfoForm 
                title="דיווח על תקלה"
                info="דווח על תקלה - בין אם טעות כתיבה או חוסר הצלחה בפתיחת קבצים"
            />
            
                <div className='section-name'>
                    <div className='LabelDiv'>
                        <label>שם מלא<span className='red'>*</span></label>
                    </div>
                    <input {...register("firstName",{required:'חובה להכניס שם מלא'})} name="firstName" placeholder="שם משתמש"/>
                </div>

                <div className='section-phone'>
                    <div className='LabelDiv'>
                        <label>טלפון<span className='*'>*</span></label>
                    </div>
                    <input type="number" {...register("Phone" ,{valueAsNumber: true, required:'חייב להכניס מס טלפון',minLength:{value:20, message:'הודעה באורכה חייבת להכיל 20 תווים'}})} name="Phone" placeholder="מס טלפון"/>
                </div>


                <div className='section-message'>
                    <div className='LabelDiv'>
                        <label>הודעה<span className='red'>*</span></label>
                    </div>
                    <textarea {...register("MessageUser",{required:'חובה להכניס הודעה ' , minLength:{value:20, message:'הודעה באורכה חייבת להכיל 20 תווים'}})} name="MessageUser" placeholder="הכנס טקסט.."></textarea>
                </div>    
            </div>
            <div className='errorSection'>
                <p className='errorMsg'>{errors.firstName?.message}</p>
                <p className='errorMsg'>{errors.Phone?.message}</p>
                <p className='errorMsg'>{errors.MessageUser?.message}</p>
            </div>
         

            <input className="btnSubmit" type="submit" value="שלח הודעה"/>

        </form>
    </div>
  )
}

export default ErrorFile