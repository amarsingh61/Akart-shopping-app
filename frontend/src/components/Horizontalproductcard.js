import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import fetchcategoryproduct from '../helper/fetchcategoryproduct';
import { Link } from 'react-router-dom';
import addtoCart from '../helper/addtoCart';
import context from '../context/context';

const Horizontalproductcard = ({category,heading}) => {

    const [data,setdata]=useState([]);
    const [loading,setloading]=useState(false);
    const scrollelement=useRef();
    const {fetchcartproductscount}=useContext(context);

    const fetchdata=async()=>{
        setloading(true);
        const categoryproduct=await fetchcategoryproduct(category);
        setloading(false);
        //console.log(categoryproduct);
        setdata(categoryproduct?.data);
    }
    

    useEffect(()=>{
        fetchdata();
    },[])

    const scrollLeft=()=>{
        scrollelement.current.scrollLeft-=300;
    }

    const scrollRight=()=>{
        scrollelement.current.scrollLeft+=300;
    }

    const handleaddtocart=async(e,id)=>{
        await addtoCart(e,id);
        fetchcartproductscount();
    }

  return (
    <div className='py-4 px-2 relative'>
         <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        {
            loading?(
                <div className='flex items-center gap-4  p-5 overflow-x-scroll scrollbar-none Scroll' ref={scrollelement}>
                <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block z-10 transition-all duration-500' onClick={scrollLeft}><FaAngleLeft/></button>
                <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block z-10' onClick={scrollRight}><FaAngleRight/></button> 

                {
                    data?.map((product,index)=>(
                    <Link to={`/product-details/${product?._id}`} className='bg-white flex min-w-[25vw] w-[25vw] items-center shadow-lg rounded-lg' key={index}>
                        <div className=' bg-slate-200 p-4 min-w-[12vw] h-full animate-pulse min-h-[25vh] max-h-[25vh]'>
                        </div>
                        <div className='mx-auto flex flex-col items-center justify-between max-w-[13vw] gap-2 p-2'>
                            <h2 className=' text-xl font-semibold line-clamp-2 text-ellipsis text-center w-[12vw] h-5 bg-slate-200 animate-pulse'></h2>
                            <p className=' capitalize text-slate-500 text-lg h-5 bg-slate-200 w-[12vw] animate-pulse'></p>
                            <div className='flex gap-3'>
                                <p className=' text-red-600 font-semibold h-5 bg-slate-200 w-[5vw] animate-pulse'></p>
                                <p className=' text-slate-500 line-through h-5 bg-slate-200 w-[5vw] animate-pulse'></p>
                            </div>
                            <button className=' bg-slate-200 text-white py-2 px-5 rounded-md w-[12vw] animate-pulse h-7'></button>
                        </div>
                    </Link>
                    ))
                }
            </div>
            ):
            (
            <div className='flex items-center gap-4  p-5 overflow-x-scroll scrollbar-none Scroll' ref={scrollelement}>
                <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block z-10 transition-all duration-500' onClick={scrollLeft}><FaAngleLeft/></button>
                <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block z-10' onClick={scrollRight}><FaAngleRight/></button> 

                {
                    data?.map((product,index)=>(
                    <Link to={`/product-details/${product?._id}`} className='bg-white flex min-w-[25vw] w-[25vw] items-center shadow-lg rounded-lg' key={index}>
                        <div className=' bg-slate-100 p-4 min-w-[12vw] h-full'>
                            <img src={product?.productimage[0]} className='object-scale-down min-h-[25vh] max-h-[25vh] mx-auto mix-blend-multiply rounded-l-lg hover:scale-110 transition-all'></img>
                        </div>
                        <div className='mx-auto flex flex-col items-center justify-between max-w-[13vw] gap-2 p-2'>
                            <h2 className=' text-xl font-semibold line-clamp-2 text-ellipsis text-center w-[12vw]'>{product?.productname}</h2>
                            <p className=' capitalize text-slate-500 text-lg'>{product?.brandname}</p>
                            <div className='flex gap-3'>
                                <p className=' text-red-600 font-semibold'>{product?.sellingprice}</p>
                                <p className=' text-slate-500 line-through'>{product?.price}</p>
                            </div>
                            <button className='bg-red-700 text-white py-2 px-5 rounded-md hover:bg-red-900 cursor-pointer' onClick={(e)=>handleaddtocart(e,product?._id)}>Add to cart</button>
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

export default Horizontalproductcard