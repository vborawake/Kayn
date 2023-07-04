const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const addButton = document.querySelector('.add_tag');
const createMenu = document.querySelector('.create_menu.flex_column.space_evenly');
const leftWorkspace = document.querySelector('.left_workspace.flex_column.justify_flex_start');
const right_workspace = document.querySelector('.right_workspace.flex_column.justify_flex_start');
const tagsContainer = document.querySelector('.tags_container.flex_row.justify_flex_start');
let menu = document.querySelector('.tag_menu.flex_row.center');
const tag_information = document.querySelector('.edit_tag.flex_row.justify_center.center');
const tagEdit = document.querySelector('.menus .tag_information.flex_column.center');
const tags_wrapper = tag_information.querySelector('.tags_wrapper.width_full');
const start = document.getElementById('start');
const end = document.getElementById('end');

let tag_button;
let buttonInCons = '';
let tagInCons;
let isOpen = false;
let tagCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (tagsContainer.children.length === 0) {
        const html = '<h1>You have not created any tags yet. Please click on the + button above and start creating tags.</h1>';
        tagsContainer.innerHTML += html;
    }
});

// window.addEventListener('load', () => {
//     setTimeout(() => {
//         document.querySelector('.container.flex_column.justify_flex_start.center.width_full').style.display = 'flex';
//         // document.querySelector('.loader.flex_row.center.justify_center').classList.remove('flex_row');
//         document.querySelector('.loader.flex_row.center.justify_center').style.display = 'none';
//     }, 500)
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

function moveSlider (e) {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.style.left = `${e.offsetX}px`;
}

function setSlider (e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    e.currentTarget.style.left = `${ Math.abs(e.layerX - e.currentTarget.parentElement.getBoundingClientRect().left) }px`;
}

// start.addEventListener('drag', moveSlider);
// end.addEventListener('drag', moveSlider);

// start.addEventListener('dragend', setSlider);
// end.addEventListener('dragend', setSlider);

tag_information.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!e.currentTarget.classList.contains('tag_wrapper')) {
        right_workspace.style.display = 'none';
        right_workspace.children[0].style.display = 'none';
        right_workspace.children[1].style.display = 'none';
        right_workspace.children[2].style.display = 'none';
        right_workspace.children[3].style.display = 'none';
        leftWorkspace.style.minWidth = '100%';

        Array.from(e.currentTarget.getElementsByClassName('tag_wrapper flex_column center space_between')).forEach(element => {
            element.classList.remove('active');
        });

        Array.from(e.currentTarget.querySelectorAll('.tag_information.flex_column.center .tags_wrapper.width_full button')).forEach(element => {
            element.classList.remove('active');
        });
    }
    if (menu.style.display === 'flex') menu.style.display = 'none';
});

function showEditTag(e) {
    e.stopPropagation();
    buttonInCons = tag_information.querySelector('.left_section h1').innerHTML;
    right_workspace.style.display = 'flex';
    right_workspace.querySelector('.details_wrapper .input:nth-child(1) input').value = buttonInCons;
    right_workspace.children[0].style.display = 'block';
    right_workspace.children[1].style.display = 'flex';
    menu.style.display = 'none';
    if (window.innerWidth > 1200) {
        right_workspace.style.minWidth = '20%';
        leftWorkspace.style.minWidth = '80%';
    } else if (window.innerWidth < 1200 && window.innerWidth > 900) {
        right_workspace.style.minWidth = '25%';
        leftWorkspace.style.minWidth = '75%';
    } else if (window.innerWidth < 900 && window.innerWidth > 600) {
        right_workspace.style.minWidth = '35%';
        leftWorkspace.style.minWidth = '65%';
    }
}

function showEditPanel(e) {
    e.stopPropagation();
    buttonInCons = e.currentTarget.innerHTML;
    tag_button = e.currentTarget;
    right_workspace.querySelectorAll('.details_wrapper .input:nth-child(1) input')[1].value = buttonInCons;
    if (window.innerWidth > 1200) {
        right_workspace.style.display = 'flex';
        right_workspace.children[2].style.display = 'block';
        right_workspace.children[3].style.display = 'flex';
        right_workspace.children[3].style.opacity = '1';
        requestAnimationFrame(() => {
            right_workspace.style.minWidth = '20%';
            leftWorkspace.style.minWidth = '80%';
        });
    } else {
        requestAnimationFrame(() => {
            right_workspace.style.minWidth = '25%';
            leftWorkspace.style.minWidth = '75%';
        });
    }
    e.currentTarget.classList.add('active');
}

