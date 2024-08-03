import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import summaryApi from '../helper/summaryApi';
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import Categorywiseproductcard from '../components/Categorywiseproductcard';
import addtoCart from '../helper/addtoCart';
import context from '../context/context';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Productdetails = () => {
    const param=useParams();
    const [data,setdata]=useState({
        productname:"",
        brandname:"",
        category:"",
        sellingprice:"",
        price:"",
        description:"",
        productimage:[]
    })
    const [loading,setloading]=useState(false);
    const [activeimage,setactiveimage]=useState("");
    const [previmage,setprevimage]=useState("");
    const [zoomimage,setzoomimage]=useState(false);
    const [zoomimagecoordinate,setzoomimagecoordinate]=useState({
        x:0,
        y:0
    });

    const {fetchcartproductscount}=useContext(context);
    const navigate=useNavigate();
    const user=useSelector(state=>state?.user?.user);


    const fetchdetails=async()=>{
        setloading(true);
        const fetchdata=await fetch(summaryApi.productdetails.url,{
            method:summaryApi.productdetails.method,
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify(param)
        })

        const responsedata=await fetchdata.json();
        setdata(responsedata.data);
        setactiveimage(responsedata?.data?.productimage[0]);
        setprevimage(responsedata?.data?.productimage[0]);
        setloading(false);
    }

    useEffect(()=>{
        fetchdetails();
    },[param]);

    const changeimage=(index)=>{
        setprevimage(data?.productimage[index]);
        setactiveimage(data?.productimage[index]);
    }

    const zoomhandler=(e)=>{
        setzoomimage(true);
        const {top,left,width,height}=e.target.getBoundingClientRect();

        const x=(e.clientX-left)/width;
        const y=(e.clientY-top)/height;

        setzoomimagecoordinate({
            x,
            y
        });

    }

    const handlezoomout=()=>{
        setzoomimage(false);
    }

    const handleaddtocart=async(e,id)=>{
        await addtoCart(e,id);
        fetchcartproductscount();
    }

    const handlebuynow=async(e,id)=>{
        if(user)
        {
            await addtoCart(e,id);
            fetchcartproductscount();
            navigate("/cart");
        }
        else
            toast.error("please Login")
        
    }

  return (
    <div className='pt-20 min-h-screen px-10'>
        {
            loading?(
                <div>
                </div>
            ):
            (
                <>
                    <div className='flex gap-7'>
                    {/* images thumbnail*/ }
                    <div className='flex flex-col gap-3'>
                        {
                            data.productimage.map((imageurl,index)=>(
                                <div className={`bg bg-slate-100 h-24 flex items-center w-20 cursor-pointer ${previmage===imageurl?"border-2 border-red-600":"border-none"}`} key={index} onMouseEnter={()=>setactiveimage(imageurl)} onMouseLeave={()=>setactiveimage(previmage)}  onClick={()=>changeimage(index)}>
                                    <img src={imageurl} alt={index} className='h-20 w-20 object-scale-down mix-blend-multiply'/>
                                </div>
                            ))
                        }
                    </div>
                    {/*product image */}
                    <div className='h-[80vh] w-[36vw] bg-slate-100 flex relative'>
                        <img src={activeimage} alt={activeimage} className='h-full w-full object-scale-down mix-blend-multiply transition-all cursor-zoom-in' onMouseMove={(e)=>zoomhandler(e)} onMouseLeave={handlezoomout}/>
                        {
                            zoomimage&&(
                                <div className='absolute min-h-[80vh] min-w-[36vw]  top-0 -right-[37vw] overflow-hidden z-10'>
                                    <div className=' mix-blend-multiply object-contain scale-110 bg-slate-100 min-h-[80vh] min-w-[36vw] max-h-[80vh] max-w-[36vw]'
                                    style={{
                                        backgroundImage:`url(${previmage})`,
                                        backgroundRepeat:"no-repeat",
                                        backgroundPosition:`${zoomimagecoordinate.x*100}% ${zoomimagecoordinate.y*100}%`
                                    }}>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/*product description */}
                    <div className='flex flex-col gap-4 max-w-[40vw] pt-5'>
                        <p className=' text-lg bg-red-400 rounded-full px-2 w-fit text-red-800 bg-opacity-50'>{data.brandname}</p>
                        <p className=' font-semibold text-4xl max-w-[40vw]'>{data.productname}</p>
                        <p className=' capitalize text-slate-500 text-lg'>{data.category}</p>
                        <div className=' flex text-2xl text-red-500'>
                            <IoIosStar/>
                            <IoIosStar/>
                            <IoIosStar/>
                            <IoIosStar/>
                            <IoIosStarHalf/>
                        </div>

                        <div className='flex gap-5 text-4xl'>
                            <p className='text-red-500'>{data.sellingprice}</p>
                            <p className='text-slate-500 line-through opacity-70'>{data.price}</p>
                        </div>
                        <div className='text-lg text-slate-800 min-h-[25vh]'>
                            <p>Description :</p>
                            <p>{data.description}</p>
                        </div>
                        <div className='flex gap-10'>
                            <button className=' border-red-700 border-2 text-red-700 font-semibold hover:text-white py-2 px-6 rounded-md transition-all hover:bg-red-700 cursor-pointer' onClick={(e)=>handlebuynow(e,data?._id)}>Buy Now</button>
                            <button className=' bg-red-700 text-white py-2 px-5  font-semibold rounded-md hover:bg-red-900 cursor-pointer' onClick={(e)=>handleaddtocart(e,data?._id)}>Add to Cart</button>
                        </div>
                    </div>
                    </div>
                    {
                        data?.category&&(
                            <Categorywiseproductcard category={data?.category} heading={"Recommended Products"} />
                        )
                    }
                </> 
            )
        }
    </div>
  )
}

export default Productdetails