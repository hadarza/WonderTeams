import react,{useEffect} from 'react'
import './scss/Application.scss'
import WebFont from 'webfontloader';
import DashBoard from './Components/DashBoard/DashBoard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './Components/Register/RegisterForm';
import LoginForm from './Components/Login/LoginForm';
import UserDetailsProvider from '../src/UserDetailsProvide'
import ArraysString from './Components/Animate/ArraysString';
import AdminUpdateFile from './Components/Admin/AdminUpdateFile';
import AdminUploadFile from './Components/Admin/AdminUploadFile';import 'codemirror/keymap/sublime';
import './Components/Animate/monkai.css'
import BlogArrays from './Components/Animate/StringsArrays/BlogArrays';
import FuncCreating from './Components/Animate/FuncCreating/FuncCreating';

import {Data} from './Components/Animate/StringsArrays/ArrayDB'
function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Noto Sans Hebrew', 'sans-serif', 'Smooch Sans']
      }
    });
   }, []);

  return (
   <>
    <UserDetailsProvider>
      <Routes>
        <Route exact path='/' element={<LoginForm/>}/>
        <Route exact path='/Register' element={<RegisterForm/>}/>
        <Route exact path='/DashBoard' element={<DashBoard/>}/>
        <Route exact path='/AdminUpdateFile' element={<AdminUpdateFile/>}/>
        <Route exact path='/AdminUploadFile' element={<AdminUploadFile/>}/>
        <Route exact path='/ArraysString' element={<ArraysString/>}/>
        <Route exact path='/BlogArrays' element={<BlogArrays i={0} j={3} steps={3}/>}/>
        <Route exact path='/Func' element={<FuncCreating i={0} j={3} steps={3}/>}/>

        
      </Routes>
    </UserDetailsProvider>

    </>
  );
}

export default App;
