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
//const period = 3;
// let exspenses1;
// let exspenses2;
// let exspenses = [];
// const cost1 = prompt("Во сколько это обойдется?");
// const cost2 = prompt("Во сколько это обойдется?");

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    misson: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function(){
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "интернет, такси, коммуналка");
			appData.addExpenses = addExpenses.toLowerCase().split(', ');
			appData.deposit = confirm('Есть ли у вас депозит в банке?');

			for (let i = 0; i < 2; i++) {

				let expense = prompt('Введите обязательную статью расходов?');
				let cost;
				do {
				 cost = +prompt('Во сколько это обойдется?');
				}
				while (!isNumber(cost));

				appData.expenses[expense] = cost;

			}
			console.log( appData.expenses );
    },

    getExpensesMonth: function() {
        let sum = 0;

		for (let key in appData.expenses) {
			sum += +appData.expenses[key];
		}
		return sum;
    },

    getBudget: function() {
		appData.budgetMonth = +appData.budget - appData.getExpensesMonth();
		console.log('budgetMonth: ', appData.budgetMonth);
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
		console.log('budgetDay: ', appData.budgetDay);
    },
    getTargetMonth: function() {
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
        if (appData.period < 0 || appData.period === 0) appData.period = 'Цель не будет достигнута';
        else appData.period = 'Цель будет достигнута через ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяцев';
        console.log( appData.period );
		return appData.period;
    },

    getStatusIncome: function() {
		if (appData.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода');
		} else if ( appData.budgetDay >= 600 && appData.budgetDay < 1200) {
			return ('У вас средний уровень дохода');
		} else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
			return ('К сожалению у вас уровень дохода ниже среднего');
		} else if (appData.budgetDay === 0) {
			return ('Все очень плохо');
		} else {
			return ('Что-то пошло не так');
		}
	}
};

appData.asking();
console.log( 'Расходы за месяц: ', appData.getExpensesMonth() );

appData.getBudget();
console.log( 'Бюджет на месяц: ', appData.budgetMonth );
console.log( 'Бюджет на день: ', appData.budgetDay );

appData.getTargetMonth();



console.log( appData.getStatusIncome() );

console.log( 'Наша программа включает в себя данные:' );
for (let key in appData) {
	console.log( 'свойство: ' + key + ' Значение: ' + appData[key] + '\n');
}