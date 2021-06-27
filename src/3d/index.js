import './index.css';
import config from './config';
import World from './objects/world';
import { gsap } from 'gsap';
import Player from '@vimeo/player';

// ----------------------
// Globals
// ----------------------

const $world = document.getElementById('world');
const system = new World($world, config);

// ----------------------
// Speed
// ----------------------

const $slower = document.getElementById('slower');
const $faster = document.getElementById('faster');

$slower.addEventListener('click', () => {
    system.setTimeScale(system.timeScale / 1.5);
});

$faster.addEventListener('click', () => {
    system.setTimeScale(system.timeScale * 1.5);
});

// ----------------------
// Play / Stop
// ----------------------

const $stop = document.getElementById('stop');
const $play = document.getElementById('play');

$stop.addEventListener('click', () => {
    system.pause();
    $stop.classList.add('u-hidden');
    $play.classList.remove('u-hidden');
});

$play.addEventListener('click', () => {
    system.resume();
    $play.classList.add('u-hidden');
    $stop.classList.remove('u-hidden');
});

// ----------------------
// Zoom
// ----------------------

const $zoomIn = document.getElementById('zoom-in');
const $zoomOut = document.getElementById('zoom-out');
const $zoomVal = document.getElementById('zoom-val');

function getZoomOrigin() {
    const { left, top, width, height } = $world.getBoundingClientRect();
    return { x: left + width / 2, y: top + height / 2 };
}

$zoomIn.addEventListener('click', () => {
    system.scene.zoomTo(getZoomOrigin(), system.scene.zoom + 0.1);
});

$zoomOut.addEventListener('click', () => {
    system.scene.zoomTo(getZoomOrigin(), system.scene.zoom - 0.1);
});

system.on('zoom', (value) => {
    $zoomVal.textContent = 100 + Math.floor(100 * system.scene.zoom) + '%';
});

$zoomVal.textContent = 100 + Math.floor(100 * system.scene.zoom) + '%';

// ----------------------
// 2D / 3D
// ----------------------

const $d2 = document.getElementById('d2');
const $d3 = document.getElementById('d3');

$d2.addEventListener('click', () => {
    system.setCamera({ ...config.camera, angle: 0 });
    $d2.classList.add('u-hidden');
    $d3.classList.remove('u-hidden');
});

$d3.addEventListener('click', () => {
    system.setCamera({ ...config.camera });
    $d3.classList.add('u-hidden');
    $d2.classList.remove('u-hidden');
});

// ----------------------
// Nav
// ----------------------

const $nav = document.getElementById('nav');
const $sun = system.sun.$node;
const planets = system.orbits.map((orbit) => orbit.planets).flat();

planets.forEach((planet) => {
    const $link = document.createElement('a');
    $link.className = 'u-btn';
    $link.textContent = planet.label;
    $link.addEventListener('click', () => planet.$node.click());
    $nav.appendChild($link);
    planet.$link = $link;
});

function navActivate(planet) {
    planet.$node.classList.add('active');
    planet.$link.classList.add('active');
}

function navDeactivate(planet) {
    planet.$node.classList.remove('active');
    planet.$link.classList.remove('active');
}

system.on('planet:click', (target) => {
    $sun.classList.add('active');
    planets.forEach((planet) => {
        if (target === planet) navActivate(planet);
        else navDeactivate(planet);
    });
});

system.on('sun:click', () => {
    $sun.classList.remove('active');
    planets.forEach(navDeactivate);
});

// ----------------------
// Note
// ----------------------

const $note = document.getElementById('note');
const $noteTitle = $note.querySelector('h1');
const $noteText = $note.querySelector('p');
const $noteClose = $note.querySelector('a');

function showNote(item) {
    $noteTitle.textContent = item.label;
    $noteText.textContent = item.note;
    $note.style.display = 'block';
    const rect = item.$node.getBoundingClientRect();
    let left = window.scrollX + rect.left + rect.width / 2;
    left = Math.max(left, $note.offsetWidth / 2);
    left = Math.min(left, window.innerWidth - $note.offsetWidth / 2);
    let top = window.scrollY + rect.top + rect.height / 2;
    top = Math.max(top, $note.offsetHeight / 2);
    top = Math.min(top, window.innerHeight - $note.offsetHeight / 2);
    $note.style.left = left + 'px';
    $note.style.top = top + 'px';
}

function hideNote() {
    $note.style.display = 'none';
}

function outsideNote(event) {
    let parent = event.target;
    while (parent) {
        if (parent === $note) return;
        parent = parent.parentNode;
    }
    hideNote();
}

system.on('moon:note', showNote);
system.on('planet:note', showNote);
$noteClose.addEventListener('click', hideNote);
document.addEventListener('click', outsideNote, true);

// ----------------------
// Video
// ----------------------

const videoWidth = 640;
const videoHeight = 360;
let player = null;

const $video = document.getElementById('video');
const $intro = document.getElementById('intro');
const close = document.getElementById('close-video');

function hideVideo() {
    if (!player) return;
    $video.style.display = 'none';
    player.destroy();
}

function showVideo(item) {
    const rect = item.$video.getBoundingClientRect();
    let left = window.scrollX + rect.left + rect.width / 2;
    left = Math.max(left, videoWidth / 2);
    left = Math.min(left, window.innerWidth - videoWidth / 2);
    let top = window.scrollY + rect.top + rect.height / 2;
    top = Math.max(top, videoHeight / 2);
    top = Math.min(top, window.innerHeight - videoHeight / 2);
    $video.style.left = left + 'px';
    $video.style.top = top + 'px';
    $video.style.display = 'block';
    player = new Player('video', {
        url: item.video,
        muted: window.innerWidth <= 728,
    });
    player.play();
    player.on('timeupdate', function (data) {
        if (data.percent > 0.998) hideVideo();
    });
}

function outsideVideo(event) {
    let parent = event.target;
    while (parent) {
        if (parent === $video) return;
        parent = parent.parentNode;
    }
    hideVideo();
}

system.on('video', showVideo);

$intro.addEventListener('click', () => {
    showVideo({
        $video: $world,
        video: DATA.head.video,
    });
});

document.addEventListener('click', outsideVideo, true);

close.addEventListener('click', () => {
    $video.style.display = 'none';
    active.player.destroy();
    active.player = null;
});

// ----------------------
// Stars
// ----------------------

const $stars = document.getElementById('stars');
const starsCtx = $stars.getContext('2d');

const starArea = 64 * 64;
let stars = [];

function minmax(min, max) {
    return min + Math.random() * (max - min);
}

function createStar() {
    let star = {};
    star.x = Math.random() * $stars.width;
    star.y = Math.random() * $stars.height;
    star.size = minmax(1, 3);
    star.alpha = 1;
    const duration = minmax(1, 3);
    const seek = Math.random() * duration;
    star.animation = gsap
        .to(star, { duration, alpha: 0, repeat: -1, yoyo: true })
        .seek(seek);
    return star;
}

function animateStars() {
    starsCtx.clearRect(0, 0, $stars.width, $stars.height);
    stars.forEach((star) => {
        starsCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        starsCtx.fillRect(star.x, star.y, star.size, star.size);
    });
    requestAnimationFrame(animateStars);
}

function resizeStars() {
    const w = $stars.parentNode.offsetWidth;
    const h = $stars.parentNode.offsetHeight;
    $stars.width = w;
    $stars.height = h;
    stars.forEach((star) => star.animation.kill());
    stars = new Array(Math.round((w * h) / starArea)).fill().map(createStar);
}

resizeStars();
animateStars();
window.addEventListener('resize', resizeStars);
