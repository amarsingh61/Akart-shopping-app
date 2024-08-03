import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import summaryApi from "./helper/summaryApi";
import { useEffect, useState } from "react";
import Context from "./context/context";
import { useDispatch } from "react-redux";
import { setuserdetails } from "./store/userslice";
import Adminpanel from "./pages/Adminpanel";
import Allusers from "./pages/Allusers";
import Allproducts from "./pages/Allproducts";
import Categoryproducts from "./pages/Categoryproducts";
import "./App.css";
import Productdetails from "./pages/Productdetails";
import Cart from "./pages/Cart";
import Searchproduct from "./pages/Searchproduct";
import Privateroute from "./helper/Privateroute";
import Orders from "./pages/Orders";

function App() {

  const dispatch=useDispatch();
  const [cartproductscount,setcartproductscount]=useState(0);

  const fetchuserdetails=async()=>{
    const apidata=await fetch(summaryApi.userdetails.url,{
      method:summaryApi.userdetails.method,
      credentials:"include"
    });

    const dataresponse=await apidata.json();
    //console.log(dataresponse.data);
    if(dataresponse.success)
    {
      dispatch(setuserdetails(dataresponse?.data));
    }
    
  }

  const fetchcartproductscount=async()=>{
    const fetchdata=await fetch(summaryApi.countcartproducts.url,{
      method:summaryApi.countcartproducts.method,
      credentials:"include"
    });

    const dataresponse=await fetchdata.json();
    //console.log(dataresponse?.data);
    setcartproductscount(dataresponse?.data?.count);
  }


  useEffect(()=>{
    fetchuserdetails();
    fetchcartproductscount();
  },[])

  return (
    <Context.Provider value={{fetchuserdetails,fetchcartproductscount,cartproductscount}}>
      <div className="App bg-slate-200 flex flex-col">

        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<Signup/>}/>
          <Route element={
            <Privateroute>
              <Adminpanel/>
            </Privateroute>
          }>
            <Route path="/admin-panel/all-users" element={<Allusers/>}/>
            <Route path="/admin-panel/all-products" element={<Allproducts/>}/>
          </Route>
          <Route path="/category/:id" element={<Categoryproducts/>}/>
          <Route path="/product-details/:id" element={<Productdetails/>}/>
          <Route path="cart" element={
            <Privateroute>
              <Cart/>
            </Privateroute>
          }/>
          <Route path="/search" element={<Searchproduct/>}/>
          <Route path="orders" element={
              <Orders/>
          }/>
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
