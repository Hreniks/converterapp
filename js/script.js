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

const AppData = function () {

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
};


//AppData.prototype.check = 

AppData.prototype.start = function () {

    this.budget = +salaryAmount.value;
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();

};

AppData.prototype.reset = function () {

    resetBtn.style.display = 'none';
    start.hidden = false;

    document.querySelectorAll('input').forEach(function (item) {
        item.value = '';
        periodSelect.value = 1;
    });

    document.querySelectorAll('.result-total').forEach(function (item) {
        item.value = 0;
        if (item === additionalIncomeValue || item === additionalExpensesValue) {
            item.value = 'Наименования';
        }
        else if (item === targetMonthValue) {
            item.value = 'Срок';
        }
    });

    for (let i = 0; i < expensesItems.length; i++) {
        if (i !== 0) {
            expensesItems[i].remove();
        }
    }

    for (let i = 0; i < incomeItems.length; i++) {
        if (i !== 0) {
            incomeItems[i].remove();
        }
    }


    inputsTypeText.forEach(function (item) {
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
};
    AppData.prototype.showResult = function () {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = _this.calcPeriod();
        });
    };
    AppData.prototype.getAddExpenses = function () {
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    };
    AppData.prototype.getAddIncome = function () {
        const _this = this;
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                _this.addIncome.push(itemValue);
            }
        });

    };
    AppData.prototype.addExpensesBlock = function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            addExpensesBtn.style.display = 'none';
        }
    };
    AppData.prototype.addIncomeBlock = function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            addIncomeBtn.style.display = 'none';
        }
        console.log('addIncomeBlock', incomeItems);
    };
    AppData.prototype.getExpenses = function () {
        const _this = this;
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });

    };
    AppData.prototype.getIncome = function () {
        const _this = this;
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
               _this.income[itemIncome] = cashIncome;
            }
        });
    };
    AppData.prototype.getExpensesMonth = function () {
        let sum = 0;
        for (const key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
        return this.expensesMonth;
    };
    AppData.prototype.getIncomeMonth = function () {
        let sum = 0;
        for (const key in this.income) {
            sum += +this.income[key];
        }
        this.incomeMonth = sum;
        return this.incomeMonth;
    };

    AppData.prototype.getBudget = function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return this.budgetMonth;
    };

    AppData.prototype.getTargetMonth = function () {
        return targetAmount.value / this.getBudget();
    };

    AppData.prototype.calcPeriod = function () {
        return this.budgetMonth * periodSelect.value;
    };

    const appData = new AppData();

    AppData.prototype.eventListeners = function(){
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
        
        
        //let fooStart = this.start.bind(appData);
        start.addEventListener('click', appData.start.bind(appData));  
        addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
        addIncomeBtn.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input',function(){
            let periodAmount = document.querySelector('.period-amount');
            periodAmount.innerHTML = periodSelect.value; 
        });
    };

   
    
    console.log(appData);







