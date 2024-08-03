const User=require("../models/Usermodel");


const userdetails=async(req,res)=>{
    try {
        
        const id=req?.userId;
        //console.log(id);
        if(!id)
        {
            return res.status(404).json({
                success:false,
                message:"Please login"
            })
        }
        const details=await User.findById(id);
        //console.log(details)
        
        return res.status(200).json({
            success:true,
            data:details,
            message:"user details"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=userdetails;