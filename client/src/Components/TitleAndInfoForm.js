import React from 'react'

const TitleAndInfoForm = ({title,info,href}) => {
  return (
      <>
        <h1 className='login-title'>{title}</h1>
        <a className='h5-info-form' href={`${href}`}>{info}</a>
    </>
  )
}

export default TitleAndInfoForm