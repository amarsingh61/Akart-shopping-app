const productmodel = require("../models/Productmodel");

const categorywiseproduct=async(req,res)=>{
    try {
        const {category}=req.body;
        const products=await productmodel.find({category:category});

        res.status(200).json({
            success:true,
            message:"Products fetched successfully",
            data:products
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=categorywiseproduct;