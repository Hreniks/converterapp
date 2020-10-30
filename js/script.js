"use strict";
let isNumber = (n) => {
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
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let inputsTypeText = document.querySelectorAll('input[type=text]');
const resetBtn = document.getElementById('cancel');
let expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
    constructor() {
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
    }

    start() {

        this.budget = +salaryAmount.value;
        this.getExpInc();   
       // this.getIncome();
        //this.getExpenses();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

    }

    reset() {

        resetBtn.style.display = 'none';
        start.hidden = false;

        document.querySelectorAll('input').forEach((item) => {
            item.value = '';
            periodSelect.value = 1;
        });

        document.querySelectorAll('.result-total').forEach((item) => {
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


        inputsTypeText.forEach((item) => {
            item.removeAttribute('disabled');
        });

        addIncomeBtn.removeAttribute('disabled');
        addExpensesBtn.removeAttribute('disabled');
        addIncomeBtn.style.display = 'block';
        addExpensesBtn.style.display = 'block';
        document.getElementById('deposit-check').checked = false;
        //periodSelect.removeAttribute('disabled');

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
    }
    showResult() {
        
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input',() => {
            incomePeriodValue.value = this.calcPeriod();
        });
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            item = item.value.trim();
            if (item.value !== '') {
                this.addIncome.push(item);
            }
        });

    }

    getAddExpInc(){
        
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            addExpensesBtn.style.display = 'none';
        }
    }
    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            addIncomeBtn.style.display = 'none';
        }
    }
    // getExpenses() {
    //     expensesItems.forEach((item) => {
    //         let itemExpenses = item.querySelector('.expenses-title').value;
    //         let cashExpenses = item.querySelector('.expenses-amount').value;
    //         if (itemExpenses !== '' && cashExpenses !== '') {
    //             this.expenses[itemExpenses] = cashExpenses;
    //         }
    //     });
        
    // }
    // getIncome() {
    //     incomeItems.forEach((item) => {
    //         let itemIncome = item.querySelector('.income-title').value;
    //         let cashIncome = item.querySelector('.income-amount').value;
    //         if (itemIncome !== '' && cashIncome !== '') {
    //             this.income[itemIncome] = cashIncome;
    //         }
    //     });
    // }

    getExpInc(){
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);
    }

    getExpensesMonth() {
        let sum = 0;
        for (const key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
        return this.expensesMonth;
    }
    getIncomeMonth() {
        let sum = 0;
        for (const key in this.income) {
            sum += +this.income[key];
        }
        this.incomeMonth = sum;
        return this.incomeMonth;
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return this.budgetMonth;
    }

    getTargetMonth() {
        return targetAmount.value / this.getBudget();
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    eventListeners() {
        start.addEventListener('mouseup',() => {
            if (salaryAmount.value === '') {
                alert('Введите месячный доход!');
                start.setAttribute('disabled', 'disabled');
                salaryAmount.addEventListener('input',() => {
                    start.removeAttribute('disabled');
                });
            }
            else {
                const inputsTypeText = document.querySelectorAll('input[type=text]');

                inputsTypeText.forEach((item) => {
                    item.setAttribute('disabled', 'disabled');

                });
                start.hidden = true;
                addIncomeBtn.setAttribute('disabled', 'disabled');
                addExpensesBtn.setAttribute('disabled', 'disabled');
                resetBtn.style.display = 'block';
                //periodSelect.setAttribute('disabled', 'disabled');
                
            }
        });

        start.addEventListener('click', this.start.bind(appData));
        addExpensesBtn.addEventListener('click', this.addExpensesBlock);
        addIncomeBtn.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input',() => {
            let periodAmount = document.querySelector('.period-amount');
            periodAmount.innerHTML = periodSelect.value;
        });
        resetBtn.addEventListener('click',() => {
            this.reset();
        });
    }
}

const appData = new AppData();
appData.eventListeners();






