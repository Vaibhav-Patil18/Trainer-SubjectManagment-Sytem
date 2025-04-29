document.getElementById('addTrainerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('trainerName').value;
    const email = document.getElementById('trainerEmail').value;
    const subject_id = document.getElementById('subjectId').value; // <-- New
  
    fetch('http://localhost:3000/trainer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject_id }) // <-- include subject_id
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // See the response
      document.getElementById('responseMessage').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
  });
  