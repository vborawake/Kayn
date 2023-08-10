const hamburger = document.getElementsByClassName('hamburger')[0];
const mobileMenu = document.querySelector('.mobile_menu.flex_row.center.justify_center');
const planType = document.querySelector('.flex_row.space_evenly.center');
const popup = document.querySelector('.popup');

gsap.registerPlugin(ScrollTrigger);

let isOpen = false;

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

function showPopup (e) {
    document.querySelector('.popup').style.display = 'block';
    document.querySelector('.popup').style.position = 'fixed';
    console.log(e.currentTarget.parentElement.querySelector('.header h2').innerHTML);
    document.querySelector('.type').innerHTML = e.currentTarget.parentElement.querySelector('.header h2').innerHTML + ' X';
}

function addAnimations() {
    gsap.from('#stagger', {
        y: '2rem',
        opacity: 0,
        stagger: 0.1
    });

    gsap.from('.pricing_section', {
        y: '-2rem',
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: '.pricing_section',
            start: 'top center'
        }
    });

    gsap.from('.footer', {
        y: '-2rem',
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top center'
        }
    });
}

popup.addEventListener('click', () => {
    popup.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
});