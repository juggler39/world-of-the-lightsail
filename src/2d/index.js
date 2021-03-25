import './index.css'
import config from './config'
import World from './classes/world'

const $world = document.getElementById('world');
const world = new World($world, config);

window.addEventListener('resize', () => {
    world.resize();
})
