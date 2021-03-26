import { gsap } from 'gsap'



// ----------------------
// Arc animations
// ----------------------

function playArc ($node, { delay, duration, length  }, { dash, offset, angle, seek }, map) {

    const ease = 'none';
    const cx = $node.getAttribute('cx');
    const cy = $node.getAttribute('cy');

    $node.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`)
    $node.setAttribute('stroke-dasharray', `${dash} ${length}`);
    gsap.set($node, { strokeDashoffset: offset[0] })

    const animation = gsap.timeline({ repeat: -1 })
        .to($node, { duration, ease, strokeDashoffset: offset[1] })
        .to({}, delay, {})
        .to($node, { duration, ease, strokeDashoffset: offset[2] })
        .to({}, delay, {})
        .seek(seek);

    map.animations.push(animation);
}



// ----------------------
// Rect animations
// ----------------------

function playRect ($node, { length, duration }, map) {
    $node.setAttribute('stroke-dasharray', length / 2);
    gsap.set($node, { strokeDashoffset: 0 })
    const animation = gsap.to($node, {
        strokeDashoffset: length,
        repeat: -1,
        ease: 'none',
        duration
    })
    map.animations.push(animation);
}



// ----------------------
// Calculations
// ----------------------

const SM = length => {
    const dash = length / 4;
    const offset = [dash, 0, -dash]
    return { dash, offset}
}

const LG = length => {
    const dash = length / 4 * 3;
    const offset = [-length, -length + dash, -length + dash + dash]
    return { dash, offset}
}

const MB = length => {
    const dash = length / 2;
    const offset = [dash, 0, -dash]
    return { dash, offset}
}

const MT = length => {
    const dash = length / 2;
    const offset = [dash, dash * 2, dash * 3]
    return { dash, offset}
}

const Circle = ($node, rect) => {
    const length = $node.getTotalLength();
    const radius = +$node.getAttribute('r');
    const duration = radius * 2 / rect.length * rect.duration;
    const delay = rect.duration / 2 - duration;
    return { length, radius, duration, delay, sm: SM(length), lg: LG(length), mb: MB(length), mt: MT(length) }
}

const Rect = $node => {
    const length = $node.getTotalLength();
    const width = +$node.getAttribute('width');
    const height = +$node.getAttribute('height');
    const duration = length / 100;
    return { length, width, height, duration }
}



// ----------------------
// Config Class
// ----------------------

class Config {

    constructor ($border) {
        this.$rect = $border.querySelector('rect');
        this.$circle = $border.querySelector('circle');
        this.rect = Rect(this.$rect);
        this.circle = Circle(this.$circle, this.rect);
    }

    toTime (distance) {
        return distance / this.rect.length * this.rect.duration
    }

    getAngle (index) {
        switch (index) {
            case 0: return 0;
            case 1: return -90;
            case 2: return -90;
            case 3: return -180;
            case 4: return -180;
            case 5: return -270;
            case 6: return -270;
            case 7: return 0;
        }
    }

    getSeek (index) {
        switch (index) {
            case 0: return this.toTime(this.circle.radius);
            case 1: return this.toTime(this.rect.width + this.rect.height + this.rect.width + this.rect.height / 2 + this.circle.radius);
            case 2: return this.toTime(this.rect.width + this.rect.height + this.rect.width + this.circle.radius);
            case 3: return this.toTime(this.rect.width + this.rect.height + this.rect.width / 2 + this.circle.radius);
            case 4: return this.toTime(this.rect.width + this.rect.height + this.circle.radius);
            case 5: return this.toTime(this.rect.width + this.rect.height / 2 + this.circle.radius);
            case 6: return this.toTime(this.rect.width + this.circle.radius);
            case 7: return this.toTime(this.rect.width / 2 + this.circle.radius);
        }
    }

    getArc (type, index) {
        return {
            dash: this.circle[type].dash,
            offset: this.circle[type].offset,
            angle: this.getAngle(index),
            seek: this.getSeek(index)
        }
    }

}



// ----------------------
// Animate
// ----------------------

const animate = [

    border => {
        const $border = border.orbit.world.$svg.getElementById('b0');
        const $circles = $border.querySelectorAll('circle');
        const config = new Config($border);
        playRect(config.$rect, config.rect, border);
        playArc($circles[0], config.circle, config.getArc('lg', 4), border);
        playArc($circles[1], config.circle, config.getArc('lg', 2), border);
        playArc($circles[2], config.circle, config.getArc('lg', 0), border);
        playArc($circles[3], config.circle, config.getArc('lg', 6), border);
        playArc($circles[4], config.circle, config.getArc('sm', 4), border);
        playArc($circles[5], config.circle, config.getArc('sm', 2), border);
        playArc($circles[6], config.circle, config.getArc('sm', 0), border);
        playArc($circles[7], config.circle, config.getArc('sm', 6), border);
    },

    border => {
        const $border = border.orbit.world.$svg.getElementById('b1');
        const $circles = $border.querySelectorAll('circle');
        const config = new Config($border);
        playRect(config.$rect, config.rect, border);
        playArc($circles[0], config.circle, config.getArc('lg', 4), border);
        playArc($circles[1], config.circle, config.getArc('mt', 3), border);
        playArc($circles[2], config.circle, config.getArc('lg', 2), border);
        playArc($circles[3], config.circle, config.getArc('mt', 1), border);
        playArc($circles[4], config.circle, config.getArc('lg', 0), border);
        playArc($circles[5], config.circle, config.getArc('mt', 7), border);
        playArc($circles[6], config.circle, config.getArc('lg', 6), border);
        playArc($circles[7], config.circle, config.getArc('mt', 5), border);
        playArc($circles[8], config.circle, config.getArc('sm', 4), border);
        playArc($circles[9], config.circle, config.getArc('mb', 3), border);
        playArc($circles[10], config.circle, config.getArc('sm', 2), border);
        playArc($circles[11], config.circle, config.getArc('mb', 1), border);
        playArc($circles[12], config.circle, config.getArc('sm', 0), border);
        playArc($circles[13], config.circle, config.getArc('mb', 7), border);
        playArc($circles[14], config.circle, config.getArc('sm', 6), border);
        playArc($circles[15], config.circle, config.getArc('mb', 5), border);
    },

    border => {
        const $border = border.orbit.world.$svg.getElementById('b2');
        const $circles = $border.querySelectorAll('circle');
        const config = new Config($border);
        playRect(config.$rect, config.rect, border);
        playArc($circles[0], config.circle, config.getArc('lg', 4), border);
        playArc($circles[1], config.circle, config.getArc('lg', 2), border);
        playArc($circles[2], config.circle, config.getArc('lg', 0), border);
        playArc($circles[3], config.circle, config.getArc('lg', 6), border);
        playArc($circles[4], config.circle, config.getArc('sm', 4), border);
        playArc($circles[5], config.circle, config.getArc('sm', 2), border);
        playArc($circles[6], config.circle, config.getArc('sm', 0), border);
        playArc($circles[7], config.circle, config.getArc('sm', 6), border);
    }

]



// ----------------------
// Exports
// ----------------------

export default class Border {


    // constructor

    constructor (orbit) {

        this.orbit = orbit;
        this.animations = [];

        this.$rectIns = this.query(`.rect-in-${this.orbit.index}`);
        this.$rectOuts = this.query(`.rect-out-${this.orbit.index}`);
        this.$circleIns = this.query(`.circle-in-${this.orbit.index}`);
        this.$circleOuts = this.query(`.circle-out-${this.orbit.index}`);

        const pr = this.orbit.scale * this.orbit.world.options.sun.r;
        const border = orbit.world.options.border;

        this.$rectIns.forEach($rect => {
            $rect.setAttribute('stroke-width', border);
        })

        this.$circleIns.forEach($circle => {
            $circle.setAttribute('r', pr);
            $circle.setAttribute('stroke-width', border * 2);
        })

        this.$circleOuts.forEach($circle => {
            $circle.setAttribute('r', pr);
            $circle.setAttribute('stroke-width', border * 2);
        })

        this.resize();

    }


    // helpers

    query (selector) {
        return Array.from(this.orbit.world.$svg.querySelectorAll(selector));
    }


    // resize

    resize () {

        const cx = this.orbit.world.width / 2;
        const cy = this.orbit.world.height / 2;
        const pr = this.orbit.scale * this.orbit.world.options.sun.r;
        const border = this.orbit.world.options.border;

        this.animations.forEach(animation => animation.kill());
        this.animations.length = 0;

        this.$rectIns.forEach($rect => {
            $rect.setAttribute('x', cx - this.orbit.rx);
            $rect.setAttribute('y', cy - this.orbit.ry);
            $rect.setAttribute('width', this.orbit.rx * 2);
            $rect.setAttribute('height', this.orbit.ry * 2);
        })

        this.$rectOuts.forEach($rect => {
            $rect.setAttribute('x', cx - this.orbit.rx - pr - border);
            $rect.setAttribute('y', cy - this.orbit.ry - pr - border);
            $rect.setAttribute('width', (this.orbit.rx + pr + border) * 2);
            $rect.setAttribute('height', (this.orbit.ry + pr + border) * 2);
        })

        this.$circleIns.forEach(($circle, index) => {
            $circle.setAttribute('cx', cx + this.orbit.planets[index].x);
            $circle.setAttribute('cy', cy + this.orbit.planets[index].y);
        })

        this.$circleOuts.forEach(($circle, index) => {
            $circle.setAttribute('cx', cx + this.orbit.planets[index].x);
            $circle.setAttribute('cy', cy + this.orbit.planets[index].y);
        })

        animate[this.orbit.index](this);

    }


}