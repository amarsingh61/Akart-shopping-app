const mongoose=require("mongoose");

const orderschema=new mongoose.Schema({
    userId:{
        type:String,
    },
    productdetails:[
        {
            productId:{
                type:String,
                ref:"Product"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    paymentdetails:{
        payment_id:{
            type:String
        },
        payment_status:{
            type:Boolean
        }
    },
    totalamount:Number
},
{
    timestamps:true
});

module.exports=mongoose.model("Order",orderschema);