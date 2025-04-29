document.getElementById('getTrainersBySubjectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const subjectId = document.getElementById('subjectId').value;
  
    fetch(`http://localhost:3000/trainer/${subjectId}/topic`)
      .then(response => response.json())
      .then(data => {
        const trainersDiv = document.getElementById('trainersList');
        trainersDiv.innerHTML = '';
  
        if (Array.isArray(data) && data.length > 0) {
          data.forEach(trainer => {
            const trainerInfo = document.createElement('p');
            trainerInfo.textContent = `ID: ${trainer.emp_id}, Name: ${trainer.name}, Email: ${trainer.email}`;
            trainersDiv.appendChild(trainerInfo);
          });
        } else {
          trainersDiv.innerHTML = `<p>No trainers found for this subject.</p>`;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('trainersList').innerHTML = 'Failed to fetch trainers.';
      });
  });
  