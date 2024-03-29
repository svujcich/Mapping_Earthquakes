// Add console.log to check to see if our code is working.
console.log("working");

//--- SET UP ---
//CREATE BASE LAYERS
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the third tile layer that will be the background of our map.
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

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": tectonicPlateData,
  "Major Earthquakes": majorEarthquakes
};

//ADD CONTROL
// Allows the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);



//--- INTERACT WITH GEOJSON DATA ---
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
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
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(magnitude) {
    
    if (magnitude > 6) {
      return "#730101";
    } 
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#fc6b03";
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
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude > 0) {
      return magnitude * 4;
    } else {
    return ""
    };
  }

  //ALL EARTHQUAKES
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    //turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      console.log(feature);
      return L.circleMarker(latlng)
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);

  //LEGEND
  // Here we create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
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

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " + magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  }
  // Finally, we our legend to the map.
  legend.addTo(map)

  //MAJOR EARTHQUAKES
  // 3. Retrieve the major earthquake GeoJSON data > 4.5 mag for the week.
  let majorEarthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
  
  d3.json(majorEarthquakeData).then(function(data) {
    // 4. use the same style as the earthquake data
    //REFACTOR HERE!  

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
    
    // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
    function getColor(magnitude){
      if(magnitude > 6) {
        return "#730101";
      } 
      else if(magnitude > 5) {
        return "#ea2c2c";
      }
      else {
        return "#fc6b03";
      };
    }
           
    // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
    function getRadius(magnitude) {
      if (magnitude > 0) {
        return magnitude * 4;
      } else{
      return "";
      }
    }
    
    // 7. Create a GeoJSON layer with the retrieved data that adds a circle to the map 
    // sets the style of the circle, and displays the magnitude and location of the earthquake
    //  after the marker has been created and styled.
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
});

