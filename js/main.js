// Created by Mitchell Dickau
// March 18th 2022

//initialize function called when the script loads
function initialize(){
    loadmap();
};

function onEachFeature(feature, geojsonLayer) {
	if (feature.properties && feature.properties.popupContent) {
		geojsonLayer.bindPopup(feature.properties.popupContent);
	}
}

//function to create a table with cities and their populations
function loadmap(){

    //create a basemap style. You can find other options at https://leaflet-extras.github.io/leaflet-providers/preview/
	var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	});

	//add this basemap style to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
	var baseLayers = {
		"osm": OpenStreetMap_Mapnik
		//,...
	};

	// create the map
	var mymap = L.map('mapdiv', {
		center: [45.50, -73.58]
		,zoom: 3
		,maxZoom: 18
		,minZoom: 3
		,layers: OpenStreetMap_Mapnik
	});

	// parse json object (var geojsonData) and turn into loadable layer
	geojsonLayer = L.geoJSON(geojsonData, {
		onEachFeature: onEachFeature
	});

	//add geojsonData to map
	geojsonLayer.addTo(mymap);// add json element to map
	
	//declare basemap selector widget
	var lcontrol = L.control.layers(baseLayers);
	
	//add it to the map
	lcontrol.addTo(mymap);
};


//call the initialize function when the window has loaded
window.onload = initialize();