const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const createMenu = document.querySelector('.create_menu.flex_column.space_evenly');
const leftWorkspace = document.querySelector('.left_workspace.flex_column.justify_flex_start');
const right_workspace = document.querySelector('.right_workspace.flex_column.justify_flex_start');
const teamsContainer = document.querySelector('.teams_container.flex_row.justify_flex_start');
const addButton = document.querySelector('.add_team');

let isOpen = false;
let teamCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (teamsContainer.children.length === 0) {
        const html = '<h1>You have not created any teams yet. Please click on the + button above and start creating teams.</h1>';
        teamsContainer.innerHTML += html;
    }
});

// window.addEventListener('load', () => {
//     setTimeout(() => {
//         document.querySelector('.container.flex_column.justify_flex_start.center.width_full').style.display = 'flex';
//         // document.querySelector('.loader.flex_row.center.justify_center').classList.remove('flex_row');
//         document.querySelector('.loader.flex_row.center.justify_center').style.display = 'none';
//     }, 2000)
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

leftWorkspace.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(e.currentTarget);
    if (createMenu.style.display === 'flex') {
        createMenu.style.display = 'none';
        isOpen = false
    }
    if (!e.currentTarget.classList.contains('team_wrapper')) {
        leftWorkspace.style.minWidth = '100%';
        right_workspace.style.display = 'none';

        Array.from(e.currentTarget.getElementsByClassName('team_wrapper flex_column center space_between')).forEach(element => {
            element.classList.remove('active');
        });
    }
});

function showCreateMenu (e) {
    e.stopPropagation();
    console.log('clicked');
    console.log(createMenu.style);
    if (createMenu.style.display === 'flex') {
        createMenu.style.display = 'none';
        isOpen = false;
    } else {
        createMenu.style.display = 'flex';
        isOpen = true;
    }
}

addButton.addEventListener('click', (e) => {
});

// document.addEventListener('click', (e) => {
//     e.stopPropagation();
//     if (isOpen) {
//         mobileMenu.style.display = 'none';
//         isOpen = false;
//         console.log(e);
//         createMenu.style.display = 'none';
//     }
// });

function addTeam() {
    const name = document.getElementById('createTeam');
    const html = `<div onclick="showTeamDetails(event)" class="team_wrapper flex_column center space_between">
                        <div class="team flex_row center justify_center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                                    <path d="M480 606q-58 0-97.5-39.5T343 469q0-58 39.5-97.5T480 332q58 0 97.5 39.5T617 469q0 58-39.5 97.5T480 606Zm0-60q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0 429q-140-35-230-162.5T160 533V295l320-120 320 120v238q0 152-90 279.5T480 975Zm0-399Zm0-337-260 98v196q0 63 17.5 120.5T287 760q46-25 93.5-37.5T480 710q52 0 99.5 12.5T673 760q32-49 49.5-106.5T740 533V337l-260-98Zm0 531q-39 0-78 10t-77 30q32 35 71 61.5t84 41.5q45-15 84-41.5t71-61.5q-38-20-77-30t-78-10Z"/>
                                </svg>
                            </div>
                            <p class="team_name" name=${ name.value ? name.value : 'Team_' + teamCounter++ }>${ name.value ? name.value : 'Team_' + teamCounter++ }</p>
                   </div>`;
    if (teamsContainer.children[0].tagName === 'H1') teamsContainer.innerHTML = '';
    teamsContainer.innerHTML += html;
    createMenu.style.display = 'none';
}

function hideTeamDetails (e) {
    const teamsContainer = document.querySelector('.teams_container.flex_row.justify_flex_start');
    Array.from(teamsContainer.children).forEach(team => team.classList.remove('active'))
    // e.currentTarget.parentElement.parentElement.remove();\
    leftWorkspace.style.minWidth = '100%';
    right_workspace.style.display = 'none';
}

function uploadPhoto(e) {
    e.stopPropagation();
    const team_image = document.querySelector('.team_image.flex_column.justify_center.center');
    const html = `
        <input onchange=uploadPhoto(event) type="file" class="image_upload" name="teamimage">
        <img src="${ URL.createObjectURL(e.target.files[0]) }">
    `;
    team_image.innerHTML = html;
    const team_name = right_workspace.querySelector('.details_wrapper .input:nth-child(1) input');
    Array.from(teamsContainer.children).map(team => {
        if (team.querySelector('.team_name').innerHTML === team_name.value) {
            team.querySelector('.team').innerHTML = `<img src="${ URL.createObjectURL(e.target.files[0]) }">`;
        }
    });
    e.target.value = '';
}

function showTeamDetails(e) {
    e.stopPropagation();
    e.currentTarget.classList.add('active');
    const teamName = e.currentTarget.querySelector('.team_name').innerHTML;
    right_workspace.querySelector('.details_wrapper .input:nth-child(1) input').value = teamName;
    if (localStorage.getItem('select')) {
        let name = localStorage.getItem('select');
        name = name + ' - ' + teamName;
        localStorage.setItem('fromCutSection', name);
        window.location.href = '../Desktop/desktop.html';
    }
    if (localStorage.getItem('fromStats')) {
        localStorage.removeItem('fromStats');
        localStorage.setItem('fromPlayer', e.currentTarget.querySelector('.team_name').innerHTML);
        window.location.href = '../Statistics/statistics.html'
    }
    if (!localStorage.getItem('fromStats')) {
        if (e.currentTarget.querySelector('.team.flex_row.center.justify_center svg')) {
            right_workspace.querySelector('.team_image.flex_column.justify_center.center').innerHTML = `
                <input onchange="uploadPhoto(event)" type="file" class="image_upload" name="teamimage">
                <svg xmlns="http://www.w3.org/2000/svg" height="54" viewBox="0 96 960 960" width="54">
                    <path d="M480 606q-58 0-97.5-39.5T343 469q0-58 39.5-97.5T480 332q58 0 97.5 39.5T617 469q0 58-39.5 97.5T480 606Zm0-60q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0 429q-140-35-230-162.5T160 533V295l320-120 320 120v238q0 152-90 279.5T480 975Zm0-399Zm0-337-260 98v196q0 63 17.5 120.5T287 760q46-25 93.5-37.5T480 710q52 0 99.5 12.5T673 760q32-49 49.5-106.5T740 533V337l-260-98Zm0 531q-39 0-78 10t-77 30q32 35 71 61.5t84 41.5q45-15 84-41.5t71-61.5q-38-20-77-30t-78-10Z"/>
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
            leftWorkspace.style.minWidth = '80%';;
        }
    }
}

window.addEventListener('resize', (e) => {
    if (right_workspace.style.display === 'flex') {
        if (window.innerWidth > 1200) {
            right_workspace.style.minWidth = '20%';
            leftWorkspace.style.minWidth = '80%';
            // menu.style.display = 'none';
        } else if (window.innerWidth < 1200 && window.innerWidth > 900) {
            right_workspace.style.minWidth = '25%';
            leftWorkspace.style.minWidth = '75%';
            // menu.style.display = 'none';
        } else if (window.innerWidth < 900 && window.innerWidth > 600) {
            right_workspace.style.minWidth = '35%';
            leftWorkspace.style.minWidth = '65%';
            // menu.style.display = 'none';
            document.querySelector('.search.flex_row.center').style.width = '70%';
        }
    }
});