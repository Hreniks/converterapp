// "use strict";
// let isNumber = function (n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };

// let money;

// let start = function () {
//     do {
//         money = prompt("Ваш месячный доход?");
//     }
//     while (!isNumber(money));

// };

// start();

// let appData = {
// 	income:{},
// 	addIncome: [],
// 	expenses: {},
// 	addExpenses: [],
// 	deposit: false,
// 	mission: 50000,
// 	percentDeposit: 0,
// 	moneyDeposit: 0,
// 	period: 3,
// 	budget: +money,
// 	budgetDay: 0,
// 	budgetMonth: 0,
// 	expensesMonth: 0,
// 	asking: function(){

// 		if (confirm('Есть ли у вас дополнительный источник заработка?')){
// 			let itemIncome;
// 			do{
// 			 itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
// 			}
// 			while(isNumber(itemIncome) || itemIncome === '' || itemIncome === undefined || itemIncome === null);


// 			let cashIncome;
// 			do{ 
// 				cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
// 			}
// 			while(!isNumber(cashIncome) || cashIncome === 0);
// 			appData.income[itemIncome] = cashIncome;
// 		}

// 		let addExpenses;
// 		do
// 		{
// 		addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "интернет,такси,коммуналка");
// 		}
// 		while(isNumber(+addExpenses) || addExpenses === '' || addExpenses === undefined || addExpenses === null);
// 		appData.addExpenses = addExpenses.toLowerCase().split(','); 
// 		appData.deposit = confirm("Есть ли у вас депозит в банке?");

// 		let cost;
// 		for (let i = 0; i < 2; i++) {
// 			let expense;
// 			do
// 			{
// 				expense = prompt("Введите обязательную статью расходов");
// 			}
// 			while(isNumber(expense) || expense === '' || expense === null);

// 			do {
// 				cost = +prompt('Во сколько это обойдется?');
// 			}
// 			while(!isNumber(cost) || cost === 0);
			
// 			appData.expenses[expense] = cost;
			
// 		}
		 
// 	},
// 	getExpensesMonth: function() {
// 		let sum = 0;
// 		for (const key in appData.expenses) {
// 			sum += +appData.expenses[key];
// 		}
// 		appData.expensesMonth = sum; 
// 		return appData.expensesMonth;
// 	},
	

// 	getBudget: function() {
// 		appData.budgetMonth = appData.budget - appData.getExpensesMonth();
// 		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
// 		return appData.budgetMonth;
// 	},

// 	getTargetMonth: function() {
// 		appData.period = Math.ceil(appData.mission / appData.getBudget());
// 		if (appData.period < 0) console.log("Цель не будет достигнута");
// 		else console.log("Цель будет достигнута за: " , appData.period);
// 		return appData.period;	
// 	},

// 	getStatusIncome: function() {
		
// 		if (appData.budgetDay >= 1200) { return console.log("У вас высокий доход"); }
// 		else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) { return console.log("У вас средний уровень дохода"); }
// 		else if (appData.budgetDay < 600 && appData.budgetDay >= 0) { return console.log("К сожалению у вас уровень дохода ниже среднего"); }
// 		else if (appData.budgetDay < 0) { return console.log("Что то пошло не так"); }
// 		else { return console.log("error"); }
// 	},
	

// 	getInfoDeposit: function(){
// 		 if(appData.deposit){
// 			 do
// 			 {
// 			 appData.percentDeposit = prompt('Какой годовой процент?', 10);
// 			 }
// 			 while(!isNumber(appData.percentDeposit));
			 
// 			 do
// 			 {
// 			 appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
// 			 }
// 			 while(!isNumber(appData.moneyDeposit));
// 		 }
// 	},

// 	calcSavedMoney: function(){
// 		return appData.budgetMonth * appData.period;
// 	}
// };



// appData.asking();
// console.log(appData.expenses);

// console.log('Расходы за месяц: ', appData.getExpensesMonth());
// appData.getTargetMonth();
// console.log('Бюджет на день: ', appData.getBudget());
// appData.getStatusIncome();

// for (const key in appData) {
// 	console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);	
// }
// appData.getInfoDeposit();

// for (let i = 0; i < appData.addExpenses.length; i++){
// 	appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].substr(1);
// }
// console.log(appData.addExpenses.join(', '));

const start = document.getElementById('start');
console.log('start: ', start);
const addIncomeBtn = document.getElementsByTagName('button')[0];
const addExpensesBtn = document.getElementsByTagName('button')[1];
const depositCheckBox = document.querySelector('deposit-check');
const additionalIncomeItem1 = document.querySelectorAll('additional_income-item')[0];
const additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

const books = document.querySelector('.books');
const bookElement = document.querySelectorAll('.book');
console.log('books', bookElement);

bookElement[0].before(bookElement[1]);
books.append(bookElement[2]);
bookElement[4].after(bookElement[3]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

const titles = document.getElementsByTagName('a');
console.log('titles: ', titles);
titles[2].textContent = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove();

const item = bookElement[0].getElementsByTagName('li');
console.log('items: ', item);

const book2 = bookElement[0];
const book5 = bookElement[5];
const book6 = bookElement[2];
const book2Chapter1 = book2.getElementsByTagName('li')[3];
const book2Chapter2 = book2.getElementsByTagName('li')[6];
const book2Chapter3 = book2.getElementsByTagName('li')[8];
const book2Chapter4 = book2.getElementsByTagName('li')[4];
const book2Chapter5 = book2.getElementsByTagName('li')[5];
const attC = book2.getElementsByTagName('li')[2];
const attD = book2.getElementsByTagName('li')[10];

book2Chapter1.after(book2Chapter2);
book2Chapter2.after(book2Chapter3);
book2Chapter3.after(book2Chapter4);
book2Chapter4.after(book2Chapter5);
attD.before(attC);

console.log(book5.getElementsByTagName('li'));


const book5Chapter1 = book5.getElementsByTagName('li')[9];
const book5Chapter2 = book5.getElementsByTagName('li')[3];
const book5Chapter3 = book5.getElementsByTagName('li')[4];
const book5Chapter4 = book5.getElementsByTagName('li')[2];
const book5Chapter5 = book5.getElementsByTagName('li')[6];
const book5Chapter6 = book5.getElementsByTagName('li')[7];
const book5AttA = book5.getElementsByTagName('li')[5];
const book5AttB = book5.getElementsByTagName('li')[3];
const book5AttC = book5.getElementsByTagName('li')[10];

book5Chapter2.after(book5Chapter3);
book5Chapter5.after(book5Chapter4);
book5Chapter2.before(book5Chapter1);
book5AttA.before(book5AttB);
book5Chapter6.after(book5AttA);
book5Chapter1.after(book5Chapter2);
book5Chapter4.after(book5Chapter5);


book6.getElementsByTagName('li')[8].innerHTML += '<li>Глава 8: За пределами ES6</li>';
