const newBlgHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('tech-title').value.trim();
    const content = document.querySelector('content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/tech`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
    }
  };

  document
  .querySelector('.new-tech-form')
  .addEventListener('submit', newBlgHandler);