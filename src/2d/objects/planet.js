import Utils from '../helpers/utils'
import Moon from './moon'

export default class Planet {

    constructor (options, index, orbit) {

        this.image = options.image2d;
        this.label = options.label;
        this.video = options.video;
        this.note = options.note;
        this.moons = options.moons;
        this.index = index;
        this.orbit = orbit;
        this.a = Math.PI / 4 + Math.PI * 2 / this.orbit.planets.length * this.index;
        this.$node = Utils.createNode('mm-wrap');

        this.moons = this.moons.map((options, index) => {
            return new Moon(options, index, this);
        })

        this.$item = Utils.createNode(`mm-item mm-planet mm-orbit-${this.orbit.index} mm-index-${this.index}`);
        this.$image = Utils.createImage(this.image, 'mm-image');
        this.$label = Utils.createLabel(this.label, 'mm-label');
        this.$item.appendChild(this.$image);
        this.$item.appendChild(this.$label);
        this.$node.appendChild(this.$item);
        this.orbit.world.$items.appendChild(this.$node);

        if (this.video) {
            this.$video = Utils.createImage(this.orbit.world.options.video.image2d, 'mm-video u-pulse');
            this.$item.appendChild(this.$video);
            this.$video.addEventListener('click', event => {
                this.orbit.world.emit('video', this);
                event.stopPropagation();
            })
        }

        this.$item.addEventListener('click', () => {
            this.orbit.world.emit('planet:click', this);
        })

        this.resize();

    }
    
    resize () {



        const r = Math.max(this.orbit.rx, this.orbit.ry) * Math.sqrt(2);

        this.x = r * Math.cos(this.a);
        this.x = Math.min(this.x, this.orbit.rx);
        this.x = Math.max(this.x, -this.orbit.rx);

        this.y = r * Math.sin(this.a);
        this.y = Math.min(this.y, this.orbit.ry);
        this.y = Math.max(this.y, -this.orbit.ry);

        this.$node.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.orbit.scale})`

    }

}