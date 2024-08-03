import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Privateroute = ({children}) => {
  const user=useSelector(state=>state?.user?.user);
  //console.log(user);
  if(user!==null)
    return children;
  else
    return <Navigate to={"/"}/>
}

export default Privateroute;