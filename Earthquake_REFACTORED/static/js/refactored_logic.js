// Check if code is working
console.log("working");

//--- SET UP ---
//CREATE BASE LAYERS
// Create tile layer for background of map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create second tile layer for background of map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create third tile layer for the background of map.
let dark= L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark 
};

// CREATE MAP OBJCT 
//with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
})

//OVERLAYS
// 1. Add a layer group for the tectonic plate data.
let allEarthquakes = new L.LayerGroup();
let tectonicPlateData = new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();

// 2. create object for overlays
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": tectonicPlateData,
  "Major Earthquakes": majorEarthquakes
};

//ADD CONTROL
// Allows the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);



//--- INTERACT WITH GEOJSON DATA ---

 //ALL EARTHQUAKES
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
 
  //style markers
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }
 
  // static Varibles
  const magnitudes = [0, 1, 2, 3, 4, 5, 6];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#fc6b03",
    "#ea2c2c",
    "#730101"
  ];
  //Determines color of the marker based on the earthquake magnitude
  function getColor(magnitude) {
    
    if (magnitude > 6) {
      return colors[6];
    } 
    if (magnitude > 5) {
      return colors[5];
    }
    if (magnitude > 4) {
      return colors[4];
    }
    if (magnitude > 3) {
      return colors[3];
    }
    if (magnitude > 2) {
      return colors[2];
    }
    if (magnitude > 1) {
      return colors[1];
    }
    return colors[0];
  }

  // Determines radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude > 0) {
      return magnitude * 4;
    } else {
    return ""
    };
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    //turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      console.log(feature);
      return L.circleMarker(latlng)
    },
    //Set the style for each circleMarker using styleInfo function.
    style: styleInfo,

    /* We create a popup for each circleMarker to display the magnitude and 
    location of the earthquake*/
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

  // Add earthquake layer to our map.
  allEarthquakes.addTo(map);



  //MAJOR EARTHQUAKES
  // 3. Retrieve the major earthquake GeoJSON data > 4.5 mag for the week.
  let majorEarthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
  
  d3.json(majorEarthquakeData).then(function(data) {
    // 4. use the same style as the earthquake data **

    function styleInfo(feature){
      return {
        opacity: 1,
        fillColor: getColor(feature.properties.mag),
        fillOpacity: 1,
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 3
      };
    } 
    // 5. REUSE CODE to change color of marker (getColor)
           
    // 6. REUSE CODE to determine radius of marker (getRadius)
    
    /* 7. Create a GeoJSON layer with the retrieved data that adds a circle to
    the map, sets the style of the circle, and displays the magnitude and location of the earthquake
    after the marker has been created and styled. */
    L.geoJson(data, {
      pointToLayer: function(feature, latlng){
        console.log(feature);
        return L.circleMarker(latlng)
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: "+ feature.properties.mag + "<br>Location: </>" + feature.properties.place);
      }
      // 8. Add the major earthquakes layer to the map.
    }).addTo(majorEarthquakes);
    majorEarthquakes.addTo(map);

  // 9. Close the braces and parentheses for the major earthquake data.
  });


  //TECTONIC PLATES
  let tectonicPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
  d3.json(tectonicPlates).then(function(data) {
    console.log(data);
   L.geoJSON(data, {
      weight: 3,
      color: "orange",
      onEachFeature: function(feature, layer) {
        console.log(layer);
      }
    }).addTo(tectonicPlateData); 
    tectonicPlateData.addTo(map);
  });
  

  //LEGEND
  // a. Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // b. Then add all the details for the legend
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");

    // c. Loop through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " + magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  }
  // d. add legend to the map.
  legend.addTo(map)

});