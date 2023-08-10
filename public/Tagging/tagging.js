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
const directorySection = document.querySelector('.directories_container.flex_row.justify_flex_start.align_flex_start.width_full');
const cutSection = document.querySelector('.cut_section.flex_row.center.justify_flex_start.width_full');
const selectMenu = document.querySelector('.select_menu.flex_column.width_full');

let currentDirectory;
let currentFile;
const folders = {};

let fileMenu = document.querySelector('.file_menu.space_between.flex_row.center');

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

document.addEventListener('DOMContentLoaded', () => {
    console.log(video.src);
    if (video.src === '') {
        video.style.display = 'none';
        video.nextElementSibling.style.display = 'flex';
    }

    if (fileSection.children.length === 0) {
        fileSection.querySelector('h1').style.display = 'block';
    } else {
        fileSection.querySelector('h1').style.display = 'none';
    }

    addAnimations();
});

function addAnimations() {
    gsap.from('.buttons_wrapper a', {
        y: '1rem',
        opacity: 0,
        delay: 0.7,
        stagger: 0.1
    });

    gsap.from('#stagger', {
        y: '1rem',
        opacity: 0,
        delay: 0.7,
        stagger: 0.1
    });

    gsap.from('#player_stagger', {
        y: '1rem',
        opacity: 0,
        delay: 0.7,
        stagger: 0.1
    });
}

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.container.flex_column.justify_flex_start.center.width_full').style.display = 'flex';
        // document.querySelector('.loader.flex_row.center.justify_center').classList.remove('flex_row');
        document.querySelector('.loader.flex_row.center.justify_center').style.display = 'none';
    }, 500)
});

directorySection.addEventListener('click', (e) => {
    emptyFileContainer();
    Array.from(directorySection.children).forEach(directory => {
        directory.classList.remove('active');
    });
});

fileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    handleMenuClick(e);
});

function showSelectMenu(e) {
    e.stopPropagation();
    requestAnimationFrame(() => {
        if (selectMenu.style.transform === '' || selectMenu.style.transform === 'scale(0)') {
            selectMenu.style.transform = 'scale(1)'
            selectMenu.style.transformOrigin = '0 0';
        } else selectMenu.style.transform = 'scale(0)';
    });
    console.log(selectMenu);
}

fileSection.addEventListener('click', (e) => {
    Array.from(fileSection.children).forEach(file => {
        file.classList.remove('active');
    });
    video.src = '';
    video.style.display = 'none';
    video.nextElementSibling.style.display = 'flex';
    fileMenu.style.display = 'none';
});

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

function handleMenuClick(e) {
    // e.stopPropagation();
    console.log(e);
    if (e.target.id === 'cut' || e.target.parentElement.id === 'cut') {
        console.log('In if');
        fileMenu.style.display = 'none';
        cutSection.style.display = 'flex';
        folders[currentDirectory.querySelector('#directory_name').innerHTML].forEach(file => {
            if (file.name === currentFile.querySelector('#file_name').innerHTML) {
                console.log('In video if');
                video.src = file.src;
            }
        })
    }
}

