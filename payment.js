// payment.js
import {
    showToast,
    showLoader,
    hideLoader
} from './ui.js';

export async function initiateRazorpayPayment({ orderId }) {
    try {
        showLoader(); // Show loader immediately when initiating payment

        const res = await fetch("http://localhost:5000/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId })
        });

        const response = await res.json();

        if (response.success) {
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
                        showLoader(); // Keep loader visible while verifying payment

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
                            hideLoader();
                            showToast("error", "❌ Payment verification failed. Please contact support.", "error");
                            return;
                        }

                        const data = result.data;

                        showToast("success", "✅ Payment verified successfully.", "success");
                        // Redirect after short delay (so user sees toast)
                        setTimeout(() => {
                            hideLoader();
                            window.location.href = `payment-complete.html?orderId=${data.orderId}&paymentId=${data.paymentId}&amount=${amount}`;
                        }, 1000);

                    } catch (error) {
                        console.error("Verification error:", error);
                        hideLoader();
                        showToast("error", "❌ Error verifying payment. Please try again.", "error");
                    }
                },
                modal: {
                    ondismiss: function () {
                        // User closed Razorpay popup
                        hideLoader();
                        showToast("info", "⚠️ Payment cancelled.", "info");
                    }
                },
                theme: {
                    color: "#CE3852"
                }
            };

            hideLoader(); // Hide loader before opening Razorpay popup
            const rzp = new Razorpay(options);
            rzp.open();

        } else {
            hideLoader();
            showToast("error", "❌ Order not created", "error");
        }
    } catch (err) {
        console.error("❌ Razorpay Error:", err);
        hideLoader();
        showToast("error", "❌ Failed to initiate payment. Please try again.", "error");
    }
}
