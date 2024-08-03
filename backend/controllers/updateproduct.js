const productmodel = require("../models/Productmodel");


const updateproduct=async(req,res)=>{
    try {
        const {id,...productdetails}=req.body;
        console.log(productdetails);

        const updateddata=await productmodel.findByIdAndUpdate({_id:id},
                                                                {
                                                                    ...productdetails
                                                                },
                                                            {
                                                                new:true
                                                            });
        console.log(updateddata);
        
        res.status(200).json({
            success:true,
            message:"Product updated successfully",
            data:updateddata
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=updateproduct;