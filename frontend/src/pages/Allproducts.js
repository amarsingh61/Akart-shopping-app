import React, { useEffect, useState } from 'react'
import Addproducts from '../components/Addproducts'
import summaryApi from '../helper/summaryApi';
import ProductCard from '../components/ProductCard';

const Allproducts = () => {

  const [openaddproducts,setopenaddproducts]=useState(false);
  const [allproducts,setallproducts]=useState([]);

  const getallproducts=async()=>{
    const fetchdata=await fetch(summaryApi.allproduct.url,{
      credentials:"include"
    });
    const responsedata=await fetchdata.json();

    setallproducts(responsedata.data);
  }

  useEffect(()=>{
    getallproducts();
  },[]);



  return (
    <div className='p-5 w-full flex flex-col gap-2'>
      <div className='w-[81vw] flex justify-between px-5 py-3 rounded bg-white items-center gap-2'>
        <span className=' text-2xl font-semibold'>All Products</span>
        <div className=' bg-red-700 text-white py-2 px-5 rounded-md hover:bg-red-900 cursor-pointer' onClick={()=>setopenaddproducts(true)}>Add Product</div>
      </div>
      {
        openaddproducts &&
        (
          <Addproducts setopenaddproducts={setopenaddproducts} getallproducts={getallproducts}/>
        )
      }

      <div className='flex flex-wrap flex-row gap-4 gap-y-5 overflow-y-auto h-full max-h-[75vh] products'>
        {
          allproducts?.map((product,index)=>(
            <ProductCard product={product} key={index} getallproducts={getallproducts} setallproducts={setallproducts}/>
          ))
        }
      </div>
    
    </div>
  )
}

export default Allproducts