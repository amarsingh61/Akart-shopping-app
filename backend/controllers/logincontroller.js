const User = require("../models/Usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();


const login =async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password)
        {
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        const existinguser=await User.findOne({email:email});

        if(!existinguser)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }


        if(await bcrypt.compare(password,existinguser.password))
        {
            const payload={
                email:existinguser.email,
                id:existinguser._id
            };

            const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"4h"});

            const options = {
                httpOnly: true,
                secure:true
            };

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                message:"Logged in successfully"
            });
        }else
        {
            return res.status(500).json({
                success:false,
                message:"please check password again"
            })
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=login;