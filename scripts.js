let myMinutes = document.getElementById('myMinutes');
let mySeconds = document.getElementById('mySeconds');
let myStartButton = document.getElementById('myStartButton');
let myResetButton = document.getElementById('myResetButton');
let myWorkDuration = document.getElementById('myWorkDuration');
let myBreakDuration = document.getElementById('myBreakDuration');
let myProgressBar = document.getElementById('myProgressBar');
let myAlarmSound = document.getElementById('myAlarmSound');

let myInterval;
let myIsWorkTime = true;
let myTimeLeft = myWorkDuration.value * 60;

function myUpdateTime() {
    let myMin = Math.floor(myTimeLeft / 60);
    let mySec = myTimeLeft % 60;
    myMinutes.textContent = myMin < 10 ? '0' + myMin : myMin;
    mySeconds.textContent = mySec < 10 ? '0' + mySec : mySec;
    myUpdateProgressBar();
}

function myUpdateProgressBar() {
    let myTotalTime = myIsWorkTime ? myWorkDuration.value * 60 : myBreakDuration.value * 60;
    let myPercentage = ((myTotalTime - myTimeLeft) / myTotalTime) * 100;
    myProgressBar.style.width = myPercentage + '%';
}

function myStartTimer() {
    myInterval = setInterval(() => {
        if (myTimeLeft > 0) {
            myTimeLeft--;
            myUpdateTime();
        } else {
            clearInterval(myInterval);
            myAlarmSound.play();
            mySwitchMode();
        }
    }, 1000);
    myStartButton.disabled = true;
}

function mySwitchMode() {
    myIsWorkTime = !myIsWorkTime;
    myTimeLeft = myIsWorkTime ? myWorkDuration.value * 60 : myBreakDuration.value * 0;
    myUpdateTime();
    myStartTimer();
}

function myResetTimer() {
    clearInterval(myInterval);
    myIsWorkTime = true;
    myTimeLeft = myWorkDuration.value * 60;
    myUpdateTime();
    myStartButton.disabled = false;
}

myStartButton.addEventListener('click', myStartTimer);
myResetButton.addEventListener('click', myResetTimer);
myWorkDuration.addEventListener('change', myResetTimer);
myBreakDuration.addEventListener('change', myResetTimer);

myUpdateTime(); 
