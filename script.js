const fs = require('fs');
fs.readFile('./kaupungit.json', function(err, data) { 
    if (err) throw err; 
    const json = JSON.parse(data);
    
    const radius = 6371;
    const startingCity = json.cities[0]
    const nextCity = json.cities[1]
    const otherCities = json.shift()
    console.log(otherCities)
    console.log(calculateDistance(startingCity.name, nextCity.name, startingCity.latitude, nextCity.latitude, startingCity.longitude, nextCity. longitude))

    function calculateDistance(city1, city2, lat1, lat2, lon1, lon2) {
        const pi = Math.PI;
        const lat1Rad = lat1 * (pi/180);
        const lat2Rad = lat2 * (pi/180);
        const lon1Rad = lon1 * (pi/180);
        const lon2Rad = lon2 * (pi/180);
        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;

        const x1 = Math.pow(Math.sin(dLat/2), 2) + Math.cos(lat1Rad)
        * Math.cos(lat2Rad) * Math.pow(Math.sin(dLon/2), 2);

        const x2 = 2 * Math.atan2(Math.sqrt(x1), Math.sqrt(1 - x1));

        const x3 = Math.round(x2 * radius * 100) / 100;

        const result = `Matka kaupungista: ${city1} kaupunkiin: ${city2} on ${x3} kilometriä.`
        return result;

    }
    }
);
