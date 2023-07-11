const video = document.querySelector('video');
const seekBar = document.querySelector('.seek_bar');
const start_tracker = document.querySelector('.start_tracker');
const volumeInput = document.querySelector('.volume');
const start = document.querySelectorAll('.ranges.flex_column input')[0];
const end = document.querySelectorAll('.ranges.flex_column input')[1];
const end_tracker = document.querySelector('.end_tracker');

const startP = document.querySelector('.start');
const endP = document.querySelector('.end');

const pauseSvg = `<svg fill="#000000" width="36" height="36" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
<path d="M46.677 64.652c0-9.362 7.132-17.387 16.447-17.394 9.315-.007 24.677.007 34.55.007 9.875 0 17.138 7.594 17.138 16.998 0 9.403-.083 119.094-.083 127.82 0 8.726-7.58 16.895-16.554 16.837-8.975-.058-25.349.115-34.963.058-9.614-.058-16.646-7.74-16.646-17.254 0-9.515.11-117.71.11-127.072zm14.759.818s-.09 118.144-.09 123.691c0 5.547 3.124 5.315 6.481 5.832 3.358.518 21.454.47 24.402.47 2.947 0 7.085-1.658 7.167-6.14.08-4.483-.082-119.507-.082-123.249 0-3.742-4.299-4.264-7.085-4.66-2.787-.395-25.796 0-25.796 0l-4.997 4.056zm76.664-.793c.027-9.804 7.518-17.541 17.125-17.689 9.606-.147 25.283.148 35.004.148 9.72 0 17.397 8.52 17.397 17.77s-.178 117.809-.178 127c0 9.192-7.664 17.12-16.323 17.072-8.66-.05-26.354 0-34.991.048-8.638.05-17.98-8.582-18.007-17.783-.027-9.201-.055-116.763-.027-126.566zm16.917.554s-.089 118.145-.089 123.692c0 5.547 3.123 5.314 6.48 5.832 3.359.518 21.455.47 24.402.47 2.948 0 7.086-1.659 7.167-6.141.081-4.482-.08-119.506-.08-123.248 0-3.742-4.3-4.265-7.087-4.66-2.786-.396-25.796 0-25.796 0l-4.997 4.055z" fill-rule="evenodd"/>
</svg>`;

const playSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36"><path d="M320 853V293l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z"/></svg>`;

if (seekBar) {
    seekBar.max = video ? video.duration : 0;
    
    seekBar.addEventListener('change', (e) => {
        video.currentTime = e.target.value;
    });
}

volumeInput.addEventListener('change', (e) => {
    video.volume = e.target.value;
});

function resetRanges() {
    start.value = start.min;
    end.value = end.min;
    start_tracker.style.left = videoBar.style.left;
    end_tracker.style.position = 'absolute';
    end_tracker.style.left = videoBar.style.left;
}

if (video) {
    video.addEventListener('timeupdate', (e) => {
        seekBar.max = e.target.duration;
        seekBar.value = e.target.currentTime;
        if (!video.paused) playPause.innerHTML = pauseSvg;
        else if (video.paused) playPause.innerHTML = playSvg;
    });
}

start_tracker.addEventListener('drag', moveSlider)
end_tracker.addEventListener('drag', moveEndSlider)
start_tracker.addEventListener('dragend', setPosition)
end_tracker.addEventListener('dragend', setEndPosition)

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

function moveSlider(e) {
    e.stopPropagation();
    if (e.pageX > 30 && e.pageX < (videoBar.getBoundingClientRect().width + 30)) {
        let percent = 1 - ((start_tracker.getBoundingClientRect().x - videoBar.getBoundingClientRect().x) / (videoBar.getBoundingClientRect().width));
        start_tracker.style.position = 'absolute';
        start_tracker.style.left = `${ e.pageX }px`;
        video.currentTime = video.duration - (percent * video.duration);
        seekBar.max = video.duration;
        seekBar.value = video.currentTime;
        const value = video.currentTime / 60;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
            start ? start.value = `${ minutes }.${ seconds }` : startP.innerHTML = `${ minutes }.${ seconds }`;
        } else {
            start ? start.value = `${ value * 60 }` : startP.innerHTML = `${ value * 60 }`;
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
            start ? start.value = `${ minutes }.${ seconds }` : startP.innerHTML = `${ minutes }.${ seconds }`;
        } else {
            start ? start.value = `${ value * 60 }` : startP.innerHTML = `${ value * 60 }`;
        }
    } else {
        start_tracker.style.left = '30px';
        start.value = start.value.min;
    }
}

function moveEndSlider(e) {
    e.stopPropagation();
    if (e.pageX > 30 && e.pageX < 1460) {
        let percent = 1 - ((end_tracker.getBoundingClientRect().x - videoBar.getBoundingClientRect().x) / (videoBar.getBoundingClientRect().width));
        end_tracker.style.position = 'absolute';
        end_tracker.style.left = `${ e.pageX }px`;
        video.currentTime = video.duration - (percent * video.duration);
        const value = (video.duration - (percent * video.duration)) / 60;
        if (value > 1) {
            let minutes = Math.floor(value);
            let seconds = Math.floor((value % 1) * 60);
            end ? end.value = `${ minutes }.${ seconds }` : endP.innerHTML = `${ minutes }.${ seconds }`;
        } else {
            end ? end.value = `${ value * 60 }` : endP.innerHTML = `${ value * 60 }`;
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
            end ? end.value = `${ minutes }.${ seconds }` : endP.innerHTML = `${ minutes }.${ seconds }`;
        } else {
            end ? end.value = `${ value * 60 }` : endP.innerHTML = `${ value * 60 }`;
        }
    } else {
        end_tracker.style.left = '30px';
        end.value = '0.00';
    }
}

function playVideo(e) {
    e.stopPropagation();
    const files = document.getElementsByClassName('file_wrapper flex_row align_flex_start center');
    currentFile = e.currentTarget;
    Array.from(files).forEach(file => {
        file.classList.remove('active');
    });
    const fileName = e.currentTarget.querySelector('#file_name').innerHTML;
    const path = folders[currentDirectory.querySelector('#directory_name').innerHTML].filter(file => file.name === fileName);;
    video.style.display = 'block';
    video.nextElementSibling.style.display = 'none';
    video.src = path[0].src;
    e.currentTarget.classList.add('active');
    currentFile = e.currentTarget;
}