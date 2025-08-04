// payment.js
import {

    showToast,
} from './ui.js';
export async function initiateRazorpayPayment({ orderId }) {
    try {
        const res = await fetch("http://localhost:5000/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId })
        });

        const response = await res.json();

        if (response.success) {

            console.log(response)
            const { amount, orderId, razorpay_order_id, key, currency } = response.data;

            const options = {
                key,
                amount,
                currency,
                name: "Volcanic Classes",
                description: "Course Enrollment Fee",
                image: "https://volcanic-classes.netlify.app/images/logo.png",
                order_id: razorpay_order_id,
                handler: async function (response) {
                    try {
                        showToast("success", "✅ Payment Successful! Payment ID: " + response.razorpay_payment_id, "success");

                        const verifyResponse = await fetch("http://localhost:5000/api/payments/verify-client", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId
                            }),
                        });

                        const result = await verifyResponse.json();

                        if (!result.success) {
                            showToast("error", "❌ Payment verification failed. Please contact support.", "error");
                            return;
                        }
                        console.log(result)
                        const data = result.data;

                        showToast("success", "✅ Payment verified successfully.", "success");
                        window.location.href = `payment-complete.html?orderId=${data.orderId}&paymentId=${data.paymentId}&amount=${amount}`;

                    } catch (error) {
                        console.error("Verification error:", error);
                        showToast("error", "❌ Error verifying payment. Please try again.", "error");
                    }
                }

                ,
                theme: {
                    color: "#CE3852"
                }
            };

            const rzp = new Razorpay(options);
            rzp.open();
        }
        else {
            showToast("error", "❌ Order not created", "error");
        }
    } catch (err) {
        console.error("❌ Razorpay Error:", err);
        showToast("error", "❌ Failed to initiate payment. Please try again.", "error");
    }
}
