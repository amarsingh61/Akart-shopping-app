import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import context from '../context/context';
import addtoCart from '../helper/addtoCart';

const Verticalcard = ({data,loading}) => {
    const {fetchcartproductscount}=useContext(context);


    const handleaddtocart=async(e,id)=>{
        await addtoCart(e,id);
        fetchcartproductscount();
    }


  return (
    <div className='py-4 px-2 relative'>
        {
            loading?(
                <div>loading...</div>
            ):
            (
            <div className='flex flex-wrap w-[93vw] justify-start gap-x-12 gap-y-4 p-5 '>
                {
                    data?.map((product,index)=>(
                        
                    <Link to={`/product-details/${product._id}`} className='bg-white flex flex-col min-w-[20vw] w-[20vw] items-center shadow-lg rounded-lg' key={index}>
                        <div className=' bg-slate-100 p-4 min-w-[20vw] '>
                            <img src={product?.productimage[0]} className='object-scale-down min-h-[25vh] max-h-[25vh] mx-auto mix-blend-multiply rounded-l-lg hover:scale-110 transition-all'></img>
                        </div>
                        <div className='mx-auto flex flex-col items-center justify-between max-w-[13vw] gap-2 p-2'>
                            <h2 className=' text-xl font-semibold line-clamp-1 text-ellipsis text-center w-[18vw]'>{product?.productname}</h2>
                            <p className=' capitalize text-slate-500 text-lg'>{product?.brandname}</p>
                            <div className='flex gap-3'>
                                <p className=' text-red-600 font-semibold'>{product?.sellingprice}</p>
                                <p className=' text-slate-500 line-through'>{product?.price}</p>
                            </div>
                            <button className=' bg-red-700 text-white py-2 px-5 rounded-full hover:bg-red-900 cursor-pointer w-full' onClick={(e)=>handleaddtocart(e,product._id)}>Add to cart</button>
                        </div>
                    </Link>
                    ))
                }
            </div>
        )
    }
        
    </div>
  )
}

export default Verticalcard