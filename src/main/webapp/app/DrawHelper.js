Ext.define('MCLM.DrawHelper', {
	
	statics: {
		activeDrawableLayer: null,
		dirty : false,
		vectorSource : null,
		feicaoNome : null, 
		feicaoDescricao : null,
		draw : null,
		drawedFeature : [],
		feicaoTipo : null,
		feicaoIdEstilo : null,
		styleData : null,
		lastCoordinates : 0,
		feicaoDestinoId : null,
		feicaoDestino : null,
		
		finish : function() {
			if ( this.draw ) MCLM.Map.map.removeInteraction( this.draw );
			MCLM.Map.removeLayerByName('drawableLayer');
			this.drawedFeature = [];
			this.draw = null;
			this.vectorSource = null;
			this.activeDrawableLayer = null;
		},
		
		updateStyle : function( styleData ) {
			this.feicaoIdEstilo = styleData.idFeatureStyle;
			this.styleData = styleData;
			if ( this.vectorSource ) this.vectorSource.changed();
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
		
		init : function(feicaoNome, feicaoDescricao,idEstilo,feicaoDestinoId, feicaoDestino) {
			this.feicaoNome = feicaoNome;
			this.feicaoDescricao = feicaoDescricao;
			this.feicaoIdEstilo = idEstilo;
			this.feicaoDestinoId = feicaoDestinoId;
			this.feicaoDestino = feicaoDestino;
			this.dirty = false;
			
			this.vectorSource = new ol.source.Vector();
			var me = this;
			this.vectorSource.on('addfeature', function(evt){
				MCLM.Map.map.removeInteraction( me.draw );
			});				


			// ----------------------------------

			var getStyle = function( feature, resolution ) {
				var resultStyles = [];
				var featureGeomType = feature.getGeometry().getType();
				var props = feature.getProperties();
								
				// Circulo
	        	var hexColor = me.styleData.iconColor;
	        	var newColor = ol.color.asArray(hexColor);
	        	newColor = newColor.slice();
	        	newColor[3] = me.styleData.iconOpacity;	
				
				if ( featureGeomType == 'Circle' )  {
		    		  var pointStyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: newColor
							}),
							stroke: new ol.style.Stroke({
								color: me.styleData.iconColor,
								width: 2
							})
		    		  });	
		    		  resultStyles.push( pointStyle );					
				}
				
				// Ponto
				if ( featureGeomType == 'Point' ) {
					
		        	var hexColor = me.styleData.iconColor;
		        	var newColor = ol.color.asArray(hexColor);
		        	newColor = newColor.slice();
		        	newColor[3] = me.styleData.iconOpacity;						
					
					if ( me.styleData.iconSrc ) {
						// Se tiver icone (o caminho do icone) entao cria um estilo de icone
				    	var pointStyle = new ol.style.Style({
				    		  image: new ol.style.Icon(({
				    			    anchor: JSON.parse( me.styleData.iconAnchor ),
				    			    scale : me.styleData.iconScale,
				    			    anchorXUnits: me.styleData.iconAnchorXUnits,
				    			    anchorYUnits: me.styleData.iconAnchorYUnits,
				    			    opacity: me.styleData.iconOpacity,
				    			    color   : me.styleData.iconColor,
				    			    rotation: me.styleData.iconRotation,
				    			    src:  me.replacePattern(me.styleData.iconSrc, props)
				    		  }))
				    	});					
					
					} else {
		        	
						var pointStyle = new ol.style.Style({
							image: new ol.style.Circle({
								radius: me.styleData.iconScale,
								fill: new ol.style.Fill({
									color: newColor
								}),
								stroke: new ol.style.Stroke({
									color: me.styleData.iconColor,
									width: 2
								})
							})
						});
					}
					
					resultStyles.push( pointStyle );
				}

				// Linha
				try {
					if ( featureGeomType == 'LineString' || featureGeomType == 'Line' ) {
						var lineStyle = new ol.style.Style({
			    			  fill: new ol.style.Fill({
			    				  color: me.styleData.lineFillColor 
			    			  }),
			    			  stroke: new ol.style.Stroke({
			    				  color: me.styleData.lineStrokeColor,
			    				  width:  me.styleData.lineStrokeWidth,
			    				  lineDash: JSON.parse( me.styleData.lineLineDash ) 
			    			  })
								
						});	
						resultStyles.push( lineStyle );
					}
				} catch ( err ) {
		    		  
				}	 				
				
				// Poligono
				try {
			    	  if ( featureGeomType == 'MultiPolygon' || featureGeomType == 'Polygon' ) {
				        	var hexColor =  me.styleData.polygonFillColor;
				        	var newColor = ol.color.asArray(hexColor);
				        	newColor = newColor.slice();
				        	newColor[3] =  me.styleData.polygonFillOpacity;
				        	
				        	var polFill = newColor;
				        	
				        	var ptrHDist = me.styleData.ptrHDist;
				        	var ptrVDist = me.styleData.ptrVDist;
				        	var ptrLength = me.styleData.ptrLength;
				        	var ptrHeight = me.styleData.ptrHeight;
				        	var ptrWidth = me.styleData.ptrWidth;
				        	
				        	if ( ptrHDist && ptrVDist )
				        		polFill = MCLM.Functions.makePattern( newColor, ptrHDist, ptrVDist, ptrLength, ptrHeight, ptrWidth );
				        					        	
				        	
				        	
				        	
				        	var polygonStyle = new ol.style.Style({
								fill: new ol.style.Fill({
									color: polFill,
								}),
								stroke: new ol.style.Stroke({
									color:  me.styleData.polygonStrokeColor,
									width:  me.styleData.polygonStrokeWidth, 
									lineDash: JSON.parse(  me.styleData.polygonLineDash ), 
									strokeLinecap :  me.styleData.polygonStrokeLinecap,
								})
							});
				        	resultStyles.push( polygonStyle );
			    	  }
				} catch ( err ) {
		    		  
		    	}		
				
				
				// Texto
	        	var label = feature.getProperties().label;
	        	var font = me.styleData.textFont;
	        	
	        	if( label && font ) {
	        		
			        var featureText = new ol.style.Style({
			            text: new ol.style.Text({
			                text: label,
			                offsetY: me.styleData.textOffsetY,
			                offsetX: me.styleData.textOffsetX,
			                font: me.styleData.textFont,
			                scale : 1,
			                //rotateWithView : true/false,
			                //textAlign : '', // 'left', 'right', 'center', 'end' or 'start'. Default is 'start'.
			                //textBaseline : '', //  'bottom', 'top', 'middle', 'alphabetic', 'hanging', 'ideographic'. Default is 'alphabetic'.
			                stroke: new ol.style.Stroke({
			                	color: me.styleData.textStrokeColor,
			                	width: me.styleData.textStrokeWidth
			                }),				                
			                fill: new ol.style.Fill({
			                    color: me.styleData.textFillColor
			                }),
			            })
			        });		        	
		        	resultStyles.push( featureText );
	        	}				
				
				
				
				return resultStyles;
			}
			
			
			
			
			// ----------------------------------
			
			
			this.activeDrawableLayer = new ol.layer.Vector({
				source: this.vectorSource,
				style: getStyle
			});			
			
			
			this.activeDrawableLayer.set('name', 'drawableLayer');
			this.activeDrawableLayer.set('alias', 'drawableLayer');
			this.activeDrawableLayer.set('serialId', 'drawableLayer');
			this.activeDrawableLayer.set('baseLayer', false);
			this.activeDrawableLayer.set('ready', true);
			
			MCLM.Map.removeLayerByName('drawableLayer');
			MCLM.Map.map.addLayer( this.activeDrawableLayer );
		},
		// Seta o tipo de desenho
		setDrawType : function( type ) {
	        // "None", "Point", "LineString", "Polygon", "Circle", "Square", "Box"			
			this.addInteraction( type );
		},
		
		// Adiciona a interacao ao mapa
		addInteraction : function( value ) {
			this.feicaoTipo = value;
			var me = this;
			var geojson  = new ol.format.GeoJSON();
			if ( this.draw ) MCLM.Map.map.removeInteraction( this.draw );
			
			if (value !== 'None') {
				var geometryFunction, maxPoints;
				if (value === 'Square') {
					value = 'Circle';
					geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
				} else if (value === 'Box') {
					value = 'LineString';
					maxPoints = 2;
					geometryFunction = function(coordinates, geometry) {
						if (!geometry) {
							geometry = new ol.geom.Polygon(null);
						}
						var start = coordinates[0];
						var end = coordinates[1];
						geometry.setCoordinates([
						     [start, [start[0], end[1]], end, [end[0], start[1]], start]
						]);
						return geometry;
					};
				} 
				
				this.draw = new ol.interaction.Draw({
					source: this.vectorSource,
					type: value,
					geometryFunction: geometryFunction,
					maxPoints: maxPoints
				});
				
				this.draw.on('drawstart', function( evt ){
					me.vectorSource.clear();
				});
				
				this.draw.on('drawend', function( evt ){
					
				    me.drawedFeature =  evt.feature;
				    var geometry = me.drawedFeature.getGeometry();
				    
				    me.drawedFeature.set( 'feicaoDescricao', me.feicaoDescricao );
				    me.drawedFeature.set( 'label', me.feicaoNome );
				    me.drawedFeature.set( 'feicaoNome', me.feicaoNome );
				    me.drawedFeature.set( 'feicaoTipo', me.feicaoTipo );
				    me.drawedFeature.set( 'feicaoDestinoId', me.feicaoDestinoId );
				    
				    var center = 0; var radius = 0;
				    if ( me.feicaoTipo == 'Circle' ) {
				    	// center = ol.proj.transform( geometry.getCenter(), 'EPSG:3857', 'EPSG:4326' );
				    	center = geometry.getCenter();
					    radius = geometry.getRadius();
				    }

				    me.drawedFeature.set('circleCenter', center );
				    me.drawedFeature.set('circleRadius', radius );
				    
				});
				
				MCLM.Map.map.addInteraction( this.draw );
			}
		},
		
		getAsJson : function() {
			var geojson  = new ol.format.GeoJSON();
		    var features = this.vectorSource.getFeatures();
		    
		    var jsonData = geojson.writeFeatures( features,{
                //featureProjection: ol.proj.get('EPSG:3857'),
                //dataProjection: ol.proj.get('EPSG:4326')
            });
		    
		    return jsonData;
		}

		
	}

});