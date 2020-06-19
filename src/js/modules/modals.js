const modals = () => {

    // содержит информацию нажали ли какую-либо кнопку
    let btnPressed;
    // содержит информацию о том, было ли открыто окно с подарком
    let giftOpened;

    // Определение ширины полосы прокрутки
    function calcScroll() {
        const div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    function openModal(modalWindow) {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        let scrollWidth = calcScroll();
        document.body.style.marginRight = `${scrollWidth}px`;
        changeElementMarginScroll('.fixed-gift');
        modalWindow.classList.add('fadeIn');
    }
    
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelectorAll(closeSelector),
            allModals = document.querySelectorAll('[data-modal]');

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            changeElementMarginScroll('.fixed-gift');
        }

        // закрытие всех окон на странице (если ранее были открыты)
        function closeAllModals() {
            allModals.forEach(item => {
                item.style.display = 'none';
            });
        }

        // открытие при клике на кнопки и скрытие Подарка после его открытия
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                if (e.target === document.querySelector('.fixed-gift')) {
                    item.style.visibility = 'hidden';
                    giftOpened = true;
                }
                closeAllModals();
                openModal(modal);
                btnPressed = true;
            });
        });

        // закрытие при клике на крестик
        close.forEach(item => {
            item.addEventListener('click', () => {
                closeAllModals();
                closeModal();
            });
        });

        // закрытие при клике на подложку
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                closeModal();
                closeAllModals();
            }
        });
        
    }

    // проверка на то, что хотя бы одно окно открыто
    function checkOpenModal() {
        let display;
        document.querySelectorAll('[data-modal]').forEach(item => {
            if (getComputedStyle(item).display !== 'none') {
                display = "block";
            } 
        });
        if (display) {
            return true;
        } else {
            return false;
        }
    }

    // открытие модалки через время (если нет открытых окон)
    function showModalByTime(selector, time) {
        setTimeout(function() {
            if (!checkOpenModal()) {
                openModal(document.querySelector(selector));
            }
        }, time);
    }

    // Добавляем отступ справа для элемента, когда убрана полоса прокрутки. Можно вставить любой элемент, но требовалось для Гифта. Далее эта функция используется при каждом открытии и закрытии модального окна
    function changeElementMarginScroll(selector) {
        const elem = document.querySelector(selector);
        let elemRight = +(getComputedStyle(elem).right.replace(/\D/g, '')) + calcScroll();
        if (checkOpenModal()) {
            elem.style.right = `${elemRight}px`;
        } else {
            elem.style.right = '';
        }
    }

    // открывает модальное окно при долистывании до конца экрана (только в том случае, если до этого ни одна кнопка не была нажата и окно с подарком еще не открывалось). После этого Подарок скрывается
    function scrollBottomOpen(modalSelector, triggerSelector) {
        window.addEventListener('scroll', () => {
            if (!giftOpened && !btnPressed && (document.documentElement.scrollHeight <= document.documentElement.clientHeight + document.documentElement.scrollTop)) {
                openModal(document.querySelector(modalSelector));
                document.querySelector(triggerSelector).style.visibility = 'hidden';
                giftOpened = true;
        }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-close');
    scrollBottomOpen('.popup-gift', '.fixed-gift');
    showModalByTime('.popup-consultation', 60000);

};

export default modals;