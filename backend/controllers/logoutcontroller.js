

const logout=async(req,res)=>{
    try {
        res.clearCookie('token');

        res.status(200).json({
            success:true,
            message:"logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports=logout;