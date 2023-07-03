const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const directoryCreateButton = document.querySelector('.create.flex_row.center.space_between');
const createMenu = document.querySelector('.create_menu.flex_column.space_evenly');
const fileSection = document.querySelector('.files_section.flex_column.justify_flex_start');
const trackerPosition = document.querySelector('.tracker.flex_column.justify_flex_start.width_full');
const videoBar = document.querySelector('.video.flex_row.justify_center.center.width_full');
const videoDiv = document.querySelector('.video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = document.querySelector('.video img');
const left_toolbar = document.querySelector('.tools.left_tools');
const right_toolbar = document.querySelector('.tools.right_tools');
const ticksElement = document.querySelector('.ticks.flex_row.align_flex_end.width_full');
const renderMenu = document.querySelector('.render_menu.flex_column.center');
const canvasMenu = document.querySelector('.canvas_menu.flex_column');
const playerSelect = document.querySelector('.selected_item.flex_row.justify_center.center');
const workingArea = document.querySelector('.working_area.width_full.flex_column.justify_flex_start');

let start_coords = {};
let end_coords = {};
let fileMenu;
let selectedTool;
let isOpen = false;
let ringCount = 0;
let lineCount = 0;
let arrowCount = 0;
let distanceCount = 0;
let currentPlayer;
let polygonPoints = 4;
let startedPolygon = false;

let canvasElems = [];

let playerElems = {};

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

function drawCanvas (canvasElems, action) {
    if (action === 'undo') {
        const removed = canvasElems.splice(canvasElems.length - 1, 1);
        console.log(removed[0]);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Array.from(workingArea.children).forEach(tag => {
        if (tag.classList.contains('tag')) tag.remove();
    });
    Array.from(fileSection.children).forEach((tag, index) => {
        if (index > 0) tag.remove();
    });
    ringCount = 0;
    lineCount = 0;
    arrowCount = 0;
    canvasElems.forEach(element => {
        if (element['Circle']) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.strokeStyle = '#FFF';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(element['Circle'].x, element['Circle'].y, element['Circle'].radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            addVideoBar('Circle');
        }
        if (element['Line']) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FFF';
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(element['Line'].x1, element['Line'].y1);
            const dx = element['Line'].x2 - element['Line'].x1;
            const dy = element['Line'].y2 - element['Line'].y1;
            ctx.textAlign = 'center';
            ctx.lineTo(element['Line'].x2, element['Line'].y2);
            ctx.stroke();
            addVideoBar('Line');
        }
        if (element['Distance']) {
            const dx = element['Distance'].x2 - element['Distance'].x1;
            const dy = element['Distance'].y2 - element['Distance'].y1;
            ctx.textAlign = 'center';
            ctx.save();
            ctx.translate((element['Distance'].x1 + dx * 0.5), ((element['Distance'].y1 + dy * 0.5) - 10));
            ctx.rotate(Math.atan2(dy, dx));
            ctx.font = ctx.font.replace(/(?<value>\d+\.?\d*)/, 18);
            ctx.fillText(`${ Math.abs(element['Distance'].x2 - element['Distance'].x1)/100 }m`, 0, 0);
            ctx.restore();
            addVideoBar('Distance');
        }
        if (element['Arrow']) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FFF';
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(element['Arrow'].x1, element['Arrow'].y1);
            ctx.fillStyle = '#FFF';
            const middleX = (element['Arrow'].x2 - element['Arrow'].x1) * 0.9 + element['Arrow'].x1;
            const middleY = (element['Arrow'].y2 - element['Arrow'].y1) * 0.9 + element['Arrow'].y1;
            const dx = element['Arrow'].x2 - middleX;
            const dy = element['Arrow'].y2 - middleY;
            const dx1 = element['Arrow'].x2 - element['Arrow'].x1;
            const dy1 = element['Arrow'].y2 - element['Arrow'].y1;
            ctx.lineTo(middleX, middleY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(middleX+ 0.5 * dy, middleY - 0.5 * dx);
            ctx.lineTo(middleX- 0.5 * dy, middleY + 0.5 * dx);
            ctx.lineTo(element['Arrow'].x2, element['Arrow'].y2);
            ctx.closePath();
            ctx.fill();
            addVideoBar('Arrow');
        }
    });
}

function setCanvasSize() {
    console.log(image.getBoundingClientRect());
    canvas.width = image.getBoundingClientRect().width;
    canvas.height = image.getBoundingClientRect().height;
    canvas.style.position = 'absolute';
    canvas.style.left = `${ image.getBoundingClientRect().left }px`;
    canvas.style.top = `${ image.getBoundingClientRect().top + window.scrollY }px`;
    // canvas.style.border = '4px solid black';
}

playerSelect.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Player');
    document.querySelector('.players.flex_column').style.display = 'flex';
    requestAnimationFrame(() => {
        // canvasMenu.style.top = `-${ canvasMenu.getBoundingClientRect().bottom - document.querySelector('.players.flex_column').getBoundingClientRect().height }px`;
        document.querySelector('.players.flex_column').style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    setCanvasSize();
    const players = localStorage.getItem('Players').split(', ');
    if (players) {
        canvasMenu.style.display = 'flex';
        canvasMenu.style.position = 'absolute';
        if (!videoDiv) {
            canvasMenu.style.left = canvas.getBoundingClientRect().left + 'px';
            canvasMenu.style.top = (canvas.getBoundingClientRect().bottom - canvasMenu.getBoundingClientRect().height) + 'px';
        } else {
            canvasMenu.style.left = videoDiv.getBoundingClientRect().left + 'px';
            canvasMenu.style.top = (videoDiv.getBoundingClientRect().bottom - canvasMenu.getBoundingClientRect().height) + 'px';
        }
        currentPlayer = playerSelect.innerText;
        playerElems[playerSelect.innerText] = [];
    }
});

function setPlayer(e) {
    playerSelect.innerHTML = e.currentTarget.innerHTML;
    requestAnimationFrame(() => {
        document.querySelector('.players.flex_column').style.transform = 'scale(0)';
    });
    document.querySelector('.players.flex_column').style.display = 'none';
    currentPlayer = e.currentTarget.innerHTML;
    if (!playerElems[currentPlayer]) {
        playerElems[currentPlayer] = [];
    }
    console.log(playerElems);
    drawCanvas(playerElems[currentPlayer], 'setPlayer');
}

function addSelectRow (name) {
    const html = `
        <div class="row flex_row justify_flex_start center width_full">
            <input type="checkbox">
            <p class="tag_name">${ name }</p>
        </div>
    `;

    fileSection.innerHTML += html;
}

function removeSelectRow (name) {
    console.log(fileSection.children);
    Array.from(fileSection.children).forEach(row => {
        if (row.querySelector('p').innerHTML === name) row.remove();
    });
}

canvas.addEventListener('click', (e) => {
    // e.stopPropagation();
    if (renderMenu.style.transform === 'scaleY(1)') {
        renderMenu.style.transform = 'scaleY(0)';
        return;
    }
    if (selectedTool) {
        if (selectedTool.classList.contains('circle')) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.strokeStyle = '#FFF';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(e.layerX, e.layerY, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            canvasElems = [...canvasElems, {'Circle': { x: e.layerX, y: e.layerY, radius: 20, player: currentPlayer }}];
            playerElems[currentPlayer] = [
                ...playerElems[currentPlayer],
                {
                    'Circle': {
                        x: e.layerX,
                        y: e.layerY,
                        radius: 20
                    }
                }
            ];
            addVideoBar('Circle');
        } else if (selectedTool.classList.contains('line')) {
            if (!start_coords.x) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#FFF';
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(e.layerX, e.layerY);
                start_coords.x = e.layerX;
                start_coords.y = e.layerY;
            } else {
                console.log('In else');
                const dx = e.layerX - start_coords.x;
                const dy = e.layerY - start_coords.y;
                ctx.textAlign = 'center';
                ctx.lineTo(e.layerX, e.layerY);
                ctx.stroke();
                canvasElems = [...canvasElems, {'Line': {
                    x1: start_coords.x,
                    y1: start_coords.y,
                    x2: e.layerX,
                    y2: e.layerY
                }}];
                playerElems[currentPlayer] = [...playerElems[currentPlayer], {'Line': {
                    x1: start_coords.x,
                    y1: start_coords.y,
                    x2: e.layerX,
                    y2: e.layerY
                }}];
                addVideoBar('Line');
                start_coords = {};
            }
        } else if (selectedTool.classList.contains('distance')) {
            if (!start_coords.x) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#FFF';
                ctx.setLineDash([]);
                start_coords.x = e.layerX;
                start_coords.y = e.layerY;
            } else {
                console.log('In else');
                const dx = e.layerX - start_coords.x;
                const dy = e.layerY - start_coords.y;
                ctx.textAlign = 'center';
                ctx.save();
                ctx.translate((start_coords.x + dx * 0.5), ((start_coords.y + dy * 0.5) - 10));
                ctx.rotate(Math.atan2(dy, dx));
                ctx.font = ctx.font.replace(/(?<value>\d+\.?\d*)/, 18);
                ctx.fillText(`${ Math.abs(e.layerX - start_coords.x)/100 }m`, 0, 0);
                ctx.restore();
                canvasElems = [...canvasElems, {'Distance': {
                    x1: start_coords.x,
                    y1: start_coords.y,
                    x2: e.layerX,
                    y2: e.layerY
                }}];
                playerElems[currentPlayer] = [...playerElems[currentPlayer], {'Distance': {
                    x1: start_coords.x,
                    y1: start_coords.y,
                    x2: e.layerX,
                    y2: e.layerY
                }}];
                addVideoBar('Distance');
                start_coords = {};
            }
        } else if (selectedTool.classList.contains('arrow') || selectedTool.classList.contains('dashed_arrow')) {
            if (selectedTool.classList.contains('dashed_arrow')) ctx.setLineDash([5, 5]);
            else ctx.setLineDash([]);
            if (!start_coords.x) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#FFF';
                ctx.beginPath();
                ctx.moveTo(e.layerX, e.layerY);
                start_coords.x = e.layerX;
                start_coords.y = e.layerY;
            } else {
                ctx.fillStyle = '#FFF';
                const middleX = (e.layerX - start_coords.x) * 0.9 + start_coords.x;
                const middleY = (e.layerY - start_coords.y) * 0.9 + start_coords.y;
                const dx = e.layerX - middleX;
                const dy = e.layerY - middleY;
                const dx1 = e.layerX - start_coords.x;
                const dy1 = e.layerY - start_coords.y;
                ctx.lineTo(middleX, middleY);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(middleX+ 0.5 * dy, middleY - 0.5 * dx);
                ctx.lineTo(middleX- 0.5 * dy, middleY + 0.5 * dx);
                ctx.lineTo(e.layerX, e.layerY);
                ctx.closePath();
                ctx.fill();
                canvasElems = [...canvasElems, {'Arrow': {
                    x1: start_coords.x,
                    y1: start_coords.y,
                    x2: e.layerX,
                    y2: e.layerY
                }}];
                playerElems[currentPlayer] = [...playerElems[currentPlayer], { 'Arrow': {
                    x1: start_coords.x,
                    y1: start_coords.y,
                    x2: e.layerX,
                    y2: e.layerY
                }}];
                addVideoBar('Arrow');
                start_coords = {};
            }
        } else if (selectedTool.classList.contains('polygon')) {
            console.log(polygonPoints);
            if (!startedPolygon && polygonPoints > 0) {
                ctx.strokeStyle = '#FFF';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(e.layerX, e.layerY);
                polygonPoints--;
                startedPolygon = true;
            } else if (polygonPoints > 0) {
                ctx.lineTo(e.layerX, e.layerY);
                ctx.stroke();
                polygonPoints--;
                if (polygonPoints === 0) {
                    ctx.closePath();
                    ctx.fill();
                    console.log('Closed Path');
                }
            }
        }
    }
});

