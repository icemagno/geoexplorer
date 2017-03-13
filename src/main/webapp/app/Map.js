Ext.define('MCLM.Map', {
	
	statics: {
		map: null,
		featureCount : 100,
		queryToolEnabled : false,
		mousePosition: null,
		selectedLayer: null,
		theView: null,
		theMiniView: null,
		onClickBindKey: null,
		graticuleEnabled: false,
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
		
		
		getBaseMapName : function() {
			return this.baseLayerName;
		},
		getBaseServerURL : function() {
			return this.geoserverUrl;
		},
		isBaseMapActive : function() {
			return this.baseLayer.getVisible();
		},
		
		// --------------------------------------------------------------------------------------------
		// Cria o Mapa Principal e Camadas auxiliares
		loadMap : function( container ) {
			me = this;
			this.init();
			
			this.map = new ol.Map({
				layers: [ this.baseLayer ],
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
		            	   return coord;
		               }
		           })
		        
				]),
				view: this.theView
			});	
			
			// Quando o mapa for arrastado ou o zoom mudar dispara o metodo updateMapCenter()
			this.map.getView().on('propertychange', function(e) {
				switch (e.key) {  
					case 'center':
						me.updateMapCenter();
						break;
					case 'resolution':  
						me.updateMapCenter();
						break;  
				}
			});	
			
			this.map.on('pointermove', function(evt) {
				if (evt.dragging) {
					return;
				}
			    var hit = this.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
			        return true;
			    });
			    if ( hit && me.interrogatingFeatures ) {
			        this.getTargetElement().style.cursor = 'pointer';
			    } else {
			        this.getTargetElement().style.cursor = '';
			    }			    
			});
			
		},
		// --------------------------------------------------------------------------------------------
		// Inicializa todas as variáveis e configuracoes
		init : function() {
			var config = MCLM.Globals.config;
			
			this.graticule = new ol.Graticule({
				strokeStyle: new ol.style.Stroke({
					color: 'rgba(255,120,0,0.9)',
					width: 1.5,
					lineDash: [0.5, 4]
				})
			});			
			
			this.geoserverUrl = config.geoserverUrl;
			this.baseLayerName = config.baseLayer;
			this.mapZoom = config.mapZoom; 
			this.mapCenter = config.mapCenter;
			this.queryFactorRadius = config.queryFactorRadius;				
			this.arrayMapCenter = JSON.parse("[" + this.mapCenter + "]");

			this.theView = new ol.View({
				center: ol.proj.transform( this.arrayMapCenter, 'EPSG:4326', 'EPSG:3857'),
				zoom: this.mapZoom
			});			
			
			this.openSeaMapLayer = this.createOpenSeaMapLayer();
			this.baseLayer = this.createBaseLayer();
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
			        url: this.geoserverUrl,
			        isBaseLayer : true,
			        projection: ol.proj.get('EPSG:4326'),
			        params: {
			            'LAYERS': this.baseLayerName, 
			            'FORMAT': 'image/png'
			        }
			    })
			});	
			landLayer.set('name', this.baseLayerName );
			landLayer.set('alias', 'Camada Base' );
			landLayer.set('serverUrl', this.geoserverUrl );
			landLayer.set('serialId', 'mclm_landlayer_cmoa');
			landLayer.set('ready', false);
			landLayer.set('baseLayer', true);
			this.bindTileEvent( landLayer );	
			
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
			var center = this.map.getView().getCenter();
			var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
			mapCenterLong = center2[0];
			mapCenterLat = center2[1];
			mapZoom = this.map.getView().getZoom();

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
			var center = this.map.getView().getCenter();
			var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
			mapCenterLong = center2[0];
			mapCenterLat = center2[1];
			return mapCenterLong + "," + mapCenterLat;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna o zoom atual do mapa
		getMapZoom : function() {
			return this.map.getView().getZoom();
		},
		// --------------------------------------------------------------------------------------------
		// Adiciona uma nova camada ao mapa
		addLayer : function( node ) {
			var serverUrl = node.get('serviceUrl');
			var layerName = node.get('layerName');
			var layerAlias = node.get('layerAlias');
			var data = node.data;
			var serialId = node.get('serialId');
			var version = node.get('version');
			var layerType = node.get('layerType');		
			
            var transparency = node.get('transparency') / 10;
            var layerStackIndex = node.get('layerStackIndex');			
			
            if( layerType == 'DTA' ) {
            	this.getLayerAsFeatures( node );
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
				
				var newLayer = new ol.layer.Tile({
				    source: new ol.source.TileWMS({
				        url: serverUrl,
				        isBaseLayer : false,
				        params: {
				        	'tiled'		: true,
				            'layers'	: layerName,
				            'version'	: '1.1.1', 
				            'format'	: 'image/png',
				        },
				        projection: ol.proj.get('EPSG:4326')
				    })
				});
				
			}
			
			if ( transparency == 0 ) transparency = 1;
			newLayer.setOpacity( transparency );
			newLayer.set('name', layerName);
			newLayer.set('alias', layerAlias);
			newLayer.set('serverUrl', serverUrl);
			newLayer.set('serialId', serialId);
			newLayer.set('layerType', layerType);
			newLayer.set('ready', false);
			newLayer.set('baseLayer', false);
			
			this.bindTileEvent( newLayer );
			this.map.addLayer( newLayer );

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
			this.map.getLayers().forEach( function ( layer ) {
				if( layer.get("name") == layerName ) {
					achou = true;
				}
			});
			return achou;
		},
		setMapGridVisibility : function( visible ) {
			if ( visible ) {
				this.graticule.setMap( this.map );
				this.graticuleEnabled = true;
			} else {
				this.graticule.setMap( null );
				this.graticuleEnabled = false;
			}	
		},
		// --------------------------------------------------------------------------------------------
		// Liga / desliga a grade de coordenadas
		toggleMapGrid : function () {
			this.setMapGridVisibility( !this.graticuleEnabled );
		},		
		isGraticuleActive : function() {
			return this.graticuleEnabled;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna uma camada dado seu nome
		getLayerByName : function ( layerName ) {
			var me = this;
			var result = null;
			this.map.getLayers().forEach( function ( layer ) {
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

				/*
	        	var defaultStyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#CACACA'
					}),
					stroke: new ol.style.Stroke({
						color: 'black',
						width: 1
					})
				});				
				resultStyles.push( defaultStyle );
				*/
				
				
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
	        	
	        	var label = featureProperties.label;
	        	var font = layerStyle.textFont;
	        	
	        	if( label && font ) {
	        		
			        var featureText = new ol.style.Style({
			            text: new ol.style.Text({
			                text: label,
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
			    	//if ( resolution < 150 ) resultStyles.push( featureText );
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
		},
		// --------------------------------------------------------------------------------------------
		// Remove uma camada do mapa
		removeLayerByName : function ( layerName ) {
			var me = this;
			this.map.getLayers().forEach( function ( layer ) {
				if( layer.get("name") == layerName ) {
					me.map.removeLayer( layer );	
					return;
				}
			});
		},
		removeLayer : function ( serialId ) {
			var me = this;
			this.map.getLayers().forEach( function ( layer ) {
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
			if ( this.isLayerEnabled('OpenSeaMap') ) {
				this.removeLayer( 'mclm_openseamap_cmoa' );
			} else {
				this.map.addLayer( this.openSeaMapLayer );	
			}
		},		
		// --------------------------------------------------------------------------------------------
		// Liga/ Desliga o mapa do OpenSeaMap
		toggleBaseLayer : function() {
			if ( this.baseLayer.getVisible() ) {
				this.baseLayer.setVisible(false);
			} else {
				this.baseLayer.setVisible(true);
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
			var layers = this.map.getLayers();
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
			var layers = this.map.getLayers();
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
			this.selectedLayer = this.findByName( layerName );
		},
		// --------------------------------------------------------------------------------------------
		// Pega a opacidade da camada selecionada
		getSelectedLayerOpacity: function () {
			if ( this.selectedLayer ) {
				return this.selectedLayer.getOpacity();
			} else {
				return 0;
			}
		},
		// --------------------------------------------------------------------------------------------
		// Ajusta a opacidade da camada selecionada
		setSelectedLayerOpacity : function ( opacity ) {
			if ( this.selectedLayer ) {
				this.selectedLayer.setOpacity( opacity );
			} else {
				Ext.Msg.alert('Nenhuma Camada Selecionada','Selecione uma camada para alterar sua opacidade.' );
			}
		},
		// --------------------------------------------------------------------------------------------
		// Retorna o indice de uma camada no mapa
		getLayerIndex : function( layer ) {
			var layers = this.map.getLayers();
			var index = this.indexOf(layers, layer);
			return index;
		},
		// --------------------------------------------------------------------------------------------
		// Modifica o indice de uma camada no mapa (nivel)
		setNewIndex : function ( layerName , newIndex ) {
			var layer = this.findByName( layerName );
			var layers = this.map.getLayers();
			if ( layer ) {
				var length = layers.getLength();
				var index = this.getLayerIndex(layer);
			    var layer = layers.removeAt( index );
			    layers.insertAt( newIndex, layer );
			} 
		},		
		// --------------------------------------------------------------------------------------------
		// Retorna o bounding box atual do mapa
		getMapCurrentBbox : function () {
			var extent = this.map.getView().calculateExtent( this.map.getSize() );
		    var bottomLeft = ol.proj.transform( ol.extent.getBottomLeft( extent ), 'EPSG:3857', 'EPSG:4326' );
		    var topRight = ol.proj.transform( ol.extent.getTopRight( extent ), 'EPSG:3857', 'EPSG:4326' );
			return bottomLeft + "," + topRight;
		},
		// --------------------------------------------------------------------------------------------
		// Retorna a URL para pegar a imagem PNG de uma camada 'layerName' do servidor 'serviceUrl'
		// Usa o BBOX atual da viewport do mapa
		getLayerImagePreview : function ( layerName, serviceUrl) {
			var	bbox = this.getMapCurrentBbox();
			var thumImg = serviceUrl + "/?service=WMS&srs=EPSG:4326&width=238&height=150&version=1.3&transparent=true&request=GetMap&layers="+layerName+"&format=image/png&bbox="+bbox;
			return thumImg;
		},		
		// --------------------------------------------------------------------------------------------
		// Retorna a URL para pegar a imagem PNG de uma camada 'layerName' do servidor 'serviceUrl'
		// Usa o BBOX atual da viewport do mapa
		getSceneryImagePreview : function ( layerName, serviceUrl, bbox) {
			var thumImg = serviceUrl + "/?service=WMS&srs=EPSG:4326&width=238&height=150&version=1.3&transparent=true&request=GetMap&layers="+layerName+"&format=image/png&bbox="+bbox;
			return thumImg;
		},		
		// --------------------------------------------------------------------------------------------
		//Retorna a URL para pegar a imagem PNG da legenda de uma camada 'layerName' do servidor 'serviceUrl'
		getLayerLegendImage : function ( layerName, serviceUrl ) {
			var url = serviceUrl + "/?service=WMS&version=1.3&request=GetLegendGraphic&format=image/png&layer=" + layerName;
			return url;
		},
		// --------------------------------------------------------------------------------------------
		// Liga / desliga ferramenta de consulta de camada
	    toggleQueryTool : function () {
			if ( !this.queryToolEnabled ) {
				this.bindMapToQueryTool() ;
				this.queryToolEnabled = true;
		 	} else {
		 		this.unbindMapClick();
		 		this.queryToolEnabled = false;
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
			var me = this;
			this.unbindMapClick();
			this.onClickBindKey = this.map.on('click', function(event) {
				me.getNearestRoads( event.coordinate, 'S' );
				MCLM.RouteHelper.putStartIcon( event.coordinate );
			});
		},
		// --------------------------------------------------------------------------------------------
		// Um clique no mapa seleciona o destino da rota
		bindMapToGetTargetAddress : function() {
			var me = this;
			this.unbindMapClick();
			this.onClickBindKey = this.map.on('click', function(event) {
				me.getNearestRoads( event.coordinate, 'T' );
				MCLM.RouteHelper.putEndIcon( event.coordinate );
			});
		},
		bindMapToInspectFeature : function() {
			var me = this;
			this.unbindMapClick();
			this.onClickBindKey = this.map.on('click', function(event) {
				var pixel = event.pixel;
				MCLM.RouteHelper.inspectFeature( pixel );
			});
			this.interrogatingFeatures = true;
		},
		// --------------------------------------------------------------------------------------------
		// Libera o click do mouse no mapa da ultima ferramenta ligada
		unbindMapClick : function () {
			if ( this.onClickBindKey ) {
				// Removido por ser especifico do OL3
				//this.map.unByKey( this.onClickBindKey );
				// Novo metodo do OL4:
				ol.Observable.unByKey( this.onClickBindKey );
			}
		},		
		// --------------------------------------------------------------------------------------------
		// Liga o click do mouse no mapa com o metodo de consulta de camada
		bindMapToQueryTool : function () {
			MCLM.Map.unbindMapClick();
			var me = this;
			this.onClickBindKey = this.map.on('click', function(event) {
				me.queryMap( event.coordinate );
			});
			
		}, 		
		// --------------------------------------------------------------------------------------------
		queryMap: function ( coordinate ) {
			var virgula = "";
			var layerNames = "";
			var content = [];
			var urlFeatureInfo = "";
			var viewResolution = this.theView.getResolution();	
			var projection = this.theView.getProjection();
			var queryFactorRadius = this.queryFactorRadius;
			var featureCount = this.featureCount;
			var me = this;
			this.map.getLayers().forEach( function (layer) {
				var layerName = layer.get("name");
				var baseLayer = layer.get("baseLayer");
				var found = false;
				
				var queryResultWindow = Ext.getCmp('queryResultWindow');
				if ( !queryResultWindow ) queryResultWindow = Ext.create('MCLM.view.paineis.QueryResultWindow');
				queryResultWindow.removeAll();
				
				
				if ( layerName && ( !baseLayer ) ) {
					try {
						urlFeatureInfo = layer.getSource().getGetFeatureInfoUrl(
							coordinate, viewResolution, projection,
					        {'buffer':queryFactorRadius, 'QUERY_LAYERS': layerName,  'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': featureCount} 
						);
						found = true;
						me.queryLayer( layerName, urlFeatureInfo );
					} catch ( err ) { me.queryLayerError("Erro ao interrogar camada", layerName);  }
				}				
				//if( !found ) {
				//	Ext.Msg.alert('Não é possível interrogar a camada de base','Não existem camadas a serem interrogadas.' );
				//}
			});
		},
		
		
		
		// --------------------------------------------------------------------------------------------
		// Interroga uma camada dada uma URL do tipo "REQUEST=GetFeatureInfo"
		queryLayer : function( layerName, urlFeatureInfo ) {
			
			var encodedUrl = encodeURIComponent( urlFeatureInfo );
			var me = this;
			Ext.Ajax.request({
		       url: 'queryLayer',
		       params: {
		           'targetUrl': encodedUrl,
		           'layerName' : layerName 
		       },       
		       success: function(response, opts) {
		    	  
		    	   var jsonObj = JSON.parse(response.responseText);
		    	   
		    	   var rawData = [];
		    	   for ( x=0; x<jsonObj.features.length;x++ ) {
		    		   rawData.push( jsonObj.features[x].properties );
		    	   }
		    	   
		    	   if ( rawData.length > 0 ) {
		    		  me.addGrid( layerName, rawData );
		    	   }

		       },
		       failure: function(response, opts) {
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
		            keys.push({text: key, dataIndex: key});
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
			    margin: "10 0 0 0", 
			    flex:1,
			    loadMask: true,
			    columns:columnNames,
			    autoHeight:true
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
			
			var storeColumns = this.getStoreColumnsFromJson( data[0] );   
			var gridColumns = this.getGridColumnsFromJson( data[0] );

			var store = this.createStore( data, storeColumns );
			var grid = this.createGrid( layerName, store, gridColumns );
			
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
			var me = this;
        	var dataLayer = node.get("dataLayer");
			var serialId = node.get('serialId' );

			var idDataLayer = dataLayer.idDataLayer;

			var	bbox = this.getMapCurrentBbox();

	    	Ext.Ajax.setTimeout(120000);
	    	
			Ext.Ajax.request({
				url: 'getAsFeatures',
				params: {
					'idDataLayer': idDataLayer,
					'bbox' : bbox
				},       
				success: function(response, opts) {
			    	MCLM.Functions.showMainLoadingIcon( 'Carregando Camada...');

					var respText = Ext.decode(response.responseText);
					var layer = me.createVectorLayerFromGeoJSON( respText, node );
		    	   
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
			return this.map.getLayers();
		},
		// --------------------------------------------------------------------------------------------
		// Posiciona o centro do mapa em uma coordenada e zoom. Usado pela carga do cenário
		panTo : function( center, zoom ) {
			var coord = center.split(",");
			var lat = Number( coord[0].trim() );
			var lon = Number( coord[1].trim() );
			var coordinate = ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
			
			this.theView.animate({
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
			
			this.createVectorLayerFromGeoJSON( jsonstr, node );			
		
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
		
		// --------------------------------------------------------------------------------------------
		// TESTE - APAGAR
		showLayers : function () {
			var layers = this.map.getLayers();
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
