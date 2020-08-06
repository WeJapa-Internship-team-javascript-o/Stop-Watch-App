

//get the start-button DOM
const startButton = document.getElementById('start');

//get reset button DOM
const resetButton = document.getElementById('reset');

//get lap button DOM
const lapButton = document.getElementById('lap');

//get timer display DOM
const timerDisplay = document.getElementById('timer-display');

//get stop-button DOM and add content and id
const stopButton = document.createElement('button');
stopButton.setAttribute('id', 'stop');
stopButton.innerHTML = 'Stop';

//get button-2 DOM
const button2 = document.getElementById('button-2');

//get lap DOM
const lap = document.getElementById('laplist');

//event-listener for lap 
lapButton.addEventListener('click', function() {
    lap.style.display = 'block';
    var lapValue = document.createElement('li');
    lapValue.setAttribute('class', 'lp');
    lapValue.innerHTML = timerDisplay.innerHTML;
    lap.appendChild(lapValue);
})

//declared variables
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let paused = 0;
let running = 0;



//Get to show time
function getToShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
            difference =  updatedTime - startTime;
    }
        
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    //let milliseconds = Math.floor((difference % (1000 * 60)) / 100);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    //milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds; //+ ':' + milliseconds;
}


//startTimer function
function startTimer() {
    if(!running){
        startTime = new Date().getTime();
        tInterval = setInterval(getToShowTime, 1);
      // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   
       
    paused = 0;
    running = 1;
    timerDisplay.style.cursor = "auto";      
    }
    resetButton.style.display = 'block';
    lapButton.style.display = 'block';
    //startButton.innerHTML = 'Stop';   ..... removed this two since they have no effect on the code and a stop button was created
    //startButton.removeAttribute('id');     
    startButton.style.display = 'none';
    button2.appendChild(stopButton);
    stopButton.style.display = "block";  //added this
    lapButton.disabled = false;
}


//event-listener for start-button
startButton.addEventListener('click', startTimer);


//event -listener for the stop-button
stopButton.addEventListener('click', function pauseTimer() {
    if (!difference){
       // if timer never started, don't allow pause button to do anything
     } else if (!paused) {
      clearInterval(tInterval);
      savedTime = difference;
      paused = 1;
      running = 0;
      //startButton.style.cursor = "pointer";..... removed this since it has no effect on the code
      stopButton.innerHTML = 'Continue'; // changed to Continue
      lapButton.disabled = true;
    } else {
        // if the timer was already paused, when they click pause again, start the timer again
        startTimer();
        stopButton.innerHTML = 'Stop';
    }
});    

//event-listener for reset button
resetButton.addEventListener('click',function(){
    clearInterval(tInterval);
    savedTime = 0;
    running = 0;
    paused = 0;
    timerDisplay.innerHTML = "00:00:00";
    stopButton.innerHTML = 'Stop';
    stopButton.style.display = "none";
    resetButton.style.display = "none";
    lapButton.style.display = "none";
    startButton.style.display = 'block';

    while(lap.firstChild){
        lap.firstChild.remove();
    }

})