function setPoints(e) {
    const points = parseInt(document.querySelector('#points').value);
    const polygonMenu = document.querySelector('.polygon_menu.flex_column');
    if (e.currentTarget.innerHTML === 'OK') {
        if (points) polygonPoints = points + 1;
        requestAnimationFrame(() => {
            polygonMenu.style.transform = 'scale(0)';
        });
        polygonMenu.style.display = 'none';
    } else {
        requestAnimationFrame(() => {
            polygonMenu.style.transform = 'scale(0)';
        });
        polygonMenu.style.display = 'none';
    }
}

function undo(e) {
    drawCanvas(playerElems[currentPlayer], 'undo');
}

function resize(e) {
    const element = e.currentTarget.parentElement;
    const left = element.getBoundingClientRect().left;
    const right = element.getBoundingClientRect().right;

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', () => {
        console.log('Mouse Up');
        window.removeEventListener('mousemove', move);
    });
    
    function move(e2) {
        e.preventDefault();
        // console.log(e.target);
        // element.style.width = `${ e2.pageX - element.getBoundingClientRect().left }px`;
        if (e.target.id === 'right_resizer') {
            element.style.left = `${ e2.pageX - fileSection.getBoundingClientRect().width - element.getBoundingClientRect().width }px`;
            element.style.width = `${ e2.pageX - left }px`;
        } else {
            element.style.left = `${ e2.pageX - fileSection.getBoundingClientRect().width }px`;
            element.style.width = `${ right - e2.pageX }px`;
        }
    }
}


