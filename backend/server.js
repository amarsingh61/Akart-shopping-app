const express=require("express");
const cors=require("cors");
require("dotenv").config();
const cookieparser=require("cookie-parser");

const dbconnect=require("./config/databaseconnect");
const userroute=require("./routes/userroutes");

const app=express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

const PORT=process.env.PORT || 4000;

dbconnect();

app.use("/v1/auth",userroute);


app.listen(PORT,()=>{
    console.log("app is running");
});

