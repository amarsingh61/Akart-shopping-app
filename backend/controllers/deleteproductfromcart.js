const Cart=require("../models/Cartmodel");

const deleteproductfromcart=async(req,res)=>{
    try {
        const {id}=req.body;

        const deleteproduct=await Cart.findByIdAndDelete({_id:id});

        res.status(200).json({
            success:true,
            message:"product removed from cart",
            data:deleteproduct
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=deleteproductfromcart;