function fileRightClick(e) {
    e.preventDefault();
    e.stopPropagation();
    currentFile = e.currentTarget;
    console.log(fileMenu);
    if (fileMenu.children.length === 0) {
        const html = `
        <div class="menu_item flex_row width_full justify_flex_start center" id="cut">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="M782 942 481 641 364 758q11 17 13.5 33t2.5 35q0 64-43 107t-107 43q-64 0-107-43T80 826q0-64 43-107t107-43q18 0 35.5 5t36.5 15l116-116-118-118q-17 8-34.5 11t-35.5 3q-64 0-107-43T80 326q0-64 43-107t107-43q64 0 107 43t43 107q0 19-2.5 36T367 394l514 514v34h-99ZM599 529l-66-66 249-249h99v33L599 529ZM230 416q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm253 183q8 0 13.5-5.5T502 580q0-8-5.5-13.5T483 561q-8 0-13.5 5.5T464 580q0 8 5.5 13.5T483 599ZM230 916q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Z"/></svg>
            <p>Cut Video Clip</p>
        </div>
        <div class="menu_item flex_row width_full justify_flex_start center">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="M560 936q-12 0-21-9t-9-21q0-13 9-21.5t21-8.5q59 0 99.5-24t40.5-56q0-23-29.5-45T591 717l47-47q63 19 92.5 52.5T760 796q0 67-61 103.5T560 936ZM240 642q-64-14-92-44t-28-62q0-35 26-63t120-62q66-24 85-39t19-35q0-25-22-43t-68-18q-27 0-46 7t-34 22q-8 8-20.5 9.5T157 308q-11-8-11.5-20t7.5-21q17-22 51-36.5t76-14.5q68 0 109 32.5t41 88.5q0 41-28.5 69.5T290 466q-67 25-88.5 39.5T180 536q0 16 27 30.5t81 27.5l-48 48Zm496-154L608 360l45-45q18-18 40-18t40 18l48 48q18 18 18 40t-18 40l-45 45ZM220 876h42l345-345-42-42-345 345v42Zm-60 60V808l405-405 128 128-405 405H160Zm405-447 42 42-42-42Z"/></svg>
            <p>Go to tagging mode</p>
        </div>
        <div class="menu_item flex_row width_full justify_flex_start center">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="M560 936q-12 0-21-9t-9-21q0-13 9-21.5t21-8.5q59 0 99.5-24t40.5-56q0-23-29.5-45T591 717l47-47q63 19 92.5 52.5T760 796q0 67-61 103.5T560 936ZM240 642q-64-14-92-44t-28-62q0-35 26-63t120-62q66-24 85-39t19-35q0-25-22-43t-68-18q-27 0-46 7t-34 22q-8 8-20.5 9.5T157 308q-11-8-11.5-20t7.5-21q17-22 51-36.5t76-14.5q68 0 109 32.5t41 88.5q0 41-28.5 69.5T290 466q-67 25-88.5 39.5T180 536q0 16 27 30.5t81 27.5l-48 48Zm496-154L608 360l45-45q18-18 40-18t40 18l48 48q18 18 18 40t-18 40l-45 45ZM220 876h42l345-345-42-42-345 345v42Zm-60 60V808l405-405 128 128-405 405H160Zm405-447 42 42-42-42Z"/></svg>
            <p>Go to dynamic drawing mode</p>
        </div>
        <div class="menu_item flex_row width_full justify_flex_start center">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="M319 806h322v-60H319v60Zm0-170h322v-60H319v60Zm-99 340q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/></svg>
            <p>Show in directory</p>
        </div>
        <div class="menu_item flex_row width_full justify_flex_start center">
            <img src="icons/Aa.svg" alt="">
            <p>Rename</p>
        </div>
        <div class="menu_item flex_row width_full justify_flex_start center">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="M782 942 481 641 364 758q11 17 13.5 33t2.5 35q0 64-43 107t-107 43q-64 0-107-43T80 826q0-64 43-107t107-43q18 0 35.5 5t36.5 15l116-116-118-118q-17 8-34.5 11t-35.5 3q-64 0-107-43T80 326q0-64 43-107t107-43q64 0 107 43t43 107q0 19-2.5 36T367 394l514 514v34h-99ZM599 529l-66-66 249-249h99v33L599 529ZM230 416q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm253 183q8 0 13.5-5.5T502 580q0-8-5.5-13.5T483 561q-8 0-13.5 5.5T464 580q0 8 5.5 13.5T483 599ZM230 916q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Z"/></svg>
            <p>Delete</p>
        </div>
    `;
    fileMenu.innerHTML += html;
    }
    fileMenu.style.display = 'flex';
    fileMenu.style.position = 'absolute';
    fileMenu.style.top = `${e.clientY}px`;
    fileMenu.style.left = `${e.clientX}px`;
    console.log(e);
//     isOpen = true;
}

