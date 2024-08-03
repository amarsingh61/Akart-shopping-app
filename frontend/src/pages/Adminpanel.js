import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";

const Adminpanel = () => {
    const user = useSelector(state => state?.user?.user);

  return (
    <div className=' pt-14 min-h-[100vh] flex'>
           <aside className='bg-white min-h-[92vh]  w-full  max-w-60 customShadow'>
                <div className='h-40  flex justify-center items-center flex-col pt-3'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                         user?.profilepic ? (
                            <img src={user?.profilepic} className='w-20 h-20 rounded-full' loading='lazy' alt={user?.username} />
                         ) : (
                            <FaRegCircleUser/>
                         )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.username}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"/admin-panel/all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"/admin-panel/all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                    </nav>
                </div>  
        </aside>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default Adminpanel