import drag from './drag'
import zoom from './zoom'
import resize from './resize'

export default class Scene {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (system) {

        this.x = 0;
        this.y = 0;
        this.minScale = 0;
        this.maxScale = 0;
        this.zoom = 0;
        this.system = system;
        this.padding = {};

        drag(this);
        zoom(this);
        resize(this);

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

        const { left, top } = this.system.$node.getBoundingClientRect();

        const x = origin.x - left - this.padding.left;
        const y = origin.y - top - this.padding.top;

        const x0 = (x - this.x) / this.scale;
        const y0 = (y - this.y) / this.scale;

        zoom = Math.max(zoom, 0);
        zoom = Math.min(zoom, 1);

        this.zoom = zoom;
        this.x = x - x0 * this.scale;
        this.y = y - y0 * this.scale;

        this.render();
        this.system.emit('zoom', this.zoom)
    }


    // ----------------------
    // Methods
    // ----------------------

    render () {
        this.system.$scene.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }

}