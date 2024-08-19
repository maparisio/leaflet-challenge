// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

<<<<<<< HEAD
// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
=======
// Perform a GET request to the query URL passing a variable function to display the map
d3.json(queryUrl).then(function(data) {
   // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
>>>>>>> 587a592de7fc32f0c98042d3ef4a134bc3a549cb
});

function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
<<<<<<< HEAD
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }
=======
  // Give each feature a popup that describes the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
>>>>>>> 587a592de7fc32f0c98042d3ef4a134bc3a549cb

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createMarker
  });

  // Send our earthquakes layer to the createMap function.
  createMap(earthquakes);
}

// Create markers whose size increases with magnitude and color with depth
function createMarker(feature, latlng) {
  return L.circleMarker(latlng, {
    radius: markerSize(feature.properties.mag),
    fillColor: markerColor(feature.geometry.coordinates[2]),
    color: "#000",
    weight: 0.5,
    opacity: 0.5,
    fillOpacity: 1
  });
}

// Increase marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 5;
}

// Change marker color based on depth
function markerColor(depth) {
  return depth > 90 ? '#d73027' :
         depth > 70 ? '#fc8d59' :
         depth > 50 ? '#fee08b' :
         depth > 30 ? '#d9ef8b' :
         depth > 10 ? '#91cf60' :
                      '#1a9850';
}

function createMap(earthquakes) {
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Create a legend to display information about our map.
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function (myMap) {
    let div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 60, 90],
        labels = [],
        legendInfo = "<h5>Depth (km)</h5>";

    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
<<<<<<< HEAD

    return div;
  };

  // Add legend to map
  legend.addTo(myMap);
}
=======
>>>>>>> 587a592de7fc32f0c98042d3ef4a134bc3a549cb
