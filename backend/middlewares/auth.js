const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    try {
        const token=req.body?.token ||
        req.cookies?.token;

        //console.log(token);
        if(!token)
        {
            return res.status(200).json({
                success:false,
                message:"Please Log In"
            });
        }

        const decode=jwt.verify(token,process.env.JWT_SECRET);
        //console.log(decode);
        req.userId=decode?.id;
        next();

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data:[]
        });
    }
}

module.exports=auth;
