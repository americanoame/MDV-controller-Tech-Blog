const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#editPost').value.trim();
    const content = document.querySelector('#editContent').value.trim();
    const edit_id = document.getElementById('edit_id').value;
    console.log(edit_id);

    if (title && content) {
        const response = await fetch(`/api/tech/${edit_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            // document.location.replace(`/tech/${edit_id}`);
            // document.location.replace(`/dashboard`);
        } else {
            alert('Failed to edit new post.');
        }
    }
};

document
    .querySelector('.edit_tech')
    .addEventListener('submit', editPostHandler);
