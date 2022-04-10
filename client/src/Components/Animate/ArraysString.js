import {React,useState,useRef} from 'react'
import InputObject from '../ArraysObject/InputObject';
import Object from '../ArraysObject/Object'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import '../Animate/monkai.css'


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

    const [code, setCode] = useState('const code = "const a = 0;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');


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
        <h2>Array And Lists - Animate</h2>
        
        <div className='sections-div'>
            <div className='code-section'>
            <div>בנה מערך בגודל 4, הכנס לו 4 ערכים והדפס אותו </div>
            <CodeMirror
                value={code}
                options={{
                    theme: 'monokai',
                    keyMap: 'sublime',
                    mode: 'jsx',
                }}
                />
            </div>

            <div className='array-section'>
                <div className='h3-array-object'>
                <h4 className='h4-Array'>[</h4>
                        <InputObject className='input-array-game' Index1Ref={Index1Ref} changeArray={changeArray} ArrayObjects={ArrayObjects} index="3"/>
                        <InputObject className='input-array-game' Index1Ref={Index1Ref} changeArray={changeArray} ArrayObjects={ArrayObjects} index="2"/>
                        <InputObject className='input-array-game' Index1Ref={Index1Ref} changeArray={changeArray} ArrayObjects={ArrayObjects} index="1"/>
                        <InputObject className='input-array-game' Index1Ref={Index1Ref} changeArray={changeArray} ArrayObjects={ArrayObjects} index="0"/>
                        <h4 className='h4-Array'>] = var myArray</h4>
                </div>
                <div className='arrayObjects'>
                    {ArrayObjects.map((object,index)=>( <Object key={index} name={object.name} index={3-index}/>))}
                </div>
        </div>
      
        </div>
    </div>
  )
}

export default ArraysString