function changeColor(event) {
    tag_button.style.background = event.currentTarget.style.background;
}

function updateTag(e) {
    const tag_name = right_workspace.querySelectorAll('.details_wrapper .input:nth-child(1) input')[1].value;
    tag_button.innerHTML = tag_name;
    right_workspace.style.display = 'none';
    leftWorkspace.style.minWidth = '100%';
}

addButton.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('clicked');
    tagEdit.style.display = 'flex';
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

function addTag() {
    const name = document.getElementById('tag_name');
    const html = `
                <div onclick="showTagDetails(event)" class="tag_wrapper flex_row center justify_flex)start width_full">
                    <span></span>
                    <div class="text_wrapper height_full flex_column space_evenly">
                        <p name=${ name.value ? name.value : 'Tag_1' }>${ name.value ? name.value : 'Tag_1' }</p>
                        <p>11 Tags</p>
                        <p>John</p>
                    </div>
                    <div class="menu flex_column justify_center align_flex_start">
                        <span></span>
                    </div>
                </div>
    `;
    if (tagsContainer.children[0].tagName === 'H1') tagsContainer.innerHTML = '';
    // menu = tagsContainer.querySelector('.tag_menu.flex_row.center');
    // createMenu.style.display = 'none';
    tagsContainer.innerHTML += html
    tag_information.querySelector('.left_section h1').innerHTML = name.value;
    tagEdit.style.display = 'none';
    tag_information.style.display = 'flex';
}

function hideTagDetails (e) {
    const tagsContainer = document.querySelector('.tags_container.flex_row.justify_flex_start');
    Array.from(tagsContainer.children).forEach(team => team.classList.remove('active'))
    // e.currentTarget.parentElement.parentElement.remove();
    Array.from(right_workspace.children).forEach(child => { child.style.display = 'none' });
    requestAnimationFrame(() => {
        right_workspace.style.display = 'none';
        leftWorkspace.style.minWidth = '100%';
    });
}

function showTagDetails(e) {
    e.stopPropagation();
    tagInCons = e.currentTarget;
    if (e.target.classList.contains('menu') || e.target.parentElement.classList.contains('menu')) {
        console.log('Menu');
        buttonInCons = e.currentTarget.querySelector('.text_wrapper p:nth-child(1)').innerHTML;
        menu.style.display = 'flex';
        menu.style.position = 'absolute';
        menu.style.top = `${ e.clientY - 20 }px`;
        menu.style.left = `${ e.clientX }px`;
        requestAnimationFrame(() => {
            menu.style.transform = 'scale(1)';
        });
        // console.log(e);
    } else if (e.target.nodeName === 'H1') {
        tag_information.style.display = 'none';
        tagsContainer.style.display = 'flex';
    } else {
        tag_information.style.display = 'flex';
        tag_information.querySelector('.left_section h1').innerHTML = e.currentTarget.querySelector('.text_wrapper.height_full.flex_column.space_evenly p:nth-child(1)').innerHTML;
        tagsContainer.style.display = 'none';
    }
}

window.addEventListener('resize', (e) => {
    if (right_workspace.style.display === 'flex') {
        if (window.innerWidth > 1200) {
            right_workspace.style.minWidth = '20%';
            leftWorkspace.style.minWidth = '80%';
            // menu.style.display = 'none';
            document.querySelector('.search.flex_row.center').style.width = '25%';
        } else if (window.innerWidth < 1200 && window.innerWidth > 900) {
            right_workspace.style.minWidth = '25%';
            leftWorkspace.style.minWidth = '75%';
            // menu.style.display = 'none';
        } else if (window.innerWidth < 900 && window.innerWidth > 600) {
            right_workspace.style.minWidth = '35%';
            leftWorkspace.style.minWidth = '65%';
            // menu.style.display = 'none';
            document.querySelector('.search.flex_row.center').style.width = '40%';
        }
    }
    console.log(window.innerWidth);
});