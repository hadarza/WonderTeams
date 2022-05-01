import React from 'react'
import {images} from '../../constants'
const NotFoundFolder = () => {
  return (
    <div className='notFound-div'>
        <h2>מצטערים, לא קיים קובץ בשם זה</h2>
        <img src={images.notFoundFolders} alt="notFound"/>
    </div>
  )
}

export default NotFoundFolder