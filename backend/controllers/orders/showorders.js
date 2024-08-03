const Order=require("../../models/ordermodel");

const showorders=async(req,res)=>{
    try {
        const id=req.userId;

        const orderlist=await Order.find({userId:id})
                                    .populate({
                                        path:"productdetails.productId",
                                        model:"Product"
                                    })
                                    .sort({createdAt:-1});

        res.status(200).json({
            success:true,
            message:"Order details fetched successfully",
            data:orderlist
        })
    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}

module.exports=showorders;