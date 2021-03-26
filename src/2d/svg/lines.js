const resize = [

    lines => {
        const $lines = Array.from(lines.$node.children);
        const world = lines.orbit.world;
        const planets = lines.orbit.planets;
        const cx = world.width / 2;
        const cy = world.height / 2;
        $lines.forEach(($line, index) => {
            $line.setAttribute('x1', world.width / 2);
            $line.setAttribute('y1', world.height / 2);
            $line.setAttribute('x2', cx + planets[index].x);
            $line.setAttribute('y2', cy + planets[index].y);
        })
    },

    lines => {
        const $lines = Array.from(lines.$node.children);
        const world = lines.orbit.world;
        const cx = world.width / 2;
        const cy = world.height / 2;
        const planets = lines.orbit.planets;
        const prev = lines.orbit.world.orbits[lines.orbit.index - 1];
        $lines[0].setAttribute('x1', cx + prev.rx);
        $lines[0].setAttribute('y1', cy);
        $lines[0].setAttribute('x2', cx + planets[7].x);
        $lines[0].setAttribute('y2', cy);
        $lines[1].setAttribute('x1', cx);
        $lines[1].setAttribute('y1', cy + prev.ry);
        $lines[1].setAttribute('x2', cx);
        $lines[1].setAttribute('y2', cy + planets[1].y);
        $lines[2].setAttribute('x1', cx - prev.rx);
        $lines[2].setAttribute('y1', cy);
        $lines[2].setAttribute('x2', cx + planets[3].x);
        $lines[2].setAttribute('y2', cy);
        $lines[3].setAttribute('x1', cx);
        $lines[3].setAttribute('y1', cy - prev.ry);
        $lines[3].setAttribute('x2', cx);
        $lines[3].setAttribute('y2', cy + planets[5].y);
    },

    lines => {
        const $lines = Array.from(lines.$node.children);
        const world = lines.orbit.world;
        const cx = world.width / 2;
        const cy = world.height / 2;
        const curr = lines.orbit.planets;
        const prev = lines.orbit.world.orbits[lines.orbit.index - 1].planets;
        $lines.forEach(($line, index) => {
            $line.setAttribute('x1', cx + prev[index * 2].x);
            $line.setAttribute('y1', cy + prev[index * 2].y);
            $line.setAttribute('x2', cx + curr[index].x);
            $line.setAttribute('y2', cy + curr[index].y);
        })
    }

]


export default class Lines {

    constructor (orbit) {
        this.orbit = orbit;
        this.$node = orbit.world.$svg.getElementById(`lines-${orbit.index}`);
        this.$node.setAttribute('stroke-width', orbit.world.options.border / 2);
        if (this.orbit.index === 0) this.$node.setAttribute('stroke', 'url(#g3)');
        else this.$node.classList.add('mm-line--orange');
        resize[orbit.index](this);

    }

    resize () {
        resize[this.orbit.index](this);
    }

}