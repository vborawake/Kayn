const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const directoryCreateButton = document.querySelector('.create.flex_row.center.space_between');
const createMenu = document.querySelector('.create_menu.flex_column.space_evenly');
const fileSection = document.querySelector('.files_container.flex_row.justify_flex_start.center.width_full');
const trackerPosition = document.querySelector('.tracker.flex_column.justify_flex_start.width_full');
const videoBar = document.querySelector('.video.flex_row.justify_center.center.width_full');
const seekBar = document.querySelector('.seek_bar');
const start_tracker = document.querySelector('.start_tracker');
const volumeInput = document.querySelector('.volume');
const start = document.querySelector('.start');
const end = document.querySelector('.end');
const end_tracker = document.querySelector('.end_tracker');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = document.querySelector('.video img');
const left_toolbar = document.querySelector('.tools.left_tools');
const right_toolbar = document.querySelector('.tools.right_tools');
const ticksElement = document.querySelector('.ticks.flex_row.align_flex_end.width_full');
const renderMenu = document.querySelector('.render_menu.flex_column.center');

let start_coords = {};
let end_coords = {};
let fileMenu;
let selectedTool;
let isOpen = false;
let ringCount = 0;

const canvasElems = {
    ring: [],
    line: [],
    arrow: [],
    dashedArrow: []
};

const video = document.querySelector('video');

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

// video.addEventListener('click', () => {
//     if (video.paused) video.play();
//     else video.pause()
// });

// window.addEventListener('load', () => {
//     setTimeout(() => {
//         document.querySelector('.container.flex_column.justify_flex_start.center.width_full').style.display = 'flex';
//         // document.querySelector('.loader.flex_row.center.justify_center').classList.remove('flex_row');
//         document.querySelector('.loader.flex_row.center.justify_center').style.display = 'none';
//         setCanvasSize();
//     }, 500);
// });

function setCanvasSize() {
    canvas.width = image.getBoundingClientRect().width;
    canvas.height = image.getBoundingClientRect().height;
    canvas.style.position = 'absolute';
    canvas.style.left = `${ image.getBoundingClientRect().left }px`;
    canvas.style.top = `${ image.getBoundingClientRect().top }px`;
    // canvas.style.border = '4px solid black';
}

document.addEventListener('DOMContentLoaded', () => {
    setCanvasSize();
});

canvas.addEventListener('click', (e) => {
    e.stopPropagation();
    let clicked = 0;
    const x = e.layerX;
    const y = e.layerY;

    for (let ring of canvasElems.ring) {
        let dx = e.layerX - ring.x;
        let dy = e.layerY - ring.y;
        let distance = Math.abs(Math.sqrt(dx * dx, dy * dy));
        if (distance < 20) clicked = 1;
    }

    if (clicked === 1) {
        const trackingMenu = document.querySelector('.tracking_menu.flex_column');
        trackingMenu.style.display = 'flex';
        trackingMenu.style.position = 'absolute';
        trackingMenu.style.left = `${ e.clientX }px`;
        trackingMenu.style.top = `${ e.clientY }px`;
    }
});

function createPlayer (e) {
    localStorage.setItem('Players', 'Player #1, Player #2, Player #3');
    window.location.href = '../Editing UI/edit.html';
}

function detectPlayers() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.strokeStyle = '#FFF';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(532, 288, 20, 0, 2 * Math.PI);
    addVideoBar();
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(530, 178, 20, 0, 2 * Math.PI);
    addVideoBar();
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(720, 189, 20, 0, 2 * Math.PI);
    addVideoBar();
    ctx.stroke();
    ctx.fill();
    canvasElems.ring.push({
        x: 532,
        y: 288,
        radius: 20
    });
    canvasElems.ring.push({
        x: 530,
        y: 178,
        radius: 20
    });
    canvasElems.ring.push({
        x: 720,
        y: 189,
        radius: 20
    });
    // console.log(canvasElems);
}

function undo(e) {
    console.log(canvasElems);
    ctx.clearRect(
        canvasElems.ring[canvasElems.ring.length - 1].x - canvasElems.ring[canvasElems.ring.length - 1].radius,
        canvasElems.ring[canvasElems.ring.length - 1].y - canvasElems.ring[canvasElems.ring.length - 1].radius,
        canvasElems.ring[canvasElems.ring.length - 1].radius * 2,
        canvasElems.ring[canvasElems.ring.length - 1].radius * 2
    );
   canvasElems.ring.splice(canvasElems.ring.length - 1, 1);
}

