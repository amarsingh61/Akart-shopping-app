import React from 'react';
import { IoMdClose } from "react-icons/io";


const Fullscreenimage = ({setopenimage,imageurl}) => {
  return (
    <div className=''>
        <div className=' w-2/3 top-10 left-0 right-0 bottom-10 absolute mx-auto flex flex-col bg-slate-600'>
            <div className='text-4xl absolute hover:cursor-pointer text-white rounded-full hover:bg-opacity-40 right-0 bg-red-500 bg-opacity-50'>
                    <IoMdClose  onClick={()=>setopenimage(false)}/>
            </div>
            <img src={imageurl} className=' w-full h-full'></img> 
        </div>
    </div>
  )
}

export default Fullscreenimage