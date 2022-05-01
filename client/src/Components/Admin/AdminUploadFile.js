import React from 'react'
import AdminFormFile from './AdminFormFile'

const AdminUploadFile = () => {
  return (
    <AdminFormFile
    title="יצירת קובץ חדש"
    fileInfo= {{
      titleFolder : "",
      categoryFolder : "Animate", // default category
      hrefFolder : "",
      file: ""
    }}
   />
  )
}

export default AdminUploadFile