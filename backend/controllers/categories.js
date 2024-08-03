const Product=require("../models/Productmodel");

const categories=async(req,res)=>{
    try {
        const productcategory=await Product.distinct("category");
        const productoneofcategory=[];
        for(const category of productcategory)
        {
            const product=await Product.findOne({category});

            if(product)
                productoneofcategory.push(product);
        }

        res.status(200).json({
            success:true,
            message:"all categories",
            data:productoneofcategory
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=categories;