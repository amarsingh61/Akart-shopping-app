const Product = require("../models/Productmodel");


const addproduct=async(req,res)=>{
    try {
        const {productname,
            brandname,
            category,
            sellingprice,
            price,
            description,
            productimage}=req.body;

        if(!productname ||
            !brandname ||
            !category ||
            !sellingprice ||
            !price||
            !description)
            {
                res.status(500).json({
                    success:false,
                    message:"All values are required"
                });
            }

            const data=await Product.create({productname:productname,brandname:brandname,
                category:category,sellingprice:sellingprice,price:price,
                description:description,productimage:productimage});

            res.status(200).json({
                success:true,
                message:"Product Successfully Uploaded",
                data:data
            })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=addproduct;