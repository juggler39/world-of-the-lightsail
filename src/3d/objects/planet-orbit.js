import Planet from './planet'
import Utils from '../helpers/utils'

export default class Orbit {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.index = options.index;
        this.size = options.system.normalOrbitSizes[this.index];
        this.angle = options.angle || Math.random() * 360;
        this.planets = options.planets || [];
        this.system = options.system;


        // create node

        this.$node = Utils.createNode(`ps-orbit ps-orbit-${this.index} ps-planet-orbit`, this.size);
        this.system.$orbits.appendChild(this.$node);


        // create planets

        this.planets = this.planets.map((options, index) => new Planet({
            ...options,
            index,
            orbit: this,
            system: this.system
        }))


        // render

        this.setSize();
        this.setTransform();

    }



    // ----------------------
    // Style setters
    // ----------------------

    setSize () {
        this.$node.style.width = this.$node.style.height = this.size + 'px';
    }

    setTransform () {
        this.$node.style.transform = `translate(-${this.size / 2}px, -${this.size / 2}px)`
    }


}