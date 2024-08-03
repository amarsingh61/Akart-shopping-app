import React from 'react'
import { useParams } from 'react-router-dom'
import Categorywiseproductcard from "../components/Categorywiseproductcard"

const Categoryproducts = () => {
    const param=useParams();
    //console.log(param);
  return (
    <div className=' pt-20 px-10 min-h-screen'>
      <Categorywiseproductcard category={param.id} heading={`Top ${param.id}'s`}/>
    </div>
  )
}

export default Categoryproducts