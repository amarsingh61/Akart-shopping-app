import React, { useContext, useState } from 'react';
import loginicon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../helper/summaryApi';
import { toast } from 'react-toastify';
import context from '../context/context';

const Login = () => {

    const navigate=useNavigate();
    const [showpassword,setshowpassword]=useState(false);
    const [data,setdata]=useState({
        email:"",
        password:""
    });
    const {fetchuserdetails,fetchcartproductscount}=useContext(context);


    const submitHandler=async(e)=>{
        e.preventDefault();

        const apidata=await fetch(summaryApi.login.url,{
            credentials:"include",
            method:summaryApi.login.method,
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        });

        const dataresponse=await apidata.json();

        if(dataresponse.success)
        {
            navigate("/");
            toast.success(dataresponse.message);
            fetchuserdetails();
            fetchcartproductscount();
        }
        else
            toast.error(dataresponse.message);

        //console.log(dataresponse);
    }

    const changeHandler=(e)=>{
        const {name,value}=e.target;
        setdata((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    };

  return (
    <div className='px-10 py-24 mx-auto w-full max-w-lg'>
        <div className=' mx-auto p-4 bg-white flex flex-col items-center justify-center gap-10 rounded'>
            <div>
                <img src={loginicon}></img>
            </div>
            <form className='flex flex-col gap-5 w-full' onSubmit={submitHandler}>
                <div>
                    <label className=' font-semibold'>Email : </label>
                    <div className='bg-slate-100 p-2'>
                        <input type='email' 
                         placeholder="enter email"
                         name='email'
                         value={data.email}
                         onChange={changeHandler}
                         className='w-full h-full bg-transparent outline-none'></input>
                    </div>
                </div>
                <div className=''>
                    <label className=' font-semibold'>Password : </label>
                    <div className='flex bg-slate-100 p-2'>
                        <input type={showpassword?"text":"password"}
                         placeholder='enter password'
                         name='password'
                         value={data.password} 
                         onChange={changeHandler}
                         className='w-full h-full bg-transparent outline-none'></input>
                        <div className='text-xl cursor-pointer' onClick={()=>setshowpassword((prev)=>!prev)}>
                            <span>
                                {
                                    showpassword?
                                    (<FaEyeSlash/>)
                                    :
                                    (<FaEye/>)
                                }
                            </span>
                        </div>
                    </div>
                    <Link to="/forget-password" className='w-fit ml-auto hover:underline block hover:text-red-700'>Forgot Password</Link>
                </div>
                <button className=' mt-5 bg-red-700 p-2 rounded text-white font-semibold hover:bg-red-900 w-[30%] hover:scale-110 transition-all mx-auto'>Login</button>
            </form>
            <p>Don't have an account? <Link to={"/sign-up"} className='hover:underline hover:text-red-700'>Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Login