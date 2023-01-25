const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#nameSignup').value.trim();
    const email = document.querySelector('#emailSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashbord');
            // alert('You have signed up!')
        } else {
            alert('Failed to sign up.');
        }
    }
};

document
    .querySelector('#signupBtn')
    .addEventListener('click', signupFormHandler);