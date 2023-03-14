const CommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#addComment').value.trim();
    console.log('comment:', comment);

    const tech_id = window.location.pathname.split('/').reverse()[0];
    
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
                alert('Failed to comment!');
            }
        }
        
    } catch (err) {
        console.log(err);
    }

};

document
    .querySelector('.addComment')
    .addEventListener('submit', CommentHandler);
