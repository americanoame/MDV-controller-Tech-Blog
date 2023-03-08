const editPostHandler = async (event) => {
    event.preventDefault();

    const edit = $('#editPost').val().trim();
    const content = $('#editContent').val().trim();
    const editId = $('#editId').val();


    if (title && content) {
        const response = await fetch(`/api/tech/${editId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
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
    .querySelector('.tech_id')
    .addEventListener('click', editPostHandler);
