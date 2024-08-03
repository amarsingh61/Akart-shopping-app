const mongoose=require("mongoose");

const Cartschema=new mongoose.Schema({
    productId:{
        type:String,
        ref:"Product",
        required:true
    },
    quantity:Number,
    userId:String
});

module.exports=mongoose.model("Cart",Cartschema);

