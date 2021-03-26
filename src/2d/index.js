// ----------------------
// Imports
// ----------------------

import './index.css'
import config from './config'
import World from './objects/world'
import Player from '@vimeo/player'

console.log(Player)



// ----------------------
// Globals
// ----------------------

const $world = document.getElementById('world');
const world = new World($world, config);
let active = {}







// ----------------------
// Video
// ----------------------

const videoWidth = 640;
const videoHeight = 360;

const $video = document.getElementById('video');
const $intro = document.getElementById('intro');

function showVideo (item) {
    const rect = item.$video.getBoundingClientRect();
    let left = window.scrollX + rect.left + rect.width / 2;
    left = Math.max(left, videoWidth / 2);
    left = Math.min(left, window.innerWidth - videoWidth / 2);
    let top = window.scrollY + rect.top + rect.height / 2;
    top = Math.max(top, videoHeight / 2);
    top = Math.min(top, window.innerHeight - videoHeight / 2);
    $video.style.left = left + 'px'
    $video.style.top = top + 'px'
    $video.style.display = 'block';
    world.$overlay.classList.add('active');
    active.player = new Player('video', {
        url: item.video,
        width: videoWidth,
        height: videoHeight,
        muted: window.innerWidth <= 728
    });
    active.player.play();
    active.player.on('timeupdate', data => {
        if (data.percent  > 0.998) world.emit('overlay:click');
    });
}

world.on('video', item => {
    showVideo(item);
})

$intro.addEventListener('click', () => {
    showVideo({
        $video: $world,
        video: DATA.head.video
    });
})



// ----------------------
// Note
// ----------------------

const $note = document.getElementById('note');
const $noteTitle = $note.querySelector('h1');
const $noteText = $note.querySelector('p');
const $noteClose = $note.querySelector('a');

function showNote (item) {
    const rect = item.$node.getBoundingClientRect();
    let left = window.scrollX + rect.left + rect.width / 2;
    left = Math.max(left, videoWidth / 2);
    left = Math.min(left, window.innerWidth - videoWidth / 2);
    let top = window.scrollY + rect.top + rect.height / 2;
    top = Math.max(top, videoHeight / 2);
    top = Math.min(top, window.innerHeight - videoHeight / 2);
    $note.style.left = left + 'px'
    $note.style.top = top + 'px'
    $note.style.display = 'block';
    $noteTitle.textContent = item.label;
    $noteText.textContent = item.note;
    active.note = item;
}

world.on('planet:click', planet => {
    if (planet !== active.planet) return;
    showNote(planet);
})

world.on('moon:click', moon => {
    showNote(moon);
})

$noteClose.addEventListener('click', () => {
    world.emit('overlay:click');
})



// ----------------------
// Planet click
// ----------------------

world.on('planet:click', planet => {
    if (active.planet) active.planet.$node.classList.remove('active');
    world.$overlay.classList.add('active');
    active.planet = planet;
    active.planet.$node.classList.add('active');
})



// ----------------------
// Overlay click
// ----------------------

world.on('overlay:click', () => {
    if (active.player) {
        $video.style.display = 'none';
        active.player.destroy();
        active.player = null;
    }
    else if (active.note) {
        $note.style.display = 'none';
        active.note = null;
    }
    else if (active.planet) {
        active.planet.$node.classList.remove('active');
        active.planet = null;
    }
    const show = Object.values(active).some(value => value);
    if (!show) world.$overlay.classList.remove('active');
})



// ----------------------
// Resize
// ----------------------

window.addEventListener('resize', () => {
    world.resize();
})


