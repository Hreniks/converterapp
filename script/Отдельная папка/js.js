"use strict";
let date = new Date();
let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
let today = date.getDay();
let time = date.getTime();
let newYear = new Date('January 1, 2021 00:00:00');
console.log(newYear);
console.log('seconds', seconds);
console.log('minutes', minutes);
console.log('hours', hours);
console.log('today', today);
console.log('time: ', time);
console.log('date', date);
//switch (hours){
//     case (hours > 5 && hours <= 12):
//         document.body.textContent = 'Доброе утро';
//         break;

//     case (hours > 12 && hours <= 16):
//         document.body.textContent = 'Добрый день';
//         break;

//     case (hours > 16 && hours <= 24):
//         document.body.textContent = 'Добрый вечер';
//     break;

//     case (hours > 0 && hours <= 5 ):
//         document.body.textContent = 'Доброй ночи';
//     break;
    
//     default:
//         document.body.textContent = 'Не то';

// }

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

function ampm(hours){
    if (hours >=0 && hours <12) return 'AM';
    else return 'PM';
}

function getTime(){
    
return date.toLocaleString('en-US',{hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric'});
}



function countDays(){
    return Math.floor((newYear - date) / 86400000);
}



alert(`${out(hours)}
Сегодня: ${getWeekDay(today)}
Текущее время: ${getTime()}
До нового года осталось: ${countDays()} дней`);