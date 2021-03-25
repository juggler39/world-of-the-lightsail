import { fade } from '../helpers/animations'

export default function (moon) {


    // do nothing while translating

    if (moon.planet.translate && moon.planet.translate.isActive()) return;



    // ----------------------
    // Active planet
    // ----------------------

    if (moon.planet.active) {

        // resume planet moons spinning

        moon.planet.moons.forEach(moon => {
            moon.spinPlay();
        });

    }



    // ----------------------
    // Inctive planet
    // ----------------------

    else {


        // resume orbit planets spinning

        moon.planet.orbit.planets.forEach(planet => {
            planet.spinPlay();
        });


        // hide moon orbit

        fade(moon.planet.moonOrbit, {
            opacity: 0 ,
            onUpdate () {
                moon.planet.moonOrbit.setOpacity();
                moon.planet.moonOrbit.setTransform();
            }
        });


        // hide moons

        moon.planet.moons.forEach(moon => {
            fade(moon, {
                opacity: 0,
                onStart () {
                    moon.spinPlay()
                },
                onComplete () {
                    moon.spinStop()
                }
            });
        });


    }

}