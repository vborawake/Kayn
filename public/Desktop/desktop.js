const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile_menu');
const trackerPosition = document.querySelector('.tracker.flex_column.justify_flex_start.width_full');
const videoBar = document.querySelector('.video.width_full.flex_row.justify_center');
const start_tracker = document.querySelector('.start_tracker_cut');
const end_tracker = document.querySelector('.end_tracker_cut');
const render_start = document.querySelector('.start_tracker');
const render_end = document.querySelector('.end_tracker');
const selectMenu = document.querySelector('.select_menu.flex_column.width_full');
const tagList = document.querySelector('.tags_list.flex_column.center.width_full');
const workingArea = document.querySelector('.working_area.width_full.flex_column.justify_flex_start');
const selectionContent = document.querySelector('.selection_content.flex_column:nth-child(2)');
const defaultContent = document.querySelector('.default_content.flex_row.space_between');
const ticksElement = document.querySelector('.ticks.flex_row.align_flex_end.width_full');
const fileSection = document.querySelector('.files_section.flex_column.justify_flex_start');
const cutSection = document.querySelector('.cut_section.flex_row.center.justify_flex_start.width_full');
const barMenu = document.querySelector('.bar_menu.flex_column');
const renderMenu = document.querySelector('.render_menu.flex_column.center');
const video = document.querySelector('video');
const render_start_input = document.getElementById('render_start');
const render_end_input = document.getElementById('render_end');

let barInCons;
let bars = [];
let movingEndSlider = false;

const playersContainer = document.querySelector('.players.flex_column.center.justify_flex_start');

let fileMenu;

let isOpen = false;

