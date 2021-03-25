import { fade, resize, translate } from '../helpers/animations'

export default function (planet, system) {

    planet.active = false;


    // orbit sizes

    const planetOrbitSize = system.active ? system.activeOrbitSizes[planet.orbit.index + 1] : system.normalOrbitSizes[planet.orbit.index];
    const moonOrbitSize = system.active ? system.activeOrbitSizes.moon : system.normalOrbitSizes.moon;


    // move planet from center to its orbit

    translate(planet, {
        distance: planetOrbitSize / 2,
        zoom: 1
    });


    // resize moon orbit

    resize(planet.moonOrbit, {
        size: moonOrbitSize
    })


    // hide moon orbit

    fade(planet.moonOrbit, {
        opacity: 0
    })


    // move moons to its orbit

    planet.moons.forEach(moon => {
        translate(moon, {
            distance: moonOrbitSize/ 2,
            zoom: 1
        });
    })


    // hide moons

    planet.moons.forEach(moon => {
        fade(moon, {
            opacity: 0,
            onComplete: () => {
                moon.spinStop()
            }
        })
    })


}