function importFile(e) {
    let html = `
        <div oncontextmenu="fileRightClick(event)" onclick="playVideo(event)" class="file_wrapper flex_row align_flex_start center">
            <input type="checkbox">
            <div class="file flex_column space_between center width_full">
                <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
                <p id="file_name">${ e.target.files[0].name }</p>
            </div>
        </div>
    `;

    if (fileSection.children[0].tagName === 'H1') fileSection.innerHTML = '';

    folders[currentDirectory.querySelector('#directory_name').innerHTML].push({
        name: e.target.files[0].name,
        size: e.target.files[0].size,
        src: URL.createObjectURL(e.target.files[0])
    });
    fileSection.innerHTML += html;
    let fileTree = document.querySelector('.file_tree.flex_column.justify_flex_start.align_flex_start');
    html = `
        <div class="row flex_row space_between center width_full">
            <div class="file">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
            </div>
            <div class="path flex_row justify_center center">
                <p>${ e.target.files[0].name }</p>
            </div>
        </div>
    `;
    Array.from(fileTree.children).forEach(file => {
        if (file.querySelector('.path p').innerHTML === currentDirectory.querySelector('#directory_name').innerHTML) {
            file.insertAdjacentHTML('afterend', html);
            file.nextElementSibling.style.marginTop = '1rem';
            file.nextElementSibling.style.marginLeft = '1.6rem';
        }
    });
    console.log(folders);
    e.target.value = null;
}

function resetRanges() {
    start.value = start.min;
    end.value = end.min;
    start_tracker.style.left = videoBar.style.left;
    end_tracker.style.position = 'absolute';
    end_tracker.style.left = videoBar.style.left;
    console.log(end_tracker.style.left);
    console.log(videoBar.style.left);
}

// function handleMenuClick (e) {
//     if (e.target.classList.contains('menu_item')) {
//         e.target.children[1].innerHTML;
//     }
// }

video.addEventListener('timeupdate', (e) => {
    seekBar.max = e.target.duration;
    seekBar.value = e.target.currentTime;
    if (!video.paused) playPause.innerHTML = pauseSvg;
    else if (video.paused) playPause.innerHTML = playSvg;
});

start_tracker.addEventListener('drag', moveSlider)
end_tracker.addEventListener('drag', moveEndSlider)
start_tracker.addEventListener('dragend', setPosition)
end_tracker.addEventListener('dragend', setEndPosition)

function emptyFileContainer(e) {
    Array.from(fileSection.children).forEach(file => {
        file.remove();
    });
}

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
    }
    if (selectMenu.style.transform === 'scale(1)') selectMenu.style.transform = 'scale(0)';
});

function createDirectory(e) {
    console.log(e);
    e.stopPropagation();
    const input = document.querySelector('#createDirectory');
    if (!input.value || folders[input.value]) return;
    const html = `
    <div onclick="directorySelect(event)" class="directory_wrapper flex_row align_flex_start center">
        <input type="checkbox">
        <div class="directory flex_column space_between center width_full">
            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
            <p id="directory_name">${ input.value ? input.value : 'Individual Concept' }</p>
        </div>
        <div class="remove">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
        </div>
    </div>
    `;
    const fileTreeHtml = `<div class="row flex_row space_between center">
    <div class="file">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
    </div>
    <div class="path flex_row justify_center center">
        <p>${ input.value ? input.value : 'Individual Concept' }</p>
    </div>
</div>`;
    const directoriesContainer = document.querySelector('.directories_container.flex_row.justify_flex_start.align_flex_start.width_full');
    let fileTree = document.querySelector('.file_tree.flex_column.justify_flex_start.align_flex_start');
    fileTree.innerHTML += fileTreeHtml;
    fileTree = document.querySelector('.row.flex_row.space_between.center:last-child');
    fileTree.style.marginLeft = '0.8rem';
    fileTree.style.marginTop = '1rem';
    createMenu.style.display = 'none';
    isOpen = false;
    directoriesContainer.innerHTML += html;
    folders[input.value] = [];
    input.value = '';
}

