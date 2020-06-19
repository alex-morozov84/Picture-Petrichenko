const forms = () => {

    const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        uploads = document.querySelectorAll('[name=upload]');

    const message = {
        success: "Данные отправлены, мы вам перезвоним!",
        loading: "Подождите, идет отправка...",
        failure: "Что-то пошло не так...",
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    };

    uploads.forEach(upload => {
        upload.addEventListener('input', () => {
            console.log(upload.files[0]);
            let dots;
            const name =  upload.files[0].name.split('.');
            name[0].length > 6 ? dots = "..." : dots =".";
            upload.previousElementSibling.textContent = name[0].substring(0, 6) + dots + name[1];
        });
    });

    function clearInputs() {
        inputs.forEach(input => input.value = '');
        uploads.forEach(upload => upload.previousElementSibling.textContent = 'Файл не выбран');
    }

    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animate', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.classList.add('animate', 'fadeInUp');
            statusImg.setAttribute('url', message.spinner);
            statusMessage.appendChild(statusImg);

            let statusText = document.createElement('div');
            statusText.textContent = message.loading;
            statusMessage.appendChild(statusText);

            const formData = new FormData(item);

            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;

            postData(api, formData)
                .then((res) => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    statusText.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    statusText.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });

        });
    });

};

export default forms;