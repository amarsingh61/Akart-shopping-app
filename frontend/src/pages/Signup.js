import React, { useState } from 'react';
import loginicon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
//import imagetobase64 from '../helper/imagetobase64';
import summaryApi from '../helper/summaryApi';
import { toast } from 'react-toastify';
import uploadtocloudinary from '../helper/uploadtocloudinary';

const Signup = () => {
    const navigate=useNavigate();
    const [showpassword,setshowpassword]=useState(false);
    const [showconfirmpassword,setshowconfirmpassword]=useState(false);
    const [data,setdata]=useState({
        email:"",
        password:"",
        username:"",
        confirmpassword:"",
        profilepic:""
    });

    const submitHandler=async(e)=>{
        e.preventDefault();
        if(data.password===data.confirmpassword)
        {
            const apidata=await fetch(summaryApi.singup.url,{
                method:summaryApi.singup.method,
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(data)
            }); 

            const dataresponse=await apidata.json()
            if(dataresponse.success===true)
            {
                navigate("/login");
                toast.success(dataresponse.message);
            }
            else
                toast.error(dataresponse.message);
            //console.log(dataresponse)
        }
        else
        {
            console.log("please check password and confirm password");
        }
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

    const handleuploadpic=async(e)=>{
        const file=e.target.files[0];

        const imagepic=await uploadtocloudinary(file);

        setdata((prev)=>{
            return{
                ...prev,
                profilepic:imagepic.url
            }
        })

    };


  return (
    <div className='px-10 py-24 mx-auto w-full max-w-lg'>
        <div className=' mx-auto p-4 bg-white flex flex-col items-center justify-center gap-10 rounded'>
            <div className='mx-auto overflow-hidden relative'>
                <img src={data.profilepic || loginicon} className='rounded-full h-32 w-32'></img>
            </div>
            <form className=' mx-auto'>
                    <input type='file' onChange={handleuploadpic}></input>
            </form>
            <form className='flex flex-col gap-5 w-full' onSubmit={submitHandler}>
                <div>
                    <label className=' font-semibold'>Username : </label>
                    <div className='bg-slate-100 p-2'>
                        <input type='text' 
                         placeholder="enter Username"
                         name='username'
                         value={data.username}
                         onChange={changeHandler}
                         required
                         className='w-full h-full bg-transparent outline-none'></input>
                    </div>
                </div>

                <div>
                    <label className=' font-semibold'>Email : </label>
                    <div className='bg-slate-100 p-2'>
                        <input type='email' 
                         placeholder="enter email"
                         name='email'
                         value={data.email}
                         onChange={changeHandler}
                         required
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
                         required
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
                </div>

                <div className=''>
                    <label className=' font-semibold'>Confirm Password : </label>
                    <div className='flex bg-slate-100 p-2'>
                        <input type={showconfirmpassword?"text":"password"}
                         placeholder='enter confirm password'
                         name='confirmpassword'
                         value={data.confirmpassword} 
                         onChange={changeHandler}
                         required
                         className='w-full h-full bg-transparent outline-none'></input>
                        <div className='text-xl cursor-pointer' onClick={()=>setshowconfirmpassword((prev)=>!prev)}>
                            <span>
                                {
                                    showconfirmpassword?
                                    (<FaEyeSlash/>)
                                    :
                                    (<FaEye/>)
                                }
                            </span>
                        </div>
                    </div>
                </div>

                <button className=' mt-5 bg-red-700 p-2 rounded text-white font-semibold hover:bg-red-900 w-[30%] hover:scale-110 transition-all mx-auto'>Sign Up</button>
            </form>
            <p>Already have an account? <Link to={"/login"} className='hover:underline hover:text-red-700'>Log in</Link></p>
        </div>
    </div>
  )
}

export default Signup