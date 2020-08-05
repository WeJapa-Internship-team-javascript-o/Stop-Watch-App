//get the start-button
const startButton = document.getElementById('start');
//get reset button
const resetButton = document.getElementById('reset');
//get lap button
const lapButton = document.getElementById('lap');
//get timer display
const timerDisplay = document.getElementById('timer-display');


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
    if (savedTime){
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


    //event-listener for start-button
    startButton.addEventListener('click', function startTimer() {
        if(!running){
          startTime = new Date().getTime();
          tInterval = setInterval(getToShowTime, 1);
      // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   
       
          paused = 0;
          running = 1;
        //   timerDisplay.style.background = "#FF0000";
          timerDisplay.style.cursor = "auto";
        //   timerDisplay.style.color = "yellow";
          startButton.classList.add('lighter');
        //   pauseTimerButton.classList.remove('lighter');
          startButton.style.cursor = "auto";
        //   pauseTimerButton.style.cursor = "pointer";
          startButton.textContent = 'Stop';
          resetButton.style.visibility = 'visible';
          lapButton.style.visibility = 'visible';
        }
      }
);