function addVideoBar() {
    const workingArea = document.querySelector('.working_area.width_full.flex_column.justify_flex_start');
    let top = 0;
    const html = `
        <div class="ring flex_row justify_center center width_full" style="color: #FFF;">
            <p>Ring_${ ringCount++ }</p>
        </div>
    `;

    Array.from(workingArea.children).forEach(element => {
        if (element.classList.contains('video') || element.classList.contains('ring')) {
            top += 1.3;
        }
    });

    workingArea.innerHTML += html;
    const ring = workingArea.querySelector('.ring:last-child');
    ring.style.position = 'absolute';
    ring.style.top = `${ top }rem`;
    ring.style.right = '20rem';
}

// seekBar.max = video.duration;

// seekBar.addEventListener('change', (e) => {
//     video.currentTime = e.target.value;
// });

// volumeInput.addEventListener('change', (e) => {
//     video.volume = e.target.value;
// });

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

function handleMenuClick (e) {
    if (e.target.classList.contains('menu_item')) {
        e.target.children[1].innerHTML;
    }
}

document.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Clicked');
    if (isOpen) {
        mobileMenu.style.display = 'none';
        isOpen = false;
    }
    if (renderMenu) {
        if (renderMenu.style.transform === 'scaleY(1)') renderMenu.style.transform = 'scale(0)';
    }
    console.log(e);
});

function showRender (e) {
    requestAnimationFrame(() => {
        if (renderMenu.style.transform === '' || renderMenu.style.transform === 'scale(0)') {
            renderMenu.style.transform = 'scaleX(1)';
            renderMenu.style.transform = 'scaleY(1)';
            renderMenu.style.transformOrigin = 'left';
        } else renderMenu.style.transform = 'scale(0)'
    });
}

function selectTool(e) {
    e.stopPropagation();
    let button;

    if (e.target.localName === 'path') button = e.target.parentElement.parentElement;
    else if (e.target.localName === 'svg') button = e.target.parentElement;
    else if (e.target.localName === 'img') button = e.target.parentElement;
    else if (e.target.localName === 'button') button = e.target;

    Array.from(e.currentTarget.children).forEach(tool => {
        tool.classList.remove('active');
    });
    
    selectedTool = button;
    button.classList.add('active');
}

function throttleFunc(func, delay) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            return;
        }
        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, 1000);
    }
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

function populateTicks() {
    const ticksElement = document.querySelector('.ticks.width_full');
    let numbersPosition = document.querySelectorAll('.numbers.flex_row.space_between.center.width_full p');
    let tick = undefined;
    console.log(trackerPosition);
    if (window.innerWidth < 992) numbersPosition = document.querySelectorAll('.numbers_tablet.flex_row.space_between.center.width_full p');
    Array.from(ticksElement.children).forEach(tick => { tick.remove(); });
    Array.from(numbersPosition).forEach(numberPosition => {
        tick = document.createElement('span');
        tick.style.width = '1.5px';
        tick.style.height = '1rem';
        tick.style.position = 'absolute';
        tick.style.top = `${ trackerPosition.getBoundingClientRect().top + window.scrollY + 25 }px`;
        tick.style.left = `${ numberPosition.getBoundingClientRect().x + (numberPosition.getBoundingClientRect().width / 2) }px`;
        tick.style.background = '#52AEE5';
        tick.style.zIndex = '20';
        ticksElement.appendChild(tick);
    });
    const ticks = Array.from(trackerPosition.querySelectorAll('.ticks span'));
    for (let i = 0; i < ticks.length; i++) {
        if (i === ticks.length - 1) break;
        let distance = ticks[i + 1].getBoundingClientRect().x - ticks[i].getBoundingClientRect().x;
        let start = ticks[i].getBoundingClientRect().x;
        let end = ticks[i + 1].getBoundingClientRect().x;
        let element = ticks[i + 1];
        while (start < end) {
            tick = document.createElement('span');
            tick.style.width = '1.5px';
            tick.style.height = '0.4rem';
            tick.style.position = 'absolute';
            tick.style.top = `${ trackerPosition.getBoundingClientRect().top + window.scrollY + 30 }px`;
            tick.style.left = `${ start + 5 }px`;
            tick.style.background = '#52AEE5';
            ticksElement.insertBefore(tick, element);
            start += 5;
        }
    }
}

populateTicks();

window.addEventListener('resize', throttleFunc(() => {
    console.log(window.innerWidth);
    Array.from(ticksElement.children).forEach(tick => { tick.remove() });
    setCanvasSize();
    populateTicks();
}), 1000);