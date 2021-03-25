import { fade } from '../helpers/animations'

export default function (planet, system) {


    if (planet.active) return;
    if (planet.translate && planet.translate.isActive()) return;
    planet.hovered = true;


    // pause orbit planets spinning

    planet.orbit.planets.forEach(planet => {
        planet.spinStop();
    });


    // show moon orbit

    planet.moonOrbit.setTransform();
    fade(planet.moonOrbit, {
        opacity: 1
    });


    // show moons

    planet.moons.forEach(moon => {
        moon.spinPlay();
        fade(moon, {
            opacity: 1
        });
    });


}