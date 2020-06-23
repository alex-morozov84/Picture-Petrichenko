import {getResource} from "../services/requests";

const calc = (size, material, options, promocode, result, calcSum) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let sum = 0;

    // Расчет по значениям, заданным в верстке (атрибут value)
    // const calcFunc = () => {
        // sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
        // if (sizeBlock.value == '' || materialBlock.value == '') {
        //     resultBlock.textContent = "Пожалуйстав выберите размер и материал картины";
        // } else if (promocodeBlock.value === "IWANTPOPART") {
        //     resultBlock.textContent = Math.round(sum * 0.7);
        //     calcSum['Сумма рачета'] = resultBlock.textContent;
        // } else {
        //     resultBlock.textContent = sum;
        //     calcSum['Сумма расчета'] = sum;
        // }
    // };

    // Расчет по значениям с сервера (файл db.json)
    // const calcFunc = () => {
    //     let sizeVal = sizeBlock.value,
    //         materialVal = materialBlock.value,
    //         optionsVal = optionsBlock.value,
    //         promocodeVal = promocodeBlock.value;

    //         getResource('http://localhost:3000/calc')
    //         .then(res => {

    //             if (sizeVal == '' || materialVal == '') {
    //                 resultBlock.textContent = "Пожалуйстав выберите размер и материал картины";
    //             } else if (optionsVal == '') {
    //                 sum = Math.round((+res.size[sizeVal]) * (+res.material[materialVal]));
    //                 resultBlock.textContent = sum;
    //                 calcSum['Сумма расчета'] = sum;
    //             } else if (promocodeVal === res.promocodes["promocode1"]) {
    //                 sum = Math.round((+res.size[sizeVal]) * (+res.material[materialVal]) + (+res.options[optionsVal]));
    //                 resultBlock.textContent = Math.round(sum * 0.7);
    //                 calcSum['Сумма рачета'] = resultBlock.textContent;
    //             } else {
    //                 sum = Math.round((+res.size[sizeVal]) * (+res.material[materialVal]) + (+res.options[optionsVal]));
    //                 resultBlock.textContent = sum;
    //                 calcSum['Сумма расчета'] = sum;
    //             }
                
    //         })
    //         .catch(error => console.log(error));
    // };

    // sizeBlock.addEventListener('change', calcFunc);
    // materialBlock.addEventListener('change', calcFunc);
    // optionsBlock.addEventListener('change', calcFunc);
    // promocodeBlock.addEventListener('input', calcFunc);


    // Еще один вариант реализации (красивый, но длинный)
    let sizeValue = '', materialValue = '', optionsValue = '';

    function changeParam(event, elem) {
        elem.addEventListener(event, (e) => {
            const target = e.target,
                // получаем ID для элемента, в который ткнули
                selectedField = target.id;
        
            function calcFunc(dataFromDB) {
                // проверяем по всем ключам из БД 
                for (let key in dataFromDB[selectedField]) {
                    // если ключ совпадает с выбранным в поле значением
                    if (elem.value === key) {
                        // в зависимости от поля, назначаем значение из БД
                        switch(selectedField) {
                            case "size":
                                sizeValue = dataFromDB[selectedField][key];
                                break;
                            case "material":
                                materialValue = dataFromDB[selectedField][key];
                                break;
                            case "options":
                                optionsValue = dataFromDB[selectedField][key];
                                break;
                        }
                    }
                }
                sum = Math.round((+sizeValue) * (+materialValue) + (+optionsValue));
                if (sizeBlock.value == '' || materialBlock.value == '') {
                    resultBlock.textContent = "Пожалуйстав выберите размер и материал картины";
                } else if (promocodeBlock.value === "IWANTPOPART") {
                    resultBlock.textContent = Math.round(sum * 0.7);
                    calcSum['Сумма рачета'] = resultBlock.textContent;
                } else {
                    resultBlock.textContent = sum;
                    calcSum['Сумма расчета'] = sum;
                }
            }
            getResource('http://localhost:3000/calc')
                .then(res => calcFunc(res))
                .catch(error => console.log(error));
        });
    }

    changeParam('change', sizeBlock);
    changeParam('change', optionsBlock);
    changeParam('change', materialBlock);
    changeParam('input', promocodeBlock);
};

export default calc;