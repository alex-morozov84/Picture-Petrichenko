const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);
 

    // // Первый вариант. На основе CSS классов
    //     blocks = document.querySelectorAll(itemsSelector);
    // // назаначаем всем блокам с текстом анимацию
    // blocks.forEach(block => block.classList.add('animated', 'fadeInDown'));

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         // Если у кнопки нет класса активности
    //         if (!this.classList.contains('active')) {
    //             // То у всех кнопок снимаются классы
    //             btns.forEach(btn => btn.classList.remove('active', 'active-style'));
    //             // а данной назначаются
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });

    // второй вариант (плавно меняется высота). Здесь можно открыть все блоки
    // btns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         this.classList.toggle('active-style');
    //         this.nextElementSibling.classList.toggle('active-content');

    //         if (this.classList.contains('active-style')) {
    //             this.nextElementSibling.style.maxHeight =  this.nextElementSibling.scrollHeight + 80 + "px";
    //         } else {
    //             this.nextElementSibling.style.maxHeight = '0px';
    //         }
    //     });
    // });

    // Третий вариант. ДЗ. Можно открыть только один блок

    function removeBlock() {
        btns.forEach(btn => {
            btn.nextElementSibling.style.maxHeight = '0px';
            btn.nextElementSibling.classList.remove('active-content');
            btn.classList.remove('active-style');
        });
    }

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            removeBlock();
            this.classList.add('active-style');
            this.nextElementSibling.classList.add('active-content');
            this.nextElementSibling.style.maxHeight =  this.nextElementSibling.scrollHeight + 80 + "px";
        });
    });

};

export default accordion;