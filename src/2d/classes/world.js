import template from 'lodash.template'
import Utils from '@/utils'
import SVG from '../svg/template.svg'
import Orbit from './orbit'

export default class World {



    // ----------------------
    // Constructor
    // ----------------------

    constructor ($node, options) {

        this.options = options;
        this.size = this.getSize();

        this.$node = $node;
        this.$node.classList.add('lw');
        this.$node.style.setProperty('--radius', this.options.sun.r + 'px');

        this.$svg = Utils.createNode(template(SVG)(this.options))
        this.$svg.classList.add('lw-svg');
        this.$node.appendChild(this.$svg);

        this.$items = document.createElement('div');
        this.$items.classList.add('lw-items');
        this.$node.appendChild(this.$items);
        
        this.setSizes();

        this.orbits = options.orbits.map((options, index) => {
            return new Orbit(options, index, this);
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
        this.$items.style.transform = `scale(${this.scale})`
        this.$svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    }

    resize () {
        this.setSizes();
        this.orbits.forEach(orbit => orbit.resize());
    }
    

}