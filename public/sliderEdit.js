const play = document.querySelectorAll('.play');
const stop = document.querySelectorAll('.stop');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const start = document.querySelector('p.start');
const end = document.querySelector('p.end');
const seekBar = document.querySelector('.seek_bar');
const volume = document.querySelector('.volume');
const video = document.querySelector('video');
const render_start = document.querySelector('.start_tracker');
const render_end = document.querySelector('.end_tracker');
const render_start_value = document.querySelector('.ranges.flex_row.space_between .start input');
const render_end_value = document.querySelector('.ranges.flex_row.space_between .end input');

if (play && stop) {
    Array.from(play).forEach(play2 => {
        play2.addEventListener('click', () => {
            if (video.paused) video.play();
            else video.pause();
        });
    });

    Array.from(stop).forEach(stop2 => {
        stop2.addEventListener('click', () => {
            if (video.paused) video.play();
            else video.pause();
        });
    });

    // stop.addEventListener('click', () => {
    //     video.pause();
    //     video.currentTime = 0;
    // });
}


if (seekBar && video) seekBar.max = video.duration;

if (volume) {
    volume.addEventListener('change', (e) => {
        video.volume = e.currentTarget.value;
    });
}

start_tracker.style.position = 'absolute';

if (video) {
    video.addEventListener('timeupdate', () => {
        if (start && seekBar) {
            start.innerHTML = video.currentTime;
        }
        const percent = video.currentTime / video.duration;
        seekBar.max = `${ video.duration }`;
        seekBar.value = `${ video.currentTime }`;
        console.log(video.duration);
        start_tracker.style.left = `${ (videoBar.getBoundingClientRect().width * percent) + 30 }px`;
        // start
    });
}

if (start_tracker) {
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
}

function moveSlider (e2) {
    if (e2.pageX > (30 + fileSection.getBoundingClientRect().width) && (e2.pageX - fileSection.getBoundingClientRect().width) < (videoBar.getBoundingClientRect().width + 30)) {
        let percent = (start_tracker.getBoundingClientRect().x - videoBar.getBoundingClientRect().x) / (videoBar.getBoundingClientRect().width);
        start_tracker.style.position = 'absolute';
        start_tracker.style.left = `${ e2.pageX - (fileSection.getBoundingClientRect().width + 30) }px`;
        if (end_tracker.getBoundingClientRect().x < start_tracker.getBoundingClientRect().x) end_tracker.style.left = start_tracker.getBoundingClientRect().x + 50;
        video.currentTime = percent * video.duration;
    }
}

end_tracker.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Clicked');
    window.addEventListener('mousemove', moveEndSlider);
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', moveEndSlider);
    });
})

function moveEndSlider(e) {
    e.stopPropagation();
    movingEndSlider = true;
    if (e.pageX > (30 + fileSection.getBoundingClientRect().width) && (e.pageX - fileSection.getBoundingClientRect().width) < (videoBar.getBoundingClientRect().width + 30)) {
        let percent = (end_tracker.getBoundingClientRect().x - videoBar.getBoundingClientRect().x) / (videoBar.getBoundingClientRect().width);
        end_tracker.style.position = 'absolute';
        end_tracker.style.left = `${ e.pageX - fileSection.getBoundingClientRect().width }px`;
        video.currentTime = percent * video.duration;
        const value = (video.duration - (percent * video.duration)) / 60;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
        }
    }
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

render_start.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();

    window.addEventListener('mousemove', renderStartMove);
    
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', renderStartMove);
    });
});

function renderStartMove(e) {
    if (e.pageX > ( renderMenu.getBoundingClientRect().x + 24) && (e.pageX < renderMenu.querySelector('.range').getBoundingClientRect().right )) {
        if ((render_start.getBoundingClientRect().x + 50) > render_end.getBoundingClientRect().x) render_end.style.left = `${ e.pageX - renderMenu.getBoundingClientRect().x }px`;
        render_start.style.left = `${ e.pageX - renderMenu.getBoundingClientRect().x - 24 }px`;
        render_start.previousElementSibling.style.left = render_start.style.left;
        render_start.previousElementSibling.style.width = `${ (render_end.getBoundingClientRect().x - render_start.getBoundingClientRect().x) }px`;

        let percent = getPercent(render_start);
        video.currentTime = video.duration * percent;
        render_start_value.value = `${ Math.floor(video.currentTime) }`;
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
        render_end_value.value = `${ Math.floor(video.currentTime) }`;
        // console.log(video.duration);
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