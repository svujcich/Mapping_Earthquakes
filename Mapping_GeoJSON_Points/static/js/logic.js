// 1. Add console.log to check to see if our code is working.
console.log("working");

// 2. Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// 3. Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// // 4. Grab GeoJSON data.
// // L.geoJSON(sanFranAirport).addTo(map)
// L.geoJSON(sanFranAirport, {
//   // 4b. turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     // 4c. add popup
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country+ "</h3>")   
//   }
// }).addTo(map);

//5. edit step 4 to includs onEachFeature function (add data from the properties of the javascript object)
L.geoJSON(sanFranAirport, {
  // 4b. turn each feature into a marker on the map.
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: " + feature.properties.name + "</h3>");  
  }
}).addTo(map);


// add mapbox url
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Add the 'graymap' tile layer to the map.
streets.addTo(map);