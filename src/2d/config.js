const scales = [
    0.7,
    0.6,
    0.5
]

export default {

    border: 10,

    moon: {
        scale: 0.6,
        margin: 48,
    },

    sun: {
        ...DATA.sun,
        r: 120
    },

    video: {
        ...DATA.video
    },

    orbits: DATA.orbits.map((orbit, index) => {
        return {
            scale: scales[index],
            planets: orbit.planets
        }
    })

}