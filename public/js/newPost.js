const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#techTitle').value.trim();
    const content = document.querySelector('#techContent').value.trim();

    if (title && content) {
        const response = await fetch('/api/tech', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');

        } 
    }
};

// link this to the handlebars

document
    .querySelector('.newPostForm')
    .addEventListener('click', newPostHandler);
