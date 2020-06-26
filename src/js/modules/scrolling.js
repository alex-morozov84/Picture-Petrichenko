const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    // показ и скрытие стрелки для возврата в начало
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // реализация плавного скролла на чистом JS
    // в разных браузерах работают разные команды
    // const element = document.documentElement,
    //     body = document.body;

    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event) {
    //         // здесь автоматически выбирается то, что подходит для данного браузера
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (this.hash !== '') {
    //             event.preventDefault();
    //             // определяем элемент, на который ведет ссылка
    //             let hashElement = document.getElementById(this.hash.substring(1)),
    //             // либо (то же самое)
    //                 // hashElement = document.querySelector(this.hash),
    //                 // определяем сколько пикселей надо пролистать до родителя этого элемента (сначала обнуляем)
    //                 hashElementTop = 0;

    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }

    //             // округляем, т.к. может получиться неровное количество пикселей
    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         // скорость прокрутки
    //         speed;

    //     // определяем скорость скролла в зависимости от направления
    //     if (to > from ) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }

    //     // создаем анимацию через интервал
    //     let move = setInterval(function() {
    //         // определяем количество отскролленных пикселей в данный момент
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (
    //             // если уже достигли результата или
    //             prevScrollTop === scrollTop || 
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop +=speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();


    // Реализация плваного скролла с использованем requestAnimationFrame
    // ищем все элементы, в которых содержатся локальные ссылки      
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
};

export default scrolling;