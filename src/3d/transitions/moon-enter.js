import { fade } from '../helpers/animations'

export default function (moon) {


    // do nothing while translating

    if (moon.planet.translate && moon.planet.translate.isActive()) return;



    // ----------------------
    // Active planet
    // ----------------------

    if (moon.planet.active) {


        // pause planet moons spinning

        moon.planet.moons.forEach(moon => {
            moon.spinStop();
        });

    }



    // ----------------------
    // Inactive planet
    // ----------------------

    else {

        // pause orbit planets spinning

        moon.planet.orbit.planets.forEach(planet => {
            planet.spinStop();
        });


        // show moon orbit

        moon.planet.moonOrbit.setTransform();
        fade(moon.planet.moonOrbit, {
            opacity: 1
        });


        // show moons

        moon.planet.moons.forEach(moon => {
            moon.spinStop();
            fade(moon, {
                opacity: 1
            });
        });

    }

}