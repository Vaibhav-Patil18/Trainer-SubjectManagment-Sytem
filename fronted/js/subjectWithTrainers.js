document.getElementById('subjectForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const subjectId = document.getElementById('subjectId').value;
  
  fetch(`http://localhost:3000/subject/${subjectId}`)
      .then(response => response.json())
      .then(data => {
          // Check if data contains subject information and trainers
          if (data.subject_name && data.trainers) {
              const subjectDetailsDiv = document.getElementById('subjectDetails');
              subjectDetailsDiv.innerHTML = `
                  <h2>Subject: ${data.subject_name}</h2>
                  <h3>Trainers:</h3>
                  <ul>
                      ${data.trainers.map(trainer => `<li>${trainer.name} (${trainer.email})</li>`).join('')}
                  </ul>
              `;
          } else {
              document.getElementById('responseMessage').innerText = 'No trainers found for this subject!';
          }
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('responseMessage').innerText = 'Error fetching details!';
      });
});
