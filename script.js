const fs = require('fs');
let GeneticAlgorithmConstructor = require('geneticalgorithm')
fs.readFile('./kaupungit.json', function(err, data) { 
    if (err) throw err; 
    const json = JSON.parse(data);
    
    const radius = 6371;

    let distanceArr = [];
    let totalDistance = 0;
    
    setTimeout(() => {
        distanceArr.forEach((num) => totalDistance += num);
        console.log(totalDistance);
    }, 100);

    let currentCity = json.cities[0]
    let nextCity = json.cities[1]

    function moveCities(json) {
        city1 = json.cities
        city2 = json.cities
        
        for(let i = 1; i < json.name; i++){
            city1 = json.cities[i-1]
            city2 = json.cities[i]
        }
        return [city1, city2];
    }
    console.log(moveCities(json))
    //console.log(calculateDistance(currentCity.name, nextCity.name, currentCity.latitude, nextCity.latitude, currentCity.longitude, nextCity. longitude))
    
    json.cities.forEach(el => {
        console.log(calculateDistance(currentCity.name, el.name, currentCity.latitude, el.latitude, currentCity.longitude, el. longitude))
    });
    
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
    }/*
    let config = {
        mutationFunction: aMutationFunctionYouSupply,
        crossoverFunction: yourCrossoverFunction,
        fitnessFunction: yourFitnessFunction,
        doesABeatBFunction: yourCompetitionFunction,
        population: [json.cities],
        populationSize: 10
    }
    let geneticalgorithm = GeneticAlgorithmConstructor( config )*/
    
}
);

//Käytin npm packagea: genetic algorithm
//npm i geneticalgorithm