const selectContent = {
    'Attacking Principles': `
        <h4 id="tag_stagger">Attacking Principles</h4>
        <div class="buttons flex_row space_between center width_full">
            <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">Depth</button>
            <button onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">Support</button>
            <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">Penetration</button>
            <button onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">Transition</button>
            <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">Mobility</button>
            <button onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">Creativity</button>
            <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">Width</button>
            <button onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">No Text</button>
            <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">Successful</button>
            <button onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">Unsuccessful</button>
        </div>
    `,
    'Transitions': `
    <h4 id="tag_stagger">Transition</h4>
    <div class="buttons flex_row space_between center width_full">
        <button class="tall_button" onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">Defensive</button>
        <button class="tall_button" onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">Attacking</button>
        <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">
            Speed Of Awareness
        </button>
        <button onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">
            Speed Of Decision
        </button>
        <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">
            Speed Of Perception
        </button>
        <button onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">
            Speed Of Action
        </button>
        <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">
            Recovery Time
        </button>
        <div class="flex_row space_between" style="width: 38%;">
            <button class="short_button" onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">
                <p>Successful</p>
                <span>Successful</span>
            </button>
            <button class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">
                <p>UnSuccessful</p>
                <span>UnSuccessful</span>
            </button>
        </div>
        <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">
            Pressing Inside
        </button>
        <button onclick="addToTagList(event)" style="background: #D9D9D9;" id="tag_stagger">No Text</button>
        <button onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">
            Pressing Outside
        </button>
        <button onclick="addToTagList(event)" style="background: #D9D9D9;" id="tag_stagger">No Text</button>
        <div class="flex_row space_between" style="width: 38%;">
            <button class="short_button" onclick="addToTagList(event)" style="background: #4E4C4C;" id="tag_stagger">
                <p>Successful</p>
                <span>Successful</span>
            </button>
            <button class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;" id="tag_stagger">
                <p>UnSuccessful</p>
                <span>UnSuccessful</span>
            </button>
        </div>
        <button onclick="addToTagList(event)" style="background: #D9D9D9;" id="tag_stagger">No Text</button>
    </div>
    `,
    'Phases Of Play': `
        <h4 id="tag_stagger">Phases Of Play</h4>
        <div class="buttons flex_row space_between center width_full">
            <button id="tag_stagger" class="tall_button" onclick="addToTagList(event)" style="background: #4E4C4C;">In Possession</button>
            <button id="tag_stagger" class="tall_button long_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Out Of Possession</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Build Up Unopponent</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">High Press</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">High Block</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Build Up Opponent</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Mid Press</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Mid Block</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Progression</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Low Press</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Low Block</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Long Ball</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Recovery</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Defensive</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Counter Attack</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Transitions</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Counter</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #D9D9D9;">No Text</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Press</button>
            <button id="tag_stagger" class="small_button" onclick="addToTagList(event)" style="background: #D9D9D9;">No Text</button>
        </div>
    `,
    'Defensive Principles': `
        <h4 id="tag_stagger">Defensive Principles</h4>
        <div class="buttons flex_row space_between center width_full">
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Pressure</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Cover</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Balance</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Compact</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #D9D9D9;">&lt;No Text&gt;</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #D9D9D9;">&lt;No Text&gt;</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #D9D9D9;">&lt;No Text&gt;</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #D9D9D9;">&lt;No Text&gt;</button>
        </div>
    `,
    'Set Plays': `
        <h4 id="tag_stagger">Set Plays</h4>
        <div class="buttons flex_row space_between center width_full">
            <button id="tag_stagger" class="tall_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Free Kicks</button>
            <button id="tag_stagger" class="tall_button long_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Corners</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Direct</button>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">From Left</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">High Block</button>
            </div>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Direct On Target</button>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">From Right</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Mid Block</button>
            </div>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Direct Off Target</button>
            <button id="tag_stagger" class="long_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Direct To Area Shot</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Indirect</button>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">In Swing</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Out Swing</button>
            </div>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">Counter Attack</button>
            <button id="tag_stagger" class="long_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Edge Of Penalty Area</button>
        </div>
    `,
    'Attempts At Goal': `
        <h4 id="tag_stagger">Attempts At Goal</h4>
        <div class="buttons flex_row space_evenly center width_full">
            <button id="tag_stagger" class="long_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Goal</button>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #4E4C4C;">On Target</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Off Target</button>
            </div>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Blocked</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Incomplete</button>
            </div>
        </div>
    `,
    'Defensive Actions': `
        <h4 id="tag_stagger">Defensive Actions</h4>
        <div class="buttons flex_row space_evenly center width_full">
            <button id="tag_stagger" class="long_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Forced Turnover</button>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #4E4C4C;">On Target</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Interceptions</button>
            </div>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Tackles</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">1v1 Duels</button>
            </div>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Aerial Duels</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Clearance</button>
            </div>
        </div>
    `,
    'Movement To Receive': `
        <h4 id="tag_stagger">Movement To Receive</h4>
        <div class="buttons flex_row space_between center width_full">
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">In Front</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #A4A4A4;">In Front</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">In Between</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #A4A4A4;">Out To In</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #4E4C4C;">In To Out</button>
            <button id="tag_stagger" onclick="addToTagList(event)" style="background: #A4A4A4;">In Behind</button>
        </div>
    `,
    'Goalkeeping': `
        <h4 id="tag_stagger">Goalkeeping</h4>
        <div class="buttons flex_row space_evenly center width_full">
            <button id="tag_stagger" class="long_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Goalkeeping Distribution</button>
            <button id="tag_stagger" class="long_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Goal Prevention</button>
            <button id="tag_stagger" class="long_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Aerial Control</button>
            <div class="flex_row space_between" style="width: 60%;">
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #4E4C4C;">Successful</button>
                <button id="tag_stagger" class="short_button" onclick="addToTagList(event)" style="background: #A4A4A4;">Unsuccessful</button>
            </div>
        </div>
    `
};

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

video.addEventListener('timeupdate', updateSeekbar);

