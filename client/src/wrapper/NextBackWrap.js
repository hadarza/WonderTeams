import React from 'react'
import images from '../constants/images'

const NextBackWrap = () => {
  return (
    <div className='nextBackArrows'>
      {images.prvious}
      {images.next}
      </div>
  )
}

export default NextBackWrap