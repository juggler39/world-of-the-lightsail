import { fade } from '../helpers/animations'

export default function (planet) {

    if (planet.active) return;
    if (planet.translate && planet.translate.isActive()) return;
    planet.hovered = false;


    // resume orbit planets spinning

    planet.orbit.planets.forEach(planet => {
        planet.spinPlay();
    });


    // hide moon orbit

    fade(planet.moonOrbit, {
        opacity: 0 ,
        onUpdate () {
            planet.moonOrbit.setOpacity();
            planet.moonOrbit.setTransform();
        }
    });


    // hide moons

    planet.moons.forEach(moon => {
        fade(moon, {
            opacity: 0,
            onComplete () {
                moon.spinStop()
            }
        });
    });

}