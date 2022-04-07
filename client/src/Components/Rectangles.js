import React from 'react'

const Rectangles = ({className,color,HeightRectangle,widthRectangle,positionTop,positionRight,rotate}) => {
  return (
    <div className={`${className}-object`} style={{background: color,height: HeightRectangle,width:widthRectangle,top:positionTop, right:positionRight, transform: rotate}}></div>
    )
}

export default Rectangles