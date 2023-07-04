const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const directoryCreateButton = document.querySelector('.create.flex_row.center.space_between');
const playPause = document.querySelector('.playing_buttons.flex_row.space_between.center').children[0];
const stop = document.querySelector('.playing_buttons.flex_row.space_between.center').children[3];
const fullScreen = document.querySelector('.volume_buttons.flex_row.space_between.center').children[5];
const createMenu = document.querySelector('.create_menu.flex_column.space_evenly');
const fileSection = document.querySelector('.files_container.flex_row.justify_flex_start.center.width_full');
const cutFileSection = document.querySelector('.cut_container.flex_row.justify_flex_start.center.width_full');
const trackerPosition = document.querySelector('.tracker.flex_column.justify_flex_start.width_full');
const videoDiv = document.querySelector('.video img');
const videoBar = document.querySelector('.video.width_full');
const directorySection = document.querySelector('.directories_container.flex_row.justify_flex_start.align_flex_start.width_full');
const cutSection = document.querySelector('.cut_section.flex_row.center.justify_flex_start.width_full');
const selectMenu = document.querySelector('.select_menu.flex_column.width_full');
const importInput = document.querySelector('.import.flex_row.center.space_between');
const barMenu = document.querySelector('.bar_menu.flex_column');

let currentDirectory;
let currentFile;
let barInCons;
const folders = {};

let fileMenu = document.querySelector('.file_menu.space_between.flex_row.center');

let isOpen = false;

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

if (fullScreen) {
    fullScreen.addEventListener('click', () => {
        video.requestFullscreen();
    });
}

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

document.addEventListener('DOMContentLoaded', () => {
    console.log(fullScreen);
    if (video.src === '') {
        video.style.display = 'none';
        video.nextElementSibling.style.display = 'flex';
    }

    if (directorySection.children.length === 0) importInput.classList.add('inactive');

    // if (fileSection.children.length === 0) {
    //     let 
    // }
});

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
    importInput.classList.add('inactive');
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

cutSection.addEventListener('click', () => {
    if (barMenu.style.display === 'flex') barMenu.style.display = 'none';
});

// fileSection.addEventListener('click', (e) => {
    
// });

function filter(e) {
    let filter;
    if (e.target.classList.contains('item')) filter = e.target.querySelector('p').innerHTML;
    if (e.target.localName === 'p') filter = e.target.innerHTML;

    if (filter === 'File' || filter === 'Video') {
        Array.from(fileSection.parentElement.parentElement.children).forEach((child) => {
            child.style.display = 'none';
        })
        fileSection.parentElement.style.display = 'flex';
    } else if (filter === 'Cut') {
        Array.from(fileSection.parentElement.parentElement.children).forEach((child) => {
            child.style.display = 'none';
        })
        fileSection.parentElement.parentElement.querySelector('.cuts.flex_column.width_full').style.display = 'flex';
    } else if (filter === 'No Filter') {
        Array.from(fileSection.parentElement.parentElement.children).forEach((child) => {
            child.style.display = 'flex';
        })
    }
}

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
        populateTicks();
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
                <span class='tooltip'>${ e.target.files[0].name }</span>
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
        <div class="row flex_row center width_full">
            <div class="file">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
            </div>
            <div class="path flex_row justify_center center">
                <p>${ e.target.files[0].name }</p>
                <span class='tooltip'>${ e.target.files[0].name }</span>
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

// function handleMenuClick (e) {
//     if (e.target.classList.contains('menu_item')) {
//         e.target.children[1].innerHTML;
//     }
// }

function emptyFileContainer(e) {
    Array.from(fileSection.children).forEach(file => {
        if (file.classList.contains('file_wrapper')) file.remove();
    });
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
    if (e.target === fullScreen) return;
    else if (e.target === seekBar) return;
    else if (e.target === volumeInput) return;
    else if (e.target === fileSection) {
        video.src = '';
        video.style.display = 'none';
        video.nextElementSibling.style.display = 'flex';
        Array.from(fileSection.children).forEach(file => {
            file.classList.remove('active');
        });
    }
    fileMenu.style.display = 'none';
});

