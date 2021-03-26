import Planet from './planet'
import Border from '../svg/border'
import svgLines from '../svg/lines'

export default class Orbit {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options, index, world) {
        
        this.planets = options.planets;
        this.scale = options.scale;
        this.index = index;
        this.world = world;

        this.r = this.world.getOrbitRadius(this.index);
        this.setSizes();

        this.planets = this.planets.map((options, index) => new Planet(options, index, this));
        this.border = new Border(this);
        this.lines = svgLines(this);
        
    }



    // ----------------------
    // Methods
    // ----------------------

    setSizes () {
        this.rx = this.r + this.world.offset.x * (this.index + 1);
        this.ry = this.r + this.world.offset.y * (this.index + 1);
    }

    resize () {
        this.setSizes();
        this.planets.forEach(planet => planet.resize());
        this.border.resize();
        this.lines.resize();
    }
    
}