import summaryApi from "./summaryApi";
import {toast} from "react-toastify"

const addtoCart=async(e,id)=>{

    e.stopPropagation();
    e.preventDefault();

    const fetchdata=await fetch(summaryApi.addtoCart.url,{
        method:summaryApi.addtoCart.method,
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({productId:id})
    });

    const responsedata=await fetchdata.json();

    if(responsedata.success)
    {
        toast.success(responsedata.message);
    }
    else
        toast.error(responsedata.message);

    return responsedata;
}

export default addtoCart;