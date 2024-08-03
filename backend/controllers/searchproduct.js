const Product=require("../models/Productmodel");

const searchproduct=async(req,res)=>{
    try {
        const query=req.query.q;
        console.log(query)

        const regex=new RegExp(query,'i','g');

        const allproduct=await Product.find({
            "$or":[
                {
                    productname:regex
                },
                {
                    category:regex
                }
            ]
        });

        res.status(200).json({
            success:true,
            message:"search results",
            data:allproduct
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=searchproduct;