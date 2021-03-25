import { translate } from '../helpers/animations'

export default function (planet, system) {

    const planetOrbitSize = system.active ? system.activeOrbitSizes[planet.orbit.index + 1] : system.normalOrbitSizes[planet.orbit.index];


    // move planet to the orbit

    translate(planet, {
        distance: planetOrbitSize / 2
    })


}