window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.container.flex_row.space_between.center').style.display = 'flex';
        // document.querySelector('.loader.flex_row.center.justify_center').classList.remove('flex_row');
        document.querySelector('.loader.flex_row.center.justify_center').style.display = 'none';
    }, 2000)
});