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

//get share button
const shareButton=document.querySelector("#share-button");

//get facebook icon
const facebookIcon = document.querySelector(".fa-facebook");

//get twitter icon
const twitterIcon = document.querySelector(".fa-twitter");

//declared variables
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let paused = 0;
let running = 0;
let seconds;
let minutes;
let hours;
let milliseconds = 0;

//Get to show time
function getToShowTime() {
    updatedTime = new Date().getTime();

    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
            difference =  updatedTime - startTime;
    }
        
    hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    

    milliseconds++;
    if (milliseconds===100) {
        milliseconds = 1;
    }

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds= (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timerDisplay.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

//startTimer function
function startTimer() {
    if(!running){
        startTime = new Date().getTime();
        tInterval = setInterval(getToShowTime, 10);
      // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   
        
    paused = 0;
    running = 1;
    timerDisplay.style.cursor = "auto";      
    }
    resetButton.style.display = 'block';
    resetButton.style.visibility = 'visible';
    lapButton.style.visibility = 'visible';
    startButton.innerHTML = 'Stop';   //..... removed this two since they have no effect on the code and a stop button was created
    //startButton.removeAttribute('id');     
    startButton.style.display = 'none';
    button2.appendChild(stopButton);
    stopButton.style.display = "block";  //added this
    lapButton.style.display = "block";
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
      //lapButton.disabled = true;
    } else {
        // if the timer was already paused, when they click pause again, start the timer again
        startTimer();
        stopButton.innerHTML = 'Stop';
    }
});   

let listItem;

let lastLap = {mins:0, secs:0, hrs:0, mls:0};// to save the former lap time values
function lapTimer() {
// the seconds, minutes and hours variables are from getToShowTime function
    let lapMilli;
    if (milliseconds < lastLap.mls) {
        seconds-=1;
        lapMilli = parseInt(milliseconds) + 100 - parseInt(lastLap.mls);
    }
    else {
        lapMilli = parseInt(milliseconds) - parseInt(lastLap.mls);
    }
    
    let lapSeconds;
    if ((seconds < lastLap.secs) && (minutes>0)) {
        minutes-=1;
        lapSeconds= parseInt(seconds)  + 60 - parseInt(lastLap.secs);
    }
    else {
        lapSeconds = parseInt(seconds) - parseInt(lastLap.secs);
    }

    let lapMinutes;
    if (minutes < lapMinutes) {
        hours-=1;
        minutes= parseInt(minutes) + 60;
        lapMinutes= parseInt(minutes) - parseInt(lastLap.mins);
    }
    else {
        lapMinutes = parseInt(minutes) - parseInt(lastLap.mins);
    }

    let lapHours = parseInt(hours) - parseInt(lastLap.hrs);

    if(lapSeconds < 10) {
        lapSeconds = "0" + lapSeconds;
        parseInt(lapSeconds);
    }
    if (lapMinutes < 10) {
        lapMinutes = "0" + lapMinutes;
        parseInt(lapMinutes);
    }

    if (lapHours < 10) {
        lapHours = "0" + lapHours;
        parseInt(lapHours);
    }
    lastLap = {
        //saving the former value of minutes and seconds
        mins:minutes,
        secs:seconds,
        hrs:hours,
        mls:milliseconds
    }
    let lapWrapper=document.querySelector("#lap-wrapper");
    let lapList=document.querySelector("#laplist")
    listItem=document.createElement("li");
    listItem.setAttribute("id", "lp");
    let listContent = document.createTextNode(`${lapHours}:${lapMinutes}:${lapSeconds}:${lapMilli}`);
    lapList.appendChild(listItem);
    listItem.appendChild(listContent);
    lapWrapper.appendChild(lapList);
}

//event-listener for lap 
lapButton.addEventListener('click',lapTimer);

//event-listener for reset button
resetButton.addEventListener('click', function(){
    clearInterval(tInterval);
    savedTime = 0;
    running = 0;
    paused = 0;
    timerDisplay.innerHTML = "00:00:00";
    startButton.innerHTML = 'Start';
    stopButton.style.display = "none";
    resetButton.style.display = "none";
    lapButton.style.display = "none";
    startButton.style.display = 'block';

    console.log(lastLap = {mins:0, secs:0, hrs:0, mls:0});

    while(lap.firstChild){
        lap.firstChild.remove();
    }

})

//twitter-icon share button event-listener
twitterIcon.addEventListener('click', function(){
    let url="https://wejapa-internship-team-javascript-o.github.io/Stop-Watch-App/"
    let text="My Stopwatch link"
    let sharer = "http://twitter.com/share?text="+text+"&url="+url;
    window.open(sharer, 'sharer', 'width=626,height=436');
});

//facebook-icon share button event-listener
facebookIcon.addEventListener('click', function(){
    let url="https://wejapa-internship-team-javascript-o.github.io/Stop-Watch-App/"
    let sharer = "https://www.facebook.com/sharer/sharer.php?u=" + url;
    window.open(sharer, 'sharer', 'width=626,height=436');

})

