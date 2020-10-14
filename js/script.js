"use strict";
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 0;
const income = "Фриланс";
const addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "интернет, такси, коммуналка");
const deposit = confirm("Есть ли у вас депозит в банке?");
const mission = 1000000;
const period = 3;
let exspenses1;
let exspenses2;
let exspenses = [];
// const amount1 = prompt("Во сколько это обойдется?");
// const amount2 = prompt("Во сколько это обойдется?");

let start = function () {
    do {
        money = prompt("Ваш месячный доход?");
    }
    while (!isNumber(money));

};

start();

const showTypeOf = function (data) {
    console.log(data, typeof (data));
};

function getExpensesMonth() {
    let sum = 0;
    let cost;

    for (let i = 0; i < 2; i++) {
        exspenses[i] = prompt("Введите обязательную статью расходов");
        cost = +prompt("Во сколько это обойдется?");
        if (!isNumber(cost) || cost === 0 || cost === '') {
            while (!isNumber(cost)) {
                cost = +prompt("Во сколько это обойдется?");
            }
            if (isNumber(cost)){
                sum += cost;
            }
        }
        else if (isNumber(cost)){
            sum += cost;
        }
    }
    console.log(exspenses);
    return sum;

}       // как это сделать проще???!!

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
    return Number(money) - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth() {
    const target = Math.ceil(mission / accumulatedMonth);
    if (target < 0) return console.log("Цель не будет достигнута");
    else return target;
}

const getStatusIncome = function () {
    if (budgetDay >= 1200) { return console.log("У вас высокий доход"); }
    else if (budgetDay >= 600 && budgetDay < 1200) { return console.log("У вас средний уровень дохода"); }
    else if (budgetDay < 600 && budgetDay >= 0) { return console.log("К сожалению у вас уровень дохода ниже среднего"); }
    else if (budgetDay < 0) { return console.log("Что то пошло не так"); }
    else { return console.log("error"); }
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log("Расходы за месяц: ", expensesAmount);
console.log(addExpenses.toLowerCase().split(','));
console.log("Цель будет достигнута за: ", getTargetMonth());
console.log('Бюджет на день: ', budgetDay);
getStatusIncome();
