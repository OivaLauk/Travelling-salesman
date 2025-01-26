const fs = require('fs');
fs.readFile('./kaupungit.json', function(err, data) { 
    if (err) throw err; 
    const json = JSON.parse(data);
    
    const radius = 6371;

    let distanceArr = [];
    let totalDistance = 0;
    /*
    setTimeout(() => {
        distanceArr.forEach((num) => totalDistance += num);
        console.log(totalDistance);
    }, 100);
    */
    let currentCity = json.cities[0]
    let nextCity = json.cities[1]


    //Function for moving between cities, helsinki => espoo, espoo => tampere etc.
    function moveCities(json) {
        let pairs = [];
        for (let i = 1; i < json.cities.length; i++) {
            let city1 = json.cities[i - 1];
            let city2 = json.cities[i];
            pairs.push([city1, city2]);
        }
        if (json.cities.length > 1) {
            pairs.push([json.cities[json.cities.length - 1], json.cities[0]]);
        }
        return pairs;
    }
    let cityPairs = moveCities(json);
    
cityPairs.forEach(pair => {
  pair.forEach(city => {
    //console.log(`Name: ${city.name}, Latitude: ${city.latitude}, Longitude: ${city.longitude}`);
  });
});

    //Funktio joka laskee kaupungin etäisyyden toiseen kaupunkiin käyttämällä haversine-kaavaa
    function calculateDistance(city1, city2, lat1, lat2, long1, long2) {
        const pi = Math.PI;
        const lat1Rad = lat1 * (pi/180);
        const lat2Rad = lat2 * (pi/180);
        const long1Rad = long1 * (pi/180);
        const long2Rad = long2 * (pi/180);
        const dLat = lat2Rad - lat1Rad;
        const dLong = long2Rad - long1Rad;
        
        const x1 = Math.pow(Math.sin(dLat/2), 2) + Math.cos(lat1Rad)
        * Math.cos(lat2Rad) * Math.pow(Math.sin(dLong/2), 2);
        
        const x2 = 2 * Math.atan2(Math.sqrt(x1), Math.sqrt(1 - x1));
        
        const x3 = Math.round(x2 * radius * 100) / 100;
        
        const result = `The distance from: ${city1} to: ${city2} is ${x3} kilometers.`
        distanceArr.push(x3);
        return result;
    }
}
);

//Käytin npm packagea: genetic
//npm instaall genetic