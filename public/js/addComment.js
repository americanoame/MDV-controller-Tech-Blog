const addNewHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#addComment').value.trim();
    console.log(comment);

    const tech_id = window.location.pathname.split('/').slice(-1)[0];
    try {
        if (comment) {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ comment, tech_id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.reload();

            } else {
                alert('Failed to coment!');
            }
        }
        
    } catch (err) {
        console.log(err);
    }

};

document
    .querySelector('#addComment')
    .addEventListener('click', addNewHandler);
