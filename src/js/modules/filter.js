const filter = () => {
    // // классов очень много, поэтому Иван сказал, что рациональнее делать так
    // const menu = document.querySelector('.portfolio-menu'),
    //     items = menu.querySelectorAll('li'),
    //     btnAll = menu.querySelector('.all'),
    //     btnLovers = menu.querySelector('.lovers'),
    //     btnChef = menu.querySelector('.chef'),
    //     btnGirl = menu.querySelector('.girl'),
    //     btnGuy = menu.querySelector('.guy'),
    //     btnGrandmother = menu.querySelector('.grandmother'),
    //     btnGranddad = menu.querySelector('.granddad'),
    //     wrapper = document.querySelector('.portfolio-wrapper'),
    //     markAll = wrapper.querySelectorAll('.all'),
    //     markLovers = wrapper.querySelectorAll('.lovers'),
    //     markChef = wrapper.querySelectorAll('.chef'),
    //     markGirl = wrapper.querySelectorAll('.girl'),
    //     markGuy = wrapper.querySelectorAll('.guy'),
    //     no = document.querySelector('.portfolio-no');

    // // скрываем ненужные карточки, показываем нужные (в завивимости от аргумента)
    // const typeFilter = (markType) => {
    //     // скрываем все
    //     markAll.forEach(mark => {
    //         mark.style.display = 'none';
    //         mark.classList.remove('animated', 'fadeIn');
    //     });
    //     // скрываем секцию portfolio-no
    //     no.style.display = 'none';
    //     no.classList.remove('animated', 'fadeIn');
    //     // показываем карточки, если аргумент передан, либо секцию portfolio-no, если нет
    //     if (markType) {
    //         markType.forEach(mark => {
    //             mark.style.display = 'block';
    //             mark.classList.add('animated', 'fadeIn');
    //         });
    //     } else {
    //         no.style.display = 'block';
    //         no.classList.add('animated', 'fadeIn');
    //     }
    // };

    // // Назначаем на все кнопки свой аргумент для функции
    // btnAll.addEventListener('click', () => {
    //     typeFilter(markAll);
    // });

    // btnLovers.addEventListener('click', () => {
    //     typeFilter(markLovers);
    // });

    // btnChef.addEventListener('click', () => {
    //     typeFilter(markChef);
    // });

    // btnGirl.addEventListener('click', () => {
    //     typeFilter(markGirl);
    // });

    // btnGuy.addEventListener('click', () => {
    //     typeFilter(markGuy);
    // });

    // btnGrandmother.addEventListener('click', () => {
    //     typeFilter();
    // });
    // btnGranddad.addEventListener('click', () => {
    //     typeFilter();
    // });

    // menu.addEventListener('click', (e) => {
    //     let target = e.target;

    //     if (target && target.tagName == 'LI') {
    //         items.forEach(btn => btn.classList.remove('active'));
    //         target.classList.add('active');
    //     }
    // });


    const menu = document.querySelector('.portfolio-menu'),
        buttons = menu.querySelectorAll('li'),
        cardsWrapper = document.querySelector('.portfolio-wrapper'),
        cards = cardsWrapper.querySelectorAll('.portfolio-block'),
        noCards = document.querySelector('.portfolio-no');

    function closeCards() {
        cards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('animated', 'fadeIn');
        });
        noCards.style.display = 'none';
        noCards.classList.remove('animated', 'fadeIn');
    }

    function showCards(clickedClass) {
        closeCards();
        if (clickedClass == 'grandmother' || clickedClass == 'granddad') {
            noCards.style.display = 'block';
            noCards.classList.add('animated', 'fadeIn');
        } else {
            cards.forEach(card => {
                if (card.classList.contains(clickedClass)) {
                    card.style.display = 'block';
                    card.classList.add('animated', 'fadeIn');
                }
            });
        } 
    }

    menu.addEventListener('click', (e) => {
        let target = e.target;
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        
        if (target && target.tagName == 'LI') {
            
            if (target.classList.contains('all')) {
                showCards('all');
                target.classList.add('active');
            } else {
                showCards(target.getAttribute('class'));
                target.classList.add('active');
            }
        }
    });
};

export default filter;