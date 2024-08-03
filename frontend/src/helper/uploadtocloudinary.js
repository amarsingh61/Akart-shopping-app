const url=`https://api.cloudinary.com/v1_1/dnwdcjrxi/image/upload`;

const uploadtocloudinary=async(image)=>{
    const formdata=new FormData();
    formdata.append("file",image);
    formdata.append("upload_preset","amar_kart");

    const fetchdata=await fetch(url,{
        method:"post",
        body:formdata
    });

    const dataresponse=await fetchdata.json();

    return dataresponse;
}

export default uploadtocloudinary;