import React from 'react'
import AdminFormFile from './AdminFormFile'
import {useLocation} from 'react-router-dom';

const AdminUpdateFile = () => {
    const location = useLocation();
  return (
    <AdminFormFile
     title="עדכון קובץ קיים"
     file= {location.state.file}
    />
  )
}

export default AdminUpdateFile