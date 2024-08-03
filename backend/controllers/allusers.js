const User = require("../models/Usermodel");

const allusers=async(req,res)=>{
    try {
        const alldata=await User.find({});

        res.status(200).json({
            success:true,
            data:alldata,
            message:"All user data fetched successfully"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=allusers;