function createDirectory(e) {
    // console.log(e);
    e.stopPropagation();
    const input = document.querySelector('#createDirectory');
    if (!input.value || folders[input.value]) return;
    const html = `
    <div onclick="directorySelect(event)" class="directory_wrapper flex_row align_flex_start center">
        <input type="checkbox">
        <div class="directory flex_column space_between center width_full">
            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
            <p id="directory_name" name=${ input.value ? input.value : 'Individual Concept' }>${ input.value ? input.value : 'Individual Concept' }</p>
            <span class='tooltip'>${ input.value ? input.value : 'Individual Concept' }</span>
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
        <span class='tooltip'>${ input.value ? input.value : 'Individual Concept' }</span>
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
        importInput.classList.remove('inactive');
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
                        <span class='tooltip'>${ file.name }</span>
                    </div>
                </div>
            `;
            fileSection.innerHTML += html;
        });
    }
}

function cutHere(e) {
    const fileName = currentFile.querySelector('#file_name').innerHTML;
    const html = `
        <div oncontextmenu="fileRightClick(event)" class="cut_wrapper flex_row align_flex_start center">
            <input type="checkbox">
            <div class="cut flex_column space_between center width_full">
                <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/></svg>
                <p>${ fileName }_Cut</p>
                <span class="tooltip">${ fileName }_Cut</span>
            </div>
        </div>
    `;
    cutFileSection.innerHTML += html;
    cutFileSection.parentElement.style.display = 'flex';

    const fileTreeHtml = `
        <div class="row flex_row space_between center">
            <div class="file">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M141 896q-24 0-42-18.5T81 836V316q0-23 18-41.5t42-18.5h280l60 60h340q23 0 41.5 18.5T881 376v460q0 23-18.5 41.5T821 896H141Zm0-580v520h680V376H456l-60-60H141Zm0 0v520-520Z"/></svg>
            </div>
            <div class="path flex_row justify_center center">
                <p>${ fileName }</p>
                <span class='tooltip'>${ fileName }</span>
            </div>
        </div>`;
    let fileTree = document.querySelector('.file_tree.flex_column.justify_flex_start.align_flex_start');
    fileTree.innerHTML += fileTreeHtml;
    fileTree = document.querySelector('.row.flex_row.space_between.center:last-child');
    fileTree.style.marginLeft = '1.6rem';
    fileTree.style.marginTop = '1rem';
}

function tagRightClick(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(window.scrollY);
    barMenu.style.display = 'flex';
    barMenu.style.top = `${ e.clientY + window.scrollY }px`;
    barMenu.style.left = `${ e.clientX }px`;
    barMenu.style.zIndex = '100';
    barInCons = e.currentTarget;
}

function handleBarClick(e) {
    e.stopPropagation();
    let action;
    if (e.target.nodeName === 'DIV') action = e.target.querySelector('p').innerHTML;
    else if (e.target.nodeName === 'P') action = e.target.innerHTML;

    if (action === 'Remove') {
        barInCons.remove();
    }
    barMenu.style.display = 'none';
    // console.log(e);
}

function populateTicks() {
    const ticksElement = document.querySelector('.ticks.width_full');
    const numbersPosition = document.querySelectorAll('.numbers.flex_row.space_between.center.width_full p');
    let tick = undefined;
    Array.from(numbersPosition).forEach(numberPosition => {
        tick = document.createElement('span');
        tick.style.width = '1.5px';
        tick.style.height = '1rem';
        tick.style.position = 'absolute';
        tick.style.top = `${ trackerPosition.getBoundingClientRect().top + window.scrollY + 25 }px`;
        tick.style.left = `${ numberPosition.getBoundingClientRect().x + (numberPosition.getBoundingClientRect().width / 2) }px`;
        tick.style.background = '#4C7A96';
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
            tick.style.background = '#4C7A96';
            ticksElement.insertBefore(tick, element);
            start += 5;
        }
    }
}

// populateTicks();