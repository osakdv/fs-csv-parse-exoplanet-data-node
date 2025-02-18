const parse = require("csv-parse").parse;
const fs = require("fs");

const habitablePlanets = [];

const isHabitable = planet => {
    return planet["koi_disposition"] === 'CONFIRMED' && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11 && planet["koi_prad"] < 1.6
}

fs.createReadStream("kepler_data.csv")
    .pipe(parse({
        comment: "#",
        columns: true,
    }))
    .on("data", data => {
        if(isHabitable(data)) habitablePlanets.push(data)
    })
    .on("error", error => {
        console.log(error)
    })
    .on("end", () => {
        habitablePlanets.map(planet => {
             console.log(planet["kepler_name"])
        })
    })