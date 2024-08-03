import React, { useContext, useState } from 'react'
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import {FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../helper/summaryApi';
import { toast } from 'react-toastify';
import { setuserdetails } from '../store/userslice';
import context from '../context/context';


const Navbar = () => {
    const user=useSelector(state=>state?.user?.user);
    //console.log(user)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {cartproductscount}=useContext(context);
    const [menuDisplay,setMenuDisplay]=useState(false);

    const handlelogout=async()=>{
        const apidata=await fetch(summaryApi.logout.url,{
            method:summaryApi.logout.method,
            credentials:"include",
        });

        const dataresponse=await apidata.json();

        if(dataresponse?.success)
        {
            toast.success(dataresponse.message);
            dispatch(setuserdetails(null));
            navigate("/");
        }
        else{
            toast.error(dataresponse.message);
        }
    }

    const searchhandler=(e)=>{
        const {value}=e.target;

        if(value)
            navigate(`/search?q=${value}`);
        else    
            navigate("/search");
    }

    return (
    <div className=' flex justify-between bg-white  px-10 py-2 fixed w-screen items-center mx-auto shadow-md z-20'>
        <div>
            <Link to={"/"} className='logo'>
                Akart
            </Link>
        </div>
        <div className='hidden lg:flex  items-center justify-center w-[40vw]'>
            <input type='text'placeholder='Search Here' className=' outline-none py-2 px-5 shadow-md rounded-s-full w-2/3 border' onChange={(e)=>searchhandler(e)}></input>
            <div className='  rounded-e-full bg-red-700 py-3 px-7 text-white  shadow-md hover:bg-red-900'>
            <FaSearch />
            </div>
        </div>
        <div className='flex gap-8 items-center'>
            <div className='relative flex justify-center'>
            {
                user?._id &&(
                    <>
                    {
                        user?.profilepic?
                        (<img src={user?.profilepic} 
                            onClick={()=>setMenuDisplay(preve => !preve)}
                            className='w-10 rounded-full h-10 cursor-pointer'>
                         </img>
                        )
                        :
                        (<Link onClick={()=>setMenuDisplay(preve => !preve)}>
                            <FaRegUser className=' text-xl ' />
                         </Link>
                        )
                    }
                    </>
                )
            }
            {
                user?.role==="admin" ?
                (<>
                    {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <div onClick={(prev)=>setMenuDisplay(!prev)}>
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap z-20 md:block hover:bg-slate-100 p-2'>Admin Panel</Link>
                        </div>
                        <div onClick={(prev)=>setMenuDisplay(!prev)}>
                              <Link to={"/orders"} className='whitespace-nowrap z-20 md:block hover:bg-slate-100 p-2'>Orders</Link>
                        </div>
                      </div>
                    )
                    }
                </>
                )
                :
                (<>
                    {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <div onClick={(prev)=>setMenuDisplay(!prev)}>
                              <Link to={"/orders"} className='whitespace-nowrap z-20 md:block hover:bg-slate-100 p-2'>Orders</Link>
                        </div>
                      </div>
                    )
                    }
                 </>
                )
            }
            
            </div>
            {
                user?._id &&(
                    <Link to={"/cart"}className=' flex relative '>
                        <FaShoppingCart className=' text-xl'/>
                        <div className=' bg-red-700 rounded-full flex  h-5 w-5 items-center justify-center text-white absolute -top-2 -right-3'>
                            <p className='text-sm'>{cartproductscount}</p>
                        </div>
                    </Link>
                )
            }
            
            {
                user?._id?
                (
                <div className=' bg-red-700 text-white py-2 px-5 rounded-md hover:bg-red-900 cursor-pointer' onClick={handlelogout}>Log out</div>
                ):
                (<Link to={"/login"}>
                <div className=' bg-red-700 text-white py-2 px-5 rounded-md hover:bg-red-900'>Login</div>
                </Link>)
            }
            

        </div>
    </div>
  )
}

export default Navbar