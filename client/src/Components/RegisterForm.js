import React,{useState,useEffect,useContext} from 'react'
import {useForm} from 'react-hook-form'
import TitleAndInfoForm from './TitleAndInfoForm'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {AppWrap} from '../wrapper/index'
import { userDetailsContext } from '../UserDetailsProvide';

const RegisterForm = () => {

    const [userDetails, setUserDetails] = useContext(userDetailsContext);
    const [ShowErrorLogin, setShowErrorLogin] = useState(false)
    const [IsLogIn,setIsLogIn] = useState(false);
    const navigate = useNavigate();
    const {register,handleSubmit, formState:{errors}} = useForm({defaultValues:{
        Name: '',
        Password:'',
        Unit:'',
        isAdmin: false
    }})
    const [sentSuccess,setSentSuccess] = useState(false);


    const sendRegisterPostRequest = (Sendingdata) =>{
         axios.post("http://localhost:5000/api/user/register",{Sendingdata})
        .then(res => { 
            setShowErrorLogin(false)
        })
        .catch(error => {
            setShowErrorLogin(true);
            console.log(ShowErrorLogin)
        });
    }

    
useEffect(() => {
    localStorage.setItem('NameUser', userDetails.Name);
    localStorage.setItem('isAdmin', userDetails.isAdmin);
    setTimeout(() => {
        if (sentSuccess) {
            navigate("/DashBoard")
           }
     }, 1)
})


  return (
    <>
    <TitleAndInfoForm 
        title="הרשמה"
        info="כבר רשום? התחבר!"
        href="http://localhost:3000/"
    />
    <form className='form-login' onSubmit={handleSubmit((data) => {
        sendRegisterPostRequest(data);
        }
        )}>
        <div className='Form__section__login'>
            <div className='section-name'>
                <div className='LabelDiv'>
                    <label>שם הצוות</label>
                </div>
                <input {...register("Name",{required:'חובה להכניס שם משתמש'})} name="Name" placeholder="שם משתמש"/>
            </div>
            <div className='section-password'>
                <div className='LabelDiv'>
                    <label>סיסמה</label>
                </div>
                <input {...register("Password",{required:'חובה להכניס סיסמה' , minLength:{value:6, message:'הסיסמה חייבת להכיל מעל 6 אותיות'}})} name="Password" placeholder="סיסמה"/>
            </div>    
        </div>

        <div className='section-password'>
            <div className='LabelDiv'>
                <label>שם הצוות</label>
            </div>
            <input {...register("Unit",{required:'חובה להכניס את שם היחידה '})} name="Unit" placeholder="יחידה"/>
        </div>
        <div className='errorSection'>
            <p className='errorMsg'>{errors.Name?.message}</p>
            <p className='errorMsg'>{errors.Password?.message}</p>
            <p className='errorMsg'>{errors.Unit?.message}</p>
            {ShowErrorLogin && <p>לצערנו כבר קיים שם משתמש בשם זה, בחר שם אחר</p>}
        </div>
        <input className="btnSubmit" type="submit" value="התחבר"/>

    </form>
    </>
  )
}

export default AppWrap(RegisterForm,'registerForm')