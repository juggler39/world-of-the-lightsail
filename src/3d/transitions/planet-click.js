import { resize, translate } from '../helpers/animations'
import activatePlanet from './planet-activate'
import deactivatePlanet from './planet-deactivate'
import updatePlanet from './planet-update'

export default function (target, system) {


    const inactive = !system.active;


    // move sun if not active

    inactive && translate(system.sun, {
        distance: Math.sqrt(2) * (system.options.sizes.canvas - system.options.sizes.item * system.sun.scale) / 2,
        onUpdate() {
            system.sun.setTransform()
        }
    })

    system.active = target;
    system.orbits.forEach(orbit => {


        // resize orbit

        resize(orbit, {
            size: system.activeOrbitSizes[orbit.index + 1]
        })


        // update planets

        orbit.planets.forEach(planet => {
            if (planet === target) {
                activatePlanet(planet, system);
            }
            else {
                if (planet.active) deactivatePlanet(planet, system);
                else if (inactive) updatePlanet(planet, system);
            }
        })
    })


}