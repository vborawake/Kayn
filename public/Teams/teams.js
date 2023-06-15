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

function fileRightClick(e) {
    e.preventDefault();
    console.log(e.currentTarget.offsetTop);
    fileMenu = fileSection.querySelector('.file_menu.space_between.flex_row.center');
    if (!fileMenu) {
        const html = `<div onclick="handleMenuClick(event)" class="file_menu space_between flex_row center">
        <div class="menu_item flex_row width_full justify_flex_start center">
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
    </div>`;
    fileSection.innerHTML += html;
    fileMenu = fileSection.querySelector('.file_menu.space_between.flex_row.center');
    }
    fileMenu.style.display = 'none';
    fileMenu.style.position = '';
    fileMenu.style.top = '';
    fileMenu.style.left = '';
    fileMenu.style.display = 'flex';
    fileMenu.style.position = 'absolute';
    fileMenu.style.top = `${e.clientY}px`;
    fileMenu.style.left = `${e.clientX}px`;
    console.log(e);
    isOpen = true;
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
                            <p class="team_name">${ name.value ? name.value : 'Team_' + teamCounter++ }</p>
                   </div>`;
    if (playersContainer.children[0].tagName === 'H1') playersContainer.innerHTML = '';
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
        <input onchange=uploadPhoto(event) type="file" class="image_upload">
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
    if (e.currentTarget.querySelector('.team.flex_row.center.justify_center svg')) {
        right_workspace.querySelector('.team_image.flex_column.justify_center.center').innerHTML = `
            <input onchange="uploadPhoto(event)" type="file" class="image_upload">
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