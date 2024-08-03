const User = require("../models/Usermodel");

const changerole=async(req,res)=>{
    try {

        const sessionUser = req.userId;
        const {userId, email, name, role} = req.body;

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        };

        const user = await User.findById(sessionUser);

        console.log("user.role",user.role)
        const updateddata=await User.findByIdAndUpdate(userId,payload,{new:true});

        res.status(200).json({
            success:true,
            data:updateddata,
            message:"role updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=changerole;