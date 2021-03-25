import Utils from '../helpers/utils'

export default class MoonOrbit {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.size = options.system.normalOrbitSizes.moon;
        this.planet = options.planet;
        this.system = options.system;
        this.angle = this.planet.angle;
        this.opacity = 0;


        // create node

        this.$node = Utils.createNode(`ps-orbit ps-orbit-${this.planet.orbit.index} ps-planet-${this.planet.index} ps-moon-orbit`, this.size);
        this.system.$orbits.appendChild(this.$node);


        // render

        this.setOpacity();

    }



    // ----------------------
    // Style setters
    // ----------------------

    setOpacity () {
        this.$node.style.opacity = this.opacity;
    }

    setSize () {
        this.$node.style.width = this.$node.style.height = this.size + 'px';
    }

    setTransform () {
        this.$node.style.transform = `translate(${this.planet.x - this.size / 2}px, ${this.planet.y - this.size / 2}px)`
    }

}