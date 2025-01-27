const fs = require('fs');
fs.readFile('./kaupungit.json', function(err, data) { 
    if (err) throw err; 
    const json = JSON.parse(data);

    const start = json.cities[0];
    const others = json.cities.filter((city) => city.name != "Helsinki")

    others.forEach(city => {
        console.log(calculateDistance(start, city))
    });

    //Funktio joka laskee kaupungin etäisyyden toiseen kaupunkiin käyttämällä haversine-kaavaa
    function calculateDistance(start, others) {
        const radius = 6371;

        const city1 = start;
        const city2 = others;

        const pi = Math.PI;
        const lat1Rad = city1.latitude * (pi/180);
        const lat2Rad = city2.latitude * (pi/180);
        const long1Rad = city1.longitude * (pi/180);
        const long2Rad = city2.longitude * (pi/180);
        const dLat = lat2Rad - lat1Rad;
        const dLong = long2Rad - long1Rad;
        
        const x1 = Math.pow(Math.sin(dLat/2), 2) + Math.cos(lat1Rad)
        * Math.cos(lat2Rad) * Math.pow(Math.sin(dLong/2), 2);
        
        const x2 = 2 * Math.atan2(Math.sqrt(x1), Math.sqrt(1 - x1));
        
        const x3 = Math.round(x2 * radius * 100) / 100;
        
        const result = `The distance from: ${city1.name} to: ${city2.name} is ${x3} kilometers.`
        return result;
    }
}
);