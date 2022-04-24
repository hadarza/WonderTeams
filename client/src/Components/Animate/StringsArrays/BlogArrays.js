import React from 'react'
import {Data} from './ArrayDB'
import BlogClipBoard from '../BlogClipBoard/BlogClipBoard';
const BlogArrays = ({i,j,steps}) => {
  return (
      <BlogClipBoard i={i} j={j} steps={steps} max={Data.Intro.length} Data={Data}/>
  )
}

export default BlogArrays