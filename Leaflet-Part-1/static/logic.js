// Specify the dataset we want to work with and store it in a variable called queryURL

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL passing a variable function to display the map
d3.json(queryURL).then(function(data) {
   // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});
function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array
    let earthquakes = L.geoJson(earthquakeData, {
        onEachFeature: onEachFeature,
     });

    // // Send our earthquakes layer to the createMap function
    createMap(earthquakes);
}  // End of createFeatures() function

function createMap(earthquakes) {

  // Create the base layers

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create baseMaps object
    let baseMaps = {
        "Street View": street,
        "Topography View": topo
    };

    // Create an overlay object to hold our overlay
    let overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create the map with the div and store it in a variable to use it later
    let myEarthquakeMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, earthquakes]
    });

    // Create a layer control to pass the baseMaps and overlayMaps
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myEarthquakeMap);  // Add the control to the map

    //legendmap.addTo(myEarthquakeMap); // uncomment to see if your control layer worked

    //////////////////////////////////////////////////////////////////////////////////
    /////// 4.2 This section creates the legend for the 'Depth of Earthquake'  ///////
    /// Make changes to the CSS file accordingly, otherwise it won't display right ///
    //////////////////////////////////////////////////////////////////////////////////

    // Create a legend for the map, "info legend" is the name for the class of the div
    let legendmap = L.control({ position: "bottomright" });
    legendmap.onAdd = function() {
        let div = L.DomUtil.create("div", "Info Legend");

    // Adding parameters to the legend Info box created above
    div.innerHTML += '<div class="info legend leaflet-control">' +
    '<h2 style="text-align: center;">Depth of<br>Earthquake</h2>' +
    '<div class="legend">' + '<div class="legend-item">' +
    '<i style="background: green"></i> -10-10' +
    '</div>' + '<div class="legend-item">' +
    '<i style="background: yellowgreen"></i> 10-30' +
    '</div>' + '<div class="legend-item">' +
    '<i style="background: yellow"></i> 30-50' +
    '</div>' + '<div class="legend-item">' +
    '<i style="background: orange"></i> 50-70' +
    '</div>' + '<div class="legend-item">' +
    '<i style="background: red"></i> 70-90' +
    '</div>' + '<div class="legend-item">' +
    '<i style="background: darkred"></i> 90+' +
    '</div>' + '</div>' + '</div>';

    return div;
    }; // End of the legendmap.onAdd function

    //Call in the function we just created above with the legend parameters
    legendmap.addTo(myEarthquakeMap);

}  // End of the createMap() function


////////////////////////////////////////////////////////////////////////////////////////////////////
// 5. Create function to determine the color of the circles for the magnitude
// for colors use green, yellowgreen, yellow, orange, red, and darkred

function circColor(depth) {
    if (depth <= 10) return "green";
    else if(depth > 10 & depth <= 30) return "yellowgreen";
    else if(depth > 30 & depth <= 50) return "yellow";
    else if(depth > 50 & depth <= 70) return "orange";
    else if(depth > 70 & depth <= 90) return "red";
    else return "darkred";
};  // End of circColor() function

////////////////////////////////////////////////////////////////////////////////////////////////////
// 6. Create function for circle size depending on the magnitude

function circSize(magnitude) {
    return magnitude * 5.5;
}; // End of circSize() function

////////////////////////////////////////////////////////////////////////////////////////////////////
//7. Create function to make circles for each earthquake feature

function magCircles(feature, latlng) {
    let depth = feature.geometry.coordinates[2]; // Get depth from the third coordinate
    let magnitude = feature.properties.mag;
    let fillColor = circColor(depth);
    let circleOptions = {
        radius: circSize(magnitude),
        fillColor: fillColor,
        color: "#006400",  // Outline of the circles in darkgreen
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    return L.circleMarker(latlng, circleOptions);
} // End of magCircles() function

////////////////////////////////////////////////////////////////////////////////////////////////////
