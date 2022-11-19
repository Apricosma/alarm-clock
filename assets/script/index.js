'use strict';

// Utility Functions
// Add event listener
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

// element selector function
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

// page selectors
let currentTime = select('.current-time');
let inputTime = select('.input-time');
let setAlarm = select('.set-alarm');
let alarmOutput = select('.alarm-output');
let resetAlarm = select('.reset-alarm');

// Main clock
function localTime() {
    // gets all the times needed
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = 'AM';

    // AM/PM checker
    if (hh == 0) {
        hh = 12;
    }
    if (hh > 12) {
        hh = hh - 12;
        session = 'PM';
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss; 

    // output
    let time = hh + ":" + mm + ":" + ss + "" + session;

    // select document timer
    currentTime.innerText = time; 

    // updates every 1 second
    let t = setTimeout(function(){ localTime() }, 1000);
    return date;
}
localTime();

function setAlarmTime() {
    let alarm = inputTime.value.trim();
    
    let hourString = alarm.toString().substring(0, 2);
    let minuteString = alarm.toString().substring(3, 5);
    let secondString = alarm.toString().substring(6, 8);
    let hour = parseInt(hourString);
    let minute = parseInt(minuteString);
    let second = parseInt(secondString);

    // sets alarmTime to current date
    let alarmTime = new Date();

    alarmTime.setHours(alarmTime.getHours() + hour);
    alarmTime.setMinutes(alarmTime.getMinutes() + minute);
    alarmTime.setSeconds(alarmTime.getSeconds() + second);

    alarmOutput.innerText = alarmTime.toLocaleTimeString();

    return alarmTime;
}


function alarmValue() {
    let val = setAlarmTime();
    let alarmVal = val.getTime();
    // console.log(`Function: ${alarmVal}`); 
 
    return alarmVal;
}

// Set functionality
onEvent('click', setAlarm, function() {
    setAlarmTime();
    alarmRinger();
    ringSound();
});

let ringing = false;
function alarmRinger () {

    let alarmVal = alarmValue();

    function ringAlarm() {
        let currentTime = Number(localTime());
        if (currentTime >= alarmVal) {
            console.log(`Ring alarm`);
            ringing = true;
            clearInterval(interval);
        }
    }
    let interval = setInterval(ringAlarm, 1000);
}

const alarmRinging = new Audio('./assets/media/alarm.mp3');
alarmRinging.type = 'audio/mp3';
alarmRinging.preload = 'auto';

function ringSound () {
    if (ringing) {
        alarmRinging.play();
        document.body.style.backgroundImage = "url('https://fauux.neocities.org/bg_66.gif')";
    }
    let soundInterval = setInterval(ringSound, 500);
}