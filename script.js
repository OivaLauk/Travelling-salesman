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
//Matriisi jossa on jokaisen kaupungin etäisyys muihin kaupunkeihin.
let matrix = [];
const rows = 10;
const columns = 10;

for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < columns; j++) {
        const a = json.cities[j];
        const b = json.cities[i];
        matrix[i][j] = calculateDistance(a, b);
    }
}
//"If visited" array jota käytän TSP:n funktiossa joka näyttää onko kaupungissa käyty vielä.
let boolArr = [false, false, false, false, false, false, false, false, false, false];

let shortestPath = [];
let fullPath = [];
let shortestPathNames = [];
let shortestDistance = Infinity;

//Brute-force algorithmi TSP:n ratkaisemiseen, ja sen reitin selvittämiseen.
function TSP(matrix, ifVisited, currPos, n, count, cost, path) {

    if (count == n && matrix[currPos][0]) {
        cost += matrix[currPos][0];
        if (cost < shortestDistance) {
            shortestDistance = cost;

            shortestPath = path.slice();
            shortestPath.push(0);
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (!ifVisited[i] && matrix[currPos][i]) {
            ifVisited[i] = true;
            path.push(i);
            TSP(matrix, ifVisited, i, n, count + 1, cost + matrix[currPos][i], path);
            path.pop();
            ifVisited[i] = false;
        }
    }
    return shortestDistance;
}
Array.prototype.clone = function() {
    return this.slice(0);
};

const result = Math.round(TSP(matrix, boolArr, 1, 10, 0, 0, fullPath) * 100) / 100;

for(let index of shortestPath) {
    shortestPathNames.push(json.cities[index].name);
}
const resultPath = shortestPathNames.join(" => ")

console.log(`\n${resultPath}\n`)
console.log(`Lyhyin reitti on ${result}km pitkä.\n`);

}
);