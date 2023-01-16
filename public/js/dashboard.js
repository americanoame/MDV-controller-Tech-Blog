const dashboardFormHandler = async (event) => {
    event.preventDefault();

    if (dashboard === "data-id") {
        const id = dashboard.getAttribute('data-id');
        console.log("data-id", id);

        if (dashboard === "delete") {
            const erase = confirm("would like to delete your post")
            if (erase) {
                const response = await fetch(`/api/tech/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    document.location.replace('/dashbord');
                } else {
                    alert("Failed to sign up.");
                }
            }

        } else if (dashboard === "edit") {
           document.location.raplace(`/tech/edit/${id}`);
        }
    }
}

document
    .querySelector(".tech")
    .addEventListener('submit', dashboardFormHandler);