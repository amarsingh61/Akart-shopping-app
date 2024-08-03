const crypto = require("crypto");
const Order = require("../../models/ordermodel");

const paymentverification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartproducts,totalamount } = req.body;

        const digest = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedsignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                        .update(digest.toString())
                                        .digest("hex");

        if (expectedsignature === razorpay_signature) {
            if (!cartproducts || cartproducts.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Cart is empty"
                });
            }

            const userId = cartproducts[0].userId;
            const orderData = {
                userId: userId,
                productdetails: cartproducts.map(product => ({
                    productId: product.productId,
                    quantity: product.quantity
                })),
                paymentdetails: {
                    payment_id: razorpay_payment_id,
                    payment_status: true
                },
                totalamount:totalamount
            };

            const order = await Order.create(orderData);

            return res.status(200).json({
                success: true,
                message: "Payment Successful",
                data: order
            });

        } else {
            return res.status(500).json({
                success: false,
                message: "Payment failed"
            });
        }
    } catch (error) {
        console.error("Error in payment verification:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = paymentverification;
