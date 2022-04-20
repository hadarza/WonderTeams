import React from 'react'
import {BiTime} from 'react-icons/bi'
const TitleBlog = ({title,writer,time}) => {
    return (
      <div className='Header-Blog'>
          <h1>{title}</h1>
          <div className='info-header'>
            <span>מאת: {writer}</span>
            <span>{time}<BiTime className='time-icon'/></span>
          </div>
      </div>
    )}  

export default TitleBlog