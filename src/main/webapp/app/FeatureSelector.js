var map;

/* Add map layer */
var baseLayer = new ol.layer.Tile({
	source : new ol.source.OSM()
});

/* Add view */
var view = new ol.View({
	projection : 'EPSG:900913',
	center : ol.proj.fromLonLat([-2.5,51.1]),
	zoom:4,
});

/* Add layer of point features */
var pointsLayer = new ol.layer.Vector({
	title: 'random points',
	source : new ol.source.Vector({
		url : 'points.json',
		format : new ol.format.GeoJSON()
	})
});

/* Initialise map */
function init(){
	map = new ol.Map({
		target : 'map',
		//the type of rendered we want to use.
		renderer : 'canvas',
		view : view
	});
	map.addLayer(baseLayer);
	map.addLayer(pointsLayer);
}

init();

/* //////////// ADD SELECTION */

/* add ol.collection to hold all selected features */
var select = new ol.interaction.Select();
map.addInteraction(select);
var selectedFeatures = select.getFeatures();

/* //////////// ADD DRAWING */

/* The current drawing */
var sketch;

/* Add drawing vector source */
var drawingSource = new ol.source.Vector({
	useSpatialIndex : false
});

/* Add drawing layer */
var drawingLayer = new ol.layer.Vector({
	source: drawingSource
});
map.addLayer(drawingLayer);

/* Declare interactions and listener globally so we 
	can attach listeners to them later. */
var draw;
var modify;
var listener;

// Drawing interaction
draw = new ol.interaction.Draw({
	source : drawingSource,
	type : 'Polygon',
	//only draw when Ctrl is pressed.
	condition : ol.events.condition.platformModifierKeyOnly
});
map.addInteraction(draw);

/* Deactivate select and delete any existing polygons.
	Only one polygon drawn at a time. */
draw.on('drawstart',function(event){
	drawingSource.clear();
	//selectedFeatures.clear();
	select.setActive(false);
	
	sketch = event.feature;
	
	listener = sketch.getGeometry().on('change',function(event){
		selectedFeatures.clear();
		var polygon = event.target;
		var features = pointsLayer.getSource().getFeatures();

		for (var i = 0 ; i < features.length; i++){
			if(polygon.intersectsExtent(features[i].getGeometry().getExtent())){
				selectedFeatures.push(features[i]);
			}
		}
	});
},this);


/* Reactivate select after 300ms (to avoid single click trigger)
	and create final set of selected features. */
draw.on('drawend', function(event) {
	sketch = null;
	delaySelectActivate();
	selectedFeatures.clear();

	var polygon = event.feature.getGeometry();
	var features = pointsLayer.getSource().getFeatures();

	for (var i = 0 ; i < features.length; i++){
		if(polygon.intersectsExtent(features[i].getGeometry().getExtent())){
			selectedFeatures.push(features[i]);
		}
	}
	
	
});


/* Modify polygons interaction */

var modify = new ol.interaction.Modify({
	//only allow modification of drawn polygons
	features: drawingSource.getFeaturesCollection()
});
map.addInteraction(modify);

/* Point features select/deselect as you move polygon.
	Deactivate select interaction. */
modify.on('modifystart',function(event){
	sketch = event.features;
	select.setActive(false);
	listener = event.features.getArray()[0].getGeometry().on('change',function(event){
		// clear features so they deselect when polygon moves away
		selectedFeatures.clear();
		var polygon = event.target;
		var features = pointsLayer.getSource().getFeatures();

		for (var i = 0 ; i < features.length; i++){
			if(polygon.intersectsExtent(features[i].getGeometry().getExtent())){
				selectedFeatures.push(features[i]);
			}
		}
	});
},this);

/* Reactivate select function */
modify.on('modifyend',function(event){
	sketch = null;
	delaySelectActivate();
	selectedFeatures.clear();
	var polygon = event.features.getArray()[0].getGeometry();
	var features = pointsLayer.getSource().getFeatures();

	for (var i = 0 ; i < features.length; i++){
		if(polygon.intersectsExtent(features[i].getGeometry().getExtent())){
			selectedFeatures.push(features[i]);
		}
	}

},this);


/* //////////// SUPPORTING FUNCTIONS */

function delaySelectActivate(){
	setTimeout(function(){
		select.setActive(true)
	},300);
}



