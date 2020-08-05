
const startButton = document.getElementById('start');

const resetButton = document.getElementById('reset');

const lapButton = document.getElementById('lap');

const lap = document.getElementById('laplist');

startButton.addEventListener('click', ($event) => {
    startButton.textContent = 'Stop';
    resetButton.style.visibility = 'visible';
    lapButton.style.visibility = 'visible';
    
})

lapButton.addEventListener('click', ($event) => {
    lap.style.visibility = 'visible';
})