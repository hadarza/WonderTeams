import React from 'react'
import {images} from '../constants'
import '../scss/Application.scss'
import {GrContact} from 'react-icons/gr'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {SiBookstack} from 'react-icons/si'
import Rectangles from '../Components/Rectangles'

const AppWrap = (Component, idName) => function HOC() {
  return (
    <div id={idName}>
      <Rectangles className="reactangle" color="purple" widthRectangle="40px" HeightRectangle="800px" positionTop="-5rem" positionRight="5rem" rotate="rotate(150deg)"/>
      <Rectangles className="reactangle" color="yellow" WidthRectangle ="80px" HeightRectangle ="80px" positionTop="38rem" positionRight="7rem" rotate="rotate(50deg)"/>
      <Rectangles className="reactangle" color="pink" widthRectangle ="100px" HeightRectangle ="80px" positionTop="35rem" positionRight="85rem" rotate="rotate(70deg)"/>
      <Rectangles className="reactangle" color="orange" widthRectangle ="100px" HeightRectangle ="80px" positionTop="10rem" positionRight="82rem" rotate="rotate(60deg)"/>

      <div className="login-section">
          <div className='section__Login'>
              <Component/>
          </div>
          <div className='section__info'>
            <img className='login__background' src={images.backgroundLogin} alt="login-background"/>
              <h1>צוותי הפלא! ברוך הבא לאתר הבט</h1>
              <h2 className="useSite">למה משמש האתר?</h2>
              <div className='line'></div>
              <div>
                  <p><BsFillTelephoneFill className='tel-icon icon'/>ליצירת קשר</p>
                  <p> <SiBookstack className='book-icon icon'/>שימוש בתכנים מיחידת הבט</p>
                  <p><GrContact className="chat-icon icon"/>פורום שאלות</p>
              </div>
          </div>
        </div>

        <img className="Hebet_logo" src={images.Hebet}/>
    </div>
  )
}

export default AppWrap