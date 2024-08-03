const Product = require("../models/Productmodel");


const deleteproduct=async(req,res)=>{
    try {
        const {id}=req.body;
        console.log(id);

        await Product.findByIdAndDelete({_id:id});

        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=deleteproduct;