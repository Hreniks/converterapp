'use strict';

const cityArr = {
    rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
    uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
    bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
    jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
  };


  const sel = document.getElementById('country');
  const citySel = document.getElementById('city');
  const selected = citySel.getElementsByTagName('options');
  const h3 = document.getElementsByTagName('h3')[0];
  console.log(sel);
  //console.log(selected);

  document.addEventListener('onload',() =>{
    

  });


  sel.addEventListener('change',() =>{
    
    for (const element in citySel) {
           citySel.remove(element);
        }


    for (const key in cityArr) {
        if (sel.value === key){
           // console.log(cityArr[key]);
            for (const i in cityArr[key]) {
                const newOption = document.createElement('option');
                newOption.textContent = cityArr[key][i];
                //console.log('cityArr[key][i]: ', cityArr[key][i]);
                citySel.appendChild(newOption);
            }
            
            }
        }

        });     

    const sel2 = document.getElementById('city');

    sel2.addEventListener('change', () =>{
        const parent = h3.parentNode;
        let string1 = sel.options[sel.selectedIndex].textContent;
        let string2 = sel2.value;
        let p = document.createElement('p');
        p.textContent = string1 + ',' + string2;
        p.id = 'string';
        if (document.getElementById('string')){
            document.getElementById('string').remove();
        }
        parent.insertBefore(p,h3);
    });


      //   if (sel.value === 'uk'){
          
    //     for (const i in cityArr.uk) {
    //         const newOption = document.createElement('option');
    //         newOption.textContent = cityArr.uk[i];
    //         citySel.appendChild(newOption);
    //     }