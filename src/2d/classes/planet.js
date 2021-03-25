import Utils from '@/utils'

export default class Planet {

    constructor (options, index, orbit) {

        this.image = options.image;
        this.label = options.label;
        this.video = options.video;
        this.note = options.note;
        this.moons = options.moons;
        this.index = index;
        this.orbit = orbit;


        this.a = Math.PI / 4 + Math.PI * 2 / this.orbit.planets.length * this.index;
        this.$node = Utils.createNode(`<div class="lw-planet"></div>`);
        this.orbit.world.$items.appendChild(this.$node);

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