const Cart=require("../models/Cartmodel");

const cartproducts=async(req,res)=>{
    try {
        const userid=req.userId;
        const productsincart=await Cart.find({userId:userid}).populate("productId");
            
        res.status(200).json({
            message:"Products in cart fetched",
            success:true,
            data:productsincart
        });

    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        });
    }
}

module.exports=cartproducts;