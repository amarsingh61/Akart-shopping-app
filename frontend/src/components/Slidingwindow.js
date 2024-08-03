
import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const Slidingwindow = () => {

    const desktopimages=[image5,image2,image3,image1,image4];
    const[currentimage,setcurrentimage]=useState(0);

    const preveimage=()=>{
        if(currentimage>0)
            setcurrentimage(currentimage-1);
        else
            setcurrentimage(desktopimages.length-1);
    }

    const nextimage=()=>{
        if(currentimage<desktopimages.length-1)
            setcurrentimage(currentimage+1);
        else    
            setcurrentimage(0);
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
            if(currentimage<desktopimages.length-1)
                nextimage();
            else
                setcurrentimage(0);
        },7000);

        return ()=>clearInterval(interval);
    },[currentimage]);

  return (
    <div className='container mx-auto w-full relative overflow-hidden'>
        <div className='h-[71vh] w-full relative'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full p-3 text-2xl'>
                        <button onClick={preveimage} className='bg-white shadow-md  bg-opacity-40 rounded-full p-4'><FaAngleLeft/></button>
                        <button onClick={nextimage} className='bg-white shadow-md  bg-opacity-40 rounded-full p-4'><FaAngleRight/></button> 
                    </div>
                </div>
            <div className='h-full w-full flex transition-transform duration-700' style={{ transform:`translateX(-${currentimage*100}%)`}}>
            {
                desktopimages.map((image,index)=>(
                <div className='h-full w-full flex flex-shrink-0' key={index}>
                    <img src={image} key={index} className='h-[71vh] object-cover  translate-y-[${*100%}]' />
                </div>
                ))
            }
            </div>
        </div>
        
        
    </div>
  )
}

export default Slidingwindow