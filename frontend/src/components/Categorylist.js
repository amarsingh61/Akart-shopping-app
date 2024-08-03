import React, { useEffect, useState } from 'react'
import summaryApi from "../helper/summaryApi";
import {Link} from "react-router-dom";

const Categorylist = () => {

    const [productcategory,setproductcategory]=useState([]);
    const [loading,setloading]=useState(false);

    const fetchcategories=async()=>{
        setloading(true);
        const fetchdata=await fetch(summaryApi.productcategories.url);
        const responsedata=await fetchdata.json();
        setloading(false);
        setproductcategory(responsedata.data);
    }

    //console.log(productcategory);
    useEffect(()=>{
        fetchcategories()
    },[]);

  return (
    <div className='flex justify-between gap-4 p-2'>
        {
            loading?(
                <div>
                </div>
            )
            :
            (
                productcategory.map((category,index)=>(
                    <Link to={`/category/${category?.category}`} key={index} >
                        <div className='rounded-full h-20 w-20 bg-slate-400 bg-opacity-65 flex justify-center items-center overflow-hidden p-4'>
                            <img src={category?.productimage[0]} className='h-14 w-full mix-blend-multiply object-scale-down hover:scale-125 transition-all'></img>
                        </div>
                        <p className=' text-center capitalize'>{category?.category}</p>
                    </Link>
                ))
            )
        }
    </div>
  )
}

export default Categorylist