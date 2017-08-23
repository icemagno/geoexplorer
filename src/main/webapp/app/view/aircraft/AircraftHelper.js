Ext.define("MCLM.view.aircraft.AircraftHelper", {
    xtype: 'aircraftHelper',
    id: 'aircraftHelper',
    
    mapLayerGeoCode: null,
    vectorSourceMarker: null,
    vectorLayerMarker: null,
    vectorSource : null,
    activeAircraftLayer : null,

    stringDivider : function( str, width, spaceReplacer ) {
        if (str.length > width) {
            var p = width;
            while (p > 0 && (str[p] != ' ' && str[p] != '-')) {
              p--;
            }
            if (p > 0) {
              var left;
              if (str.substring(p, p + 1) == '-') {
                left = str.substring(0, p + 1);
              } else {
                left = str.substring(0, p);
              }
              var right = str.substring(p + 1);
              return left + spaceReplacer + this.stringDivider(right, width, spaceReplacer);
            }
          }
          return str;    	
    },
    
    init: function () {
    	
    	this.vectorSource = new ol.source.Vector();
    	var me = this;
    	
    	var customStyleFunction = function( feature, resolution ) {
    		var props = feature.getProperties();
    		var bearing = props.bearing * 0.01745329251 ;
    		var callSign = props.callSign;
    		var flightNumber = props.flightNumber;
    		var tailPrefix = props.tailPrefix;
    		var resultStyles = [];
    		
    		//var fData = me.stringDivider(callSign + " " + aircraftText, 7, '\n');
    		var fData = me.stringDivider(tailPrefix + " " + flightNumber, 10, '\n');
    		
        	var aircraftStyle = new ol.style.Style({
    			image: new ol.style.Icon(({
    				scale : 0.6,
    				anchor: [0.5, 0.5],
    				rotation : bearing,
    				anchorXUnits: 'fraction',
    				anchorYUnits: 'fraction',
    				opacity: 1.0,
    				src: 'img/aero_yellow.png'
    			})),
			      text: new ol.style.Text({
			          font: '10px Consolas',
			          textAlign: 'center',
			          offsetX: 0,
			          offsetY: 20,
			          scale : 0.8,
			          textBaseline: 'middle',
			          fill: new ol.style.Fill({ color: '#000' }),
			          stroke: new ol.style.Stroke({
			            color: '#FFFFFF', width: 1
			          }),
			          text: fData,
			        })    			
        	});	 
        	
        	
        	
        	resultStyles.push( aircraftStyle );
        	return resultStyles;
    	}
    	
    	this.activeAircraftLayer = new ol.layer.Vector({
			source: this.vectorSource,
			style: customStyleFunction
		});			
		
    	this.activeAircraftLayer.set('name', 'aircraftLayer');
    	this.activeAircraftLayer.set('alias', 'aircraftLayer');
    	this.activeAircraftLayer.set('serialId', 'aircraftLayer');
    	this.activeAircraftLayer.set('layerType', 'FEI');
    	this.activeAircraftLayer.set('baseLayer', false);
    	this.activeAircraftLayer.set('ready', true);  

    },

    showAircraftDetails : function( aircraft ) {
    	
    	var acId = aircraft.id;
    	var acCallSign = aircraft.callSign;
    	var tailPrefix = aircraft.tailPrefix;
    	var model = aircraft.model;
    	var source = aircraft.airportSource;
    	var destination = aircraft.airportDestination;
    	var flightNumber = aircraft.flightNumber;
    	
    	
        Ext.Ajax.request({
            url: 'getAircraftDetail',
            params: {
                'flightID': acId,
            },
            failure: function (response, opts) {
            	//
            },
            success: function (response, opts) {
            	var respObj = Ext.decode(response.responseText);
            	var aircraftText = respObj.aircraft.model.text;
            	var aircraftImageLarge = "img/large_not_found.jpg";

            	if ( respObj.aircraft.images ) {
            		
	            	if ( respObj.aircraft.images.large ) { 
	            		aircraftImageLarge = respObj.aircraft.images.large[0].src;
	            	} else if ( respObj.aircraft.images.medium ) {
	            		aircraftImageLarge = respObj.aircraft.images.medium[0].src;
	            	} else if( respObj.aircraft.images.thumbnails ) {
	            		aircraftImageLarge = respObj.aircraft.images.thumbnails[0].src;
	            	}
	            	
            	}
            	 
            	var partidaReal = new Date(respObj.time.real.departure * 1000).toISOString().substr(11, 8);
            	var chegadaEstimada = new Date(respObj.time.estimated.arrival * 1000).toISOString().substr(11, 8);
            	
            	
            	var airportOrigin = respObj.airport.origin;
            	var airportDestination = respObj.airport.destination;
            	var airLineName = "";
            	if ( respObj.airline ) airLineName = respObj.airline.name;

            	
            	var airportOriginName = "";
            	var airportOriginIata = "";
            	var airportOriginCountry = "";
            	var airportOriginCity = "";
            	var airportOriginGate = "";         	
            	
            	if ( airportOrigin ) {
	            	var airportOriginName = airportOrigin.name;
	            	var airportOriginIata = airportOrigin.code.iata;
	            	var airportOriginCountry = airportOrigin.position.country.name;
	            	var airportOriginCity = airportOrigin.position.region.city;
	            	var airportOriginGate = airportOrigin.info.gate;
            	}
            	
            	var airportDestinationName = "";
            	var airportDestinationIata = "";
            	var airportDestinationCountry = "";
            	var airportDestinationCity = "";
            	var airportDestinationGate = "";
            	
            	if( airportDestination ) {
	            	airportDestinationName = airportDestination.name;
	            	airportDestinationIata = airportDestination.code.iata;
	            	airportDestinationCountry = airportDestination.position.country.name;
	            	airportDestinationCity = airportDestination.position.region.city;
	            	airportDestinationGate = airportDestination.info.gate;            	
            	} 
            	
            	var history = respObj.flightHistory.aircraft;
            	
            	var aircraftDataWindow = Ext.getCmp('aircraftDataWindow');
            	if ( !aircraftDataWindow ) {
            		aircraftDataWindow = Ext.create('MCLM.view.aircraft.AircraftDataWindow');
            	}
            	aircraftDataWindow.show();
            	
            	aircraftDataWindow.setTitle("Dados da Aeronave");
            	
            	var aeroDataNames = tailPrefix + " " + aircraftText + " ("+acCallSign+") " + flightNumber;
            	
            	var histTable = "";
            	if (history) {
	            	if ( history.length > 0 ) {
	            		histTable = "<table id='historyTable' >";
	            		histTable = histTable + "<tr><td style='width:7%'>N. Voo</td><td style='width:40%'>Origem</td><td style='width:40%'>Destino</td><td style='width:7%'>Decolagem</td></tr>";
	            		for ( x=0; x<history.length; x++  ) {
	            			var histDt = history[x];
	            			var voo = histDt.identification.number.default;
	            			var origem = "";
	            			if ( histDt.airport.origin ) origem = histDt.airport.origin.code.iata + " - " + histDt.airport.origin.name; 
	            			var destino = histDt.airport.destination.code.iata + " - " + histDt.airport.destination.name; 
	            			var decolagem = new Date(histDt.time.real.departure * 1000).toISOString().substr(11, 8);
	            			var linha = "<tr><td>" + voo + "</td><td>" + origem + "</td><td>" + destino + "</td><td>" + decolagem + "</td></tr>";
	            			histTable = histTable + linha;
	            		}
	            		histTable = histTable + "</table>";
	            		
	            	}
            	}
            	
            	var html = "<div style='display:table;width:550px;height:100%'>" + 
            		"<div style='float:left;display:table-cell;height:200px;width:538px'>" + 
	            		//"<div style='float:left;width:319px;height:200px'>" + 
	            			"<img src='"+aircraftImageLarge+"' style='border:1px solid #000;width:100%;height:200px'>" + 
	            		//"</div>"+
	            		/*
	            		"<div style='float:right;width:230px;height:200px'>" +
	            			"<img src='"+aircraftImageThumb1+"' style='border:1px solid #000;width:230px;height:99px'>" +
	            			"<img src='"+aircraftImageThumb2+"' style='border:1px solid #000;width:230px;height:99px'>" +
	            		"</div>" +
	            		*/
	            	"</div>" +
	            	
	            	"<div style='margin-top:2px;float:left;display:table-cell;border-top:1px solid #000;border-bottom:1px solid #000;height:92px;width:538px'>" +
	            		
	            		"<div style='text-align:center;float:left;width:245px;height:90px'>" +
	            			"<p style='margin-top: 10px;margin-bottom: 0px;font-size:20px;width: 99%;font-weight:bold'>"+airportOriginIata+"</p>" + 
	            			"<p style='margin-top: 5px;margin-bottom: 0px;font-size: 10px;width: 99%;'>"+airportOriginName+"</p>" + 
	            			"<p style='margin-top: 5px;margin-bottom: 0px;font-size: 9px;width: 99%;'>"+airportOriginCity + " " + airportOriginCountry +"</p>" + 
	            			"<p style='margin-top: 5px;margin-bottom: 0px;font-size: 9px;width: 99%;'>"+ partidaReal +"</p>" + 
	            		"</div>" +
	            		
	            		"<div style='border-right:1px solid #000;border-left:1px solid #000;float:left;width:48px;height:90px'>" +
	            			"<img src='img/right-arrow.png' style='margin-top: 23px;width:46px'>" + 
	            		"</div>" +

	            		"<div style='text-align:center;float:left;width:245px;height:90px'>" +
	            			"<p style='margin-top: 10px;margin-bottom: 0px;font-size:20px;width:99%;font-weight:bold'>"+airportDestinationIata+"</p>" +
	            			"<p style='margin-top: 5px;margin-bottom: 0px;font-size: 10px;width: 99%;'>"+airportDestinationName+"</p>" +
	            			"<p style='margin-top: 5px;margin-bottom: 0px;font-size: 9px;width: 99%;'>"+airportDestinationCity + " " + airportDestinationCountry +"</p>" +
	            			"<p style='margin-top: 5px;margin-bottom: 0px;font-size: 9px;width: 99%;'>"+ chegadaEstimada+"</p>" +
	            		"</div>" +
	            		
	            		"<div style='padding-bottom:5px;padding-top:5px;border-bottom:1px solid #000;text-align:center;float:left;width:100%'>" + 
	            			airLineName + "<br>" + 
	            			aeroDataNames +	"</div>" +
	            		
	            		"<div style='float:left;width:100%'>" + histTable + "</div>" +
	            		
	            	"</div>" +
	            	
            	"</div>";

            	
            	aircraftDataWindow.update( html );
            }
        });
    	
    	
    	
    },
    

    deleteAircrafts : function() {
    	var features = this.vectorSource.getFeatures();
    	for ( x=0; x < features.length; x++ ) {
    		var feature = features[x];
   			this.vectorSource.removeFeature( feature );
    	}
    },	
	
	getAircraftsBbox : function() {
		var me = this;
		
		var bbox = MCLM.Map.getMapCurrentBbox();
		var coord = bbox.split(",");
		
		var maxlon = coord[3];
		var minlon = coord[1];

		var minlat = coord[2];
		var maxlat = coord[0];			
		
        Ext.Ajax.request({
            url: 'getAircraftsInBBOX',
            params: {
                'minlon': minlon,
                'minlat': minlat,
                'maxlon': maxlon,
                'maxlat': maxlat,
            },
            failure: function (response, opts) {
            	me.deleteAircrafts();
            },
            success: function (response, opts) {
            	
            	if ( !MCLM.Map.aeroTrafficEnabled ) {
            		return true;
            	}
            	
            	var respObj = Ext.decode(response.responseText);
            	
            	var feicao = {};
            	feicao["type"] = "FeatureCollection";
            	var features = [];
            	
            	for( var key in respObj ) {
            		var properties = {};
            		var feature = {};
            		var coordinates = [];
            		
            		var obj = respObj[key];
            		if ( Array.isArray( obj ) ) {
            			properties["id"] = key;

            			properties["code"] = obj[0];
            			coordinates[1] = obj[ 1 ]; 
            			coordinates[0] = obj[ 2 ]; 
            			properties["bearing"] = obj[3];
            			
            			properties["model"] = obj[8];
            			properties["tailPrefix"] = obj[9];
            			
            			properties["airportSource"] = obj[11];
            			properties["airportDestination"] = obj[12];
            			properties["flightNumber"] = obj[13];
            			
            			properties["callSign"] = obj[16];

            			
                		var geometry = {};
                		geometry["type"] = "Point";
                		geometry["coordinates"] = coordinates;
                		
                		feature["geometry"] = geometry;
                		feature["type"] = "Feature";
                		feature["properties"] = properties;            			
            			
            			features.push( feature );
            		}

            	}
            	
            	feicao["features"] = features;
            	
            	//console.log( feicao );
				var features = new ol.format.GeoJSON().readFeatures( feicao , {
					//featureProjection: 'EPSG:3857'
				});
				
				me.deleteAircrafts();
				
				for (var i = 0; i < features.length; i++) {
					me.vectorSource.addFeature( features[i] );
				}
		    	   
            	/*	
				var point = new ol.geom.Point( center );
				var feature = new ol.Feature({
					geometry: point,
				});
				   
				props.geometry = feature.getProperties().geometry;
				feature.setProperties( props );
				feature.set("featureId", "P_" + featureId );
				   
				this.poiSource.addFeature( feature );	            	
				*/
            	
            }
        });
		
		
	} 


});