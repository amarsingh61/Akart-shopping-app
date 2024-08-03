const express=require("express");
const router=express.Router();

const signupcontroller=require("../controllers/signupcontroller");
const logincontroller=require("../controllers/logincontroller");
const userdetails  = require("../controllers/userdetails");
const  auth  = require("../middlewares/auth");
const logout = require("../controllers/logoutcontroller");
const allusers = require("../controllers/allusers");
const changerole = require("../controllers/changerole");
const addproduct = require("../controllers/addproduct");
const allproducts = require("../controllers/allproducts");
const deleteproduct = require("../controllers/deleteproduct");
const updateproduct = require("../controllers/updateproduct");
const categories = require("../controllers/categories");
const categorywiseproduct = require("../controllers/categorywiseproduct");
const fetchproductdetails = require("../controllers/fetchproductdetails");
const addtocart = require("../controllers/addtocart");
const countcartproducts = require("../controllers/countcartproducts");
const cartproducts = require("../controllers/cartproducts");
const updatecartproductquantity = require("../controllers/updatecartproductquantity");
const deleteproductfromcart = require("../controllers/deleteproductfromcart");
const searchproduct = require("../controllers/searchproduct");
const captureorder = require("../controllers/orders/captureorder");
const paymentverification = require("../controllers/orders/paymentverification");
const showorders = require("../controllers/orders/showorders");

//authentication
router.post("/sign-up",signupcontroller);
router.post("/login",logincontroller);
router.get("/user-details",auth,userdetails);
router.get("/logout",auth,logout);

//admin
router.get("/alluser",auth,allusers);
router.post("/updateuser",auth,changerole);

//product
router.post("/upload-product",auth,addproduct);
router.get("/get-allproducts",auth,allproducts);
router.post("/deleteproduct",auth,deleteproduct);
router.put("/updateproduct",auth,updateproduct);
router.get("/productcategories",categories);
router.post("/categoryproduct",categorywiseproduct);
router.post("/product-details",fetchproductdetails);

//cart
router.post("/addtocart",auth,addtocart);
router.get("/cartproductscount",auth,countcartproducts);
router.get("/cartproducts",auth,cartproducts);
router.post("/updatecartproductquantity",auth,updatecartproductquantity);
router.post("/removeproductfromcart",auth,deleteproductfromcart);

//search
router.get("/searchproduct",searchproduct);

//payment
router.post("/captureorder",auth,captureorder);
router.post("/paymentverification",paymentverification);

//order
router.get("/orders",auth,showorders);


module.exports=router;