// 1. Add console.log to check to see if our code is working.
console.log("working");

        
                  // Add map features v1 -- use data in logic.js file
                  // 2. Create the map object with center at the San Francisco airport.
                  //let map = L.map('mapid').setView([30, 30], 2);
                  
                  // // 3. Add GeoJSON data.
                  // let sanFranAirport =
                  // {"type":"FeatureCollection","features":[{
                  //     "type":"Feature",
                  //     "properties":{
                  //         "id":"3469",
                  //         "name":"San Francisco International Airport",
                  //         "city":"San Francisco",
                  //         "country":"United States",
                  //         "faa":"SFO",
                  //         "icao":"KSFO",
                  //         "alt":"13",
                  //         "tz-offset":"-8",
                  //         "dst":"A",
                  //         "tz":"America/Los_Angeles"},
                  //         "geometry":{
                  //             "type":"Point",
                  //             "coordinates":[-122.375,37.61899948120117]}}
                  // ]};

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

                  // //5. edit step 4 to includs onEachFeature function (add data from the properties of the javascript object)
                  // L.geoJSON(sanFranAirport, {
                  //   // 5b. turn each feature into a marker on the map.
                  //   onEachFeature: function(feature, layer) {
                  //     console.log(layer);
                  //     layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: " + feature.properties.name + "</h3>");  
                  //   }
                  // }).addTo(map);

          // Add map features v2 -- markers with pop ups that use data from url
          // //(2) Create the map object with center at the San Francisco airport.
          //let map = L.map('mapid').setView([30, 30], 2);    
          // // (3) create tile layer that is the background of the map
          // let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          // attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          //     maxZoom: 18,
          //     accessToken: API_KEY
          // });
          // // (4) Add streets tile layer to map
          // streets.addTo(map);

          // // add link to airport data url on html file
          // // (5) Access the airport GeoJSON URL
          // let airportData = "https://raw.githubusercontent.com/svujcich/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

          // // (6) Grab GeoJSON data.
          // d3.json(airportData).then(function(data) {
          //   console.log(data);
          //   // (7) Create a GeoJSON layer with the retrieved data.
          //   L.geoJSON(data, {
          //     onEachFeature: function(feature, layer) {
          //       console.log(layer);
          //       layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: " + feature.properties.name + "</h3>")
          //     }
          //   }).addTo(map);
          // });

//add map features v3 -- add option to toggle between map styles
// [2] create tile layer that is the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// [3] create the dark view tile layer that will be an option for the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  }); 
  
  //[4] Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

//[5] Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
});

// [6] // Pass map layers into layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// [7] Access Toronto airline routes GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/svujcich/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// ([8] Grab GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  //[9a] create GeoJSON layer with the retrieved data
  // L.geoJSON(data).addTo(map);
  // });

  // [9b] create GeoJSON layer with the retrieved data with specific features
    L.geoJSON(data, {
    weight: 1,
    fill: "yellow",
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup("<h2>Neighborhood: " + feature.properties.AREA_NAME + "</h2>")
}}).addTo(map);
});
