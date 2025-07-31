
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container') || document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '1000';
    document.body.appendChild(toastContainer);

    const toast = document.createElement('div');
    toast.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.marginBottom = '10px';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease-in-out';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const admissionForm = document.querySelector('form'); // Assuming there's only one form or you'll need a more specific selector

    if (admissionForm) {
        admissionForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitButton = admissionForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            const formData = new FormData(admissionForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            try {
                const response = await fetch('http://localhost:5000/api/admissions/inquiries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    showToast(result.message || 'Admission inquiry submitted successfully!', 'success');
                    admissionForm.reset();
                } else {
                    showToast(result.error || 'Failed to submit admission inquiry.', 'error');
                }
            } catch (error) {
                console.error('Error submitting admission inquiry:', error);
                showToast('An error occurred. Please try again later.', 'error');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit'; // Or original text
                }
            }
        });
    }
});
