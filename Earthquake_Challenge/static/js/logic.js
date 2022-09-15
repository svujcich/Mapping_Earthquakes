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
// create tile layer that is the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create the dark view tile layer that will be an option for the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  }); 
  
  

//Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

  // Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};

// Pass map layers into layers control and add the layers control to the map.
L.control.layers(baseMaps,overlays).addTo(map);

//Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    // Turn marker into a circle
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    //create popup for each circle marker
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    
  }).addTo(earthquakes);
  //add earthquake layer to map
  earthquakes.addTo(map);
});

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
});
// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];
  // Loop through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
    return div;
};

legend.addTo(map);


    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };

      // This function determines the radius of the earthquake marker based on its magnitude.
      // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
      function getRadius(magnitude) {
        if (magnitude === 0) {
          return 1;
          }
        return magnitude * 4;
        };
    };
    // This function determines the color of the circle based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  };
