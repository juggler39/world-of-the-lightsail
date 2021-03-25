export default {

    camera: {
        perspective: 1500,
        angle: 75
    },

    durations: {
        fade: 0.5,
        translate: 1
    },

    speed: 50 / 1000, // px per second

    sizes: {
        canvas: 1024,
        item: 32
    },

    scales: {
        planet: 1,
        moon: 0.7,
        sun: 2
    },

    sun: {
        ...DATA.sun,
        angle: 225
    },

    video: {
        ...DATA.video,
    },

    orbits: DATA.orbits.map((orbit, index) => {
        const planets = index ? orbit.planets : orbit.planets.map(planet =>  ({ ...planet, scale: 1.5 }));
        return { planets }
    })

}