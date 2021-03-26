import drag from './drag'
import zoom from './zoom'

export default class Scene {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (world) {

        this.x = 0;
        this.y = 0;
        this.minScale = 1;
        this.maxScale = 2;
        this.zoom = 0;
        this.world = world;

        drag(this);
        zoom(this);

    }



    // ----------------------
    // Getters
    // ----------------------

    get scale () {
        return this.minScale * Math.pow(this.maxScale / this.minScale, this.zoom);
    }



    // ----------------------
    // Zoom into point
    // ----------------------

    zoomTo (origin, zoom) {

        const { left, top } = this.world.$node.getBoundingClientRect();

        const x = origin.x - left;
        const y = origin.y - top;

        const x0 = (x - this.x) / this.scale;
        const y0 = (y - this.y) / this.scale;

        zoom = Math.max(zoom, 0);
        zoom = Math.min(zoom, 1);

        this.zoom = zoom;
        this.x = x - x0 * this.scale;
        this.y = y - y0 * this.scale;

        this.render();
        this.world.emit('zoom', this.zoom)
    }


    // ----------------------
    // Methods
    // ----------------------

    render () {
        this.world.$node.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }

}