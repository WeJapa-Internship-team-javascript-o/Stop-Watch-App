const startButton = document.getElementById('start');

const resetButton = document.getElementById('reset');

const lapButton = document.getElementById('lap');

startButton.addEventListener('click', ($event) => {
    startButton.textContent = 'Stop';
    resetButton.style.visibility = 'visible';
    lapButton.style.visibility = 'visible';


}) 