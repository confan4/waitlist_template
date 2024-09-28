document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlist-form');
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submit-btn');
    const message = document.getElementById('message');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm() {
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();

        if (fullName && email && validateEmail(email)) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    fullNameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();

        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ full_name: fullName, email: email }),
            });

            const data = await response.json();

            if (response.ok) {
                message.textContent = 'Thank you for joining our waitlist!';
                message.classList.remove('text-red-500');
                message.classList.add('text-green-500');
                form.reset();
                submitButton.disabled = true;
            } else {
                throw new Error(data.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            message.textContent = error.message;
            message.classList.remove('text-green-500');
            message.classList.add('text-red-500');
        }
    });
});
