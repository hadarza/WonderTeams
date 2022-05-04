import {React,useRef} from 'react'

const InputObject = ({Index1Ref,changeArray,ArrayObjects,index}) => {

  return (
    <div className='inputObject'>
        <span className='span-input'>{index}</span>
        <input className='input-array-game' ref={Index1Ref} onChange={(e)=>{changeArray(index,e.currentTarget.value)}} value={ArrayObjects[index].name}/>
    </div>
    )
}

export default InputObject