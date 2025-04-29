document.getElementById('deleteTrainerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const empId = document.getElementById('empId').value;

    // Send DELETE request with the empId in the URL
    fetch(`http://localhost:3000/trainer/${empId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.message || 'Trainer deleted successfully!';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'Failed to delete trainer!';
    });
});
