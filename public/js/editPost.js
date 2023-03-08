const editPostHandler = async (event) => {
    event.preventDefault();

    const edit = document.querySelector('#editPost').value.trim();
    const content = document.querySelector('#editContent').value.trim();
    const editId = document.querySelector('#editId').value

    if (title && content) {
        const response = await fetch(`/api/users/${editId}`, {
            method: 'PUT',
            body: JSON.stringify({ edit, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // document.location.replace('/dashboard');
            document.location.replace(`/tech/${editId}`);
        } else {
            alert('Failed to edit new post.');
        }
    }
};

document
    .querySelector('.form-horizontal')
    .addEventListener('click', editPostHandler);
