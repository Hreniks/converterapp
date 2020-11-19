document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars');
    const output = document.getElementById('output');

    const result = (data) =>{
            data.cars.forEach(item => {
               
                if (item.brand === select.value) {
                    console.log(item);
                    const {brand, model, price} = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
                }
                else if (select.value === 'no'){
                    output.textContent = `выбери тачку`;
                }
            });
        };

        const out = () =>{
            output.innerHTML = `Произошла ошибка`;
        };

    const promise = () => {
            return new Promise((resolve,reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.send();
        
        
                request.addEventListener('readystatechange', () => {
                    console.log(request.status);
                    if (request.readyState === 4 && request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        resolve(result(data));
                    } else {
                        reject();
                    }
                });
            });
        };
        
    select.addEventListener('change',() => promise().then(result).catch(out));        

});