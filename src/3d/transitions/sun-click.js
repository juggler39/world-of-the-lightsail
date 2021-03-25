import { resize, translate } from '../helpers/animations'
import deactivatePlanet from './planet-deactivate'
import updatePlanet from './planet-update'


export default function (_, system) {


    // move sun back to the center

    translate(system.sun, {
        distance: 0,
        onUpdate () {
            system.sun.setTransform()
        }
    })

    system.active = false;
    system.orbits.forEach(orbit => {


        // resize orbit

        resize(orbit, {
            size: system.normalOrbitSizes[orbit.index]
        })


        // update planets

        orbit.planets.forEach(planet => {
            if (planet.active) deactivatePlanet(planet, system);
            else updatePlanet(planet, system);
        })
    })

}