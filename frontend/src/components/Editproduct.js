import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import productcategory from '../helper/productcategory';
import uploadtocloudinary from '../helper/uploadtocloudinary';
import Fullscreenimage from './Fullscreenimage';
import { MdDeleteForever } from "react-icons/md";
import summaryApi from '../helper/summaryApi';
import { toast } from 'react-toastify';


const Editproduct = ({seteditproduct,getallproducts,product}) => {

    const [productdetails,setproductdetails]=useState({
        ...product,
        productname:product?.productname,
        brandname:product?.brandname,
        category:product?.category,
        sellingprice:product?.sellingprice,
        price:product?.price,
        description:product?.description,
        productimage:product?.productimage || []
    });

    const [openimage,setopenimage]=useState(false);
    const [imageurl,setimageurl]=useState("");

    const changehandler1=(e)=>{
        const {value,name}=e.target;
        const numericValue = !isNaN(value) ? parseInt(value) : value;
        //console.log(numericValue)
        setproductdetails((prev)=>{
            return{
                ...prev,
                [name]:numericValue
            }
        });
    }
    const changehandler=(e)=>{
        const {value,name}=e.target;
        setproductdetails((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        });
    }

    const uploadimagehandler=async(e)=>{
        const file=e.target.files[0];
        const image= await uploadtocloudinary(file);
        setproductdetails((prev)=>{
            return{
                ...prev,
                productimage:[...prev.productimage,image.url]
            }
        })
    }

    const handledeleteproductimage=(index)=>{
        const newproductimage=[...productdetails.productimage];
        newproductimage.splice(index,1);

        setproductdetails((prev)=>{
            return{
                ...prev,
                productimage:newproductimage
            }
        })
    }


    const submithandler=async(e)=>{
        e.preventDefault();
        //console.log("submitted",productdetails);

        const fetchdata=await fetch(summaryApi.updateproduct.url,{
            method:summaryApi.updateproduct.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({...productdetails,id:product._id})
        });

        const responsedata=await fetchdata.json();

        if(responsedata.success)
        {
            toast.success(responsedata.message);
            seteditproduct(false);
            getallproducts();
        }
        else
            toast.error(responsedata.message);
    }


  return (
    <div className='flex items-center justify-center top-0 left-0 bottom-0 right-0 bg-black fixed bg-opacity-60 z-50'>
        <div className='bg-white p-5 rounded w-1/2 overflow-hidden h-[75vh]'>
            <div className='flex justify-between items-baseline'>
                <div className=' font-semibold text-lg'>Add a Product</div>
                <div className=' ml-auto text-2xl hover:cursor-pointer' onClick={()=>seteditproduct(false)}>
                    <IoMdClose/>
                </div> 
            </div>
            <form className='grid px-2 gap-3 overflow-y-scroll pb-3 h-[65vh]' onSubmit={submithandler}>

                <label htmlFor='productname'>Product Name: </label>
                <input type='text' id='productname' value={productdetails.productname} name='productname' placeholder=' Enter Product Name' 
                className=' bg-slate-100 p-2 rounded border ' onChange={changehandler} required></input>

                <label htmlFor='brandname'>Brand Name: </label>
                <input type='text' id='brandname' value={productdetails.brandname} name='brandname' placeholder=' Enter Brand Name' 
                className=' bg-slate-100 p-2 rounded border ' onChange={changehandler} required></input>

                <label htmlFor='Price'>Price: </label>
                <input type='number' id='price' value={productdetails.price} name='price' placeholder=' Enter Price' 
                className=' bg-slate-100 p-2 rounded border ' onChange={changehandler1} required></input>

                <label htmlFor='sellingprice'>Selling Price: </label>
                <input type='number' id='sellingprice' value={productdetails.sellingprice} name='sellingprice' placeholder=' Enter Selling Price' 
                className=' bg-slate-100 p-2 rounded border ' onChange={changehandler1} required></input>

                <label htmlFor='category'>Category: </label>
                <select required value={productdetails.category} onChange={changehandler} name='category' className=' bg-slate-100 rounded border p-2'>
                    <option value={""}>Select Category--</option>
                    {
                        productcategory.map((ele)=>(
                            <option value={ele.value} key={ele.id} >{ele.label}</option>
                        
                        ))
                    }
                </select>

                <label htmlFor='description' className='mt-3'>Description :</label>
                <textarea 
                 className='h-28 bg-slate-100 border resize-none p-1' 
                 placeholder='enter product description' 
                 rows={3}  
                 onChange={changehandler}
                 name='description'
                 value={productdetails.description}
                >
                </textarea>

                <label htmlFor='productimage'>Product Image</label>
                <label htmlFor='uploadImageInput'>
                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                     <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                       <span className='text-4xl'><FaCloudUploadAlt/></span>
                       <p className='text-sm'>Upload Product Image</p>
                       <input type='file' id='uploadImageInput'  className='hidden' onChange={uploadimagehandler} />
                     </div>
                    </div>
                </label>
                {
                    productdetails?.productimage[0]?(
                    <div className='flex gap-2'>
                        {
                            productdetails?.productimage.map((el,index)=>(
                                <div className='relative group' key={index}>
                                    <img src={el}
                                    key={index}
                                    alt={el} 
                                    className='bg-slate-100 w-20 h-16 hover:cursor-pointer object-scale-down'
                                        onClick={()=>{
                                            setopenimage(true);
                                            setimageurl(el)
                                        }}>
                                    </img>
                                    <div className='group-hover:block hidden absolute bottom-0 right-0 text-white cursor-pointer rounded-full bg-opacity-50 bg-red-500 text-xl p-2'
                                     onClick={()=>handledeleteproductimage(index)}>
                                        <MdDeleteForever/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    ):
                    (
                        <></>
                    )
                }
                

                <button className=' bg-red-700 text-white py-2 px-5 rounded-md hover:bg-red-900 cursor-pointer'>Update Product</button>

            </form>
            
        </div>

        {
            openimage && (
                <Fullscreenimage setopenimage={setopenimage} imageurl={imageurl}/>
            )
        }

    </div>
  )
}

export default Editproduct