const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const directoryCreateButton = document.querySelector('.create.flex_row.center.space_between');
const createMenu = document.querySelector('.create_menu.flex_column.space_evenly');
const fileSection = document.querySelector('.files_container.flex_row.justify_flex_start.center.width_full');
const trackerPosition = document.querySelector('.tracker.flex_column.justify_flex_start.width_full');
const videoDiv = document.querySelector('.video img');
const videoBar = document.querySelector('.video');
const seekBar = document.querySelector('.seek_bar');
const start_tracker = document.querySelector('.start_tracker');
const volumeInput = document.querySelector('.volume');
const start = document.querySelectorAll('.ranges.flex_column input')[0];
const end = document.querySelectorAll('.ranges.flex_column input')[1];
const end_tracker = document.querySelector('.end_tracker');
const mediaSource = new MediaSource();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let fileMenu;

let isOpen = false;

// const video = document.querySelector('video');
// const playPause = document.querySelector('.playing_buttons.flex_row.space_between.center').children[0];
// const stop = document.querySelector('.playing_buttons.flex_row.space_between.center').children[3];
// const fullScreen = document.querySelector('.volume_buttons.flex_row.space_between.center').children[5];

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

document.addEventListener('DOMContentLoaded', () => {
    canvas.style.position = 'absolute';
    canvas.style.left = '20%';
    canvas.style.top = '6rem';
    canvas.height = 595;
    canvas.width = 1210;
});

// seekBar.max = video.duration;

// seekBar.addEventListener('change', (e) => {
//     video.currentTime = e.target.value;
// });

// volumeInput.addEventListener('change', (e) => {
//     video.volume = e.target.value;
// });

// playPause.addEventListener('click', (e) => {
//     e.stopPropagation();
//     console.log(playPause);
//     if (!video.paused) {
//         playPause.innerHTML = playSvg;
//         video.pause();
//     } else {
//         playPause.innerHTML = pauseSvg;
//         video.play();
//     }
// });

// stop.addEventListener('click', (e) => {
//     e.stopPropagation();
//     video.currentTime = 0;
//     video.pause();
//     playPause.innerHTML = playSvg;
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

// function resetRanges() {
//     start.value = start.min;
//     end.value = end.min;
//     start_tracker.style.left = videoBar.style.left;
//     end_tracker.style.position = 'absolute';
//     end_tracker.style.left = videoBar.style.left;
//     console.log(end_tracker.style.left);
//     console.log(videoBar.style.left);
// }

function handleMenuClick (e) {
    if (e.target.classList.contains('menu_item')) {
        e.target.children[1].innerHTML;
    }
}

// video.addEventListener('timeupdate', (e) => {
//     seekBar.max = e.target.duration;
//     seekBar.value = e.target.currentTime;
//     if (!video.paused) playPause.innerHTML = pauseSvg;
//     else if (video.paused) playPause.innerHTML = playSvg;
// });

// start_tracker.addEventListener('drag', moveSlider)
// end_tracker.addEventListener('drag', moveEndSlider)
// start_tracker.addEventListener('dragend', setPosition)
// end_tracker.addEventListener('dragend', setEndPosition)

function cutVideo(e) {
    const start = start_tracker.style.left.split('px')[0] ? start_tracker.style.left.split('px')[0] : (start_tracker.getBoundingClientRect().x - 12);
    const end = end_tracker.style.left.split('px')[0] ? end_tracker.style.left.split('px')[0] : (end_tracker.getBoundingClientRect().x - 12);
    console.log(start, end);
    const percent = Math.abs(parseFloat(start) - parseFloat(end));
    const html = `<div class="cut_video">
                    <img src="../video/gif.gif" alt="">
                </div>
    `;
    const workingArea = document.querySelector('.working_area.width_full.flex_column.justify_flex_start');
    workingArea.innerHTML += html;
    const cutVideo = document.querySelector('.working_area.width_full.flex_column.justify_flex_start .cut_video');
    cutVideo.style.width = `${ percent }px`;
    cutVideo.style.height = '2rem';
    cutVideo.style.background = '#FFF';
    cutVideo.style.position = 'absolute';
    cutVideo.style.left = `${ start }px`;
    cutVideo.style.borderRight = '1px solid black';
    cutVideo.style.borderLeft = '1px solid black';
}

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

