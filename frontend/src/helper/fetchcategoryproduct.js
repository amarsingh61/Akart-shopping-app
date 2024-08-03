import summaryApi from "./summaryApi"


const fetchcategoryproduct=async(category)=>{
    const fetchdata=await fetch(summaryApi.categorywiseproduct.url,{
        method:summaryApi.categorywiseproduct.method,
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({category:category})
    })
    const responsedata=await fetchdata.json();

    return responsedata;
}

export default fetchcategoryproduct;