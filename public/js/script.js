document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('project-form');
    const projectList = document.getElementById('project-list');
  
    // Fetch and display projects
    fetch('/projects')
      .then(response => response.json())
      .then(data => {
        data.forEach(project => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${project.title}</strong>: ${project.description}`;
          projectList.appendChild(li);
        });
      });
  
    // Add a new project
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
  
      fetch('/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      }).then(() => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${title}</strong>: ${description}`;
        projectList.appendChild(li);
  
        // Clear the form
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
      });
    });
  });
  