import React, { useEffect, useState } from 'react'
import summaryApi from '../helper/summaryApi'
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import Changeuserrole from '../components/Changeuserrole';

const Allusers = () => {

    const [allusers,setallusers]=useState([]);
    const [openupdaterole,setopenupdaterole]=useState(false);
    const [updateuserdetails,setupdateuserdetails]=useState({
        name:"",
        email:"",
        role:"",
        id:""
    });

    //console.log(allusers);

    const fetchallusers=async()=>{
        const fetchdata=await fetch(summaryApi.allUser.url,{
            method:summaryApi.allUser.method,
            credentials:"include"
        });

        const dataresponse=await fetchdata.json();

        if(dataresponse.success)
        {
            setallusers(dataresponse.data);
        }
        else
        {
            toast.error(dataresponse.message);
        }
    }

    useEffect(()=>{
        fetchallusers();
    },[])
  return (
    <div className='p-5'>
        <table className=' w-[80vw] bg-white'>
            <thead>
                <tr className=''>
                    <th className=' text-center border'>Sr.</th>
                    <th className=' text-center border'>Name</th>
                    <th className=' text-center border'>Email</th>
                    <th className=' text-center border'>Role</th>
                    <th className=' text-center border'>Created Date</th>
                    <th className=' text-center border'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allusers.map((ele,index)=>{
                    return(
                        <tr key={index}>
                            <td className=' text-center border'>{index+1}</td>
                            <td className=' text-center border'>{ele.username}</td>
                            <td className=' text-center border'>{ele.email}</td>
                            <td className=' text-center border'>{ele.role}</td>
                            <td className=' text-center border'>{ele.createdAt}</td>
                            <td className=' text-center border'>
                            <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                            onClick={()=>{
                                setupdateuserdetails(ele);
                                setopenupdaterole(true);
                                }
                            }>
                                        <MdModeEdit/>
                            </button>
                            </td>
                        </tr>
                    )})
                }
            </tbody>
        </table>
        {
            openupdaterole &&
            (<Changeuserrole 
                setopenupdaterole={setopenupdaterole} 
                name={updateuserdetails.username}
                email={updateuserdetails.email}
                role={updateuserdetails.role}
                id={updateuserdetails._id}
                fetchallusers={fetchallusers}
            />)
        }
        
    
    </div>
  )
}

export default Allusers