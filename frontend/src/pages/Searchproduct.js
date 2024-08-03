import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import summaryApi from "../helper/summaryApi";
import Verticalcard from "../components/Verticalcard";

const Searchproduct = () => {
    const param=useLocation();
    const [data,setdata]=useState([]);
    const [loading,setloading]=useState(false);

    const fetchdata=async()=>{
      setloading(true);
      const fetchdata=await fetch(summaryApi.searchproduct.url+param.search);
      const responsedata=await fetchdata.json();

      setdata(responsedata.data);
      setloading(false);
    }

    useEffect(()=>{
      fetchdata();
    },[param])
  return (
    <div className='pt-20 px-10 min-h-screen'>
      {
        loading &&(
          <div>
            Loading...
          </div>
        )
      }

      {
        data.length===0 && !loading && (
          <div>
            No Data Found
          </div>
        )
      }

      {
        data.length!==0 &&(
          <div>
            <div>Search Results: {data.length}</div>
            <Verticalcard data={data} loading={loading}/>
          </div>
        )
      }
    </div>
  )
}

export default Searchproduct