function updateSeekbar () {
    if (!movingEndSlider) {
        let percent = video.currentTime / video.duration;
        start_tracker.style.left = `${ percent * videoBar.getBoundingClientRect().width + 30 }px`;
    
        if (end_tracker.getBoundingClientRect().x < start_tracker.getBoundingClientRect().x) end_tracker.style.left = start_tracker.style.left;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('fromCutSection') || localStorage.getItem('cutSection')) {
        const name = localStorage.getItem('fromCutSection') ? localStorage.getItem('fromCutSection') : localStorage.getItem('cutSection');
        const html = `
                <div oncontextmenu="tagRightClick(event)" class="tag flex_row justify_center center width_full" style="color: #FFF;">
                    <span onmousedown='resize(event)' id='left_resizer'></span>
                    <p>${ name }</p>
                    <span onmousedown='resize(event)' id='right_resizer'></span>
                </div>
            `;
            workingArea.insertAdjacentHTML('beforeend', html);
        adjustBars();
        addSelectRow(name);
        cutSection.style.display = 'flex';
        populateTicks();
        localStorage.removeItem('fromCutSection');
        localStorage.setItem('cutSection', name);
    }

    if (localStorage.getItem('bars')) {
        bars = JSON.parse(localStorage.getItem('bars'));

        bars.forEach(bar => {
            const html = `
                <div oncontextmenu="tagRightClick(event)" class="tag flex_row justify_center center width_full" style="color: #FFF;">
                    <span onmousedown='resize(event)' id='left_resizer'></span>
                    <p>${ bar }</p>
                    <span onmousedown='resize(event)' id='right_resizer'></span>
                </div>
            `;
            workingArea.insertAdjacentHTML('beforeend', html);
            cutSection.style.display = 'flex';
            adjustBars();
            addSelectRow(bar);
            populateTicks();
            localStorage.setItem('bars', JSON.stringify(bars));
        });
    }
    addAnimations();
});

function addAnimations() {
    gsap.from('.buttons_wrapper a', {
        y: '1rem',
        opacity: 0,
        stagger: 0.1
    });

    gsap.from('#stagger', {
        y: '1rem',
        opacity: 0,
        stagger: 0.1
    });

    gsap.from('#tag_stagger', {
        marginTop: '1rem',
        opacity: 0,
        stagger: 0.1
    });

    gsap.from('#stat_stagger', {
        marginTop: '1rem',
        opacity: 0,
        stagger: 0.1
    });
}

function adjustBars () {
    let top = 1.4;
    Array.from(workingArea.children).forEach(tag => {
        if (tag.classList.contains('tag')) {
            tag.style.position = 'absolute';
            tag.style.top = `${ top }rem`;
            top += 1.4;
        }
    });
}

function removeBar (name) {
    let top = 1.4;
    Array.from(workingArea.children).forEach(tag => {
        if (tag.classList.contains('tag')) {
            if (tag.querySelector('p').innerHTML === name) {
                tag.remove();
                adjustBars();
            }
        }
    });
}

