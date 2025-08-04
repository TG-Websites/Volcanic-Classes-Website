document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const paymentId = urlParams.get('paymentId');
    const amount = urlParams.get('amount');

    if (!orderId || !paymentId || !amount) {
        console.error('Missing orderId, paymentId, or amount in URL');
        document.querySelector('main').innerHTML = '<p class="text-center text-red-500">Error: Payment details missing.</p>';
        return;
    }

    document.getElementById('orderId').textContent = orderId;
    document.getElementById('paymentId').textContent = paymentId;
    document.getElementById('amount').textContent = (amount / 100).toFixed(2); // Convert from paise to rupees

    // try {
    //     // Fetch order details from your backend
    //     const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const result = await response.json();

    //     if (result.success) {
    //         const order = result.data;
    //         document.getElementById('courseTitle').textContent = order.course ? order.course.title : 'N/A';
    //         document.getElementById('courseType').textContent = order.courseType || 'N/A';
    //         document.getElementById('studentName').textContent = order.studentName || 'N/A';
    //         document.getElementById('mobileNumber').textContent = order.mobileNumber || 'N/A';
    //         document.getElementById('className').textContent = order.className || 'N/A';
    //     } else {
    //         console.error('Failed to fetch order details:', result.message);
    //         document.querySelector('#orderId').textContent += ' (Details not available)';
    //     }
    // } catch (error) {
    //     console.error('Error fetching order details:', error);
    //     document.querySelector('#orderId').textContent += ' (Error loading details)';
    // }

    // Download Receipt Button Logic
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
    downloadReceiptBtn.addEventListener('click', () => {
        window.location.href = `http://localhost:5000/api/receipts/${orderId}`;
    });
});