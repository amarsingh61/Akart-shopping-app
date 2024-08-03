const User=require("../models/Usermodel");
const bcrypt=require("bcrypt");


const signup=async(req,res)=>{
    try {
        const {username,password,email}=req.body;
        console.log(req.body);
        if(!username || !password || !email)
        {
            return res.json({
                success:false,
                message:"All fields are required"
            });
        }

        const existinguser=await User.findOne({email:email});
        if(existinguser)
        {
            return res.json({
                success:false,
                message:"user already exists"
            })
        }

        const hashedpassword=await bcrypt.hash(password,10);

        const newuser=await User.create({
            ...req.body,
            role:"general",
            password:hashedpassword
        })

        return res.status(200).json({
            newuser,
            success:true,
            message:"account successfully created"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=signup;