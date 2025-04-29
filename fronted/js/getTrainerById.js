document.getElementById('getTrainerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const empId = document.getElementById('empId').value;

    fetch(`http://localhost:3000/trainer/${empId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('trainerInfo').innerText = `Name: ${data.name}, Email: ${data.email}`;
        })
        .catch(error => console.error('Error:', error));
});
