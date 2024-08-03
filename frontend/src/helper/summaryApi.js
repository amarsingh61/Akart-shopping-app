

const commondomain="http://localhost:4000";

const summaryApi={
    singup:{
        url:`${commondomain}/v1/auth/sign-up`,
        method:"post"
    },
    login:{
        url:`${commondomain}/v1/auth/login`,
        method:"post"
    },
    userdetails:{
        url:`${commondomain}/v1/auth/user-details`,
        method:"get"
    },
    logout:{
        url:`${commondomain}/v1/auth/logout`,
        method:"get"
    },
    allUser : {
        url : `${commondomain}/v1/auth/alluser`,
        method : 'get'
    },
    updateuser:{
        url :`${commondomain}/v1/auth/updateuser`,
        method:"post"
    },
    addproduct:{
        url:`${commondomain}/v1/auth/upload-product`,
        method:"post"
    },
    allproduct:{
        url:`${commondomain}/v1/auth/get-allproducts`
    },
    deleteproduct:{
        url:`${commondomain}/v1/auth/deleteproduct`,
        method:"post"
    },
    updateproduct:{
        url:`${commondomain}/v1/auth/updateproduct`,
        method:"put"
    },
    productcategories:{
        url:`${commondomain}/v1/auth/productcategories`,
    },
    categorywiseproduct:{
        url:`${commondomain}/v1/auth/categoryproduct`,
        method:"post"
    },
    productdetails:{
        url:`${commondomain}/v1/auth/product-details`,
        method:"post"
    },
    addtoCart:{
        url:`${commondomain}/v1/auth/addtocart`,
        method:"post"
    },
    countcartproducts:{
        url:`${commondomain}/v1/auth/cartproductscount`,
        method:"get"
    },
    cartproducts:{
        url:`${commondomain}/v1/auth/cartproducts`,
        method:"get"
    },
    updatecartproductquantity:{
        url:`${commondomain}/v1/auth/updatecartproductquantity`,
        method:"post"
    },
    removeproductfromcart:{
        url:`${commondomain}/v1/auth/removeproductfromcart`,
        method:"post"
    },
    searchproduct:{
        url:`${commondomain}/v1/auth/searchproduct`,
        method:"get"
    },
    captureorder:{
        url:`${commondomain}/v1/auth/captureorder`,
        method:"post"
    },
    paymentverify:{
        url:`${commondomain}/v1/auth/paymentverification`,
        method:"post"
    },
    showorders:{
        url:`${commondomain}/v1/auth/orders`,
        method:"get"
    }
}

export default summaryApi;