const fs = require('fs');
const { writeFile } = require('fs/promises');
fs.readFile('./kaupungit.json', function(err, data) { 
    if (err) throw err; 
    const json = JSON.parse(data);

    //Funktio joka laskee kaupungin etäisyyden toiseen kaupunkiin käyttämällä haversine-kaavaa
    function calculateDistance(node1, node2) {
        const radius = 6371;

        const city1 = node1;
        const city2 = node2;

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


let boolArr = [false, false, false, false, false, false, false, false, false, false];
let shortestDistance = Infinity;
let fullPath = [];

//Brute-force algorithmi TSP:n ratkaisemiseen
function TSP(matrix, v, currPos, n, count, cost) {
    
    if (count == n && matrix[currPos][0]) {
        if(cost + matrix[currPos][0] < shortestDistance) {
            shortestDistance = Math.min(shortestDistance, cost + matrix[currPos][0]);
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (!v[i] && matrix[currPos][i]) {
            fullPath.push(json.cities[i].name)
            v[i] = true;
            TSP(matrix, v.clone(), i, n, count + 1, cost + matrix[currPos][i]);

            v[i] = false;
        }
    }
    return shortestDistance;
}

Array.prototype.clone = function() {
    return this.slice(0);
};

const result = Math.round(TSP(matrix, boolArr, 0, 10, 0, 0) * 100) / 100;

console.log(fullPath)

console.log(`Lyhyin reitti on ${result}km pitkä.`);

}
);