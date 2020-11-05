window.addEventListener('DOMContentLoaded', function(){
    function timer(){
"use strict";
let date = new Date();
let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
let today = date.getDay();
let time = date.getTime();
let newYear = new Date('January 1, 2021 00:00:00');
// console.log(newYear);
// console.log('seconds', seconds);
// console.log('minutes', minutes);
// console.log('hours', hours);
// console.log('today', today);
// console.log('time: ', time);
// console.log('date', date);

function out(hours){
    
    if (hours > 5 && hours <= 12) return 'Доброе утро';
    if (hours > 12 && hours <= 16) return 'Добрый день';
    if (hours > 16 && hours <= 23) return 'Добрый вечер';
    if (hours > 0 && hours <= 5 ) return 'Доброй ночи';
}

function getWeekDay(day) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[day];
  }

  function getTime(){
      return date.toLocaleString('en-US',{hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' });
  }

function getTime(){
    
return date.toLocaleString('en-US',{hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric'});
}



function countDays(){
    return Math.floor((newYear - date) / 86400000);
}



document.querySelector('.welcome').textContent = out(hours);
document.querySelector('.today').textContent = `Сегодня: ${getWeekDay(today)}`;
document.querySelector('.timer').textContent = `Текущее время: ${getTime()}`;
setInterval(() => {
    document.querySelector('.timer').textContent = `Текущее время: ${getTime()}`;
    timer();
},1000);
document.querySelector('.count').textContent = `До нового года осталось: ${countDays()} дней`;
    }
    timer();
});
