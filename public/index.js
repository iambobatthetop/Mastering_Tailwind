const menu = document.querySelector('#menu');
const burger = document.querySelector('#burger');
const burgerIcon = burger.querySelector('img');

burger.addEventListener('click', () => {
    const isOpening = menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !isOpening);
    menu.classList.toggle('flex', isOpening);
    burgerIcon.src = isOpening ? 'img/close.png' : 'img/menu.png';
});