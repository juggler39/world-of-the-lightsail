// ----------------------
// Planets
// ----------------------

const planets = {
    
    scales: [
        0.7,
        0.6,
        0.5
    ],
    
    images: [
        
    ]
    
}



// ----------------------
// Moon
// ----------------------

const moon = {
    
    scale: 0.5,
    margin: 24,
    
    images: [
        
    ]
    
}



// ----------------------
// Exports
// ----------------------

export default {

    border: 10,

    moon: {
        scale: moon.scale,
        margin: moon.margin
    },

    sun: {
        ...DATA.sun,
        r: 120
    },

    orbits: DATA.orbits.map((orbit, index) => {
        return {
            scale: planets.scales[index],
            planets: orbit.planets
        }
    })

}