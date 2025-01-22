const { checkPrimeSync } = require('crypto');
const fs = require('fs');
fs.readFile('./kaupungit.json', function(err, data) { 
    if (err) throw err; 
    const json = JSON.parse(data);
    
    const radius = 6371;
    const startingCity = json.cities[0]
    const nextCity = json.cities[1]

    console.log(calculateDistance(startingCity.city, nextCity.city, startingCity.latitude, nextCity.latitude, startingCity.longitude, nextCity. longitude))

    function calculateDistance(city1, city2, lat1, lat2, lon1, lon2) {
        const pi = Math.PI;
        const lat1Rad = lat1 * (pi/180);
        const lat2Rad = lat2 * (pi/180);
        const lon1Rad = lon1 * (pi/180);
        const lon2Rad = lon2 * (pi/180);
        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;

        const x1 = Math.pow(Math.sin(dLat/2), 2) + Math.cos(lat1Rad);
        const x2 = Math.cos(lat2Rad) * Math.pow(Math.sin(dLon/2), 2);
        const x3 = 2 * Math.asin(Math.sqrt(x1 * x2));
        const x4 = Math.pow(Math.sin(Math.sqrt(x3)), -1);
        const x5 = x4 * (pi/180);
        console.log(x1, x2, x3, x4, x5)
        console.log(dLat)
        return x5 * radius;

    }
    }
);
