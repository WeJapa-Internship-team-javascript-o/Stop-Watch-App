//get the start-button
const startButton = document.getElementById('start');
//get reset button
const resetButton = document.getElementById('reset');
//get lap button
const lapButton = document.getElementById('lap');

//event-listener for start-button
startButton.addEventListener('click', ($event) => {
    startButton.textContent = 'Stop';
    resetButton.style.visibility = 'visible';
    lapButton.style.visibility = 'visible';


}) 