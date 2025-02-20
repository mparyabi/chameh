export async function processPayment(amount, method) {
    // try {
    //     // درخواست به یک API فرضی درگاه پرداخت
    //     const response = await fetch('https://api.paymentgateway.com/charge', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             amount,
    //             method
    //         })
    //     });

    //     const result = await response.json();

    //     // بررسی موفقیت پرداخت
    //     if (result.status === 'success') {
    //         return { success: true };
    //     } else {
    //         return { success: false, error: result.error };
    //     }
    // } catch (error) {
    //     console.error("Payment processing error:", error);
    //     return { success: false, error: "Payment failed" };
    // }

    return({success:true});
}
