const Cart=require("../models/Cartmodel");

const countcartproducts=async(req,res)=>{
    try {
        const userId=req.userId;
        const count=await Cart.countDocuments({userId:userId});

        res.status(200).json({
            message:"Count fetched",
            success:true,
            data:{
                count:count
            }
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}


module.exports=countcartproducts;