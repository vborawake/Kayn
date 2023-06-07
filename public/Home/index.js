const hamburger = document.getElementsByClassName('hamburger')[0];
const mobileMenu = document.querySelector('.mobile_menu.flex_row.center.justify_center');
const planType = document.querySelector('.flex_row.space_evenly.center');

let isOpen = false;

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.container-fluid').classList.add('d-flex');
        document.querySelector('.container-fluid.d-flex').classList.add('flex-column');
        document.querySelector('.container-fluid.d-flex.flex-column').classList.add('p-0');
        document.querySelector('.container-fluid.d-flex.flex-column.p-0').style.display = 'flex';
        document.querySelector('.loader.d-flex.flex-row.align-items-center.justify-content-center').style.zIndex = '-1';
    }, 2000)

});

window.addEventListener('resize', () => {
    console.log(window.innerWidth);
});

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

document.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
        isOpen = false;
        mobileMenu.style.display = 'none';
    }
});

function selectPlan(e) {
    Array.from(e.currentTarget.parentElement.children).forEach(target => {
        target.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
}