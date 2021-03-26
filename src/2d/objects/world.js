import template from 'lodash.template'
import Utils from '../helpers/utils'
import SVG from '../svg/template.svg'
import Orbit from './orbit'
import Sun from './sun'
import Scene from '../scene/scene'

export default class World {



    // ----------------------
    // Constructor
    // ----------------------

    constructor ($node, options) {

        this.listeners = [];
        this.options = options;
        this.size = this.getSize();

        this.$node = $node;
        this.$node.classList.add('mm');
        this.$node.style.setProperty('--radius', this.options.sun.r + 'px');
        this.$node.style.setProperty('--moon-scale', this.options.moon.scale);

        this.$scene = Utils.createNode('mm-scene');
        this.$node.appendChild(this.$scene);

        this.$svg = Utils.createFromHTML(template(SVG)(this.options))
        this.$scene.appendChild(this.$svg);

        this.$items = Utils.createNode('mm-items');
        this.$scene.appendChild(this.$items);

        this.$overlay = document.createElement('div');
        this.$overlay.classList.add('mm-overlay');
        this.$items.appendChild(this.$overlay);
        this.$overlay.addEventListener('click', () => this.emit('overlay:click', this));
        
        this.setSizes();

        this.scene = new Scene(this);
        this.sun = new Sun(this);

        this.orbits = [];
        options.orbits.forEach((options, index) => {
            this.orbits[index] = new Orbit(options, index, this);
        });

    }



    // ----------------------
    // Helpers
    // ----------------------

    getOrbitRadius (index) {
        const S = this.options.sun;
        const O = this.options.orbits;
        const P = O.slice(0, index);
        return S.r + P.reduce((sum, o) => sum + (S.r * o.scale) * 2, 0) + S.r * O[index].scale;
    }

    getSize () {
        const S = this.options.sun;
        const M = this.options.moon;
        const O = this.options.orbits;
        let size = this.getOrbitRadius(O.length - 1);
        size += S.r * O[O.length - 1].scale;
        size += (S.r * O[O.length - 1].scale * M.scale) * 2;
        size += O[O.length - 1].scale * M.scale * M.margin;
        return size * 2;
    }

    setSizes () {
        const nw = this.$node.offsetWidth;
        const nh = this.$node.offsetHeight;
        this.scale = Math.min(nw, nh) / this.size;
        this.width = nw / this.scale;
        this.height = nh / this.scale;
        this.offset = {};
        this.offset.x = (this.width - this.size) / this.options.orbits.length / 2;
        this.offset.y = (this.height - this.size) / this.options.orbits.length / 2;
        this.$items.style.width = this.width + 'px';
        this.$items.style.height = this.height + 'px';
        this.$items.style.transform = `translate(-50%, -50%) scale(${this.scale})`
        this.$svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    }

    resize () {
        this.setSizes();
        this.orbits.forEach(orbit => orbit.resize());
    }



    // ----------------------
    // Events
    // ----------------------

    on (event, handler) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(handler);
    }

    off (event, handler) {
        if (!this.listeners[event]) return;
        const index = this.listeners[event].indexOf(handler);
        if (index > -1) this.listeners[event].splice(index, 1);
    }

    emit (event, param) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(handler => handler(param, this));
    }



}