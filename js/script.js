"use strict";
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function () {
    do {
        money = prompt("Ваш месячный доход?");
    }
    while (!isNumber(money));

};


const period = 3;
let exspenses1;
let exspenses2;
let exspenses = [];
// const amount1 = prompt("Во сколько это обойдется?");
// const amount2 = prompt("Во сколько это обойдется?");



start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    misson: 50000,
    period: 3,
    asking: function(){
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "интернет, такси, коммуналка");
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");

    }
}

function getExpensesMonth() {
    let sum = 0;
    let cost;
    

    for (let i = 0; i < 2; i++) {
        exspenses[i] = prompt("Введите обязательную статью расходов");
        do {
            cost = +prompt('Во сколько это обойдется?');
        }
        while(!isNumber(cost) || cost === 0);
    
        sum+=cost;
    }
    return sum;

} 

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
    return Number(money) - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth() {
    const target = Math.ceil(mission / accumulatedMonth);
    if (target < 0) console.log("Цель не будет достигнута");
    else console.log("Цель будет достигнута pf " , target);
    return target;
}

const getStatusIncome = function () {
    if (budgetDay >= 1200) { return console.log("У вас высокий доход"); }
    else if (budgetDay >= 600 && budgetDay < 1200) { return console.log("У вас средний уровень дохода"); }
    else if (budgetDay < 600 && budgetDay >= 0) { return console.log("К сожалению у вас уровень дохода ниже среднего"); }
    else if (budgetDay < 0) { return console.log("Что то пошло не так"); }
    else { return console.log("error"); }
}; 

console.log("Расходы за месяц: ", expensesAmount);

getTargetMonth();
console.log('Бюджет на день: ', budgetDay);
getStatusIncome();