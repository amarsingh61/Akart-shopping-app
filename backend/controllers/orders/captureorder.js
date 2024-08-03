const instance = require("../../config/razorpay");


const captureorder=async(req,res)=>{
    try {
        const {amount}=req.body;

        const options={
            amount:amount*100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString()
        };
        const order=await instance.orders.create(options);

        res.status(200).json({
            success:true,
            message:"Order created",
            data:order
        });

    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:error.message
            }
        );
    }
}
module.exports=captureorder;