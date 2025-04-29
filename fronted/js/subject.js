document.getElementById('addSubjectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('subjectName').value;

    fetch('http://localhost:3000/subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.message || 'Subject added successfully!';
    })
    .catch(error => console.error('Error:', error));
});
