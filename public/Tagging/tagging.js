const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const directoryCreateButton = document.querySelector('.create.flex_row.center.space_between');
const createMenu = document.querySelector('.create_menu.flex_column.space_evenly');
const fileSection = document.querySelector('.files_container.flex_row.justify_flex_start.center.width_full');
const videoDiv = document.querySelector('.video img');
const videoBar = document.querySelector('.video');
const seekBar = document.querySelector('.seek_bar');
const volumeInput = document.querySelector('.volume');

let fileMenu;

let isOpen = false;

const video = document.querySelector('video');
const playPause = document.querySelector('.playing_buttons.flex_row.space_between.center').children[0];
const stop = document.querySelector('.playing_buttons.flex_row.space_between.center').children[3];
const fullScreen = document.querySelector('.volume_buttons.flex_row.space_between.center').children[5];

const pauseSvg = `<svg fill="#000000" width="36" height="36" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path d="M46.677 64.652c0-9.362 7.132-17.387 16.447-17.394 9.315-.007 24.677.007 34.55.007 9.875 0 17.138 7.594 17.138 16.998 0 9.403-.083 119.094-.083 127.82 0 8.726-7.58 16.895-16.554 16.837-8.975-.058-25.349.115-34.963.058-9.614-.058-16.646-7.74-16.646-17.254 0-9.515.11-117.71.11-127.072zm14.759.818s-.09 118.144-.09 123.691c0 5.547 3.124 5.315 6.481 5.832 3.358.518 21.454.47 24.402.47 2.947 0 7.085-1.658 7.167-6.14.08-4.483-.082-119.507-.082-123.249 0-3.742-4.299-4.264-7.085-4.66-2.787-.395-25.796 0-25.796 0l-4.997 4.056zm76.664-.793c.027-9.804 7.518-17.541 17.125-17.689 9.606-.147 25.283.148 35.004.148 9.72 0 17.397 8.52 17.397 17.77s-.178 117.809-.178 127c0 9.192-7.664 17.12-16.323 17.072-8.66-.05-26.354 0-34.991.048-8.638.05-17.98-8.582-18.007-17.783-.027-9.201-.055-116.763-.027-126.566zm16.917.554s-.089 118.145-.089 123.692c0 5.547 3.123 5.314 6.48 5.832 3.359.518 21.455.47 24.402.47 2.948 0 7.086-1.659 7.167-6.141.081-4.482-.08-119.506-.08-123.248 0-3.742-4.3-4.265-7.087-4.66-2.786-.396-25.796 0-25.796 0l-4.997 4.055z" fill-rule="evenodd"/>
</svg>`;

const playSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M320 853V293l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z"/></svg>`;

const files = [
    {
        name: 'Football 1',
        videoSrc: 'video/football-15734.mp4'
    },
    {
        name: 'Football 2',
        videoSrc: 'video/soccer-5264.mp4'
    }
];

directoryCreateButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
        isOpen = false;
        createMenu.style.display = 'none';
    } else {
        isOpen = true;
        createMenu.style.display = 'flex';
    }
    
});

seekBar.max = video.duration;

seekBar.addEventListener('change', (e) => {
    video.currentTime = e.target.value;
});

volumeInput.addEventListener('change', (e) => {
    video.volume = e.target.value;
});

playPause.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(playPause);
    if (!video.paused) {
        playPause.innerHTML = playSvg;
        video.pause();
    } else {
        playPause.innerHTML = pauseSvg;
        video.play();
    }
});

stop.addEventListener('click', (e) => {
    e.stopPropagation();
    video.currentTime = 0;
    video.pause();
    playPause.innerHTML = playSvg;
});

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
        mobileMenu.style.display = 'none';
        isOpen = false;
    }
    else {
        mobileMenu.style.display = 'flex';
        isOpen = true;
    }
});

video.addEventListener('timeupdate', (e) => {
    seekBar.max = e.target.duration;
    seekBar.value = e.target.currentTime;
    if (!video.paused) playPause.innerHTML = pauseSvg;
    else if (video.paused) playPause.innerHTML = playSvg;
});

document.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
        mobileMenu.style.display = 'none';
        isOpen = false;
        console.log(e);
        createMenu.style.display = 'none';
        if (fileMenu) {
            fileMenu.style.display = 'none';
            fileMenu.style.position = '';
            fileMenu.style.top = '';
            fileMenu.style.left = '';
        };
    }
});

function createDirectory(e) {
    console.log(e);
    e.stopPropagation();
    const input = document.querySelector('#createDirectory');
    console.log(input.value);
    const html = `
    <div onclick="directorySelect(event)" class="directory_wrapper flex_row align_flex_start center">
        <input type="checkbox">
        <div class="directory flex_column space_between center width_full">
            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
            <p>${ input.value ? input.value : 'Individual Concept' }</p>
        </div>
        <div class="remove">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
        </div>
    </div>
    `;
    const fileTreeHtml = `<div class="row flex_row space_between center">
    <div class="file">
        <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
    </div>
    <div class="path flex_row justify_center center">
        <p>${ input.value ? input.value : 'Individual Concept' }</p>
    </div>
</div>`;
    const directoriesContainer = document.querySelector('.directories_container.flex_row.justify_flex_start.align_flex_start.width_full');
    let fileTree = document.querySelector('.file_tree.flex_column.justify_flex_start.align_flex_start');
    fileTree.innerHTML += fileTreeHtml;
    fileTree = document.querySelector('.row.flex_row.space_between.center:last-child');
    fileTree.style.marginLeft = '1.5rem';
    fileTree.style.marginTop = '1rem';
    console.log(fileTree);
    directoriesContainer.innerHTML += html;
    input.value = '';
}

function directorySelect(e) {
    if (e.target.classList.contains('remove') || e.target.parentElement.classList.contains('remove')) {
        e.currentTarget.remove();
        Array.from(fileSection.children).forEach(file => {
            file.remove();
        });
    } else {
        const directories = document.getElementsByClassName('directory_wrapper flex_row align_flex_start center');
        Array.from(directories).forEach(directory => {
            directory.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
    
        files.forEach(file => {
            const html = `<div oncontextmenu="fileRightClick(event)" onclick="playVideo(event)" class="file_wrapper flex_row align_flex_start center">
            <input type="checkbox">
            <div. class="file flex_column space_between center width_full">
                <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
                <p id="file_name">${ file.name }</p>
            </div>
        </div>`;
            fileSection.innerHTML += html;
        });
    }
}

function playVideo(e) {
    const fileName = e.currentTarget.querySelector('#file_name').innerHTML;
    const src = files.filter(file => file.name === fileName);;
    video.src = src[0].videoSrc;
}