// function moveSlider(e) {
//     e.stopPropagation();
//     if (e.pageX > 30 && e.pageX < 1430) {
//         let percent = 1 - ((start_tracker.getBoundingClientRect().x - videoDiv.getBoundingClientRect().x) / 1430);
//         start_tracker.style.position = 'absolute';
//         start_tracker.style.left = `${ e.pageX }px`;
//         video.currentTime = video.duration - (percent * video.duration);
//         seekBar.max = video.duration;
//         seekBar.value = video.currentTime;
//         const value = video.currentTime / 60;
//         if (value > 1) {
//             let minutes = Math.floor(value);
//             let seconds = Math.floor((value % 1) * 60);
//             start.value = `${ minutes }.${ seconds }`;
//         } else {
//             start.value = `${ value * 60 }`
//         }
//     }
// }

// function setPosition(e) {
//     e.stopPropagation();
//     if (30 < e.pageX) {
//         start_tracker.style.left = `${ e.pageX }px`;
//         const value = video.currentTime / 60;
//         if (value > 1) {
//             let minutes = Math.floor(value);
//             let seconds = Math.floor((value % 1) * 60);
//             start.value = `${ minutes }.${ seconds }`;
//         } else {
//             start.value = `${ value * 60 }`
//         }
//     } else {
//         start_tracker.style.left = '30px';
//         start.value = start.value.min;
//     }
// }

// function moveEndSlider(e) {
//     e.stopPropagation();
//     if (e.pageX > 30 && e.pageX < 1460) {
//         let percent = 1 - ((end_tracker.getBoundingClientRect().x - videoDiv.getBoundingClientRect().x) / 1430);
//         end_tracker.style.position = 'absolute';
//         end_tracker.style.left = `${ e.pageX }px`;
//         video.currentTime = video.duration - (percent * video.duration);
//         const value = (video.duration - (percent * video.duration)) / 60;
//         if (value > 1) {
//             let minutes = Math.floor(value);
//             let seconds = Math.floor((value % 1) * 60);
//             end.value = `${ minutes }.${ seconds }`;
//         } else {
//             end.value = `${ value * 60 }`
//         }
//     }
// }

// function setEndPosition(e) {
//     e.stopPropagation();
//     const value = video.currentTime / 60;
//     if (30 < e.pageX) {
//         end_tracker.style.left = `${ e.pageX }px`;
//         if (value > 1) {
//             let minutes = Math.floor(value);
//             let seconds = Math.floor((value % 1) * 60);
//             end.value = `${ minutes }.${ seconds }`;
//         } else {
//             end.value = `${ value * 60 }`
//         }
//     } else {
//         end_tracker.style.left = '30px';
//         end.value = '0.00';
//     }
// }

canvas.addEventListener('click', (e) => {
    ctx.setLineDash([5, 5]);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFF';
    ctx.arc(e.layerX, e.layerY, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    console.log(e);
});

function trackPlayers(e) {
    const p = e.currentTarget.nextElementSibling;
    p.style.display = 'block';
    setTimeout(() => {
        p.style.display = 'none';
    }, 1000);
}

function playVideo(e) {
    const fileName = e.currentTarget.querySelector('#file_name').innerHTML;
    const src = files.filter(file => file.name === fileName);;
    video.src = src[0].videoSrc;
}

function populateTicks() {
    const ticksElement = document.querySelector('.ticks.width_full');
    const numbersPosition = document.querySelectorAll('.numbers.flex_row.space_between.center.width_full p');
    let tick = undefined;
    console.log(trackerPosition);
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