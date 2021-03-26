import MoonOrbit from './moon-orbit'
import Moon from './moon'
import Utils from '../helpers/utils'
import { spin } from '../helpers/animations'

export default class Planet {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.index = options.index;
        this.orbit = options.orbit;
        this.system = options.system;
        this.moons = options.moons || [];

        this.scale = options.scale || options.system.options.scales.planet;
        this.angle = options.orbit.angle + this.index * 360 / options.orbit.planets.length;
        this.distance = options.orbit.size / 2;
        this.zoom = 1;

        this.image = options.image3d;
        this.label = options.label;
        this.note = options.note;

        this.active = false;



        // create moon orbit

        this.moonOrbit = new MoonOrbit({
            planet: this,
            system: this.system
        })


        // create moons

        this.moons = this.moons.map((options, index) => {
            return new Moon({
                ...options,
                index,
                planet: this,
                system: this.system
            })
        })


        // create nodes

        this.$node = Utils.createNode(`ps-item ps-planet ps-planet-${this.index} ps-orbit-${this.orbit.index}`, this.system.itemSize);
        this.$image = Utils.createImage(this.image, 'ps-image');
        this.$label = Utils.createLabel(this.label);
        this.$node.appendChild(this.$image);
        this.$node.appendChild(this.$label);
        this.system.$items.appendChild(this.$node);

        
        // create video

        if (options.video) {
            this.video = options.video;
            this.$video = Utils.createImage(options.system.options.video.image3d, 'ps-video u-pulse');
            this.$node.appendChild(this.$video);
            this.$video.addEventListener('click', event => {
                this.system.emit('video', this);
                event.stopPropagation();
            })
        }


        // spin animation

        spin(this, {
            duration: 2 * Math.PI * this.distance * this.system.options.speed,
            angle: this.angle + 360
        })


        // listeners

        this.$node.addEventListener('mouseenter', () => {
            this.system.emit('planet:enter', this);
        })

        this.$node.addEventListener('mouseleave', () => {
            this.system.emit('planet:leave', this);
        })

        this.$node.addEventListener('click', () => {
            if (this.active) this.system.emit('planet:note', this);
            else this.system.emit('planet:click', this);
        })

        this.system.on('camera', () => {
            this.setTransform()
        });


    }



    // ----------------------
    // Styles setters
    // ----------------------

    get x () {
        return this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    setTransform () {
        this.$node.style.transform = `translate3d(${this.x - this.system.itemSize / 2}px, ${this.y - this.system.itemSize / 2}px, 0) rotateX(-${this.system.camera.angle}deg) scale(${this.scale * this.zoom})`
    }


}

