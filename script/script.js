window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours');
        const timerMinutes = document.querySelector('#timer-minutes');
        const timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime();
            const timeRemaining = (dateStop - dateNow) / 1000;
            const seconds = Math.floor(timeRemaining % 60);
            const minutes = Math.floor((timeRemaining / 60) % 60);
            const hours = Math.floor(timeRemaining / 60 / 60) % 24;

            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        function updateClock() {
            const timer = getTimeRemaining();
            if (timer.timeRemaining > 0) {
                timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
                timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
                timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
            } else {
                clearInterval(updateClock);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    countTimer('11 november 2020');
    //setInterval(countTimer,1000,'06 november 2020');



    //menu
    const toggleMenu = () => {

        // const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        // const closeBtn = document.querySelector('.close-btn');
        // const menuItems = menu.querySelectorAll('ul>li');
        // const menuBlock = document.querySelector('.menu-div');



        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };




        //btnMenu.addEventListener('click', handlerMenu);
        document.body.addEventListener('click', event => {


            if (event.target.closest('.menu') || event.target.closest('menu') || event.target.closest('.close-btn')) {
                handlerMenu();
            } else if (!event.target.closest('menu') && menu.classList.contains('active-menu')) {
                handlerMenu();
            }

        });


        //closeBtn.addEventListener('click', handlerMenu);

        // for (let i = 0; i < menuItems.length; i++) {
        //     menuItems[i].addEventListener('click', handlerMenu);
        // }

        // menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

        //    menuItems[0].addEventListener('click', () => {
        //     document.querySelector('.service').scrollBy({behavior: 'smooth', block: 'start'});
        //    });



    };


    //scroll menu
    const ScrollLinks = () => {
        const menu = document.querySelector('menu');
        const smoothLinks = menu.querySelectorAll('a[href^="#"]');
        for (let i = 1; i < smoothLinks.length; i++) {

            smoothLinks[i].addEventListener('click', e => {
                e.preventDefault();
                const id = smoothLinks[i].getAttribute('href');
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });

        }

        const scrollBtn = document.querySelector("body > main > a");
        scrollBtn.addEventListener('click', e => {
            e.preventDefault();
            const id = scrollBtn.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
    ScrollLinks();
    toggleMenu();



    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popUpClose = document.querySelector('.popup-close');
        const popupContent = document.querySelector('.popup-content');
        const popupInputs = document.getElementById('form3').querySelectorAll('input');

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
            popupInputs.forEach((item) =>{
                item.value = '';
            });
        });

        const showPopup = () => {
            popup.style.display = 'block'; // показать попап
            if (window.innerWidth > 768) { // если ширина экрана больше заданного числа, то запустить анимацию
                const start = Date.now(); // получить стартовое время анимации (в момент клика)
                const timer = setInterval(() => {
                    const timePassed = Date.now() - start; // запуск таймера, отнять от текущего реального времени стартовое время, после клика
                    if (timePassed >= 800) {
                        clearInterval(timer); // если время достигло определенного числа удалить setInterval
                        return;
                    }
                    draw(timePassed); // отрисовка анимации
                });
                const draw = timePassed => {
                    let wContent = +getComputedStyle(popupContent).width.split('px')[0]; // получить стили попап контента (блок с самой формой, а не вся обёртка, с попап )
                    wContent = -wContent / 2 + 50 + 'px'; // данные для центрирования по горизонтали
                    popupContent.style.left = timePassed / 16 + '%'; // центрирование по горизонтали
                    popupContent.style.marginLeft = wContent; // центрирование по горизонтали
                };
            }
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', showPopup);
        });

    };
    togglePopUp();


    //tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');


        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;

            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });

    };

    tabs();

    //добавить точки


    const addDots = () => {
        const slidesCount = document.querySelectorAll('.portfolio-item').length;

        for (let i = 0; i < slidesCount; i++) {
            let dot = document.createElement('li');
            dot.classList.add('dot');
            document.querySelector('.portfolio-dots').append(dot);
        }


    };

    addDots();

    //slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        const dot = document.querySelectorAll('.dot');
        const slider = document.querySelector('.portfolio-content');

        let currentSlide = 0;
        let interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };


        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };



        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) return;

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            }
            else if (target.matches('#arrow-left')) {
                currentSlide--;
            }
            else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');


        });


        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });


        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();


    const commandImg = () => {
        const commandBlock = document.getElementById('command');
        let oldPicture;


        commandBlock.addEventListener('mouseover', (e) => {
            let target = e.target;

            if (target.classList.contains('command__photo')) {
                oldPicture = target.src;
                target.src = target.dataset.img;
            }
        });


        commandBlock.addEventListener('mouseout', (e) => {
            let target = e.target;

            if (target.classList.contains('command__photo')) {
                target.src = oldPicture;
            }
        });
    };

    commandImg();



    const validationCalc = () => {
        const calcBlock = document.querySelector('.calc');

        calcBlock.addEventListener('input', (e) => {
            if (e.target.classList.contains('calc-item') && !e.target.classList.contains('calc-type')) {
                e.target.value = e.target.value.replace(/\D/g, '');
            }
        });
    };

    validationCalc();


    //калькулятор
    const Calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total'),
            calcCount = document.querySelector('.calc-count');
        let total = 0;
        let interval;

        const countSum = () => {

            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = +calcSquare.value;


            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay && calcDay.value < 10) {
                dayValue *= 1.5;
            }


            if (typeValue && squareValue) {
                total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
            }

            // totalValue.textContent = total;
        };

        const calcAnim = () => {
            const time = 3000;
            const step = 10;

            let n = 0;
            let t = Math.round(time / (total / step));
            interval = setInterval(() => {
                n += step;
                if (n === total) {
                    clearInterval(interval);
                }
                else {
                    totalValue.innerHTML = n + 10;

                }
            }, t);
        };


        calcBlock.addEventListener('change', (e) => {
            const target = e.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();

                clearInterval(interval);
                if (total !== 0) {
                    calcAnim();
                }
            }
        });

    };

    Calc(100);


    //send-ajax-form


    const sendForm = () => {
        const errorMessage = `Что то пошло не так...`,
            loadMessage = `Загрузка...`,
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form1 = document.getElementById('form1');
        const form2 = document.getElementById('form2');
        const form3 = document.getElementById('form3');
        const form1Inputs = form1.querySelectorAll('input');
        const form2Inputs = form2.querySelectorAll('input');
        const form3Inputs = form3.querySelectorAll('input');

        const statusMessage = document.createElement('div');
        //statusMessage.textContent = 'текст';
        //statusMessage.style.cssText = `font-size: 2rem`;
        //statusMessage.style.cssText = `color: #ffff`;




        function addAnimation(body) {
            let dynamicStyles = null;
            if (!dynamicStyles) {
                dynamicStyles = document.createElement('style');
                dynamicStyles.type = 'text/css';
                dynamicStyles.classList = 'dinamic-styles';
                form1.appendChild(dynamicStyles);
                form2.appendChild(dynamicStyles);
                form3.appendChild(dynamicStyles);
            }

            dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
        }

        addAnimation(`
    @keyframes sk-rotating-plane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
    `);



        form1.addEventListener('submit', (event) => {
            event.preventDefault();

            statusMessage.classList = 'sk-rotating-plane';
            statusMessage.style = `
            width: 4em;
            height: 4em;
            margin: auto;
            background-color: #337ab7; 
            -webkit-animation: sk-rotating-plane 1.2s infinite ease-in-out;
            animation: sk-rotating-plane 1.2s infinite ease-in-out;
        `;
            form1.appendChild(statusMessage);
            const form1Data = new FormData(form1);
            let body = {};

            form1Data.forEach((val, key) => {
                body[key] = val;
            });

            postData(body, () => {
                document.querySelector('style').remove();
                statusMessage.removeAttribute('style');
                statusMessage.textContent = successMessage;
                let interval = setTimeout(() => {
                    statusMessage.remove();
                    clearTimeout(interval);
                },5000);
            }, (error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
            });

            // if (form1.querySelector('.form-phone').value){
            //     let re = /^\d[\d\(\)\ -]{4,14}\d$/;
            //     let valid = re.test(form1.querySelector('.form-phone').value);
            //     if (!valid){
            //         statusMessage.textContent = 'Номер телефона введен не правильно!';
            //     }
            // }
            // else {
            //     event.preventDefault();
            //     statusMessage.textContent = `Введите телефон!`;
            // }



            form1Inputs.forEach((item) => {    
                item.value = '';
            });

        });

        const formValid = (name) => {
            let form = document.getElementById(name);
            form.addEventListener('input', (e) => {
                if (e.target.classList.contains('form-phone')) {
                    e.target.value = e.target.value.replace(/[^+0-9]/ig, '');
                    if (/^8/ig.test(e.target.value)){
                        let validPhone = e.target.value.substring(e.target.value.indexOf('8'),e.target.value.length - 1);
                        if (e.target.value.length > 11){
                            e.target.value = e.target.value.replace(e.target.value,validPhone);
                        }
                    }
                    else if (/^\+/ig.test(e.target.value)){
                        let plusPhone = e.target.value.substring(e.target.value.indexOf('+'),e.target.value.length - 1);
                        if (e.target.value.length > 12){
                            e.target.value = e.target.value.replace(e.target.value, plusPhone);
                        }
                    }
                }
                if (e.target.classList.contains('form-name')) {
                    e.target.value = e.target.value.replace(/[^а-яё\s]/ig, '');
                }

                if (e.target.classList.contains('mess')) {
                    e.target.value = e.target.value.replace(/[^а-яё\s]/ig, '');
                }

                if (e.target.classList.contains('form-email')){
                    let stringMail = e.target.value.substring(e.target.value.indexOf('@'), e.target.value.length - 1);
                    
                    
                    if (/@[\w\-*+*=*#*$*]{10,}/ig.test(e.target.value)){
                         e.target.value = e.target.value.replace(/@[\w.\-+=#$*]{10,}/ig, stringMail);
                    }
                   
                
                    
                    let stringDomen = e.target.value.substring(e.target.value.lastIndexOf('.'), e.target.value.length-1);
                    if (/\.{1}\w{5,}/.test(e.target.value)){
                        e.target.value = e.target.value.replace(/\.{1}\w{6,}/ig, stringDomen);
                    }
                    
                    
                }
            });
        };



        form2.addEventListener('submit', (e) => {
            e.preventDefault();
            statusMessage.classList = 'sk-rotating-plane';
            statusMessage.style = `
            width: 4em;
            height: 4em;
            margin: auto;
            background-color: #337ab7; 
            -webkit-animation: sk-rotating-plane 1.2s infinite ease-in-out;
            animation: sk-rotating-plane 1.2s infinite ease-in-out;
        `;
            form2.appendChild(statusMessage);
            //statusMessage.textContent = loadMessage;

            const form2Data = new FormData(form2);
            let body = {};

            form2Data.forEach((val, key) => {
                body[key] = val;
            });

            

            postData(body, () => {
                document.querySelector('style').remove();
                statusMessage.removeAttribute('style');
                statusMessage.textContent = successMessage;
            }, (error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
            });


            form2Inputs.forEach((item) => {
                
                item.value = '';
            });
        });


        form3.addEventListener('submit', (e) => {
            e.preventDefault();
            statusMessage.classList = 'sk-rotating-plane';
            statusMessage.style = `
            width: 4em;
            height: 4em;
            margin: auto;
            background-color: #337ab7; 
            -webkit-animation: sk-rotating-plane 1.2s infinite ease-in-out;
            animation: sk-rotating-plane 1.2s infinite ease-in-out;
        `;
            form3.appendChild(statusMessage);
            statusMessage.style.color = '#ffff';
           // statusMessage.textContent = loadMessage;

            const form3Data = new FormData(form3);
            let body = {};

            form3Data.forEach((val, key) => {
                body[key] = val;
            });

            

            postData(body, () => {
                document.querySelector('style').remove();
                statusMessage.removeAttribute('style');
                statusMessage.style.color = '#ffff';
                
                statusMessage.textContent = successMessage;
               
            }, (error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
            });


            form3Inputs.forEach((item) => {
                item.value = '';
            });

            let timeout = setTimeout(()=>{
                document.querySelector('.popup').style.display = 'none';
                statusMessage.remove();
                clearTimeout(timeout);
            },5000);
        });

        formValid('form1');
        formValid('form2');
        formValid('form3');

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    outputData();
                }
                else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');

            request.send(JSON.stringify(body));
        };
    };
    sendForm();
});