function addVideoBar(type) {
    let top = 0;
    const html = `
        <div class="tag flex_row justify_center center width_full" style="color: #FFF;">
            <span onmousedown='resize(event)' id='left_resizer'></span>
            <p>${ type === 'Circle' ? 'Ring': type === 'Line' ? 'Line' : type === 'Arrow' ? 'Arrow' : 'Distance' }_${ type === 'Circle' ? ringCount++: type === 'Line' ? lineCount++ : type === 'Arrow' ? arrowCount++ : distanceCount++ }</p>
            <span onmousedown='resize(event)' id='right_resizer'></span>
        </div>
    `;

    Array.from(workingArea.children).forEach(element => {
        if (element.classList.contains('video') || element.classList.contains('tag')) {
            top += 1.3;
        }
    });

    workingArea.innerHTML += html;
    const ring = workingArea.querySelector('.tag:last-child');
    ring.style.position = 'absolute';
    ring.style.top = `${ top }rem`;
    ring.style.right = '20rem';

    addSelectRow(document.querySelector('.tag.flex_row.justify_center.center.width_full:last-child p').innerHTML);
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

    if (selectedTool.classList.contains('polygon')) {
        console.log('Polygon');
        const menu = document.querySelector('.polygon_menu.flex_column');
        menu.style.display = 'flex';
        requestAnimationFrame(() => {
            menu.style.transform = 'scale(1)';
            menu.style.top = `${ e.clientY }px`;
            menu.style.left = `${ e.clientX }px`;
        });
    }
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