import react,{useEffect,useContext} from 'react'
import './scss/Application.scss'
import WebFont from 'webfontloader';
import DashBoard from './Components/DashBoard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import UserDetailsProvider from '../src/UserDetailsProvide'
import ArraysString from './Components/Animate/ArraysString';
import AdminChanges from './Components/AdminChanges'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import './Components/Animate/monkai.css'
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
        <Route exact path='/AdminAddFiles' element={<AdminChanges/>}/>

        <Route exact path='/ArraysString' element={<ArraysString/>}/>
        
      </Routes>
    </UserDetailsProvider>

    </>
  );
}

export default App;
