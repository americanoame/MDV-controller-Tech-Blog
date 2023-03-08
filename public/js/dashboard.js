const bntHandler = async (event) => {

    if (event.target.dataset.id) {
        const { id, function: btnFunction } = event.target.dataset;
        console.log('data-id: ', id);
        console.log('data-function: ', btnFunction);

        if (btnFunction === 'delete') {
            const delBtn = confirm("Do you want to delete the blog?");
            if (delBtn) {
                const response = await fetch(`/api/tech/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    alert('Failed to delete blog');
                }
            }
        } else if (btnFunction === 'edit') {
            document.location.replace(`/tech/edit/${id}`);
        }
    }
}


document
    .querySelector(".tech-list")
    .addEventListener('click', bntHandler);