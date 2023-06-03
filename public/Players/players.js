const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const addButton = document.querySelector('.add_player');
const createMenu = document.querySelector('.create_menu.flex_column.space_evenly');
const leftWorkspace = document.querySelector('.left_workspace.flex_column.justify_flex_start');
const right_workspace = document.querySelector('.right_workspace.flex_column.justify_flex_start');
const playersContainer = document.querySelector('.players_container.flex_row.justify_flex_start');
const photoInput = document.querySelector('.image_upload');

let isOpen = false;
let playerCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (playersContainer.children.length === 0) {
        const html = '<h1>You have not created any players yet. Please click on the + button above and start creating players.</h1>';
        leftWorkspace.innerHTML += html;
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

function handleMenuClick (e) {
    if (e.target.classList.contains('menu_item')) {
        e.target.children[1].innerHTML;
    }
}

leftWorkspace.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(e.currentTarget);
    if (createMenu.style.display === 'flex') createMenu.style.display = 'none';
    if (!e.currentTarget.classList.contains('team_wrapper')) {
        right_workspace.style.display = 'none';
        leftWorkspace.style.minWidth = '100%';

        Array.from(e.currentTarget.getElementsByClassName('player_wrapper flex_column center space_between')).forEach(element => {
            element.classList.remove('active');
        });
    }
});

addButton.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('clicked');
    if (isOpen) {
        createMenu.style.display = 'none';
        isOpen = false;
    } else {
        createMenu.style.display = 'flex';
        isOpen = true;
    }
});

document.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
        mobileMenu.style.display = 'none';
        isOpen = false;
        console.log(e);
        createMenu.style.display = 'none';
    }
});

function addPlayer() {
    const name = document.getElementById('createPlayer');
    const html = `<div onclick="showPlayerDetails(event)" class="player_wrapper flex_column center space_between">
                        <div class="player flex_row center justify_center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style="stop-color: #B83169;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color: #380E3C;stop-opacity:1" />
                                        </linearGradient>
                                    </defs>
                                    <path fill="url(#grad1)" d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/>
                                </svg>
                            </div>
                            <p class="player_name">${ name.value ? name.value : 'Player_' + playerCounter++ }</p>
                   </div>`;
    playersContainer.innerHTML += html
    createMenu.style.display = 'none';
}

function hidePlayerDetails (e) {
    const playersContainer = document.querySelector('.players_container.flex_row.justify_flex_start');
    Array.from(playersContainer.children).forEach(team => team.classList.remove('active'))
    // e.currentTarget.parentElement.parentElement.remove();
    right_workspace.style.display = 'none';
    leftWorkspace.style.minWidth = '100%';
}

function uploadPhoto(e) {
    e.stopPropagation();
    const player_image = document.querySelector('.player_image.flex_column.justify_center.center');
    const html = `
        <input onchange=uploadPhoto(event) type="file" class="image_upload">
        <img src="${ URL.createObjectURL(e.target.files[0]) }">
    `;
    player_image.innerHTML = html;
    const player_name = right_workspace.querySelector('.details_wrapper .input:nth-child(2) input');
    Array.from(playersContainer.children).map(player => {
        if (player.querySelector('.player_name').innerHTML === player_name.value) {
            player.querySelector('.player').innerHTML = `<img src="${ URL.createObjectURL(e.target.files[0]) }">`;
        }
    });
    e.target.value = '';
}

function showPlayerDetails(e) {
    e.stopPropagation();
    e.currentTarget.classList.add('active');
    const teamName = e.currentTarget.querySelector('.player_name').innerHTML;
    right_workspace.querySelector('.details_wrapper .input:nth-child(2) input').value = teamName;
    if (e.currentTarget.querySelector('.player.flex_row.center.justify_center svg')) {
        right_workspace.querySelector('.player_image.flex_column.justify_center.center').innerHTML = `
            <input onchange="uploadPhoto(event)" type="file" class="image_upload">
            <svg xmlns="http://www.w3.org/2000/svg" height="64" viewBox="0 96 960 960" width="64">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color: #B83169;stop-opacity:1" />
                        <stop offset="100%" style="stop-color: #380E3C;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path fill="url(#grad1)" d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"/>
            </svg>
        `;
    }
    if (window.innerWidth < 900) {
        right_workspace.style.display = 'flex';
        leftWorkspace.style.minWidth = '75%';
        right_workspace.style.minWidth = '25%';
    } else {
        right_workspace.style.display = 'flex';
        right_workspace.style.minWidth = '20%';
        leftWorkspace.style.minWidth = '80%';
    }
}