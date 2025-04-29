window.onload = () => {
    fetch('http://localhost:3000/trainer')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('trainerList');
            data.forEach(trainer => {
                const li = document.createElement('li');
                li.textContent = `${trainer.name} - ${trainer.email}`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
};
