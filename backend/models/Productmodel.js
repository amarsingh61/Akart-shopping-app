const mongoose=require("mongoose");

const Productschema= new mongoose.Schema({
        productname:String,
        brandname:String,
        category:String,
        sellingprice:Number,
        price:Number,
        description:String,
        productimage:[]
},
{
    timestamps:true
})

module.exports=mongoose.model("Product",Productschema);

