Ext.define('MCLM.Map', {
	
	statics: {
		map: null,
		featureCount : 500,
		queryToolEnabled : false,
		mousePosition: null,
		selectedLayer: null,
		theView: null,
		theMiniView: null,
		onClickBindKey: null,
		graticuleEnabled: false,
		aeroTrafficEnabled: false,
		shipTrafficEnabled: false,
		streetPhotoEnabled : false,
		arrayMapCenter: null,
		mapZoom: 5,
		mapCenterLat: 0,
		mapCenterLong: 0,	
		baseLayer: null,
		baseLayerName: null,
		openSeaMapLayer: null,
		queryFactorRadius: 4,
		graticule: null,
		geoserverUrl: '',
		highlight : null,
		interrogatingFeatures : false,
		aircraftHelper : null,
		shipsHelper : null,
		canPhoto : true,
		statusBar : null,
		
		getBaseMapName : function() {
			return MCLM.Map.baseLayerName;
		},
		getBaseServerURL : function() {
			return MCLM.Map.geoserverUrl;
		},
		isBaseMapActive : function() {
			return MCLM.Map.baseLayer.getVisible();
		},
		
		updateAeroTraffic : function() {
			if ( MCLM.Map.aeroTrafficEnabled ) {
				MCLM.Map.aircraftHelper.getAircraftsBbox();
			}
		},
		updateMaritmTraffic : function() {
			if ( MCLM.Map.shipTrafficEnabled ) {
				MCLM.Map.shipsHelper.getShips();
			}
		},	
		toDefault : function() {
			var zoom = MCLM.Map.mapZoom;
			MCLM.Map.panTo( MCLM.Map.arrayMapCenter[0] + ',' + MCLM.Map.arrayMapCenter[1], zoom);
		},
		toWorld : function() {
			var map = MCLM.Map.map;
			MCLM.Map.map.getView().fit([-16716960.433033716, -7413397.061675084, 23358056.252544772, 10745594.873977667]);	
		},
		// --------------------------------------------------------------------------------------------
		// Cria o Mapa Principal e Camadas auxiliares
		loadMap : function( container ) {
			me = MCLM.Map;
			MCLM.Map.init();
			
			MCLM.Map.map = new ol.Map({
				layers: [ MCLM.Map.baseLayer ],
				target: container,
				renderer: 'canvas',
			    loadTilesWhileAnimating: true,
			    loadTilesWhileInteracting: true,	
				controls: ol.control.defaults().extend([
				   new ol.control.ScaleLine(),
				   new ol.control.ZoomSlider(),
		           new ol.control.MousePosition({
		               undefinedHTML: '',
		               projection: 'EPSG:4326',
		               coordinateFormat: function(coordinate) {
		            	   var coord = ol.coordinate.toStringHDMS( coordinate );

		            	   var template = '{y}  {x}';
		            	   var mapCoord = ol.coordinate.format(coordinate, template, 6);
		            	   
			    		   var lat = coordinate[0];
			    		   var lon = coordinate[1];		            	   
		            	   var utmCoord = MCLM.Functions.latLonToUTM( lon, lat );
		            	   
		            	   $("#coord_map").html( mapCoord );
		            	   $("#coord_hdms").html( coord );
		            	   $("#coord_utm").html( utmCoord );
		            	   
		            	   return "";
		               }
		           })
		        
				]),
				view: MCLM.Map.theView
			});	
			
			// Quando o mapa for arrastado ou o zoom mudar dispara o metodo updateMapCenter()
			MCLM.Map.map.getView().on('propertychange', function(e) {
				switch (e.key) {  
					case 'center':
						me.updateMapCenter();
						break;
					case 'resolution':  
						me.updateMapCenter();
						break;  
				}
			});	
			
			MCLM.Map.map.on('pointermove', function(evt) {
				if (evt.dragging) {
					return;
				}
			    var hit = MCLM.Map.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
			        return true;
			    });
			    
			    MCLM.Map.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
			    
			});
			
			MCLM.Map.aircraftHelper = Ext.create('MCLM.view.aircraft.AircraftHelper');
			MCLM.Map.aircraftHelper.init();
			setInterval( MCLM.Map.updateAeroTraffic , 10000); // 10 segundos			

			MCLM.Map.shipsHelper = Ext.create('MCLM.view.ships.ShipsHelper');
			MCLM.Map.shipsHelper.init();
			setInterval( MCLM.Map.updateMaritmTraffic , 300000); // 5 minutos			
			
		},
		
		// --------------------------------------------------------------------------------------------
		// Inicializa todas as variáveis e configuracoes
		init : function() {
			var config = MCLM.Globals.config;
			
			MCLM.Map.graticule = new ol.Graticule({
				strokeStyle: new ol.style.Stroke({
					color: 'rgba(255,120,0,0.9)',
					width: 1.5,
					lineDash: [0.5, 4]
				})
			});			
			
			MCLM.Map.geoserverUrl = config.geoserverUrl;
			MCLM.Map.baseLayerName = config.baseLayer;
			MCLM.Map.mapZoom = config.mapZoom; 
			MCLM.Map.mapCenter = config.mapCenter;
			MCLM.Map.queryFactorRadius = config.queryFactorRadius;				
			MCLM.Map.arrayMapCenter = JSON.parse("[" + MCLM.Map.mapCenter + "]");

			MCLM.Map.theView = new ol.View({
				center: ol.proj.transform( MCLM.Map.arrayMapCenter, 'EPSG:4326', 'EPSG:3857'),
				zoom: MCLM.Map.mapZoom
			});			
			
			MCLM.Map.openSeaMapLayer = MCLM.Map.createOpenSeaMapLayer();
			MCLM.Map.baseLayer = MCLM.Map.createBaseLayer();
			
			console.log( config );
			$("#serverHostName").html( config.serverHostName );
		},
		// --------------------------------------------------------------------------------------------
		// Gera a Camada do OpenSeaMap
		createOpenSeaMapLayer : function() {
			
			var openSeaMapLayer = new ol.layer.Tile({
				  source: new ol.source.OSM({
				    crossOrigin: null,
				    url: 'http://t1.openseamap.org/seamark/{z}/{x}/{y}.png'
				})
			});
			openSeaMapLayer.set('name', 'OpenSeaMap');
			openSeaMapLayer.set('alias', 'OpenSeaMap');
			openSeaMapLayer.set('serverUrl', '' );
			openSeaMapLayer.set('serialId', 'mclm_openseamap_cmoa');
			openSeaMapLayer.set('ready', true);
			openSeaMapLayer.set('baseLayer', false);
			
			return openSeaMapLayer;
		},
		// --------------------------------------------------------------------------------------------
		// Gera a camada-base
		createBaseLayer : function() {
			
			var landLayer = new ol.layer.Tile({
			    source: new ol.source.TileWMS({
			        url: MCLM.Map.geoserverUrl,
			        isBaseLayer : true,
			        projection: ol.proj.get('EPSG:4326'),
			        params: {
			            'LAYERS': MCLM.Map.baseLayerName, 
			            'FORMAT': 'image/png8',
	    	            'tiled': true,
	    	            'VERSION': '1.3.0', 
			            	
			        }
			    })
			});	
			landLayer.set('name', MCLM.Map.baseLayerName );
			landLayer.set('alias', 'Camada Base' );
			landLayer.set('serverUrl', MCLM.Map.geoserverUrl );
			landLayer.set('serialId', 'mclm_landlayer_cmoa');
			landLayer.set('ready', false);
			landLayer.set('baseLayer', true);
			MCLM.Map.bindTileEvent( landLayer );	
			
			return landLayer;
		},
		// --------------------------------------------------------------------------------------------
		// Liga um evento para detectar quando um tile da camada eh carregado
		// Trocar o jQuery por ExtJS ... 
		bindTileEvent : function( layer ) {
			var serialId =  layer.get('serialId');
			if ( serialId ) {
				
				layer.getSource().on('tileloadstart', function(event) {
					//console.log("tile '"+serialId+"' load start");
					$("#alert_" + serialId).css("display","block");
					$("#error_" + serialId).css("display","none");
					layer.set('ready', false);
					
				});
			
				// Tile Carregado. Temos ao menos alguma coisa da camada.
				// Oculta os icones de alerta e loading. 
				layer.getSource().on('tileloadend', function(event) {
					//console.log("tile '"+serialId+"' load end");
					$("#alert_" + serialId).css("display","none");
					$("#error_" + serialId).css("display","none");
					layer.set('ready', true);
					
				});
				
				layer.getSource().on('tileloaderror', function(event) {
					//console.log("tile '"+serialId+"' load error");
					$("#alert_" + serialId).css("display","none");
					$("#error_" + serialId).css("display","block");
					layer.set('ready', false);
					
				});
			}
			
		},
		// --------------------------------------------------------------------------------------------
		// Atualiza algumas coisas quando o mapa eh arrastado ou o zoom muda
		updateMapCenter : function() {
			var center = MCLM.Map.map.getView().getCenter();
			var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
			mapCenterLong = center2[0];
			mapCenterLat = center2[1];
			mapZoom = MCLM.Map.map.getView().getZoom();

			// Atualiza os atributos de mapa na tela de editar configuração
			// para facilitar ao usuario editar estes valores.
			// Precisa do try..catch para evitar erros quando a tela nao estiver sendo exibida.
			try {
				Ext.getCmp('mapCenterConfigField').setValue(mapCenterLong + "," + mapCenterLat);
				Ext.getCmp('mapZoomConfigField').setValue(mapZoom);
			} catch ( ignored ) { }			
		},
		// --------------------------------------------------------------------------------------------
		// Retorna o centro do mapa
		getMapCenter : function() {
			var center = MCLM.Map.map.getView().getCenter();
			var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
			mapCenterLong = center2[0];
			mapCenterLat = center2[1];
			return mapCenterLong + "," + mapCenterLat;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna o zoom atual do mapa
		getMapZoom : function() {
			return MCLM.Map.map.getView().getZoom();
		},
		
    	// --------------------------------------------------------------------------------------------
		// Adiciona uma nova camada ao mapa
		addLayer : function( node ) {
			
			var idDataWindow = node.get('idDataWindow');
			var idNodeData = node.get('idNodeData');
			
			var serverUrl = node.get('serviceUrl');
			var layerName = node.get('layerName');
			
			var layerAlias = node.get('layerAlias');
			var data = node.data;
			var serialId = node.get('serialId');
			var version = node.get('version');
			var layerType = node.get('layerType');
			
			var filter = node.get("filter");
			var cql = null;
			if( filter ) {
				cql = filter.filter;
			}
			
            var transparency = node.get('transparency') / 10;
            var layerStackIndex = node.get('layerStackIndex');			
			
            if( layerType == 'DTA' ) {
            	MCLM.Map.getLayerAsFeatures( node );
            	return false;
            }
            
			if( layerType == 'KML' ) {
				
				var kmlFileUrl = window.location + "/" + serverUrl; 
				var newLayer = new ol.layer.Vector({
					  source: new ol.source.Vector({
						  url: kmlFileUrl,
						  isBaseLayer : false,
						  projection: ol.proj.get('EPSG:4326'),
						  format: new ol.format.KML()
					  })
				});				
				
			} else {
				
				var paramsRel = {
	    	        	tiled: true,
	    	            'layers': layerName,
	    	            'VERSION': '1.1.1', 
	    	            'FORMAT': 'image/png8'
	    	    }
				if ( cql ) {
					paramsRel = {
		    	        	tiled: true,
		    	            'layers': layerName,
		    	            'cql_filter': cql,
		    	            'VERSION': '1.1.1', 
		    	            'FORMAT': 'image/png8'
		    	    }					
				}
				
		    	var newLayer = new ol.layer.Tile({
		    	    source: new ol.source.TileWMS({
		    	        url: serverUrl,
		    	        isBaseLayer : false,
		    	        params: paramsRel,
		    	        projection: ol.proj.get('EPSG:4326'),
		    	        
		    	    })
		    	});	
				
		    	
		    	//console.log( "URL Camada " + layerName + " " + serverUrl );
		    	
			}
			
			if ( transparency == 0 ) transparency = 1;
			newLayer.setOpacity( transparency );
			newLayer.set('name', layerName);
			newLayer.set('alias', layerAlias);
			newLayer.set('idNodeData', idNodeData);
			newLayer.set('serverUrl', serverUrl);
			newLayer.set('serialId', serialId);
			newLayer.set('layerType', layerType);
			newLayer.set('idDataWindow', idDataWindow);
			newLayer.set('ready', false);
			newLayer.set('baseLayer', false);
			
			MCLM.Map.bindTileEvent( newLayer );
			MCLM.Map.map.addLayer( newLayer );

			if ( layerStackIndex > 0 ) me.setNewIndex( layerName, layerStackIndex );
			
			// Adiciona na lista do gerenciador de camadas.
	    	var layerStackStore = Ext.getStore('store.layerStack');
			var stackGridPanel = Ext.getCmp('stackGridPanel');
	    	var layerStack = layerStackStore.getRange();
	    	layerStack.push( data );
			layerStackStore.loadData( layerStack );    				
	    	if ( stackGridPanel ) {
	    		stackGridPanel.getView().refresh();
	    	}			
			// ----------------------------------------------
			return newLayer;			
		},
		// --------------------------------------------------------------------------------------------
		// Checa se uma camada estah sendo exibida no mapa ou nao
		isLayerEnabled : function( layerName ) {
			var achou = false;
			MCLM.Map.map.getLayers().forEach( function ( layer ) {
				if( layer.get("name") == layerName ) {
					achou = true;
				}
			});
			return achou;
		},
		setMapGridVisibility : function( visible ) {
			if ( visible ) {
				MCLM.Map.graticule.setMap( MCLM.Map.map );
				MCLM.Map.graticuleEnabled = true;
			} else {
				MCLM.Map.graticule.setMap( null );
				MCLM.Map.graticuleEnabled = false;
			}	
		},
		
		toggleStreetPhoto : function() {
			MCLM.Map.streetPhotoEnabled = !MCLM.Map.streetPhotoEnabled;
			if ( MCLM.Map.streetPhotoEnabled ) {
				MCLM.Map.bindMapToQueryPhoto();
			} else {
				MCLM.Map.unbindMapClick();
			}
		},
		
		// --------------------------------------------------------------------------------------------
		// Liga / desliga controle de tráfego maritimo
		toggleShipTraffic : function () {
			MCLM.Map.shipTrafficEnabled = !MCLM.Map.shipTrafficEnabled ;
			if ( !MCLM.Map.shipTrafficEnabled ) {
				MCLM.Map.shipsHelper.deleteShips();
			} else {
				MCLM.Map.shipsHelper.getShips();
			}
		},	
		// --------------------------------------------------------------------------------------------
		// Liga / desliga controle de tráfego aéreo
		toggleAeroTraffic : function () {
			MCLM.Map.aeroTrafficEnabled = !MCLM.Map.aeroTrafficEnabled ;
			if ( !MCLM.Map.aeroTrafficEnabled ) {
				MCLM.Map.aircraftHelper.deleteAircrafts();
			} else {
				MCLM.Map.aircraftHelper.getAircraftsBbox();
			}
		},		
		// --------------------------------------------------------------------------------------------
		// Liga / desliga a grade de coordenadas
		toggleMapGrid : function () {
			MCLM.Map.setMapGridVisibility( !MCLM.Map.graticuleEnabled );
		},		
		isGraticuleActive : function() {
			return MCLM.Map.graticuleEnabled;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna uma camada dado seu nome
		getLayerByName : function ( layerName ) {
			var me = MCLM.Map;
			var result = null;
			MCLM.Map.map.getLayers().forEach( function ( layer ) {
				if( layer.get("name") == layerName ) {
					result = layer;
				}
			});
			return result;
		},
		replacePattern : function( subject, properties ) {
			try {
				Object.keys( properties ).forEach(function ( key ) {
				    var val = properties[key];
				    var pattern = "${" + key + "}";
				    subject = subject.replace( pattern, val);
				});
			} catch ( err ) { }
			return subject;
		},
		// --------------------------------------------------------------------------------------------
		// Converte uma String GeoJSON para uma camada Vector
		createVectorLayerFromGeoJSON : function( geojsonStr, node ) {
        	var dataLayer = node.get("dataLayer");
        	var tableName = dataLayer.tableName;
        	var database = dataLayer.database;
			var serialId = node.get('serialId' );			
			var layerName = node.get( 'layerName' );			
			var layerAlias = node.get( 'layerAlias' );	
			var layerStyle = geojsonStr.featureStyle;
			var clustered = false;
		
			
			// Carregas as features
	    	var features = new ol.format.GeoJSON().readFeatures( geojsonStr.data, {
	    	    featureProjection: 'EPSG:3857'
	    	});		   	
		   	
	    	// Cria um source para as features
			var vectorSource = new ol.source.Vector({
			});	
			var clusterFeatureSource = new ol.source.Vector({
			});	

			if ( features.length > 50000) {
				Ext.Msg.alert('Aviso: Sobrecarga de Elementos na Camada de Dados', 'Esta camada possui elementos em excesso ('+features.length+'). Isso poderá causar queda no desempenho de seu navegador, ' + 
						'sem relação com o desempenho do próprio sistema. Considere refinar a consulta da camada de dados para conter menos elementos. O número ideal vai depender da '+
						'quantidade de memória de seu computador e da capacidade de seu navegador em processar grandes volumes de dados, mas este aviso será exibido ' +
						'quando este valor ultrapassar 50.000 elementos.');
			}
			
			// Separa pontos do resto para montar o cluster
			for (var i = 0; i < features.length; i++) {
			    if (features[i].getGeometry().getType() === 'Point') {
			    	clusterFeatureSource.addFeature(features[i]);
			    	clustered = true;
			    } else {
			    	
			    	var center = features[i].getProperties().circleCenter;
			    	var radius = features[i].getProperties().circleRadius;
			    	
			    	if ( center && radius ) {
			    		// Trata-se de um circulo. Preciso criar uma Feature "na mao"
			    		// pois o GeoJSON nao especifica circulos e substituir a atual
			    		// ( features[i] ) pela nova ( theFeature ).
			    		var theCircle = new ol.geom.Circle( center, radius );
			    		var theFeature = new ol.Feature( theCircle );
			    		
			    		// Preciso levar as properiedades da feature antiga, mas manter a geometria da nova
			    		var oldProperties = features[i].getProperties();
			    		var newProperties = theFeature.getProperties();
			    		
			    		oldProperties.geometry = newProperties.geometry;
			    		theFeature.setProperties( oldProperties, true );
			    		
			    		vectorSource.addFeature( theFeature );
			    	} else {
			    		vectorSource.addFeature( features[i] );
			    	}
			    }
			}			
			
			if( clustered ) {
				var clusterSource = new ol.source.Cluster({
				    distance: 15,
				    source: clusterFeatureSource
				});
			}
			
			// Estiliza as features baseado nos dados da tabela "FeatureStyle"
			// que eh atributo da tabela "DataLayer", que eh atributo de "Node"
			var customStyleFunction = function( feature, resolution ) {
				
				var featureGeomType = feature.getGeometry().getType();
				var props = feature.getProperties();
				var resultStyles = [];
				
				//console.log( me.replacePattern("A vaca caiu ${areakm2} e saiu voando até ${nome}...", props)  )

				// ------------------------------------------------------------------------------
				if ( featureGeomType == 'LineString' || featureGeomType == 'Line' ) {
		        	var lineStyle = new ol.style.Style({
						fill: new ol.style.Fill({
							color: layerStyle.lineFillColor
						}),
						stroke: new ol.style.Stroke({
							color: layerStyle.lineStrokeColor,
							width: layerStyle.lineStrokeWidth,
							lineDash: JSON.parse( layerStyle.lineLineDash ) 
						})
						
					});	
		        	resultStyles.push( lineStyle );
				}
				
				// ------------------------------------------------------------------------------
				if ( featureGeomType == 'Circle' )  {
		        	var hexColor = layerStyle.iconColor;
		        	var newColor = ol.color.asArray(hexColor);
		        	newColor = newColor.slice();
		        	newColor[3] = layerStyle.iconOpacity;	
		        	
		    		var circleStyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: newColor
							}),
							stroke: new ol.style.Stroke({
								color: layerStyle.iconColor,
								width: 2
							})
		    		});	
		    		resultStyles.push( circleStyle );					
				}
		
				
				// ------------------------------------------------------------------------------
		        if ( featureGeomType == 'MultiPolygon' || featureGeomType == 'Polygon' ) {

		        	var hexColor = me.replacePattern(layerStyle.polygonFillColor, props);
		        	var newColor = ol.color.asArray(hexColor);
		        	newColor = newColor.slice();
		        	newColor[3] = layerStyle.polygonFillOpacity;
		        	
		        	var polFill = newColor;
		        	
		        	var ptrHDist = layerStyle.ptrHDist;
		        	var ptrVDist = layerStyle.ptrVDist;
		        	var ptrLength = layerStyle.ptrLength;
		        	var ptrHeight = layerStyle.ptrHeight;
		        	var ptrWidth = layerStyle.ptrWidth;
		        	
		        	if ( ptrHDist && ptrVDist )
		        		polFill = MCLM.Functions.makePattern( newColor, ptrHDist, ptrVDist, ptrLength, ptrHeight, ptrWidth );
		        	
		        	
		        	var polygonStyle = new ol.style.Style({
						fill: new ol.style.Fill({
							color: polFill,
						}),
						stroke: new ol.style.Stroke({
							color: me.replacePattern(layerStyle.polygonStrokeColor),
							width: layerStyle.polygonStrokeWidth,
							lineDash: JSON.parse( layerStyle.polygonLineDash ), // [10, 20, 0, 20]
							strokeLinecap : layerStyle.polygonStrokeLinecap, // butt, round, square
						})
					});
		        	resultStyles.push( polygonStyle );
		        }		        	
		        	
				// ------------------------------------------------------------------------------
		        // TEXT (Para todos)
	        	var featureProperties = feature.getProperties();
	        	if ( featureProperties.features ) {
	        		// Eh um cluster de pontos...
	        		if ( featureProperties.features.length > 0 ) {
	        			featureProperties = featureProperties.features[0].getProperties();
	        		}
	        	}
	        	
	        	var mclm_label_column = featureProperties.mclm_label_column;
	        	var font = layerStyle.textFont;
	        	
	        	if( mclm_label_column && font ) {
	        		
			        var featureText = new ol.style.Style({
			            text: new ol.style.Text({
			                text: mclm_label_column,
			                offsetY: layerStyle.textOffsetY,
			                offsetX: layerStyle.textOffsetX,
			                font: layerStyle.textFont,
			                scale : 1,
			                stroke: new ol.style.Stroke({
			                	color: layerStyle.textStrokeColor,
			                	width: layerStyle.textStrokeWidth
			                }),				                
			                fill: new ol.style.Fill({
			                    color: layerStyle.textFillColor
			                }),
			            })
			        });		        	
		        	resultStyles.push( featureText );
	        	}

				// ------------------------------------------------------------------------------
				if ( featureGeomType == 'Point' ) {
					
		        	var hexColor = layerStyle.iconColor;
		        	var newColor = ol.color.asArray(hexColor);
		        	newColor = newColor.slice();
		        	newColor[3] = layerStyle.iconOpacity;					
					
					if ( layerStyle.iconSrc ) {
						// Se tiver icone (o caminho do icone) entao cria um estilo de icone
				    	var pointStyle = new ol.style.Style({
				    		  image: new ol.style.Icon(({
				    			    anchor: JSON.parse( layerStyle.iconAnchor ),
				    			    scale : layerStyle.iconScale,
				    			    anchorXUnits: layerStyle.iconAnchorXUnits,
				    			    anchorYUnits: layerStyle.iconAnchorYUnits,
				    			    opacity: layerStyle.iconOpacity,
				    			    color   : layerStyle.iconColor,
				    			    rotation: layerStyle.iconRotation,
				    			    src:  me.replacePattern(layerStyle.iconSrc, props)
				    		  }))
				    	});
				    	
					} else {
						// Se nao, cria um circulo
				    	var pointStyle = new ol.style.Style({
				    		  image: new ol.style.Circle({
					                radius: layerStyle.iconScale,
					                fill: new ol.style.Fill({
					                    color: newColor
					                }),
					                stroke: new ol.style.Stroke({
					                    color: layerStyle.iconColor,
					                    width: 2
					                })
				    		  })
				    	});
						
						
						
					}
			    	resultStyles.push( pointStyle );
				}			        
				// ------------------------------------------------------------------------------
		        
				
				
		    	return resultStyles;
			};

			
			if ( clustered ) {
				var vectorLayer = new ol.layer.Vector({
					source: clusterSource,
				    style : customStyleFunction
				});
			} else {
				var vectorLayer = new ol.layer.Vector({
				    source: vectorSource,
				    style : customStyleFunction
				});
				
			}

			vectorLayer.set('alias', layerAlias);
			vectorLayer.set('name', layerName);
			vectorLayer.set('serialId', serialId );
			vectorLayer.set('ready', true);
			vectorLayer.set('baseLayer', false);	        
			
			MCLM.Map.removeLayer( serialId );
			MCLM.Map.map.addLayer( vectorLayer );
			
			MCLM.Functions.hideMainLoadingIcon();
			
			return vectorLayer;
		},
		// --------------------------------------------------------------------------------------------
		// Remove uma camada do mapa
		removeLayerByName : function ( layerName ) {
			var me = MCLM.Map;
			MCLM.Map.map.getLayers().forEach( function ( layer ) {
				if( layer.get("name") == layerName ) {
					me.map.removeLayer( layer );	
					return;
				}
			});
		},
		removeLayer : function ( serialId ) {
			var me = MCLM.Map;
			MCLM.Map.map.getLayers().forEach( function ( layer ) {
				if( layer.get("serialId") == serialId ) {
					me.map.removeLayer( layer );	
					return;
				}
			});
			
			// Remove da lista de camadas do gerenciador de camadas
	    	var layerStackStore = Ext.getStore('store.layerStack');
	    	var stackGridPanel = Ext.getCmp('stackGridPanel');
	    	layerStackStore.each( function(rec) {
	    	    if (rec.data.serialId == serialId) {
	    	    	layerStackStore.remove(rec);
	    	        return false;
	    	    }
	    	});    	
	    	if ( stackGridPanel ) {
	    		stackGridPanel.getView().refresh();
	    	}   			
			
			
		},
		// --------------------------------------------------------------------------------------------
		// Liga/ Desliga o mapa do OpenSeaMap
		toggleSeaMapLayer : function() {
			if ( MCLM.Map.isLayerEnabled('OpenSeaMap') ) {
				MCLM.Map.removeLayer( 'mclm_openseamap_cmoa' );
			} else {
				MCLM.Map.map.addLayer( MCLM.Map.openSeaMapLayer );	
			}
		},		
		// --------------------------------------------------------------------------------------------
		// Liga/ Desliga o mapa do OpenSeaMap
		toggleBaseLayer : function() {
			if ( MCLM.Map.baseLayer.getVisible() ) {
				MCLM.Map.baseLayer.setVisible(false);
			} else {
				MCLM.Map.baseLayer.setVisible(true);
			}
		},		
		// --------------------------------------------------------------------------------------------
		// Busca o indice de uma camada no mapa dado o seu nome
		indexOf : function (layers, layer) {
			var length = layers.getLength();
			for (var i = 0; i < length; i++) {
				var testLayer = layers.item( i );
				if ( layer === testLayer ) {
					return i;
				}
			}
			return -1;
		},		
		// --------------------------------------------------------------------------------------------
		// Retorna uma camada do mapa dado o seu nome
		findByName : function (name) {
			var layers = MCLM.Map.map.getLayers();
			var length = layers.getLength();
			for (var i = 0; i < length; i++) {
				var layerName = layers.item(i).get('name');
				if (name === layerName) {
					return layers.item(i);
				}
			}
			return null;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna uma camada do mapa dado o seu serialId
		findBySerialID : function ( serial ) {
			var layers = MCLM.Map.map.getLayers();
			var length = layers.getLength();
			for (var i = 0; i < length; i++) {
				var serialId = layers.item(i).get('serialId');
				if (serialId === serial) {
					return layers.item(i);
				}
			}
			return null;
		},
		// --------------------------------------------------------------------------------------------
		// Marca uma camada como selecionada.
		selectLayer : function ( layerName ) {
			MCLM.Map.selectedLayer = MCLM.Map.findByName( layerName );
		},
		// --------------------------------------------------------------------------------------------
		// Pega a opacidade da camada selecionada
		getSelectedLayerOpacity: function () {
			if ( MCLM.Map.selectedLayer ) {
				return MCLM.Map.selectedLayer.getOpacity();
			} else {
				return 0;
			}
		},
		// --------------------------------------------------------------------------------------------
		// Ajusta a opacidade da camada selecionada
		setSelectedLayerOpacity : function ( opacity ) {
			if ( MCLM.Map.selectedLayer ) {
				MCLM.Map.selectedLayer.setOpacity( opacity );
			} else {
				Ext.Msg.alert('Nenhuma Camada Selecionada','Selecione uma camada para alterar sua opacidade.' );
			}
		},
		// --------------------------------------------------------------------------------------------
		// Retorna o indice de uma camada no mapa
		getLayerIndex : function( layer ) {
			var layers = MCLM.Map.map.getLayers();
			var index = MCLM.Map.indexOf(layers, layer);
			return index;
		},
		// --------------------------------------------------------------------------------------------
		// Modifica o indice de uma camada no mapa (nivel)
		setNewIndex : function ( layerName , newIndex ) {
			var layer = MCLM.Map.findByName( layerName );
			var layers = MCLM.Map.map.getLayers();
			if ( layer ) {
				var length = layers.getLength();
				var index = MCLM.Map.getLayerIndex(layer);
			    var layer = layers.removeAt( index );
			    layers.insertAt( newIndex, layer );
			} 
		},		
		// --------------------------------------------------------------------------------------------
		// Retorna o bounding box atual do mapa
		getMapCurrentBbox : function () {
			var extent = MCLM.Map.map.getView().calculateExtent( MCLM.Map.map.getSize() );
		    var bottomLeft = ol.proj.transform( ol.extent.getBottomLeft( extent ), 'EPSG:3857', 'EPSG:4326' );
		    var topRight = ol.proj.transform( ol.extent.getTopRight( extent ), 'EPSG:3857', 'EPSG:4326' );
			return bottomLeft + "," + topRight;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna a URL para pegar a imagem PNG de uma camada 'layerName' do servidor 'serviceUrl'
		// Usa o BBOX atual da viewport do mapa
		getLayerImagePreview : function ( layerName, serviceUrl) {
			var	bbox = MCLM.Map.getMapCurrentBbox();
			var thumImg = serviceUrl + "/?service=WMS&srs=EPSG:4326&width=238&height=150&version=1.3&transparent=true&request=GetMap&layers="+layerName+"&format=image/png8&bbox="+bbox;
			return thumImg;
		},		
		// --------------------------------------------------------------------------------------------
		// Retorna a URL para pegar a imagem PNG de uma camada 'layerName' do servidor 'serviceUrl'
		// Usa o BBOX atual da viewport do mapa
		getSceneryImagePreview : function ( layerName, serviceUrl, bbox) {
			var thumImg = serviceUrl + "/?service=WMS&srs=EPSG:4326&width=238&height=150&version=1.3&transparent=true&request=GetMap&layers="+layerName+"&format=image/png8&bbox="+bbox;
			return thumImg;
		},		
		// --------------------------------------------------------------------------------------------
		//Retorna a URL para pegar a imagem PNG da legenda de uma camada 'layerName' do servidor 'serviceUrl'
		getLayerLegendImage : function ( layerName, serviceUrl ) {
			var url = serviceUrl + "/?service=WMS&version=1.3&request=GetLegendGraphic&format=image/png8&layer=" + layerName;
			return url;
		},
		// --------------------------------------------------------------------------------------------
		// Liga / desliga ferramenta de consulta de camada
	    toggleQueryTool : function () {
			if ( !MCLM.Map.queryToolEnabled ) {
				MCLM.Map.bindMapToQueryTool() ;
				MCLM.Map.queryToolEnabled = true;
		 	} else {
		 		MCLM.Map.unbindMapClick();
		 		MCLM.Map.queryToolEnabled = false;
		 	}
		},  
		// --------------------------------------------------------------------------------------------
		// Interroga o servidor de rotas para saber quais ruas estão mais perto do ponto clicado pelo usuário
		getNearestRoads : function( center, type ) {
			var coordinate = ol.proj.transform( center , 'EPSG:3857', 'EPSG:4326');			
			
			Ext.Ajax.request({
		       url: 'getNearestRoads',
		       params: {
		           'coordinate': coordinate
		       },       
		       success: function(response, opts) {
		    	   var respText = Ext.decode(response.responseText);
		    	  
		    	   var jsonObj = respText[0];
		    	   var osmName = "(Rua Sem Nome)";
		    	   if ( jsonObj.osm_name != null ) osmName = jsonObj.osm_name;
		    	   var source = jsonObj.source;
		    	   var target = jsonObj.target;
		    	   if( type == 'S' ) {
		    		   $("#sourceAddrText").text( osmName );
		    		   $("#sourceValue").val( source );
		    	   }
		    	   if( type == 'T' ) {
		    		   $("#targetAddrText").text( osmName );
		    		   $("#targetValue").val( target );
		    	   }
		    	   
		       },
		       failure: function(response, opts) {
		    	   Ext.Msg.alert('Erro','Erro ao receber os dados da coordenada selecionada.' );
		       }
			});				
		},
		// --------------------------------------------------------------------------------------------
		// Um clique no mapa seleciona a origem da rota
		bindMapToGetSourceAddress : function() {
			var me = MCLM.Map;
			MCLM.Map.unbindMapClick();
			MCLM.Map.onClickBindKey = MCLM.Map.map.on('click', function(event) {
				me.getNearestRoads( event.coordinate, 'S' );
				MCLM.RouteHelper.putStartIcon( event.coordinate );
			});
		},
		// --------------------------------------------------------------------------------------------
		// Um clique no mapa seleciona o destino da rota
		bindMapToGetTargetAddress : function() {
			var me = MCLM.Map;
			MCLM.Map.unbindMapClick();
			MCLM.Map.onClickBindKey = MCLM.Map.map.on('click', function(event) {
				me.getNearestRoads( event.coordinate, 'T' );
				MCLM.RouteHelper.putEndIcon( event.coordinate );
			});
		},

		// --------------------------------------------------------------------------------------------
		// Libera o click do mouse no mapa da ultima ferramenta ligada
		unbindMapClick : function () {
			if ( MCLM.Map.onClickBindKey ) {
				ol.Observable.unByKey( MCLM.Map.onClickBindKey );
			}
		},		
		// --------------------------------------------------------------------------------------------
		bindMapToQueryPhoto : function () {
			MCLM.Map.unbindMapClick();
			var me = MCLM.Map;
			me.onClickBindKey = me.map.on('click', function(event) {
				
				var featureHit = false;
				me.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
					
					var layerName = layer.get("alias");
					var att = feature.getProperties();					
					
					if ( (layerName == 'photoLayer') && me.streetPhotoEnabled ) {
						var imageUrl = "https://d1cuyjsrcm0gby.cloudfront.net/"+att.key+"/thumb-320.jpg";
						MCLM.view.photo.PhotoHelper.viewPhoto( imageUrl );
						featureHit = true;
						return true;
					}
				});
				
				if ( me.streetPhotoEnabled && !featureHit ) {
					MCLM.view.photo.PhotoHelper.getPhotosCloseTo( event.coordinate );
					return true;
				}					
				
			});
		},
		
		
		// --------------------------------------------------------------------------------------------
		// Liga o click do mouse no mapa com o metodo de consulta de camada
		bindMapToQueryTool : function () {
			MCLM.Map.unbindMapClick();
			var me = MCLM.Map;
			me.onClickBindKey = me.map.on('click', function(event) {

				me.queryMap( event.coordinate );
				var featureHit = false;
				var externalLayerName = "";
				me.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
					var columnRefs = {};
					var layerName = layer.get("alias");
					var att = feature.getProperties();
					
					if ( (layerName == 'aircraftLayer') && aeroTrafficEnabled ) {
						me.aircraftHelper.showAircraftDetails( att );
						featureHit = true;
						return true;
					}
					
					if ( layerName == 'climaLayer' ) {
						MCLM.ClimaHelper.showDetails( feature, event.coordinate );
						return true;
					}
					
					if ( layerName == 'poiLayer' ) {
						MCLM.RouteHelper.inspectFeature( event.pixel );
						featureHit = true;
						return true;
					}

					if ( !att.features ) {
						MCLM.Functions.mainLog("Não existem dados na camada " + layerName );
					} else {
					
						featureHit = true;
						
						externalLayerName = layerName;
						var data = [];
				        att.features.forEach( function( feature ) {
	
				        	// Zera os valores de todas as colunas
				        	for(var p in columnRefs) {
				        	    if(columnRefs.hasOwnProperty(p)) columnRefs[p] = '';
				        	}
				        	
				        	var keys = feature.getKeys();
			        		for( y=0; y < keys.length; y++ ) {
			        			var value = feature.get( keys[y] );
			        			if( (keys[y] != 'geometry') ) {
			        				// Seta o valor para a coluna
			        				columnRefs[ keys[y] ] = value;
					        		
			        			}
			        		}
			        		
			        		// Passa para a verdadeira. Isso tudo é para manter o numero de colunas igual
			        		// caso uma feature venha com uma coluna e outra não.
			        		var tempData = JSON.parse( JSON.stringify( columnRefs ) );
			        		data.push( tempData );
	
				        });
				        			        
				        me.addGrid( externalLayerName, data );
					}
					
			    });				
				
			});
			
		}, 		
		// --------------------------------------------------------------------------------------------
		queryMap: function ( coordinate ) {
			var virgula = "";
			var layerNames = "";
			var content = [];
			var urlFeatureInfo = "";
			var viewResolution = MCLM.Map.theView.getResolution();	
			var projection = MCLM.Map.theView.getProjection();
			var queryFactorRadius = MCLM.Map.queryFactorRadius;
			var featureCount = MCLM.Map.featureCount;
			var me = MCLM.Map;
			
		
			var queryResultWindow = Ext.getCmp('queryResultWindow');
			if ( !queryResultWindow ) queryResultWindow = Ext.create('MCLM.view.paineis.QueryResultWindow');
			queryResultWindow.removeAll();
			// ------------------
			
			
			MCLM.Map.map.getLayers().forEach( function (layer) {
				var layerName = layer.get("name");
				var layerAlias = layer.get("alias");
				var baseLayer = layer.get("baseLayer");
				
				var idNodeData = layer.get("idNodeData");
				var idDataWindow = layer.get("idDataWindow");
				var found = false;
				
				if ( layerName && ( !baseLayer ) ) {
					try {
						urlFeatureInfo = layer.getSource().getGetFeatureInfoUrl(
							coordinate, viewResolution, projection,  
							{'buffer':queryFactorRadius, 'QUERY_LAYERS': layerName,  'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': featureCount} 
						);
						found = true;
						me.queryLayer( layerName, urlFeatureInfo, layerAlias, idNodeData, idDataWindow  );
					} catch ( err ) { me.queryLayerError("Erro ao interrogar camada", layerName);  }
				}				
				//if( !found ) {
				//	Ext.Msg.alert('Não é possível interrogar a camada de base','Não existem camadas a serem interrogadas.' );
				//}
			});
		},
		
		
		
		// --------------------------------------------------------------------------------------------
		// Interroga uma camada dada uma URL do tipo "REQUEST=GetFeatureInfo"
		queryLayer : function( layerName, urlFeatureInfo, layerAlias, idNodeData, idDataWindow ) {
			
			MCLM.Functions.mainLog("Interrogando " + layerAlias + "...");
			var encodedUrl = encodeURIComponent( urlFeatureInfo );
			var me = MCLM.Map;
			Ext.Ajax.request({
		       url: 'queryLayer',
		       params: {
		           'targetUrl': encodedUrl,
		           'layerName' : layerName, 
		           'idNodeData' : idNodeData, 
		           'idDataWindow' : idDataWindow
		       },       
		       success: function(response, opts) {
		    	  MCLM.Functions.mainLog("[OK] " + layerAlias);
		    	  
		    	  var jsonObj = JSON.parse(response.responseText);
		    	   
		    	  var rawData = [];
		    	  for ( x=0; x<jsonObj.features.length;x++ ) {
		    		  var tempObj = jsonObj.features[x].properties;
		    		 
		    		  var feicaoMeta = {};
		    		  var feicaoMetaFeatures = [];
		    		  feicaoMetaFeatures.push( jsonObj.features[x] );
		    		  feicaoMeta["features"] = feicaoMetaFeatures;
		    		  feicaoMeta["type"] = "FeatureCollection";
		    		  
		    		  tempObj["mclm_metadata_property"] = Ext.encode( feicaoMeta );
		    		  rawData.push( tempObj );
		    	  }
		    	   
		    	  if ( rawData.length > 0 ) {
		    		 me.addGrid( layerAlias, rawData );
		    	  }

		       },
		       failure: function(response, opts) {
		    	   MCLM.Functions.mainLog("[ERRO] " + layerAlias);
		    	   me.queryLayerError( response, layerName );
		       }
			});				
		},
		
		getStoreColumnsFromJson : function ( obj ) {
		    var keys = [];
		    for (var key in obj) {
		        if ( obj.hasOwnProperty(key) ) {
		            keys.push({name : key});
		        }
		    }
		    return keys;	
		},
		
		getGridColumnsFromJson : function( obj ) {
		    var keys = [];
		    for (var key in obj) {
		        if ( obj.hasOwnProperty(key) ) {
		        	if ( key.startsWith("mclm_pk_")  ) { keys.push({text: key, width:0, dataIndex: key, hidden : true}) } else
		        	if ( key == 'mclm_label_column' ) { keys.push({text: key, width:0, dataIndex: key, hidden : true}) } else
	        		if ( key == 'mclm_metadata_property' ) { keys.push({text: key, width:0, dataIndex: key, hidden : true}) } else
		        	if ( key == 'node_data' ) { keys.push({text: key, width:0, dataIndex: key, hidden : true}) } else
		        	if ( key == 'data_window' ) { keys.push({text: key, width:0, dataIndex: key, hidden : true}) } else
		        		keys.push({text: key, width:150, dataIndex: key}); 
		        }
		    }
		    return keys;	
		},
		
		createGrid : function( layerName, store, columnNames ) {
			var dummyGrid = Ext.create('Ext.grid.Panel', {
				border: false,
				title : layerName,
				store : store,
			    frame: false,
			    margin: "0 0 0 0", 
			    flex:1,
			    loadMask: true,
			    columns:columnNames,
			    autoHeight:true,
			    
			    listeners: {
			    	itemclick: function(dv, record, item, index, e) {
			    		var selectedRec = dv.getSelectionModel().getSelection()[0];  
			    		MCLM.Functions.openWindowData( selectedRec.data );
			    	}
			    }
			    
			});
			return dummyGrid;
		},
		
		
		createStore : function ( storeData, columns ) {
			var arrData = [];
			var theData = storeData;
			if ( !$.isArray( storeData ) ) {
				arrData.push( storeData );
				theData = arrData;
			} 
			
			var store =  Ext.create('Ext.data.Store',{
		        fields: columns,
				autoLoad: true,
				data: theData
			}); 	
			return store;
		},
		addGrid : function ( layerName, data ) {
			
			var storeColumns = MCLM.Map.getStoreColumnsFromJson( data[0] );   
			var gridColumns = MCLM.Map.getGridColumnsFromJson( data[0] );

			var store = MCLM.Map.createStore( data, storeColumns );
			var grid = MCLM.Map.createGrid( layerName, store, gridColumns );
			
			var queryResultWindow = Ext.getCmp('queryResultWindow');
			if ( !queryResultWindow ) queryResultWindow = Ext.create('MCLM.view.paineis.QueryResultWindow');
			queryResultWindow.show();
			
			queryResultWindow.add( grid );
			
		},
		
		
		
		
		// --------------------------------------------------------------------------------------------
		// Exibe uma mensagem de erro da rotina "queryLayer"
		queryLayerError : function( response, layerName ) {
			// Ext.Msg.alert('Não é possível interrogar a camada de base','Não existem camadas a serem interrogadas.' );
			// console.log( "queryLayerError Error: " + response + " " + layerName );
		},
		// --------------------------------------------------------------------------------------------
		// Solicita uma camada do GeoServer em formato GeoJSON (Features)
		// Quando o Node representar uma Camada de Dados (tipo DTA)
		getLayerAsFeatures : function( node ) {
			var me = MCLM.Map;
        	var dataLayer = node.get("dataLayer");
			var serialId = node.get('serialId' );
			var idNodeData = node.get('idNodeData' );
			var idDataWindow = node.get('idDataWindow' );
			var idDataLayer = dataLayer.idDataLayer;
			var	bbox = MCLM.Map.getMapCurrentBbox();

	    	Ext.Ajax.setTimeout(120000);
			Ext.Ajax.request({
				url: 'getAsFeatures',
				params: {
					'idDataLayer': idDataLayer,
					'idDataWindow': idDataWindow,
					'idNodeData': idNodeData,
					'bbox' : bbox
				},       
				success: function(response, opts) {
			    	MCLM.Functions.showMainLoadingIcon( 'Carregando Camada...');

			    	try {
						var respText = Ext.decode(response.responseText);
						var layer = me.createVectorLayerFromGeoJSON( respText, node );
			    	} catch ( error ) {
						MCLM.Functions.hideMainLoadingIcon();
						Ext.Msg.alert('Erro','Erro ao receber dados: ' + response.responseText );
						return true;
			    	} 
		    	   
					//Adiciona ao Layer Stack
					var layerStackStore = Ext.getStore('store.layerStack');
					var stackGridPanel = Ext.getCmp('stackGridPanel');
					var layerStack = layerStackStore.getRange();
					layerStack.push( node.data );
					layerStackStore.loadData( layerStack );    				
					if ( stackGridPanel ) {
						stackGridPanel.getView().refresh();
					}
				},
				failure: function(response, opts) {
					MCLM.Functions.hideMainLoadingIcon();
					Ext.Msg.alert('Erro','Erro ao receber dados.' );
				}
			});			
			
			
	    	
		},
		// --------------------------------------------------------------------------------------------
		getLayers : function() {
			return MCLM.Map.map.getLayers();
		},
		// --------------------------------------------------------------------------------------------
		// Posiciona o centro do mapa em uma coordenada e zoom. Usado pela carga do cenário
		panTo : function( center, zoom ) {
			var coord = center.split(",");
			var lat = Number( coord[0].trim() );
			var lon = Number( coord[1].trim() );
			var coordinate = ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
			
			MCLM.Map.theView.animate({
				  zoom		: zoom,
				  center	: coordinate,
				  duration	: 2000,
			});
			
		},
		// --------------------------------------------------------------------------------------------
		// Adiciona uma feicao ao mapa
		addFeicao : function( node ) {
			var feicao = node.get("feicao");
			var estilo = feicao.style;
			var geomType = feicao.geomType;
			var idFeicao = feicao.idFeicao;
			var feicaoNome = feicao.nome;
			var feicaoDescricao = feicao.descricao;
			var featureCollection = Ext.decode( feicao.metadados );
			
        	var dataLayer = {};
        	dataLayer.tableName = feicaoNome ;
        	dataLayer.database = geomType;
        	node.set("dataLayer",dataLayer);
        	
			var jsonstr = {};
			jsonstr.featureStyle = estilo;
			jsonstr.data = feicao.metadados;	
			
			return MCLM.Map.createVectorLayerFromGeoJSON( jsonstr, node );			
		
		},
		// --------------------------------------------------------------------------------------------
		// Remove uma feicao do mapa
		removeFeicao : function(  node ) {
			var feicao = node.get("feicao");
			var geomType = feicao.geomType;
			var idFeicao = feicao.idFeicao;
			var nome = feicao.nome;
			var serialId = node.get('serialId' );
			
			MCLM.Map.removeLayer( serialId );
		},
		
		getLayerByAlias : function ( layerAlias ) {
			var me = MCLM.Map;
			var result = null;
			MCLM.Map.map.getLayers().forEach( function ( layer ) {
				if( layer.get("alias") == layerAlias ) {
					result = layer;
				}
			});
			return result;
		},		
		
		// --------------------------------------------------------------------------------------------
		// TESTE - APAGAR
		showLayers : function () {
			var layers = MCLM.Map.map.getLayers();
			var length = layers.getLength();
			for (var i = 0; i < length; i++) {
				var layerName = layers.item(i).get('name');
				
				var alias = layers.item(i).get('alias');
				var serverUrl = layers.item(i).get('serverUrl');
				var serialId = layers.item(i).get('serialId');
				var layerType = layers.item(i).get('layerType');				
				
				console.log( " > " + layerName + " | " + serialId + " (" + alias + ")");
			}
			return null;
		},
		
		
		
	}

});
