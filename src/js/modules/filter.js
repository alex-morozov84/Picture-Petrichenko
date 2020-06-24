const filter = (noPortfolio) => {

    const menu = document.querySelector('.portfolio-menu'),
        buttons = menu.querySelectorAll('li'),
        cards = document.querySelectorAll('.portfolio-block'),
        noCards = document.querySelector('.portfolio-no');

    // скрываем все карточки
    function closeCards() {
        cards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('animated', 'fadeIn');
        });
        noCards.style.display = 'none';
        noCards.classList.remove('animated', 'fadeIn');
    }

    // показываем карточки
    function showCards(clickedClass) {
        // скрываем все
        closeCards();
        // проверяем совпадение со списком из main.js
        for (let i of noPortfolio) {
            // если совпадение есть, то показывается блок без фотографий (с надписью)
            if (clickedClass == i) {
                noCards.style.display = 'block';
                noCards.classList.add('animated', 'fadeIn');
            // иначе показываются карточки с таким же классом, как и в кнопке
            } else {
                cards.forEach(card => {
                    if (card.classList.contains(clickedClass)) {
                        card.style.display = 'block';
                        card.classList.add('animated', 'fadeIn');
                    }
                });
            } 
        }
    }

    // наввешиваем обработчик на все кнопки
    menu.addEventListener('click', (e) => {
        let target = e.target;
        // убираем класс активности у всех кнопок
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        // проверяем, что ткнули именно в кнопку
        if (target && target.tagName == 'LI') {
            // показываем карточки с классом, как у кнопки
            showCards(target.className);
            // назначаем кнопке класс активности
            target.classList.add('active');
        }
    });
};

export default filter;