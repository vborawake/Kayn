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
let canvas = document.getElementById('chart');
let ctx = canvas ? canvas.getContext('2d') : undefined;
const selectMenu = document.querySelector('.select_menu.flex_column.width_full');
const tagList = document.querySelector('.tags_list.flex_column.center.width_full');
const buttonsList = document.querySelector('.buttons.flex_row.space_between.center.width_full');
const workingArea = document.querySelector('.working_area.width_full.flex_column.justify_flex_start');
const selectionContent = document.querySelector('.selection_content.flex_column:nth-child(2)');
let lineChart = document.getElementById('line_chart');
let lineCtx = lineChart ? lineChart.getContext('2d') : undefined;

let chartCanvas;
let chartctx1;
let chartCanvas2;
let chartctx2;

const playersContainer = document.querySelector('.players.flex_column.center.justify_flex_start');

let fileMenu;

let isOpen = false;
const files = [
    {
        name: 'Football 1',
        videoSrc: 'video/football-15734.mp4'
    },
    {
        name: 'Football 2',
        videoSrc: 'video/soccer-5264.mp4'
    },
];

// window.addEventListener('load', () => {
//     setTimeout(() => {
//         document.querySelector('.container.flex_column.justify_flex_start.center.width_full').style.display = 'flex';
//         // document.querySelector('.loader.flex_row.center.justify_center').classList.remove('flex_row');
//         document.querySelector('.loader.flex_row.center.justify_center').style.display = 'none';
//     }, 500)
// });

