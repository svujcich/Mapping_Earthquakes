// 1. Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([40.7, -94.5], 5);

// 3. list coordinates for line
let line = [
  [33.9416, -118.4085],
  [30.1975, -97.6664],
  [43.6777, -79.6248],
  [40.6413, -73.7781],
 
  // [33.9416, -118.4085],
  // [37.6213, -122.3790],
  // [40.7899, -111.9791],
  // [47.4502, -122.3088]
];

// 4. Create a polyline using the line coordinates and make the line blue.
L.polyline(line, {
    color: "blue",
    weight: 4,
    opacity: .5,
    dashArray: '10, 10'

  }).addTo(map);     

// 5. add mapbox url
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Add the 'graymap' tile layer to the map.
streets.addTo(map);