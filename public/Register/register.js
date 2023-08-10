const hamburger = document.getElementsByClassName('hamburger')[0];
const mobileMenu = document.querySelector('.mobile_menu.flex_row.center.justify_center');
const selectedLanguage = document.querySelector('.language.selected');
const popup = document.querySelector('.language_popup');

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

async function selectLanguage(e) {
    selectedLanguage.querySelector('img').outerHTML = e.currentTarget.querySelector('img').outerHTML;
    selectedLanguage.querySelector('p').outerHTML = e.currentTarget.querySelector('p').outerHTML;

    await gsap.to(popup, {
        y: '0',
        opacity: 0,
    });
    popup.style.display = 'none';
    await gsap.to(popup, {
        opacity: 1
    })
}

async function showLanguagePopup(e) {
    e.stopPropagation();
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'flex';
        popup.style.left = `${e.currentTarget.getBoundingClientRect().x - document.querySelector('nav').getBoundingClientRect().x - 25}px`;
        await gsap.from(popup, {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        });
    } else {
        await gsap.to(popup, {
            y: '0',
            opacity: 0,
        });
        popup.style.display = 'none';
        await gsap.to(popup, {
            opacity: 1
        })
    }
}

window.addEventListener('resize', () => {
    popup.style.left = `${document.querySelector('.selected').getBoundingClientRect().x - document.querySelector('nav').getBoundingClientRect().x - 25}px`;
});