function addSelectRow (name) {
    const html = `
        <div class="row flex_row justify_flex_start center width_full">
            <input type="checkbox">
            <p class="tag_name">${ name }</p>
            <img src="../images/loader3.gif" alt="">
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

function addToTagList (e) {
    let tagListContains = 0
    // console.log(buttonsList);

    if (cutSection.style.display !== 'flex') cutSection.style.display = 'flex';
    
    Array.from(tagList.children).forEach(button => {
        if (button === e.currentTarget) {
            button.remove();
            // buttonsList.appendChild(e.currentTarget);
            tagListContains = 1;
            removeSelectRow(e.currentTarget.innerHTML);
            removeBar(e.currentTarget.innerHTML);
            removeFromBar(e.currentTarget.innerHTML);
            // return;
        }
    });
    if (tagListContains === 0) {
        tagList.appendChild(e.currentTarget);
        const html = `
            <div oncontextmenu="tagRightClick(event)" class="tag flex_row justify_center center width_full" style="color: #FFF;">
                <span onmousedown='resize(event)' id='left_resizer'></span>
                <p>${ e.currentTarget.innerHTML }</p>
                <span onmousedown='resize(event)' id='right_resizer'></span>
            </div>
        `;
        workingArea.innerHTML += html;
        adjustBars();
        addSelectRow(e.currentTarget.innerHTML);
        populateTicks();
        bars.push(e.currentTarget.innerHTML);
        localStorage.setItem('bars', JSON.stringify(bars));
    }
}

function showRender (e) {
    requestAnimationFrame(() => {
        if (renderMenu.style.transform === '' || renderMenu.style.transform === 'scale(0)') {
            renderMenu.style.transform = 'scaleX(1)';
            renderMenu.style.transform = 'scaleY(1)';
            renderMenu.style.transformOrigin = 'left';
        } else renderMenu.style.transform = 'scale(0)'
    });
}

function selectAllTags(event) {
    if (cutSection.style.display !== 'flex') cutSection.style.display = 'flex';
    
    if (buttonsList.children.length > 0) {
        Array.from(buttonsList.children).forEach(button => {
            tagList.appendChild(button);
            const html = `
                <div class="tag flex_row justify_center center width_full" style="color: #FFF;">
                    <span onmousedown='resize(event)' id='left_resizer'></span>
                    <p>${ button.innerHTML }</p>
                    <span onmousedown='resize(event)' id='right_resizer'></span>
                </div>
            `;
            workingArea.innerHTML += html;
            adjustBars();
            addSelectRow(button.innerHTML);
            bars.push(button.innerHTML);
            localStorage.setItem('bars', JSON.stringify(bars));
        });

    } else if (buttonsList.children.length === 0) {
        Array.from(tagList.children).forEach(tag => {
            buttonsList.appendChild(tag);
            removeSelectRow(tag.innerHTML);
            removeBar(tag.innerHTML);
            removeFromBar(tag.innerHTML);
        });
    }

    console.log(buttonsList.children.length);
}

function removeFromBar (name) {
    const index = bars.indexOf(name);
    if (index !== -1) {
        bars.splice(index, 1);
        localStorage.setItem('bars', JSON.stringify(bars));
    }
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

// document.addEventListener('DOMContentLoaded', () => {

//     if (playersContainer.children.length === 0) {
//         const html = `<h1 id="initial">Please select a player to view its statistics</h1>`;
//         defaultContent.innerHTML += html;
//     }
// });

function selectItem (e) {
    const content = document.querySelector('.content_wrapper.flex_column.space_between.center');
    const selected = document.querySelector('.selected_item.flex_row.space_between.center.width_full p');
    // console.log(content);
    console.log(e.target.innerHTML);
    selected.innerHTML = e.target.innerHTML;
    content.innerHTML = selectContent[e.target.innerHTML];
    buttonsList = document.querySelector('.buttons.flex_row.space_between.center.width_full');
    gsap.from('#tag_stagger', {
        marginTop: '1rem',
        opacity: 0,
        stagger: 0.1
    });
}

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
    if (barMenu.style.display === 'flex') barMenu.style.display = 'none';
    if (renderMenu && !e.target.classList.contains('workspace')) {
        console.log(e.target);
        if (renderMenu.style.transform === 'scaleY(1)') renderMenu.style.transform = 'scale(0)';
    }
    console.log(e);
});

function handleBarClick(e) {
    e.stopPropagation();
    let action;
    if (e.target.nodeName === 'DIV') action = e.target.querySelector('p').innerHTML;
    else if (e.target.nodeName === 'P') action = e.target.innerHTML;

    if (action === 'Add Player') {
        localStorage.setItem('select', barInCons.querySelector('p').innerHTML);
        localStorage.setItem('currentBar', barInCons.querySelector('p').innerHTML);
        window.location.href = '../Players/players.html';
    }
    else if (action === 'Set Team') {
        localStorage.setItem('select', barInCons.querySelector('p').innerHTML);
        localStorage.setItem('currentBar', barInCons.querySelector('p').innerHTML);
        window.location.href = '../Teams/teams.html';
    }
    else if (action === 'Remove') {
        removeSelectRow(barInCons.querySelector('p').innerHTML);
        removeBar(barInCons.querySelector('p').innerHTML);
        removeFromBar(barInCons.querySelector('p').innerHTML);
        localStorage.setItem('bars', JSON.stringify(bars));
        localStorage.removeItem('cutSection');
    }
    barMenu.style.display = 'none';
    // console.log(e);
}

function trackPlayers(e) {
    const p = e.currentTarget.nextElementSibling;
    p.style.display = 'block';
    setTimeout(() => {
        p.style.display = 'none';
    }, 1000);
}

function selectPath(e) {
    e.stopPropagation();
    console.log(e);
    e.currentTarget.nextElementSibling.value = e.currentTarget.value;
}

function populateTicks() {
    const ticksElement = document.querySelector('.ticks.width_full');
    let numbersPosition = document.querySelectorAll('.numbers.flex_row.space_between.center.width_full p');
    let tick = undefined;
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

start_tracker.addEventListener('mousedown', (e) => {
    // e.stopPropagation();
    e.preventDefault();
    e.stopPropagation();
    movingEndSlider = false;
    window.addEventListener('mousemove', moveSlider);
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', moveSlider);
    });
});

function moveSlider (e2) {
    if (e2.pageX > (30 + fileSection.getBoundingClientRect().width) && (e2.pageX - fileSection.getBoundingClientRect().width) < (videoBar.getBoundingClientRect().width + 30)) {
        let percent = 1 - ((start_tracker.getBoundingClientRect().x - videoBar.getBoundingClientRect().x) / (videoBar.getBoundingClientRect().width));
        start_tracker.style.position = 'absolute';
        start_tracker.style.left = `${ e2.pageX - fileSection.getBoundingClientRect().width }px`;
        console.log(e2.pageX - fileSection.getBoundingClientRect().width);
        if (end_tracker.getBoundingClientRect().x < start_tracker.getBoundingClientRect().x) end_tracker.style.left = start_tracker.style.left;
        video.currentTime = video.duration - (percent * video.duration);
        const value = video.currentTime / 60;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
        }
    }
}

end_tracker.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    movingEndSlider = true;
    window.addEventListener('mousemove', moveEndSlider);
    window.addEventListener('mouseup', () => {
        movingEndSlider = false;
        window.removeEventListener('mousemove', moveEndSlider);
    });
})

function moveEndSlider(e) {
    e.stopPropagation();
    // movingEndSlider = true;
    if (e.pageX > (30 + fileSection.getBoundingClientRect().width) && (e.pageX - fileSection.getBoundingClientRect().width) < (videoBar.getBoundingClientRect().width + 30)) {
        let percent = 1 - ((end_tracker.getBoundingClientRect().x - videoBar.getBoundingClientRect().x) / (videoBar.getBoundingClientRect().width));
        end_tracker.style.position = 'absolute';
        end_tracker.style.left = `${ e.pageX - fileSection.getBoundingClientRect().width }px`;
        video.currentTime = video.duration - (percent * video.duration);
        const value = (video.duration - (percent * video.duration)) / 60;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
        }
    }
}

render_start.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();

    window.addEventListener('mousemove', renderStartMove);
    
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', renderStartMove);
    });
});

function renderStartMove(e) {
    if (e.pageX > (renderMenu.getBoundingClientRect().x + 24) && (e.pageX < renderMenu.querySelector('.range').getBoundingClientRect().right )) {
        if ((render_start.getBoundingClientRect().x + 50) > render_end.getBoundingClientRect().x) render_end.style.left = `${ e.pageX - renderMenu.getBoundingClientRect().x }px`;
        render_start.style.left = `${ e.pageX - renderMenu.getBoundingClientRect().x - 24 }px`;
        render_start.previousElementSibling.style.left = render_start.style.left;
        render_start.previousElementSibling.style.width = `${ (render_end.getBoundingClientRect().x - render_start.getBoundingClientRect().x) }px`;

        let percent = getPercent(render_start);
        video.currentTime = video.duration * percent;
        render_start_input.value = Math.floor(video.currentTime);
    }
}

render_end.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();

    window.addEventListener('mousemove', renderEndMove);
    
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', renderEndMove);
    });
});

function renderEndMove(e) {
    if (e.pageX > ( renderMenu.getBoundingClientRect().x + 24) && (e.pageX < renderMenu.querySelector('.range').getBoundingClientRect().right )) {
        render_end.style.left = `${ e.pageX - renderMenu.getBoundingClientRect().x - 24 }px`;
        render_start.previousElementSibling.style.left = render_start.style.left;
        render_start.previousElementSibling.style.width = `${ (render_end.getBoundingClientRect().x - render_start.getBoundingClientRect().x) }px`;

        let percent = getPercent(render_end);
        video.currentTime = video.duration * percent;
        render_end_input.value = Math.floor(video.currentTime);
    }
}

function getPercent(element) {
    const width = element.parentElement.getBoundingClientRect().width;
    // Here we are getting the position of element excluding the padding and position of render menu popup.
    const position = element.getBoundingClientRect().x -
                    (renderMenu.getBoundingClientRect().x +
                    parseInt(window.getComputedStyle(renderMenu, null).getPropertyValue('padding-left').split('px')[0]));
    console.log(position / width);
    return (position / width);
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

// populateTicks();

window.addEventListener('resize', throttleFunc(() => {
    // console.log(window.innerWidth);
    Array.from(ticksElement.children).forEach(tick => { tick.remove() });
    // setCanvasSize();
    populateTicks();
}), 1000);