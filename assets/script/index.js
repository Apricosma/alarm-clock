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
    document.querySelector('.current-time').innerText = time; 

    // updates every 1 second
    let t = setTimeout(function(){ localTime() }, 1000);
}
localTime();

