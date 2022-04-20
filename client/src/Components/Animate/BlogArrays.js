import React,{useState,useRef,useEffect} from 'react'
import TitleBlog from '../Blog/TitleBlog'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Interweave } from 'interweave';
import {MdContentCopy} from 'react-icons/md'
import { images } from '../../constants';
import {Data} from '../Animate/ArrayDB'
const BlogArrays = ({i,j,steps,max}) => {
    const [Indexs, setIndex] = useState({StartIndex:i,EndIndex: j})
    const nextBtn = useRef(null);
    const prevBtn = useRef(null);

    useEffect(() => {
      //show/hide prev/next btns according to indexs
      if(Indexs.StartIndex == 0){
        nextBtn.current.classList.remove("hidden")
        prevBtn.current.classList.add("hidden")

      }
      console.log(Indexs)
      if(Indexs.EndIndex == max){
          // if we pass the max indexs
          nextBtn.current.classList.add("hidden")
          prevBtn.current.classList.remove("hidden")


      }
    }, [Indexs])
    
  return (
      <div className='section-Blog'>
        <TitleBlog title={Data.title} writer={Data.writer} time="12/4/2022"/>
            <div className='info'>
                {Data.Intro.slice(Indexs.StartIndex,Indexs.EndIndex).map((object,index)=>(
                <div className='section-blog' key={index}>
                    <h2>{object.Main}</h2>
                    <p>{object.Info}</p>
                    <div className='code-section' dir='ltr'>
                        <Interweave content={object.code}/>

                        <CopyToClipboard text={object.ActualData}>
                            <MdContentCopy className='copy-btn' onClick={()=>{
                                document.getElementById(`object-${index}`).classList.remove("hidden");
                                document.getElementById(`object-${index}`).classList.add("show");
                                setTimeout(() => {
                                    document.getElementById(`object-${index}`).classList.add("hidden");
                                    document.getElementById(`object-${index}`).classList.remove("show");
                                }, 800)
                            }}/>
                        </CopyToClipboard>


                        <span className='copy-indication hidden' id={`object-${index}` }>הועתק!</span>
                    </div>
                </div>
            ))}
            <img src={images.next} className="next-btn" ref={nextBtn} onClick={()=>{
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIndex({StartIndex: Indexs.StartIndex+steps, EndIndex:Indexs.EndIndex+steps})}}/>
             <img src={images.previous} className="prev-btn" ref={prevBtn} onClick={()=>{
                 window.scrollTo({ top: 0, behavior: 'smooth' });
                setIndex({StartIndex: Indexs.StartIndex-steps, EndIndex:Indexs.EndIndex-steps})}}/>
        </div>
    </div>
  )}

export default BlogArrays