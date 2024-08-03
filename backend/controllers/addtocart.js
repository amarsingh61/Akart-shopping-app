const cartmodel=require("../models/Cartmodel");

const addtocart=async(req,res)=>{
    try {
        const {productId}=req.body;
        const userId=req.userId;

        console.log(userId);
        if(!userId)
        {
            return res.json({
                success:false,
                message:"Please Log In"
            });
        }
        
        const addedproduct=await cartmodel.findOne({productId:productId,userId:userId});
        console.log("hello",addedproduct);
        if(addedproduct)
        {
            return res.json({
                message:"Product already added to cart",
                success:false,
                data:[]
            })
        }

        const cartdetails=await cartmodel.create({productId:productId,quantity:1,userId:userId});

        res.status(200).json({
            message:"Added to cart",
            success:true,
            data:cartdetails
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false,
        })
    }
}

module.exports=addtocart;