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

start();

let appData = {
	income:{},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 50000,
	percentDeposit: 0,
	moneyDeposit: 0,
	period: 3,
	budget: +money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function(){

		if (confirm('Есть ли у вас дополнительный источник заработка?')){
			let itemIncome;
			do{
			 itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
			}
			while(isNumber(itemIncome) || itemIncome === '' || itemIncome === undefined || itemIncome === null);


			let cashIncome;
			do{ 
				cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
			}
			while(!isNumber(cashIncome) || cashIncome === 0);
			appData.income[itemIncome] = cashIncome;
		}

		let addExpenses;
		do
		{
		addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "интернет,такси,коммуналка");
		}
		while(isNumber(+addExpenses) || addExpenses === '' || addExpenses === undefined || addExpenses === null);
		appData.addExpenses = addExpenses.toLowerCase().split(','); 
		appData.deposit = confirm("Есть ли у вас депозит в банке?");

		let cost;
		for (let i = 0; i < 2; i++) {
			let expense;
			do
			{
				expense = prompt("Введите обязательную статью расходов");
			}
			while(isNumber(expense) || expense === '' || expense === null);

			do {
				cost = +prompt('Во сколько это обойдется?');
			}
			while(!isNumber(cost) || cost === 0);
			
			appData.expenses[expense] = cost;
			
		}
		 
	},
	getExpensesMonth: function() {
		let sum = 0;
		for (const key in appData.expenses) {
			sum += +appData.expenses[key];
		}
		appData.expensesMonth = sum; 
		return appData.expensesMonth;
	},
	

	getBudget: function() {
		appData.budgetMonth = appData.budget - appData.getExpensesMonth();
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
		return appData.budgetMonth;
	},

	getTargetMonth: function() {
		appData.period = Math.ceil(appData.mission / appData.getBudget());
		if (appData.period < 0) console.log("Цель не будет достигнута");
		else console.log("Цель будет достигнута за: " , appData.period);
		return appData.period;	
	},

	getStatusIncome: function() {
		
		if (appData.budgetDay >= 1200) { return console.log("У вас высокий доход"); }
		else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) { return console.log("У вас средний уровень дохода"); }
		else if (appData.budgetDay < 600 && appData.budgetDay >= 0) { return console.log("К сожалению у вас уровень дохода ниже среднего"); }
		else if (appData.budgetDay < 0) { return console.log("Что то пошло не так"); }
		else { return console.log("error"); }
	},
	

	getInfoDeposit: function(){
		 if(appData.deposit){
			 do
			 {
			 appData.percentDeposit = prompt('Какой годовой процент?', 10);
			 }
			 while(!isNumber(appData.percentDeposit));
			 
			 do
			 {
			 appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
			 }
			 while(!isNumber(appData.moneyDeposit));
		 }
	},

	calcSavedMoney: function(){
		return appData.budgetMonth * appData.period;
	}
};



appData.asking();
console.log(appData.expenses);

console.log('Расходы за месяц: ', appData.getExpensesMonth());
appData.getTargetMonth();
console.log('Бюджет на день: ', appData.getBudget());
appData.getStatusIncome();

for (const key in appData) {
	console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);	
}
appData.getInfoDeposit();

for (let i = 0; i < appData.addExpenses.length; i++){
	appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].substr(1);
}
console.log(appData.addExpenses.join(', '));
