const fs = require('fs');
const { inflate } = require('zlib');
fs.readFile('./kaupungit.json', function(err, data) { 
    if (err) throw err; 
    const json = JSON.parse(data);

    //Funktio joka laskee kaupungin etäisyyden toiseen kaupunkiin käyttämällä haversine-kaavaa
    function calculateDistance(start, other) {
        const radius = 6371;

        const city1 = start;
        const city2 = other;

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
        return x3;
    }

const INF = Infinity;

let tourDist = [];
let matrix = [];
let rows = 10;
let columns = 10;

for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < columns; j++) {
        const a = json.cities[j];
        const b = json.cities[i];
        matrix[i][j] = calculateDistance(a, b);
    }
}

function rowSum(arr) {
    for (let i = 0; i < rows; ++i) {
        let rowSum = 0;
        for (let j = 0; j < columns; ++j) {
            rowSum += arr[i][j];
        }
        tourDist.push(Math.round(rowSum * 100) / 100);
        matrix[i][i] = INF
    }
    return tourDist;
}
rowSum(matrix);

}
);