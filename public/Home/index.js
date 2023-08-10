const hamburger = document.getElementsByClassName('hamburger')[0];
const mobileMenu = document.querySelector('.mobile_menu.flex_row.center.justify_center');
const planType = document.querySelector('.flex_row.space_evenly.center');
const selectedLanguage = document.querySelector('.language.selected');
const popup = document.querySelector('.language_popup');

gsap.registerPlugin(ScrollTrigger);

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
    popup.style.left = `${document.querySelector('.selected').getBoundingClientRect().x - document.querySelector('nav').getBoundingClientRect().x - 25}px`;
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

function addAnimations() {
    gsap.from('#stagger', {
        y: '2rem',
        opacity: 0,
        stagger: 0.1,
        delay: 2.2,
    });

    setTimeout(() => {
        gsap.from('.introduction_section', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
                trigger: '.introduction_section',
                start: 'top center'
            }
        });

        gsap.from('.features_section', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
                trigger: '.features_section',
                start: 'top center'
            }
        });

        gsap.from('.working_section', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
                trigger: '.working_section',
                start: 'top center'
            }
        });

        gsap.from('.audience_section', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
                trigger: '.audience_section',
                start: 'top center'
            }
        });

        gsap.from('.advantages_section', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
                trigger: '.advantages_section',
                start: 'top center'
            }
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

        gsap.from('.action_section', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
                trigger: '.action_section',
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
    }, 2500)
}

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

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
});