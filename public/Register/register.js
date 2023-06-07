const hamburger = document.getElementsByClassName('hamburger')[0];
const mobileMenu = document.querySelector('.mobile_menu.flex_row.center.justify_center');

let isOpen = false;

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
        isOpen = false;
        mobileMenu.style.display = 'none';
    } else {
        isOpen = true;
        mobileMenu.style.display = 'block';
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.container.flex_column').style.display = 'flex';
        // document.querySelector('.loader.flex_row.center.justify_center').classList.remove('flex_row');
        document.querySelector('.loader.flex_row.center.justify_center').style.display = 'none';
    }, 2000)
});

document.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
        isOpen = false;
        mobileMenu.style.display = 'none';
    }
});