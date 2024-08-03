import React, { useState } from 'react'
import summaryApi from '../helper/summaryApi'
import { toast } from 'react-toastify';
import Editproduct from './Editproduct';

const ProductCard = ({product,index,getallproducts,setallproducts}) => {

    const [editproduct,seteditproduct]=useState(false);

    const deletehandler=async()=>{
        //console.log(product._id);
        const fetchdata=await fetch(summaryApi.deleteproduct.url,{
            method:summaryApi.deleteproduct.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({id:product._id})
        });

        const responsedata=await fetchdata.json();
        //console.log(responsedata);
        if(responsedata.success)
        {
            toast.success(responsedata.message);
            getallproducts();
            setallproducts(prev =>{
                  // Debugging line
                const newProducts = prev.filter(p => p._id !== product._id);
                 // Debugging line
                return newProducts;
            });
        }
        else
            toast.error(responsedata.error);
    }
    
  return (
    <div className='bg-white w-[19vw] h-1/5 rounded-lg'>
        <div>
            <div className='h-52 w-full flex justify-center items-center'>
                <img src={product.productimage[0]} alt={product.productname} className=' rounded-t-lg object-fill h-full'></img>
            </div>
            <div className='p-2 '>
                <div className='text-xl font-semibold font-serif text-center line-clamp-1 text-ellipsis'>{product.productname}</div>
                <div className='text-lg font-serif text-center'>{product.brandname}</div>
                <div className='font-bold text-center'>RS. {product.sellingprice}</div>
            </div>
            <div className='p-2 flex justify-around'>
                <div className=' bg-slate-500 text-white py-2 px-6 rounded-md hover:bg-slate-900 cursor-pointer' onClick={()=>seteditproduct(true)}>Edit</div>
                <div className=' bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-900 cursor-pointer' onClick={()=>deletehandler(index)}>Delete</div>
            </div>
        </div>
        {
            editproduct&&(
                <Editproduct product={product} getallproducts={getallproducts} seteditproduct={seteditproduct}/>
            )
        }
    </div>
  )
}

export default ProductCard