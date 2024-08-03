const Product=require("../models/Productmodel");


const fetchproductdetails=async(req,res)=>{
    try {
        const {id}=req.body;
        const product=await Product.findOne({_id:id});

        res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            data:product
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=fetchproductdetails;