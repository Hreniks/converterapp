window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');
        
    function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();
        let timeRemaining = (dateStop - dateNow) / 1000;
        let seconds = Math.floor(timeRemaining % 60);
        let minutes = Math.floor((timeRemaining / 60) % 60) ;
        let hours = Math.floor(timeRemaining / 60 / 60) % 24;
        
        return {
            timeRemaining,  
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        }
    function updateClock(){
        let timer = getTimeRemaining();
        if (timer.timeRemaining > 0){
        timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
        timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
        timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
        console.log(timer.timeRemaining);
        }
        else {
            clearInterval(updateClock);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
        
    }
    updateClock();
    setInterval(updateClock,1000);
}

    countTimer('06 november 2020');
    //setInterval(countTimer,1000,'06 november 2020');
});