function moveSlider(e) {
    e.stopPropagation();
    if (e.pageX > 30 && e.pageX < 1430) {
        let percent = 1 - ((start_tracker.getBoundingClientRect().x - videoDiv.getBoundingClientRect().x) / 1430);
        start_tracker.style.position = 'absolute';
        start_tracker.style.left = `${ e.pageX }px`;
        video.currentTime = video.duration - (percent * video.duration);
        seekBar.max = video.duration;
        seekBar.value = video.currentTime;
        const value = video.currentTime / 60;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
            start.value = `${ minutes }.${ seconds }`;
        } else {
            start.value = `${ value * 60 }`
        }
    }
}

function setPosition(e) {
    e.stopPropagation();
    if (30 < e.pageX) {
        start_tracker.style.left = `${ e.pageX }px`;
        const value = video.currentTime / 60;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
            start.value = `${ minutes }.${ seconds }`;
        } else {
            start.value = `${ value * 60 }`
        }
    } else {
        start_tracker.style.left = '30px';
        start.value = start.value.min;
    }
}

function moveEndSlider(e) {
    e.stopPropagation();
    if (e.pageX > 30 && e.pageX < 1460) {
        let percent = 1 - ((end_tracker.getBoundingClientRect().x - videoDiv.getBoundingClientRect().x) / 1430);
        end_tracker.style.position = 'absolute';
        end_tracker.style.left = `${ e.pageX }px`;
        video.currentTime = video.duration - (percent * video.duration);
        const value = (video.duration - (percent * video.duration)) / 60;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
            end.value = `${ minutes }.${ seconds }`;
        } else {
            end.value = `${ value * 60 }`
        }
    }
}

function setEndPosition(e) {
    e.stopPropagation();
    const value = video.currentTime / 60;
    if (30 < e.pageX) {
        end_tracker.style.left = `${ e.pageX }px`;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
            end.value = `${ minutes }.${ seconds }`;
        } else {
            end.value = `${ value * 60 }`
        }
    } else {
        end_tracker.style.left = '30px';
        end.value = '0.00';
    }
}

function directorySelect(e) {
    e.stopPropagation();
    console.log(e);
    if (e.target.classList.contains('remove') || e.target.parentElement.classList.contains('remove')) {
        const fileName = e.currentTarget.querySelector('#directory_name').innerHTML;
        e.currentTarget.remove();
        emptyFileContainer();
        let fileTree = document.querySelector('.file_tree.flex_column.justify_flex_start.align_flex_start');
        Array.from(fileTree.children).forEach(file => {
            if (file.querySelector('.path p').innerHTML === fileName) file.remove();
        });
        folders[fileName].forEach(file => {
            Array.from(fileTree.children).forEach(row => {
                console.log(row.querySelector('.path p').innerHTML);
                if (row.querySelector('.path p').innerHTML === file.name) row.remove();
            });
        });
        delete folders[fileName];
        
    } else {
        const directories = document.getElementsByClassName('directory_wrapper flex_row align_flex_start center');
        currentDirectory = e.currentTarget;
        Array.from(directories).forEach(directory => {
            directory.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        folders[e.currentTarget.querySelector('#directory_name').innerHTML].forEach(file => {
            const html = `
                <div oncontextmenu="fileRightClick(event)" onclick="playVideo(event)" class="file_wrapper flex_row align_flex_start center">
                    <input type="checkbox">
                    <div class="file flex_column space_between center width_full">
                        <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
                        <p id='file_name'>${ file.name }</p>
                    </div>
                </div>
            `;
            fileSection.innerHTML += html;
        });
    }
}

function playVideo(e) {
    e.stopPropagation();
    const fileName = e.currentTarget.querySelector('#file_name').innerHTML;
    const path = folders[currentDirectory.querySelector('#directory_name').innerHTML].filter(file => file.name === fileName);;
    video.style.display = 'block';
    video.nextElementSibling.style.display = 'none';
    video.src = path[0].src;
    e.currentTarget.classList.add('active');
    currentFile = e.currentTarget;
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
        tick.style.background = '#000';
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
            tick.style.background = '#000';
            ticksElement.insertBefore(tick, element);
            start += 5;
        }
    }
}

populateTicks();