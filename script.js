window.addEventListener('DOMContentLoaded', () => {
    const inputRub = document.querySelector('.input-rub');
    const inputDol = document.querySelector('.input-dol');
    const inputEur = document.querySelector('.input-eur');
    const select = document.querySelector('#select');
    const dolSpan = document.querySelector('.dol-span');
    const eurSpan = document.querySelector('.eur-span');
    const dolTotal = document.querySelector('.dol-total');
    const eurTotal = document.querySelector('.eur-total');
    const button = document.querySelector('#convert');
    fetch('https://api.exchangeratesapi.io/latest?base=USD')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        dolTotal.textContent =  (data.rates.RUB).toFixed(2) + '₽';
    });


    fetch('https://api.exchangeratesapi.io/latest?base=EUR')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        eurTotal.textContent =  (data.rates.RUB).toFixed(2) + '₽';
    });

    select.addEventListener('change', () =>{
        if (select.value === 'usd'){
            inputRub.setAttribute('placeholder', '$$$');
            dolSpan.textContent = 'Рубль';
            eurSpan.textContent = 'Евро';
            inputDol.setAttribute('placeholder', '₽₽₽');
            inputEur.setAttribute('placeholder', '€€€');
            inputDol.value = '';
            inputEur.value = '';
        }
        if (select.value === 'eur'){
            inputRub.setAttribute('placeholder', '€€€');
            dolSpan.textContent = 'Рубль';
            eurSpan.textContent = 'Доллар';
            inputDol.setAttribute('placeholder', '₽₽₽');
            inputEur.setAttribute('placeholder', '$$$');
            inputDol.value = '';
            inputEur.value = '';
        }
        if (select.value === 'rub') {
            inputRub.setAttribute('placeholder', '₽₽₽');
            dolSpan.textContent = 'Доллар';
            eurSpan.textContent = 'Евро';
            inputDol.setAttribute('placeholder', '$$$');
            inputEur.setAttribute('placeholder', '€€€');
            inputDol.value = '';
            inputEur.value = '';
        }
    });

    button.addEventListener('click', () =>{
        if (select.value === 'rub')
        fetch('https://api.exchangeratesapi.io/latest?base=RUB')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            inputDol.value = (inputRub.value * data.rates.USD).toFixed(2) + '$';  
            inputEur.value = (inputRub.value * data.rates.EUR).toFixed(2) + '€'; 
        });

        if (select.value === 'usd')
        fetch('https://api.exchangeratesapi.io/latest?base=USD')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            inputDol.value = (inputRub.value * data.rates.RUB).toFixed(2) + '₽';  
            inputEur.value = (inputRub.value * data.rates.EUR).toFixed(2) + '€'; 
        });

        if (select.value === 'eur')
        fetch('https://api.exchangeratesapi.io/latest?base=EUR')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            inputDol.value = (inputRub.value * data.rates.RUB).toFixed(2) + '₽';  
            inputEur.value = (inputRub.value * data.rates.USD).toFixed(2) + '$'; 
        });
    });
});

