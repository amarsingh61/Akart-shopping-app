const Cart=require("../models/Cartmodel");

const updatecartproductquantity=async(req,res)=>{
    try {
        
        const {id,quantity}=req.body;
        const updatedcartproduct=await Cart.findByIdAndUpdate({_id:id},{quantity:quantity},{new:true});

        res.status(200).json({
            success:true,
            message:"Quantity updated successfully",
            data:updatedcartproduct
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=updatecartproductquantity;