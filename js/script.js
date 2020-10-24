"use strict";
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = document.getElementById('start');
console.log('start: ', start);
const addIncomeBtn = document.getElementsByTagName('button')[0];
const addExpensesBtn = document.getElementsByTagName('button')[1];
const depositCheckBox = document.querySelector('deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];


const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');

let appData = {
	income:{},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    start: function() {

       
        appData.budget = +salaryAmount.value;
        console.log('salaryAmount.value: ', salaryAmount.value);
        // appData.asking();
        // 
        // appData.getTargetMonth();
        // console.log('Бюджет на день: ', appData.getBudget());
        // appData.getStatusIncome();
        // appData.getInfoDeposit();
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', function(){
                incomePeriodValue.value = appData.calcPeriod();
        });
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !==''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (item.value !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            addExpensesBtn.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem,addIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3){
            addIncomeBtn.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;
        }
        });
    },
    getIncome: function(){
       incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== ''){
            appData.income[itemIncome] = cashIncome;
        }
       });
    
    //}
    },
	getExpensesMonth: function() {
		let sum = 0;
		for (const key in appData.expenses) {
			sum += +appData.expenses[key];
		}
		appData.expensesMonth = sum; 
		return appData.expensesMonth;
    },
    getIncomeMonth: function(){
        let sum = 0;
        for (const key in appData.income) {
        sum += +appData.income[key];
        }
        appData.incomeMonth = sum;
        return appData.incomeMonth;
    },

	getBudget: function() {
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.getExpensesMonth();
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
		return appData.budgetMonth;
	},

	getTargetMonth: function() {
		return targetAmount.value / appData.getBudget();
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

	calcPeriod: function(){
		return appData.budgetMonth * periodSelect.value;
	}
};
// start.addEventListener('click',function(){
   
// });
start.addEventListener('mouseup',function(){
    if (salaryAmount.value === ''){ 
        alert('Введите месячный доход!');
        start.setAttribute('disabled', 'disabled');
        salaryAmount.addEventListener('input',function(){
            start.removeAttribute('disabled');
        });
    }
});
start.addEventListener('click', appData.start);  
addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
addIncomeBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input',function(){
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.innerHTML = periodSelect.value; 
});






