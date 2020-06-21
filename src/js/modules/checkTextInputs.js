const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        // предотвращаем возможность вставить в строку латинские символы даже путем копирования
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[a-z]/ig, '');
        });
        input.addEventListener('keypress', function(e) {
            // проверяем диапазон значений в начале строки (т.к. стоит ^) и запрещаем вводить другие символы
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
    });
};

export default checkTextInputs;