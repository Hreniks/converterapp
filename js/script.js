'use strict';

function getResult(x,y){
    let result;
    result = Math.pow(x,y).toString();
    result = Array.from(result).reduce((sum,current) => {
        return Number(sum) + Number(current);
    },0);
    return result;
  }
  
  console.log(getResult(4, 8));