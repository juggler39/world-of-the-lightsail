import Utils from "../helpers/utils";

export default class Moon {

    constructor (options, index, planet) {

        const world = planet.orbit.world;

        this.image = options.image2d;
        this.label = options.label;
        this.video = options.video;
        this.note = options.note;
        this.index = index;
        this.planet = planet;
        this.a = Math.PI * 2 / this.planet.moons.length * this.index;
        this.r = world.options.sun.r + world.options.moon.margin + world.options.sun.r * world.options.moon.scale;
        this.x = this.r * Math.cos(this.a);
        this.y = this.r * Math.sin(this.a);

        this.$node = Utils.createNode('mm-item mm-moon');
        this.$node.style.transform = `translate(${this.x}px, ${this.y}px) scale(${world.options.moon.scale})`;
        this.$image = Utils.createImage(this.image, 'mm-image');
        this.$label = Utils.createLabel(this.label, 'mm-label');
        this.$node.appendChild(this.$image);
        this.$node.appendChild(this.$label);
        this.planet.$node.appendChild(this.$node);

        if (this.video) {
            this.$video = Utils.createImage(world.options.video.image2d, 'mm-video u-pulse');
            this.$node.appendChild(this.$video);
            this.$video.addEventListener('click', event => {
                world.emit('video', this);
                event.stopPropagation();
            })
        }

        this.$node.addEventListener('click', () => {
            this.planet.orbit.world.emit('moon:click', this);
        })

    }



}