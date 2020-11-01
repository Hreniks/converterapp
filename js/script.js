/* Напишите функцию на JS. Цель: Убрать все объекты с типом additional, а для basic очки уменьшить в двое.

Изменить необходимо исходный массив*/
'use strict';
const myLesson = [
    {lesson: 1, type: 'basic', points: 2},
    {lesson: 2, type: 'additional', points: 4},
    {lesson: 3, type: 'basic', points: 6},
    {lesson: 4, type: 'additional', points: 3},
    {lesson: 5, type: 'basic', points: 4},
    {lesson: 6, type: 'basic', points: 2},
    {lesson: 7, type: 'additional', points: 2},
    {lesson: 8, type: 'basic', points: 6},
    {lesson: 9, type: 'basic', points: 4},
    {lesson: 10, type: 'basic', points: 6},
    {lesson: 11, type: 'additional', points: 5}, 
    {lesson: 12, type: 'basic', points: 2}, 
    {lesson: 13, type: 'additional', points: 2}, 
    {lesson: 14, type: 'basic', points: 4},
    {lesson: 15, type: 'additional', points: 1},
    {lesson: 16, type: 'additional', points: 7},
  ];
  

function newMyLesson(){


    return myLesson.filter((item) => {
                if (item.type !== 'additional'){
                    return item;
                }}).map((item) => {
                    if (item.type === 'basic' && item !== undefined){
                        item.points = item.points / 2;           
                        }
                    return item;
                });
}

//newMyLesson();
console.log('newMyLesson(): ', newMyLesson());


//   function newArr(...arr){
//         //console.log(...arr);
//     let result = arr.filter((item) => {
//         if (item.type !== 'additional'){
//             return item;
//         }
//     });
//     //let [lesson,basic,points] = result;
//         result = result.filter((item) =>{
//             if (item.type === 'basic'){
//                 item.points = item.points / 2;

//             }
//             return item;
//         });
//       arr = result.map(item => item);
//     return arr;
//   }
  
  //console.log('newArr(myLesson);: ', newArr(...myLesson));\


//     console.log(arr);
//    let result = myLesson.map((item) => {
//         if (item.type !== 'additional'){
//             return item;
//         }
//     });
//     console.log(arr);
//     result = result.map((item) =>{
//         if (item.type === 'basic' && item !== undefined){
//             item.points = item.points / 2;
            
//         }
//          return item;
//     });
//      return arr;