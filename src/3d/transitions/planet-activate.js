import { resize, translate } from '../helpers/animations'

export default function (planet, system) {


    // emit enter if not hovered

    if (!planet.hovered) {
        system.emit('planet:enter', planet);
    }

    planet.active = true;
    planet.hovered = false;


    // resume orbit planets spinning

    planet.orbit.planets.forEach(planet => {
        planet.spinPlay()
    });


    // move planet to the center

    translate(planet, {
        distance: 0,
        zoom: system.sun.scale / planet.scale
    });


    // resize moon orbit

    resize(planet.moonOrbit, {
        size: system.activeOrbitSizes[0]
    })


    // move moons to the new orbit

    planet.moons.forEach(moon => {
        translate(moon, {
            distance: system.activeOrbitSizes[0] / 2,
            zoom: system.options.scales.planet / moon.scale
        });
    })

}