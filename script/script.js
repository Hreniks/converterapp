window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime();
            let timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60) % 24;

            return {
                timeRemaining,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function updateClock() {
            let timer = getTimeRemaining();
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

    countTimer('08 november 2020');
    //setInterval(countTimer,1000,'06 november 2020');



    //menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const menuItems = menu.querySelectorAll('ul>li');


        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].addEventListener('click', handlerMenu);
        }

        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

        //    menuItems[0].addEventListener('click', () => {
        //     document.querySelector('.service').scrollBy({behavior: 'smooth', block: 'start'});
        //    });

        

    };


    //scroll menu
    const ScrollLinks = () => {
        const menu = document.querySelector('menu');
        const smoothLinks = menu.querySelectorAll('a[href^="#"]');
        console.log(smoothLinks);
        for (let i = 1; i < smoothLinks.length; i++) {
           
            smoothLinks[i].addEventListener('click',(e)=>{
                e.preventDefault();
                const id = smoothLinks[i].getAttribute('href');
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        
        }

        const scrollBtn = document.querySelector("body > main > a");
        scrollBtn.addEventListener('click', (e) =>{
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



        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                showPopUp();

            });
        });



        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        function showPopUp() {
            let popupContent = document.querySelector('.popup-content');
            let pos = 0;
            let id = setInterval(frame,10);
            function frame(){
                if (pos ===((parseInt(document.body.clientWidth) / 2) - 100) || document.documentElement.clientWidth <= 768){
                    clearInterval(id);
                }
                else {
                    pos+=1;
                    popupContent.style.left = pos + 'px';
                }
            }

        }

        // document.querySelector('.popup-content')

    };
    togglePopUp();


    //tabs

    const tabs = () =>{
        let tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');


        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++){
                if (index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }
                else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click',(event) => {
            let target = event.target;

            target = target.closest('.service-header-tab');

            if (target){
                tab.forEach((item,i) =>{
                    if (item === target){
                        toggleTabContent(i);
                    }
                });
            }
        });

    };

    tabs();

});