const content = {
    'match_statistics': `
    <div class="score_section flex_row center">
        <div class="team flex_row center">
            <div class="team_image flex_column center">
                <img src="../images/team 1.png" alt="">
                <p>Soccer Club</p>
            </div>
            <p class="score">3</p>
        </div>
        <p>:</p>
        <div class="team flex_row_reverse center">
            <div class="team_image flex_column center">
                <img src="../images/team 2.png" alt="">
                <p>Best Foot</p>
            </div>
            <p class="score">1</p>
        </div>
    </div>
    <div class="chart_wrapper flex_row space_between center">
        <div class="chart flex_row justify_center center">
            <div>
                <span class="team_1">
                    <p>Yara Toure 34'</p>
                </span>
                <span class="team_2">
                    <p>74' Ibarra</p>
                </span>
                <span class="team_1">
                    <p>Yara Toure 34'</p>
                </span>
                <span class="team_1">
                    <p>Yara Toure 34'</p>
                </span>
                <span class="team_2">
                    <p>74' Ibarra</p>
                </span>
                <span class="team_2">
                    <p>74' Ibarra</p>
                </span>
                <span class="team_1">
                    <p>Yara Toure 34'</p>
                </span>
                <span class="team_1">
                    <p>Yara Toure 34'</p>
                </span>
            </div>
        </div>
        <div class="stats flex_column center">
            <div class="ball_possession flex_column">
                <h1 style="text-align: center;">Ball Possession</h1>
                <div class="values flex_row space_between">
                    <div class="bar_left flex_row center justify_flex_end">
                        <span style="width: 100%;"></span>
                        <p>62%</p>
                    </div>
                    <div class="bar_right flex_row center justify_flex_start">
                        <span style="width: 80%;"></span>
                        <p>38%</p>
                    </div>
                </div>
            </div>
            <div class="ball_possession flex_column">
                <h1 style="text-align: center;">Shots</h1>
                <div class="values flex_row space_between">
                    <div class="bar_left flex_row center justify_flex_end">
                        <span style="width: 100%;"></span>
                        <p>7</p>
                    </div>
                    <div class="bar_right flex_row center justify_flex_start">
                        <span style="width: 60%;"></span>
                        <p>4</p>
                    </div>
                </div>
            </div>
            <div class="ball_possession flex_column">
                <h1 style="text-align: center;">Free Kicks</h1>
                <div class="values flex_row space_between">
                    <div class="bar_left flex_row center justify_flex_end">
                        <span style="width: 80%;"></span>
                        <p>9</p>
                    </div>
                    <div class="bar_right flex_row center justify_flex_end">
                        <span style="width: 100%;"></span>
                        <p>14</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    'passes': `
    <div class="wrapper flex_row space_between">
        <div class="left_side">
            <canvas id="chart"></canvas>
            <div class="pass_stats flex_row">
                <div class="column flex_column">
                    <p>PASSES IN 1ST HALF</p>
                    <p>264</p>
                </div>
                <div class="column flex_column">
                    <p>ACCURATE PASSES</p>
                    <p>208</p>
                </div>
                <div class="column flex_column">
                    <p>ACCURACY</p>
                    <p>78.25%</p>
                </div>
            </div>
        </div>
        <div class="right_side flex_column">
            <h1>PASS ATTEMPTS AND BREAKDOWN</h1>
            <div class="passes flex_row">
                <div class="input flex_row">
                    <input type="checkbox" name="" id="">
                    <p>Successful Passes</p>
                </div>
                <div class="input flex_row">
                    <input type="checkbox" name="" id="">
                    <p>Unsuccessful Passes</p>
                </div>
            </div>
            <div class="boards flex_row space_between">
                <div class="board flex_column">
                    <span>23</span>
                    <span>59</span>
                </div>
                <div class="board flex_column">
                    <span>23</span>
                    <span>59</span>
                </div>
                <div class="board flex_column">
                    <span>23</span>
                    <span>59</span>
                </div>
            </div>
            <div class="football_field flex_row space_between center">
                <div class="goal_post">
                    <span></span>
                    <div class="mid_field flex_row justify_center center">
                        <p>82</p>
                    </div>
                </div>
                <div class="mid_field flex_row justify_center center">
                    <p>121</p>
                </div>
                <div class="goal_post">
                    <div class="mid_field flex_row justify_center center">
                        <p>61</p>
                    </div>
                    <span></span>
                </div>
            </div>
            <div class="pass_stats flex_row space_between">
                <div class="column flex_column">
                    <p>31%</p>
                    <p>DEF</p>
                </div>
                <div class="column flex_column">
                    <p>46%</p>
                    <p>MID</p>
                </div>
                <div class="column flex_column">
                    <p>23%</p>
                    <p>ATK</p>
                </div>
            </div>
        </div>
    </div>
    `,
    'ball_possession': `
    <div class="wrapper flex_row space_between">
        <div class="left_side">
            <h1>BALL POSSESSION</h1>
            <canvas id="line_chart"></canvas>
        </div>
        <div class="right_side">
            <div class="stats flex_row space_between">
                <div class="stat">
                    <p>BALL POSSESSSION</p>
                    <p>60 / <span>40</span></p>
                </div>
                <div class="stat">
                    <p>1ST HALF</p>
                    <p>58 / <span>44</span></p>
                </div>
                <div class="stat">
                    <p>2ND HALF</p>
                    <p>63 / <span>37</span></p>
                </div>
            </div>
        </div>
    </div>
    `
};

function createChart() {
    lineChart = document.getElementById('line_chart');
    lineCtx = lineChart ? lineChart.getContext('2d') : undefined;

    canvas = document.getElementById('chart');
    ctx = canvas ? canvas.getContext('2d') : undefined;
    
    if (ctx) {
        const gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height * 2);
        gradient.addColorStop(0, '#BCBCBC');
        gradient.addColorStop(1, '#5A5858');
        
        const data = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40, 81, 65, 80, 59, 40, 56, 55],
                backgroundColor: [
                gradient
                ],
                borderRadius: ['50'],
                borderWidth: 1,
                barThickness: 20
            }],
        };
    
        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: '#FFF'
                            }
                        }
                    ]
                }
            }
        });
        canvas.width = selectionContent.getBoundingClientRect().width / 2.5;
        canvas.height = 383;
    }

    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6],
                datasets: [
                    {
                        data: [122, 110, 98, 110, 122, 115],
                        pointBackgroundColor: '#FFF'
                    },
                    {
                        data: [10, 22, 34, 22, 10, 17],
                        fill: '-1',
                        backgroundColor: 'rgba(95, 95, 95, 0.3)',
                        pointBackgroundColor: '#FFF'
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('fromPlayer') || localStorage.getItem('fromTeam')) {
        document.querySelector('.playerCharts.flex_column').style.display = 'flex';
        if (ctx) {
            const gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height * 2);
            gradient.addColorStop(0, '#BCBCBC');
            gradient.addColorStop(1, '#5A5858');
            
            const data = {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40, 81, 65, 80, 59, 40, 56, 55],
                    backgroundColor: [
                    gradient
                    ],
                    borderRadius: ['50'],
                    borderWidth: 1,
                    barThickness: 20
                }],
            };
        
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontColor: '#FFF'
                                }
                            }
                        ]
                    }
                }
            });
            canvas.width = selectionContent.getBoundingClientRect().width / 2.5;
            canvas.height = 383;
        }
    
        if (lineCtx) {
            new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: [1, 2, 3, 4, 5, 6],
                    datasets: [
                        {
                            data: [122, 110, 98, 110, 122, 115]
                        },
                        {
                            data: [10, 22, 34, 22, 10, 17],
                            fill: '-1',
                            backgroundColor: 'rgba(95, 95, 95, 0.3)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
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

function trackPlayers(e) {
    const p = e.currentTarget.nextElementSibling;
    p.style.display = 'block';
    setTimeout(() => {
        p.style.display = 'none';
    }, 1000);
}

function selectTab(e) {
    Array.from(e.currentTarget.children).forEach(tab => {
        tab.classList.remove('active');
    });

    e.target.classList.add('active');

    if (e.target.innerHTML === 'Match Statistics') selectionContent.innerHTML = content['match_statistics'];
    else if (e.target.innerHTML === 'Passes') {
        selectionContent.innerHTML = content['passes'];
        createChart();
    }
    else if (e.target.innerHTML === 'Ball Possession') {
        selectionContent.innerHTML = content['ball_possession'];
        createChart();
    }
}