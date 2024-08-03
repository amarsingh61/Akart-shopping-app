import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../helper/summaryApi'
import context from '../context/context';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = () => {
    const [data,setdata]=useState([]);
    const [loading,setloading]=useState(false);
    const Context=useContext(context);
    const user=useSelector(state=>state?.user?.user);
    //console.log(data);


    const fetchcartproducts=async()=>{
        setloading(true);
        const fetchdata=await fetch(summaryApi.cartproducts.url,{
            method:summaryApi.cartproducts.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            }
        });

        const responsedata=await fetchdata.json();
        
        if(responsedata.success)
            setdata(responsedata.data);
        //console.log(responsedata);
        setloading(false);
    }

    const updateproductquantity=async(e,id)=>{
        const {value}=e.target;

        const fetchdata=await fetch(summaryApi.updatecartproductquantity.url,{
            method:summaryApi.updatecartproductquantity.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id:id,
                quantity:value
            })
        });

        const responsedata=await fetchdata.json();

        if(responsedata.success)
        {
            fetchcartproducts();
        }
    }

    const removeproductfromcart=async(id)=>{
        const fetchdata=await fetch(summaryApi.removeproductfromcart.url,{
            method:summaryApi.removeproductfromcart.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id:id,
            })
        });

        const responsedata=await fetchdata.json();

        if(responsedata.success)
        {
            fetchcartproducts();
            Context.fetchcartproductscount();

        }
    }

    const handlepayment=async()=>{
        const fetchdata=await fetch(summaryApi.captureorder.url,{
            method:summaryApi.captureorder.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({amount:totalsellingPrice})
        });

        const order=await fetchdata.json();
        //console.log(order.data);
        
        const options = {
            key:"rzp_test_9IPJEgFLDgFg91",
            amount: order.data.amount,
            currency: "INR",
            name: "AmarKart",
            description: "Shop Everything U Need",
            image: `${user?.profilepic}`,
            order_id: order.data.id,
            //callback_url: "http://localhost:3000/paymentverification",
            prefill: {
                name:`${user.username}`,
                email: `${user.email}`,
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            },
            handler: async function (response) {
                // Payment is successful, verify payment on server
                //console.log(response);
                const verificationResponse = await fetch(summaryApi.paymentverify.url, {
                    method: summaryApi.paymentverify.method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        cartproducts:data,
                        totalamount:totalsellingPrice
                    })
                });

                const verificationResult = await verificationResponse.json();
                //console.log(verificationResult);

                if (verificationResult.success) {
                    // Redirect to success page
                    window.location.href = "/orders"; // Replace with your actual success page URL
                } else {
                    // Handle verification failure
                    window.location.href = "/cart"
                }
            }
        };

        const razor=new window.Razorpay(options);
        razor.open();

    }

    useEffect(()=>{
        setloading(true);
        fetchcartproducts();
        setloading(false);
    },[]);

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0);
    const totalsellingPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingprice) ,0);
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.price) ,0);   
    

  return (
    <div className='pt-20 px-10 pb-3 min-h-screen flex gap-5'>
        {
            loading?
            (   <div className='mx-auto my-auto'> 
                    <div role="status">
                        <svg aria-hidden="true" className="w-16 h-16 text-gray-50 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className=' text-xl'>Loading...</span>
                    </div>
                </div>
            )
            :
            (
                <>
                {
                    data.length===0 ?
                    (   <div className=' flex flex-col justify-center items-center w-[50vw] h-[30vh] bg-white mx-auto my-auto gap-10 rounded'>
                            <p className='text-3xl font-semibold '>No Item in Cart</p>
                            <Link to="/" className='bg-red-700 py-2 px-20 rounded-full hover:bg-red-900 text-white cursor-pointer text-center font-semibold '>Continue Shopping</Link>
                        </div>
                    )
                    :
                    (
                        <>
                            <div className='w-[50vw] flex flex-col gap-3'>
                                {
                                    data?.map((product,index)=>(
                                        <div key={index} className='bg-white max-h-[28vh] h-[28vh] min-h-[28vh] rounded flex gap-8 shadow-md shadow-orange-950'>
                                        <Link to={`/product-details/${product?.productId?._id}`} className='bg-slate-300 w-[15vw]'>
                                            <img src={product?.productId?.productimage[0]} className=' object-scale-down h-[27vh] w-[15vw] p-2 mix-blend-multiply hover:scale-105 transition-all'/>
                                        </Link>
                                        <div className='flex flex-col gap-2 p-2 w-[30vw]'>
                                            <p className=' text-2xl capitalize font-semibold line-clamp-1 text-ellipsis'>{product?.productId?.productname}</p>
                                            <div className='flex flex-col justify-around'>
                                                <div className=' text-lg font-semibold capitalize text-slate-500'>
                                                    {product?.productId?.category}
                                                </div>
                                                <div className='flex gap-6'>
                                                    <label htmlFor='quantity' className=' font-medium'>Quantity</label>
                                                    <select name='quantity' id='quantity' className='px-2' value={product?.quantity} onChange={(e)=>updateproductquantity(e,product._id)}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <p className=' text-lg font-semibold text-red-500'>{product?.productId?.sellingprice}</p> 
                                                <p className=' text-lg font-semibold text-slate-500 '>{product?.productId?.sellingprice * product?.quantity}</p> 
                                            </div>
                                            <div className='p-2 flex justify-around'>
                                                <div className=' bg-red-700 text-white py-1 px-4 rounded-full hover:bg-red-900 cursor-pointer' onClick={()=>removeproductfromcart(product._id)}>Delete</div>
                                            </div>
                                        </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='bg-white h-[50vh] w-[30vw] ml-36 mt-8 rounded shadow-md shadow-orange-950 flex flex-col'>
                                <div className='bg-slate-400 rounded-b-none rounded text-center p-2 text-lg font-semibold'>Summary</div>
                                <div className='flex justify-between px-8 py-2 text-lg '>
                                    <p>Quantity: </p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex justify-between px-8 py-2 text-lg '>
                                    <p>Total Price: </p>
                                    <p>{totalPrice}</p>
                                </div>
                                <div className='flex justify-between px-8 py-2 text-lg '>
                                    <p>Discount: </p>
                                    <p>{totalPrice-totalsellingPrice}</p>
                                </div>
                                <div className='flex justify-between px-8 py-2 text-lg '>
                                    <p>Amount: </p>
                                    <p>{totalsellingPrice}</p>
                                </div>
                                <Link to={"/"} className='mt-3 bg-slate-300 py-2 px-4 rounded-full hover:bg-slate-600 hover:text-white cursor-pointer w-3/4 mx-auto text-center font-semibold '>Continue Shopping</Link>
                                <div className='mt-3 bg-red-700 text-white py-2 px-4 rounded-full hover:bg-red-900 cursor-pointer w-3/4 mx-auto text-center font-semibold ' onClick={handlepayment}>Proceed to Payment</div>
                            </div>
                        </>
                    )
                }
            </>
            )
        }
        
        
    </div>
  )
}

export default Cart