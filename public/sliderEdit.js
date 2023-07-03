const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const start = document.querySelector('p.start');
const end = document.querySelector('p.end');
const seekBar = document.querySelector('.seek_bar');
const volume = document.querySelector('.volume');
const video = document.querySelector('video');
const startTracker = document.querySelector('.start_tracker');
const endTracker = document.querySelector('.end_tracker');

play.addEventListener('click', () => {
    if (video.paused) video.play();
    else video.pause();
});

stop.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
});

if (seekBar && video) seekBar.max = video.duration;

volume.addEventListener('change', (e) => {
    video.volume = e.currentTarget.value;
});

startTracker.style.position = 'absolute';

if (video) {
    video.addEventListener('timeupdate', () => {
        seekBar.value = video.currentTime;
        start.innerHTML = video.currentTime;
        startTracker.style.left = `${ video.currentTime }px`;
        // start
    });
}