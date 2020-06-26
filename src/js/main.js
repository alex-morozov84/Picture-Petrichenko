import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";
import filter from "./modules/filter";
import pictureSize from "./modules/pictureSize";
import accordion from "./modules/accordion";
import burger from "./modules/burger";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    let calcSum = {},
        noPortfolio = ["grandmother", "granddad"];

    modals();
    sliders('.main-slider-item', 'vertical');
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    forms(calcSum);
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    showMoreStyles('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price', calcSum);
    filter(noPortfolio);
    pictureSize('.sizes-block');
    // для первого варианта реализаци аккордеона
    // accordion('.accordion-heading', '.accordion-block');
    // для второго варианта
    accordion('.accordion-heading');
    burger('.burger-menu', '.burger');
    scrolling('.pageup');
    drop();
});