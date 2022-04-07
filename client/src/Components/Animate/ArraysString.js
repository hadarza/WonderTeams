import {React,useState,useRef} from 'react'
import InputObject from '../ArraysObject/InputObject';
import Object from '../ArraysObject/Object'
const ArraysString = () => {
    const Index1Ref = useRef(null);

    const [ArrayObjects, setArrayObjects] = useState([
        {
            name:"איבר רביעי",
            color:"FF9999"
        },{
            name:"איבר שלישי",
            color:"FFFFCC"
        },{
            name:"איבר שני",
            color:"E5FFCC"
        },{
            name:"איבר ראשון",
            color:"3399FF"
        }
    ])


    const changeArray = (index,newValue) =>{
        console.log(newValue)
        
        let items = [...ArrayObjects];
        // 2. Make a shallow copy of the item you want to mutate
        // 3. Replace the property you're intested in
        console.log(ArrayObjects[0].name)
        console.log(Index1Ref.current)
        let item = {
            ...ArrayObjects[index],
            name: newValue
        }
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[index] = item;
        // 5. Set the state to our new copy
        setArrayObjects(items);
        console.log(items)
    }
  return (
      <div className='ArrayGame'>
        <h3 className='h3-array-object'>
            [
                <InputObject className='input-array-game' Index1Ref={Index1Ref} changeArray={changeArray} ArrayObjects={ArrayObjects} index="3"/>
                <InputObject className='input-array-game' Index1Ref={Index1Ref} changeArray={changeArray} ArrayObjects={ArrayObjects} index="2"/>
                <InputObject className='input-array-game' Index1Ref={Index1Ref} changeArray={changeArray} ArrayObjects={ArrayObjects} index="1"/>
                <InputObject className='input-array-game' Index1Ref={Index1Ref} changeArray={changeArray} ArrayObjects={ArrayObjects} index="0"/>

          ] = var myArray 
    </h3>
        <div className='arrayObjects'>
            {ArrayObjects.map((object,index)=>( <Object key={index} name={object.name} index={3-index}/>))}
        </div>
      </div>
  )
}

export default ArraysString