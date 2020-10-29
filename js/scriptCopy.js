"use strict";
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = document.getElementById('start');
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
const expensesAmount = document.querySelector('input.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let inputsTypeText = document.querySelectorAll('input[type=text]');
let resetBtn = document.getElementById('cancel');

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
    start: function(){        
        
        this.budget = +salaryAmount.value;
        // this.asking();
        // 
        // this.getTargetMonth();
        // console.log('Бюджет на день: ', this.getBudget());
        // this.getStatusIncome();
        // this.getInfoDeposit();  
        this.getIncome();        
        this.getExpenses();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        
    },
    reset: function(){
        
        resetBtn.style.display = 'none';
        start.hidden = false;

        document.querySelectorAll('input').forEach(function(item){
            item.value = '';
            periodSelect.value = 1;
        });
        
        document.querySelectorAll('.result-total').forEach(function(item){
            item.value = 0;
            if (item === additionalIncomeValue || item === additionalExpensesValue){
                item.value = 'Наименования';
            }
            else if (item === targetMonthValue){
                item.value = 'Срок';
            }
        });

        for (let i = 0; i < expensesItems.length; i++) {
            if ( i !== 0 ) {
                expensesItems[i].remove();
            }
        }

        for (let i = 0; i < incomeItems.length; i++) {
            if ( i !== 0 ) {
                incomeItems[i].remove();
            }
        }


        inputsTypeText.forEach(function(item){
            item.removeAttribute('disabled');
        });

        addIncomeBtn.removeAttribute('disabled');
        addExpensesBtn.removeAttribute('disabled');
        addIncomeBtn.style.display = 'block';
        addExpensesBtn.style.display = 'block';
        document.getElementById('deposit-check').checked = false;


        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function(){
        incomePeriodValue.value = this.calcPeriod();
        });
    },
    getAddExpenses: function(){
        this.getAddExpenses.bind(appData);
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !==''){
               this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        //this.getAddIncome.bind(appData);
       
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (item.value !== ''){
                this.addIncome.push(itemValue);
            }
        });

    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            addExpensesBtn.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem,addIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3){
            addIncomeBtn.style.display = 'none';
        }
        console.log('addIncomeBlock', incomeItems);
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;
        }
        },appData);

    },
    getIncome: function(){
       incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== ''){
            this.income[itemIncome] = cashIncome;
        }
       },appData);
    //}
    },
	getExpensesMonth: function() {
		let sum = 0;
		for (const key in this.expenses) {
			sum += +this.expenses[key];
		}
		this.expensesMonth = sum; 
		return this.expensesMonth;
    },
    getIncomeMonth: function(){
        let sum = 0;
        for (const key in this.income) {
        sum += +this.income[key];
        }
        this.incomeMonth = sum;
        return this.incomeMonth;
    },

	getBudget: function() {
		this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
		this.budgetDay = Math.floor(this.budgetMonth / 30);
		return this.budgetMonth;
	},

	getTargetMonth: function() {
		return targetAmount.value / this.getBudget();
	},

	getStatusIncome: function() {
		
		if (this.budgetDay >= 1200) { return console.log("У вас высокий доход"); }
		else if (this.budgetDay >= 600 && this.budgetDay < 1200) { return console.log("У вас средний уровень дохода"); }
		else if (this.budgetDay < 600 && this.budgetDay >= 0) { return console.log("К сожалению у вас уровень дохода ниже среднего"); }
		else if (this.budgetDay < 0) { return console.log("Что то пошло не так"); }
		else { return console.log("error"); }
	},
	

	getInfoDeposit: function(){
		 if(this.deposit){
			 do
			 {
			 this.percentDeposit = prompt('Какой годовой процент?', 10);
			 }
			 while(!isNumber(this.percentDeposit));
			 
			 do
			 {
			 this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
			 }
			 while(!isNumber(this.moneyDeposit));
		 }
	},

	calcPeriod: function(){
		return this.budgetMonth * periodSelect.value;
	}
};
// start.addEventListener('click',function(){
   
// });
//let boundFunc = appData.start.bind(appData);
console.log('incomeItems: ', incomeItems);
start.addEventListener('mouseup',function(){
    if (salaryAmount.value === ''){ 
        alert('Введите месячный доход!');
        start.setAttribute('disabled', 'disabled');
        salaryAmount.addEventListener('input',function(){
            start.removeAttribute('disabled');
        });
    }
    else {
        let inputsTypeText = document.querySelectorAll('input[type=text]');
        inputsTypeText.forEach(function(item){
            item.setAttribute('disabled','disabled');
        
        });
        start.hidden = true;
        addIncomeBtn.setAttribute('disabled','disabled');
        addExpensesBtn.setAttribute('disabled','disabled');
        
        resetBtn.style.display = 'block';
        resetBtn.addEventListener('click', function(){
            appData.reset();
        });
    }
   
   
});


let fooStart = appData.start.bind(appData);
start.addEventListener('click', fooStart);  
addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
addIncomeBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input',function(){
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.innerHTML = periodSelect.value; 
});


 



