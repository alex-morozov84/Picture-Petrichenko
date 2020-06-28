const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    // создаем массив событий, чтоб не прописывать все по-отдельности
    ['dragenter', 'dragleave', 'dargover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    // для всех событий отменяем стандартное поведение браузера
    function preventDefaults(e) {
        e.preventDefault();
        // останавливаем всплытие (?)
        e.stopPropagation();
    }

    // создадим индикатор, показывающий пользователю, что файл над нужной областью
    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0,.7)";
    }

    // отменяем подсветку
    function unHighlight(item) {
        item.closest('.file_upload').style.border = "none";
        // в зависимости от формы разный цвет был изначально
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else if (item.closest('main')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
        
    }

    // для событий, когда файл над областью, включаем подсветку области
    ['dragenter', 'dargover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    // снимаем подсветку
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighlight(input), false);
        });
    });

    // помещаем файл в инпут
    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            
            // помещаем в input файл
            input.files = e.dataTransfer.files;
    
            // В этом ДЗ при кидании картинки в инпут сверху страницы, она сразу же отправляется на сервер
            if (input.closest('main')) {

                const formData = new FormData();
                formData.append('file', input.files[0]);
                
                const postData = async (url, data) => {
                    let res = await fetch(url, {
                        method: "POST",
                        body: data
                    });
                    return await res.text();
                };

                postData('assets/server.php', formData)
                    .then(res => console.log(res))
                    .catch(() => console.log('Ошибка'));
            }

            // // выводим название файла
            let dots;
            const name =  input.files[0].name.split('.');
            name[0].length > 6 ? dots = "..." : dots = ".";
            input.previousElementSibling.textContent = name[0].substring(0, 6) + dots + name[1];
        });
    });

};

export default drop;