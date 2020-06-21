const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        // устанавливаем фокус на элементе (Но мне кажется это не обязательно)
        elem.focus();

        // перемещает каретку после +7, если поместили в самое начало (чтоб нельзя было удалить +7)
        elem.addEventListener('click', () => {
            console.log(elem.selectionStart);
            if (elem.selectionStart <= 2) {
                elem.selectionStart = 2;
            }
        });

        // Этот вариант предложил Петриченко. Используем метод выделения (т.к. начало и конец выделения совпадают, то курсор просто ставится на это место). Видимо это сделано для фокуса Tab'ом, т.к. мышью можно и так поставить в любое место. Не все бразуеры поддерживают этот метод. Проверяем: если поддерживает, то сразу используем, если нет, то создаем своеобразный полифил. Но этот вариант не спасает от случая, когда пользователь ткнул перед +7. Тогда он сможет удалить все.
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            // вводим два значения: статичное и динамичное (на основе того, что ввел пользователь)
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        // отменяем возможность удалить +7 (т.е. когда количество введенных символов меньше количества начальных, в строку вставляется начальное значение)
        if (def.length >= val.length) {
            val = def;
        }

        // перебираем все символы и каждый заменяем на результат действия функции
        this.value = matrix.replace(/./g, function(a) {
            // если "_" или цифра, то подставляется то, что ввели, если нет, то подставляется либо пробел, либо (если i не соотв условию) скобка
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        // при отмене фокуса (т.е. если кликнули вне инпута), и в инпуте было только "+7", то инпут очищается
        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        // иначе курсор ставится в нужное место (в зависимости от того, сколько символов было введено)
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;