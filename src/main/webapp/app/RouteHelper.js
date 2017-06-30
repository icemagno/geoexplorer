Ext.define('MCLM.RouteHelper', {
	
	statics: {
		activeRouteLayer: null,
		poiLayer: null,
		oldCoordinates : [],
		dirty : false,
		vectorSource : null,
		poiSource : null,
		vectorSourceMarker : null,
		vectorLayerMarker : null,
		startIcon : null,
		endIcon : null,
		lastEndPosition : null,
		swapped : false,
		routeAsWKT : null,
		maxRouteSeq : 0,
		poiStyles : [],
		routeExtent : null,
		
		clear : function() {
			MCLM.Map.removeLayerByName('routeLayer');
			MCLM.Map.removeLayerByName('routeMarker');
			MCLM.Map.removeLayerByName('poiLayer');
			
			MCLM.Map.interrogatingFeatures = false;
			this.activeRouteLayer = null;
			this.poiLayer = null;
			this.dirty = false;
			this.vectorSource = null;
			this.poiSource = null;
			this.vectorSourceMarker = null;
			this.vectorLayerMarker = null;
			this.startIcon = null;
			this.endIcon = null;
			this.lastEndPosition = null;
			this.swapped = false;
			this.routeAsWKT = null;
			this.oldCoordinates = [];
			
			var routeResultStore = Ext.data.StoreManager.lookup('store.RouteResult');
			routeResultStore.load( [] );	
			
			MCLM.Map.bindMapToGetSourceAddress();
			
 		   $("#sourceAddrText").text( "Selecione o endereço de origem" );
		   $("#sourceValue").val( "0" );
		   $("#targetAddrText").text( "Selecione o endereço de destino" );
		   $("#targetValue").val( "0" );			
		},
		
	
		putStartIcon : function( center ) {
			if ( this.dirty ) return true;
			
			if ( this.startIcon ) this.vectorSourceMarker.removeFeature( this.startIcon );
			
			this.startIcon = new ol.Feature({
				geometry: new ol.geom.Point( center )
			});
			
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({
					anchor: [0.5, 35],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 0.75,
					src: 'img/start.png'
				}))
			});	
			
			this.startIcon.setStyle( iconStyle );
			this.vectorSourceMarker.addFeature(  this.startIcon );
			
		},

		putMiddleIcon : function( center ) {
			
			var middleIcon = new ol.Feature({
				geometry: new ol.geom.Point( center )
			});
			
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({
					anchor: [0.5, 35],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 0.75,
					src: 'img/middle.png'
				}))
			});	
			
			middleIcon.setStyle( iconStyle );
			this.vectorSourceMarker.addFeature( middleIcon );
			this.swapped = true;
		},
		
		
		putEndIcon : function( center ) {
			if ( this.endIcon ) this.vectorSourceMarker.removeFeature( this.endIcon );
			
			if ( !this.swapped ) {
				// Ja tem uma rota calculada e o usuario quer um novo destino.
				// Coloca o destino anterior como origem.
				if( this.dirty ) {
					MCLM.Map.getNearestRoads( this.lastEndPosition, 'S' );
					this.putMiddleIcon( this.lastEndPosition );
				}
			}
			this.lastEndPosition = center;
			
			this.endIcon = new ol.Feature({
				geometry: new ol.geom.Point( center )
			});
			
			var iconStyle = new ol.style.Style({
				image: new ol.style.Icon(({
					anchor: [0.5, 35],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 0.75,
					src: 'img/end.png'
				}))
			});	
			
			this.endIcon.setStyle( iconStyle );
			this.vectorSourceMarker.addFeature( this.endIcon );
		},
		
		
		loadRoute : function( route, completeGeometry ) {
			var geomCoordinates = completeGeometry.coordinates;
			var newCoordinates = this.oldCoordinates;
			
    		for (z = 0; z < geomCoordinates.length; z++  ) {
    			newCoordinates.push( geomCoordinates[z] )
    		}			
    		
    		this.oldCoordinates = newCoordinates;			
			var myMls = new ol.geom.MultiLineString( newCoordinates );
			var format =  new ol.format.WKT();
			this.routeAsWKT = format.writeGeometry ( myMls );

	    	var features = new ol.format.GeoJSON().readFeatures( route , {
	    	    featureProjection: 'EPSG:3857'
	    	});	
	    	
	    	for (var i = 0; i < features.length; i++) {
	    		this.vectorSource.addFeature( features[i] );
	    	}
	    	
	    	this.routeExtent = this.vectorSource.getExtent();
	    	
	    	this.dirty = true;
	    	this.swapped = false;
		},
		
		init : function() {
			var me = this;
			
			this.dirty = false;
			this.vectorSource = new ol.source.Vector();
			this.poiSource = new ol.source.Vector();
			
			
			// Estilo da rota
	    	var routeStyle = new ol.style.Style({
	    		stroke: new ol.style.Stroke({
	    			color: 'red',
	    			width: 3
	    		})
	    	});	
	    	
			var customStyleFunction = function( feature, resolution ) {
				
				var me = MCLM.RouteHelper;
				
				var featureGeomType = feature.getGeometry().getType();
				var props = feature.getProperties();
				var resultStyles = [];
				var featureId = props.featureId; 
				var iconName = props.iconName; 
				
				if ( featureGeomType == 'Point') {
					var pointStyle = me.poiStyles[featureId];
					// Estilo dos simbolos dos POI
					if ( !pointStyle ) {
			        	pointStyle = new ol.style.Style({
							image: new ol.style.Icon(({
								scale : 0.6,
								anchor: [0.5, 35],
								anchorXUnits: 'fraction',
								anchorYUnits: 'pixels',
								opacity: 0.75,
								src: 'img/' + iconName + '.png'
							}))
				    	});
			        	me.poiStyles[featureId] = pointStyle;
					}
					resultStyles.push( pointStyle );
				}
				
				
				if ( featureGeomType == 'LineString') {
			    	// Estilo das linhas dos POI
					var lineStyle = me.poiStyles[featureId];
					if( !lineStyle ) {
				    	lineStyle = new ol.style.Style({
				    		stroke: new ol.style.Stroke({
				    			color: 'blue',
				    			width: 3
				    		})
				    	});
				    	me.poiStyles[featureId] = lineStyle;
					} 
			    	resultStyles.push( lineStyle );
				}	
			    
		    	
				return resultStyles;
			};
			
			this.activeRouteLayer = new ol.layer.Vector({
				source: this.vectorSource,
				style: routeStyle
			});			

			this.poiLayer = new ol.layer.Vector({
				source: this.poiSource,
				style: customStyleFunction
			});	
			
			this.activeRouteLayer.set('name', 'routeLayer');
			this.activeRouteLayer.set('alias', 'routeLayer');
			this.activeRouteLayer.set('serialId', 'routeLayer');
			this.activeRouteLayer.set('baseLayer', false);
			this.activeRouteLayer.set('ready', true);

			this.poiLayer.set('name', 'poiLayer');
			this.poiLayer.set('alias', 'poiLayer');
			this.poiLayer.set('serialId', 'poiLayer');
			this.poiLayer.set('baseLayer', false);
			this.poiLayer.set('ready', true);
			
			MCLM.Map.removeLayerByName('routeLayer');
			MCLM.Map.map.addLayer( this.activeRouteLayer );
			
			MCLM.Map.removeLayerByName('poiLayer');
			MCLM.Map.map.addLayer( this.poiLayer );
			
			// Camada para os marcadores
			this.vectorSourceMarker = new ol.source.Vector();
			this.vectorLayerMarker = new ol.layer.Vector({
	            source : this.vectorSourceMarker
	        });
			this.vectorLayerMarker.set('name', 'routeMarker' );
			this.vectorLayerMarker.set('alias', 'routeMarker' );
			this.vectorLayerMarker.set('serialId', 'routeMarker' );
			this.vectorLayerMarker.set('baseLayer', false );
			this.vectorLayerMarker.set('ready', true );
			MCLM.Map.map.addLayer( this.vectorLayerMarker );			
		    				
		},
		
		inspectFeature : function( pixel ) {
	        var features = [];
	        MCLM.Map.map.forEachFeatureAtPixel( pixel, function(feature, layer) {
	        	features.push(feature);
	        });
	        
	        if( features.length > 0 ) {
	        	featDetailWindow = Ext.getCmp("featDetailWindow");
	        	if ( !featDetailWindow ) featDetailWindow = Ext.create('MCLM.view.rotas.FeatDetailWindow');
	        	featDetailWindow.show();
	        	
	        	$('#poiDetails tbody').empty();
	        	for( x=0; x < features.length; x++ ) {
	        		var keys = features[x].getKeys();
	        		var iconSrc = features[x].get("iconName");
	        		if ( iconSrc )
	        			$("<tr style='border-top:1px solid black'><td style='border-bottom:1px solid black'><img style='width:30px;height:35px' src='img/" + iconSrc + ".png'></td><td>&nbsp;</td></tr>").appendTo('#poiDetails tbody');
	        		
	        		for( y=0; y < keys.length; y++ ) {
	        			var value = features[x].get( keys[y] );
	        			if( (value) && (keys[y] != 'geometry') && (keys[y] != 'iconName') && (keys[y] != 'featureId')  ) {
		        			$("<tr><td style='background-color:#cacaca'>" + keys[y] + "</td><td>" + value + "</td></tr>").appendTo('#poiDetails tbody');
	        			}
	        		}
	        	}
	        	
	        }
	        
	        
		},
	    locatePois : function( button ) {
	    	var me = MCLM.RouteHelper;
	    	var featureId = button.id;
	    	
	    	if ( !button.pressed ) {
	    		me.deletePois( featureId );
	    	} else {
	    		
	    		if ( !me.routeAsWKT ) {
	    			Ext.Msg.alert('Erro','Não existem dados de rota armazenados.' );
	    			return true;
	    		}

    		
	    		var criteria = '';
	    		var source = [];
	    		switch( featureId ) {
		    	    case 'hospital-button':
		    	    	criteria = "amenity = 'hospital'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'clinic-button':
		    	    	criteria = "amenity = 'clinic' or tags->'healthcare'='clinic'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'blood-button':
		    	    	criteria = "tags->'healthcare'='blood_donation' or tags->'healthcare'='blood_bank'";
		    	    	source.push('planet_osm_point');
		    	    	break;
		    	    case 'obras-button':
		    	    	criteria = "bridge = 'viaduct'";
		    	    	source.push('planet_osm_line');
		    	        break;
		    	    case 'ponte-button':
		    	    	criteria = "bridge = 'yes'";
		    	    	source.push('planet_osm_line');
		    	        break;
		    	    case 'rodoviaria-button':
		    	    	criteria = "amenity = 'bus_station'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'estadio-button':
		    	    	criteria = "leisure = 'stadium'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'police-button':
		    	    	criteria = "amenity='police'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'prf-button':
		    	    	criteria = "amenity='police'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'toll-button':
		    	    	criteria = "barrier='toll_booth'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'helipad-button':
		    	    	criteria = "aeroway='helipad'";
		    	    	source.push('planet_osm_polygon');
		    	        break;
		    	    case 'prison-button':
		    	    	criteria = "amenity='prison'";
		    	    	source.push('planet_osm_polygon');
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'gasolina-button':
		    	    	criteria = "amenity='fuel'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'airport-button':
		    	    	criteria = "aeroway='aerodrome'";
		    	    	source.push('planet_osm_point');
		    	    	source.push('planet_osm_polygon');
		    	        break;
		    	    case 'levelcrossing-button':
		    	    	criteria = "railway='level_crossing'";
		    	    	source.push('planet_osm_point');
		    	        break;
		    	    case 'school-button':
		    	    	criteria = "amenity='college' or amenity='university' or amenity='school'";
		    	    	source.push('planet_osm_point');
		    	    	source.push('planet_osm_polygon');
		    	        break;
		    	    case 'railway-button':
		    	    	criteria = "railway='rail'";
		    	    	source.push('planet_osm_line');
		    	        break;
		    	    case 'port-button':
		    	    	criteria = "(landuse='industrial' and tags->'industrial'='port') or landuse='harbour' or landuse='port'";
		    	    	source.push('planet_osm_polygon');
		    	    	break;
		    	    case 'trainstation-button':
		    	    	criteria = "railway='station'";
		    	    	source.push('planet_osm_polygon');
		    	    	source.push('planet_osm_point');
		    	    	break;
	    		}	 	    		
	    		
	    		if ( criteria == '' ) {
	    			Ext.Msg.alert('Erro','Tipo de elemento desconhecido: "' + featureId + '"' );
	    			return true; 
	    		}
	    		
	    		for (x=0; x < source.length;x++) { 
	    			me.getPointsNearRoute( me.routeAsWKT, criteria, source[x], featureId );
	    		}
	    	}
	    },	

	    deletePois : function( featureId ) {
	    	var features = this.poiSource.getFeatures();
	    	for ( x=0; x < features.length; x++ ) {
	    		var feature = features[x];
	    		var featId = feature.get("featureId");
	    		// Quando tem o "P_" eh pq tem uma linha E um ponto representando a mesma coisa (linhas de trem por exemplo)
	    		if ( (featId == featureId) || (featId == 'P_' + featureId) ) {
	    			this.poiSource.removeFeature( feature );
	    		}
	    	}
	    	
	    },
	    
	    inspectRoute : function( feature ) {
	    	//
	    },
	    
	    
	    addFeatureToPoiLayer( feature ) {
			this.poiSource.addFeature( feature );
			
		}, 
		
	    getPointsNearRoute : function( geom, criteria, source, featureId ) {
	    	var me = MCLM.RouteHelper;
	    	
    		Ext.Ajax.request({
 		       url: 'getPointsNearRoute',
 		       params: {
 		           'route': geom,
 		           'criteria' : criteria,
 		           'source' : source,
 		       },       
 		       success: function(response, opts) {
 		    	   var respText = Ext.decode(response.responseText);
 		    	   var tabela = 'pontos';
 		    	   if ( source == 'planet_osm_polygon' ) tabela = 'polígonos';
 		    	   if ( source == 'planet_osm_line' ) tabela = 'linhas';
 		    	   
 		    	   if ( !respText.features ) {
 		    		   MCLM.Functions.mainLog( "Nenhum elemento encontrado na tabela de " + tabela + ".");
 		    		   return true;
 		    	   } else {
 		    		   MCLM.Functions.mainLog( "Foram encontrados " + respText.features.length + " elementos na tabela de " + tabela + ".");
 		    	   }
 		    	   
 		    	   var features = new ol.format.GeoJSON().readFeatures( respText , {
 			    	    featureProjection: 'EPSG:3857'
 		    	   });	
 			    	
 		    	   for (var i = 0; i < features.length; i++) {
 		    		   features[i].set("featureId", featureId );
 		    		   features[i].set("iconName", featureId );
 		    		   
 		    		   // Transforma poligono e linha em ponto -------------------------------
 		    		   var featureGeomType = features[i].getGeometry().getType();
 		    		   if ( featureGeomType == 'Polygon' || featureGeomType == 'LineString' ) {
 		    			   var oldGeom = features[i].getGeometry();
 		    			   var oldExtent = oldGeom.getExtent();
 		    			   var props = features[i].getProperties();
 		    			   
 		    			   // Poligonos: Coloca o icone no centro do poligono
	    				   var center = ol.extent.getCenter( oldExtent );
	    				   // Lilnhas: coloca o icone no inicio da linha
 		    			   if ( featureGeomType == 'LineString' ) {
 		    				   center = oldGeom.getFirstCoordinate();
 		    				   me.addFeatureToPoiLayer( features[i] );
 		    			   }
 		    			   
 		    			   var point = new ol.geom.Point( center );
 		    			   var feature = new ol.Feature({
 		    				   geometry: point,
 		    			   });
 		    			   
 		    			   props.geometry = feature.getProperties().geometry;
 		    			   feature.setProperties( props );
 		    			   feature.set("featureId", "P_" + featureId );
 		    			   
 		    			   me.addFeatureToPoiLayer( feature );
 		    		   } else {
 		    			   me.addFeatureToPoiLayer( features[i] );
 		    		   }
 		    		   // ---------------------------------------------------------------------
 		    		   
 		    	   }	    		    	   
 		    	   
 		       },
 		       failure: function(response, opts) {
 		    	   Ext.Msg.alert('Erro','Erro ao calcular a rota.' );
 		       }
    		});	    		
	    },

		getAsJson : function() {
			var geojson  = new ol.format.GeoJSON();
		    var features = this.vectorSource.getFeatures();
		    var jsonData = geojson.writeFeatures( features,{
                featureProjection: ol.proj.get('EPSG:3857'),
                dataProjection: ol.proj.get('EPSG:4326')
            });
		    return jsonData;
		}

		
	}

});