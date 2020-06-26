const pictureSize = (imgSelector) => {
    
    const blocks = document.querySelectorAll(imgSelector);

    // Этот вариант написал сам
    // blocks.forEach(block => {
    //     let src = block.firstElementChild.getAttribute('src'),
    //         newSrc = `${src.replace('.png', '')}-1.png`;
    //     block.addEventListener('mouseenter', () => {
    //         block.firstElementChild.setAttribute('src', newSrc);
    //         for (let node of block.childNodes) {
    //             if (node.nodeName == "P" && !node.classList.contains('sizes-hit')) {
    //                 node.style.display = 'none';
    //             }
    //         }
    //     });
    //     block.addEventListener('mouseleave', () => {
    //         block.firstElementChild.setAttribute('src', src);
    //         for (let node of block.childNodes) {
    //             if (node.nodeName == "P") {
    //                 node.style.display = 'block';
    //             }
    //         }
    //     });
    // });

    // Вариант Петриченко:
    // отлчается тем, что нет обращения к Нодам (чуть проще), используется псевдоселектор not и путь формируется чуть по-другому. И чуть другие обработчики событий (они слегка отличаются)
    function showImg (block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';
        // вместо условия здесь используется псевдоселектор not
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    }

    function hideImg (block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
        });
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImg(block);
        });
        block.addEventListener('mouseout', () => {
            hideImg(block);
        });
    });
};

export default pictureSize;