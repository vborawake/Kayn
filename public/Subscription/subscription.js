const hamburger = document.getElementsByClassName('hamburger')[0];
const mobileMenu = document.querySelector('.mobile_menu.flex_row.center.justify_center');
const planType = document.querySelector('.flex_row.space_evenly.center');
const popup = document.querySelector('.popup');

let isOpen = false;

window.addEventListener('resize', () => {
    console.log(window.innerWidth);
});

function selectPlan(e) {
    Array.from(e.currentTarget.parentElement.children).forEach(target => {
        target.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
}

function showPopup (e) {
    document.querySelector('.popup').style.display = 'block';
    document.querySelector('.popup').style.position = 'fixed';
    gsap.from(popup, {
        y: '-2rem',
        opacity: 0
    });
    document.querySelector('.type').innerHTML = e.currentTarget.parentElement.querySelector('.header h2').innerHTML + ' X';
}

function addAnimations() {
    
}

popup.addEventListener('click', () => {
    popup.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
});