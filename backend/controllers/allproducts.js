const Product = require("../models/Productmodel");


const allproducts=async(req,res)=>{
    try {
        const allproducts=await Product.find();

        res.status(200).json({
            message:"All products fetched",
            success:true,
            data:allproducts
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=allproducts;