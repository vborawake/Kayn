window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.container.flex_row.space_between.center').style.display = 'flex';
        // document.querySelector('.loader.flex_row.center.justify_center').classList.remove('flex_row');
        document.querySelector('.loader.flex_row.center.justify_center').style.display = 'none';
    }, 2000)
});

function addAnimations() {
    gsap.from('#stagger', {
        y: '2rem',
        opacity: 0,
        stagger: 0.2,
        delay: 2.2,
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
});