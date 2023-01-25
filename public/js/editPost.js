const loginFormHandler = async (event) => {
    event.preventDefault();

    const edit = document.querySelector('#editPost').value.trim();
    const content = document.querySelector('#editConten').value.trim();
    const editId = document.querySelector('#editId').value

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ edit, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // document.location.replace('/dashbord');
            document.location.raplace(`/tech/${id}`);
        } else {
            alert('Failed to edit new post.');
        }
    }
};

document
    .querySelector('.form-horizontal')
    .addEventListener('click', loginFormHandler);
