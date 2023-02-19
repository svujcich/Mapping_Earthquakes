// 1. Add console.log to check to see if our code is working.
console.log("working");

// 2a. Create the map object with a center and zoom level (4 on a scale of 1 to 18).
let map = L.map('mapid').setView([40.7, -94.5], 4);

        // 2b. ALTERNATE METHOD - Create the map object with a center and zoom level.
        // useful for adding  multiple tile layers, or a background image of our map
        // let map = L.map("mapid", {
        //     center: [
        //       40.7, -94.5
        //     ],
        //     zoom: 4
        //   });

// // 3a. create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });
// Add the 'graymap' tile layer to the map.
// streets.addTo(map);

//5. replace single marker with cities.js file

// 6a. Get data from cities.jsS
let cityData = cities;

// 6b. add reference for cities.jsfile in index.html

// 6c. // Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    // 6d. add marker to map // 6g.Replace markers with circle and assign radius based on population size
    L.circleMarker(city.location, {
        radius: city.population/100000,
        color: "orange",
        fillColor: "#ffd6a1"
    })
     // 6e. add popup to each marker(.bindPopup)
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
//   .addTo(map);
    // 6f. add a thousands separator for the population(.toLocaleString)
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
    
     
   
   });

// 3b refactor 3a
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Add the 'graymap' tile layer to the map.
streets.addTo(map);