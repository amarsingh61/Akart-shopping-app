import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import summaryApi from '../helper/summaryApi';
import { toast } from 'react-toastify';

const Changeuserrole = ({name,email,role,setopenupdaterole,id,fetchallusers}) => {

  const [userrole,setuserrole]=useState(role);

  const changehandler=(e)=>{
    setuserrole(e.target.value);
  }

  const changerole=async()=>{
    const fetchdata=await fetch(summaryApi.updateuser.url,{
      method:summaryApi.updateuser.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        userId:id,
        role:userrole
      })
    });

    const responsedata=await fetchdata.json();

    if(responsedata.success)
    {
      toast.success(responsedata.success);
      fetchallusers();
      setopenupdaterole(false);
    }
    //console.log("what is up",responsedata);
  }

  return (
    <div className='flex items-center justify-center top-0 left-0 bottom-0 right-0 bg-black fixed bg-opacity-60'>
        <div className='bg-white p-4 rounded w-1/5 flex  gap-3 flex-col'>
          <button className='block ml-auto' onClick={()=>setopenupdaterole(false)}>
                <IoMdClose/>
          </button>
          <div className='mx-auto font-semibold text-lg'>Change User Role</div>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div className='flex justify-between'>
            <label>Role :</label>
            <select onChange={changehandler} value={userrole}>
              <option value="admin">Admin</option>
              <option value="general">General</option>
            </select>
          </div>

          <button className=' block  mt-2  text-white mx-auto bg-red-700 hover:bg-red-900 p-2 rounded' onClick={changerole}>Update Role</button>
        </div>

    </div>
  )
}

export default Changeuserrole