document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/subject')
        .then(response => response.json())
        .then(data => {
            const listDiv = document.getElementById('subjectsList');
            listDiv.innerHTML = '';

            if (data.length === 0) {
                listDiv.innerText = 'No subjects found.';
                return;
            }

            data.forEach(subject => {
                const p = document.createElement('p');
                p.innerText = `Subject ID: ${subject.id}, Name: ${subject.name}`;
                listDiv.appendChild(p);
            });
        })
        .catch(error => console.error('Error:', error));
});
