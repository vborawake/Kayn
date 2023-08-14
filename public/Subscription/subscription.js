const hamburger = document.getElementsByClassName('hamburger')[0];
const mobileMenu = document.querySelector('.mobile_menu.flex_row.center.justify_center');
const planType = document.querySelector('.flex_row.space_evenly.center');
const popup = document.querySelector('.popup');
const selectedLanguage = document.querySelector('.language.selected');
const popup2 = document.querySelector('.language_popup');

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

async function selectLanguage(e) {
    selectedLanguage.querySelector('img').outerHTML = e.currentTarget.querySelector('img').outerHTML;
    selectedLanguage.querySelector('p').outerHTML = e.currentTarget.querySelector('p').outerHTML;

    await gsap.to(popup2, {
        y: '0',
        opacity: 0,
    });
    popup2.style.display = 'none';
    await gsap.to(popup2, {
        opacity: 1
    })
}

async function showLanguagePopup(e) {
    e.stopPropagation();
    if (popup2.style.display === 'none' || popup2.style.display === '') {
        popup2.style.display = 'flex';
        popup2.style.left = `${e.currentTarget.getBoundingClientRect().x - 25}px`;
        await gsap.from(popup2, {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        });
    } else {
        await gsap.to(popup2, {
            y: '0',
            opacity: 0,
        });
        popup2.style.display = 'none';
        await gsap.to(popup2, {
            opacity: 1
        })
    }
}

window.addEventListener('resize', () => {
    popup2.style.left = `${document.querySelector('.selected').getBoundingClientRect().x - 25}px`;
});

popup.addEventListener('click', () => {
    popup.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
});