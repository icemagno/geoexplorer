Ext.define('MCLM.view.style.StyleEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.styleEditor',

    previewMap : null,
    
    init : function(app) {
    	
    	
        this.control({

        	'#styleEditorTC': { 
        		afterrender: function(){
        			this.previewMapToDiv();
        		}
        	},
        	
        	
        	// O change de todos os campos do form vão passar por aqui
            "#styleEditorForm textfield":{
                change: this.handleOnChange
            },
            "#styleEditorForm combobox":{
                change: this.handleOnChange
            },
            
            
            '#styleEditorFormSubmit' : {
            	click: this.submitForm 
            },
            '#closeStyleEditorWindow' : {
            	click: this.closeWindow 
            },

            
        })
    },
    
    handleOnChange:function(textfield,newValue,oldValue){
        this.updatePreviewMap();
	},    
    
    closeWindow : function() {
    	var styleEditorWindow = Ext.getCmp('styleEditorWindow');
    	styleEditorWindow.close();
    },
    
    submitForm : function( ) {
    	var me = this;
    	
		var styleEditorForm = Ext.getCmp('styleEditorForm');
		var form = styleEditorForm.getForm();        
        
        if( form.isValid() ){
            
        	form.submit({
                url: 'newFeatureStyle',
                success: function( form, action ) {
                	
                	var stylesStore = Ext.getStore('store.styles');
                	stylesStore.load();                	
                	
			  		me.closeWindow();
                	Ext.Msg.alert('Sucesso', 'As alterações terão efeito quando você recarregar as camadas que utilizam este estilo.');
                },
              	failure: function(form, action) {
              		me.closeWindow();
              		Ext.Msg.alert('Falha', action.result.msg);
                       
              	} 
            });
        	
        }
    },
    updatePreviewMap : function() {
    	
	      var geojsonObject = {
	    	        'type': 'FeatureCollection',
	    	        'crs': {
	    	          'type': 'name',
	    	          'properties': {
	    	            'name': 'EPSG:3857'
	    	          }
	    	        },
	    	        'features': [{
	    	          'type': 'Feature',
	    	          'geometry': {
	    	            'type': 'Polygon',
	    	            'coordinates': [[[-5e6, 6e6], [-5e6, 8e6], [-3e6, 8e6],
	    	                [-3e6, 6e6], [-5e6, 6e6]]]
	    	          }
	    	        }, {
	    	          'type': 'Feature',
	    	          'geometry': {
	    	            'type': 'LineString',
	    	            'coordinates': [[-2e6, 6e6], [-2e6, 8e6], [0, 8e6], [0, 6e6], [-2e6, 6e6]]
	    	          }
	    	        }, {
	    	          'type': 'Feature',
	    	          'geometry': {
	    	            'type': 'Point',
	    	            'coordinates': [2e6, 7e6]
	    	          }
	    	        }]
	      };

	      var customStyleFunction = function( feature, resolution ) {
	    	  var resultStyles = [];
	    	  var featureGeomType = feature.getGeometry().getType();
		    	  
 
	    	  try {
		    	  if ( featureGeomType == 'Point' ) {
						
			        	var hexColor = Ext.getCmp("iconColor").getValue();
			        	var newColor = ol.color.asArray(hexColor);
			        	newColor = newColor.slice();
			        	newColor[3] = Ext.getCmp("iconOpacity").getValue();					
						
						if ( Ext.getCmp("iconSrc").getValue() ) {
							// Se tiver icone (o caminho do icone) entao cria um estilo de icone
					    	var pointStyle = new ol.style.Style({
					    		  image: new ol.style.Icon(({
					    			    anchor: JSON.parse( Ext.getCmp("iconAnchor").getValue() ),
					    			    scale : Ext.getCmp("iconScale").getValue(),
					    			    anchorXUnits: Ext.getCmp("iconAnchorXUnits").getValue(),
					    			    anchorYUnits: Ext.getCmp("iconAnchorYUnits").getValue(),
					    			    opacity: Ext.getCmp("iconOpacity").getValue(),
					    			    color   : Ext.getCmp("iconColor").getValue(),
					    			    rotation:  Ext.getCmp("iconRotation").getValue(),
					    			    src:  Ext.getCmp("iconSrc").getValue()
					    		  }))
					    	});
					    	
						} else {
							// Se nao, cria um circulo
					    	var pointStyle = new ol.style.Style({
					    		  image: new ol.style.Circle({
						                radius: Ext.getCmp("iconScale").getValue(),
						                fill: new ol.style.Fill({
						                    color: newColor
						                }),
						                stroke: new ol.style.Stroke({
						                    color: Ext.getCmp("iconColor").getValue(),
						                    width: 2
						                })
					    		  })
					    	});
							
							
							
						}
						resultStyles.push( pointStyle );
		    	  }		    	  

	    	  } catch ( err ) {
	    		  
	    	  }
		    	  
	    	  try {
		    	  if ( featureGeomType == 'LineString' || featureGeomType == 'Line' ) {
		    		  var lineStyle = new ol.style.Style({
		    			  fill: new ol.style.Fill({
		    				  color: Ext.getCmp("lineFillColor").getValue() 
		    			  }),
		    			  stroke: new ol.style.Stroke({
		    				  color: Ext.getCmp("lineStrokeColor").getValue(),
		    				  width:  Ext.getCmp("lineStrokeWidth").getValue(),
		    				  lineDash: JSON.parse( Ext.getCmp("lineLineDash").getValue() ) 
		    			  })
							
		    		  });	
		    		  resultStyles.push( lineStyle );
		    	  }
	    	  } catch ( err ) {
	    		  
	    	  }	 
	    	  

	    	  try {
		    	  if ( featureGeomType == 'MultiPolygon' || featureGeomType == 'Polygon' ) {
			        	var hexColor = Ext.getCmp("polygonFillColor").getValue();
			        	var newColor = ol.color.asArray(hexColor);
			        	newColor = newColor.slice();
			        	newColor[3] = Ext.getCmp("polygonFillOpacity").getValue();
			        	
			        	var polFill = newColor;
			        	
			        	
			        	var ptrHDist = Ext.getCmp("ptrHDist").getValue();
			        	var ptrVDist = Ext.getCmp("ptrVDist").getValue();
			        	var ptrLength = Ext.getCmp("ptrLength").getValue();
			        	var ptrHeight = Ext.getCmp("ptrHeight").getValue();
			        	var ptrWidth = Ext.getCmp("ptrWidth").getValue();
			        	
			        	if ( ptrHDist && ptrVDist ) {
			        		polFill = MCLM.Functions.makePattern( newColor, ptrHDist, ptrVDist, ptrLength, ptrHeight, ptrWidth );
			        	}
			        	
			        	var polygonStyle = new ol.style.Style({
							fill: new ol.style.Fill({
								color: polFill,
							}),
							stroke: new ol.style.Stroke({
								color: Ext.getCmp("polygonStrokeColor").getValue(),
								width: Ext.getCmp("polygonStrokeWidth").getValue(), 
								lineDash: JSON.parse( Ext.getCmp("polygonLineDash").getValue() ), 
								strokeLinecap : Ext.getCmp("polygonStrokeLinecap").getValue(),
							})
						});
			        	resultStyles.push( polygonStyle );
		    	  }
	    	  } catch ( err ) {
	    		  console.log( err );
	    	  }
	    	  
	    	  if ( Ext.getCmp("textFont").getValue() ) {
		    	  var featureText = new ol.style.Style({
			            text: new ol.style.Text({
			                text: 'Texto de Exemplo',
			                offsetY: Ext.getCmp("textOffsetY").getValue(),
			                offsetX: Ext.getCmp("textOffsetX").getValue(),		                
			                font: Ext.getCmp("textFont").getValue(),
			                scale : 1,
			                fill: new ol.style.Fill({
			                    color: Ext.getCmp("textFillColor").getValue()
			                }),
			                stroke: new ol.style.Stroke({
			                	color: Ext.getCmp("textStrokeColor").getValue(),
			                	width: Ext.getCmp("textStrokeWidth").getValue()
			                })			                
			            })
		    	  });		        	
		    	  resultStyles.push( featureText );
	    	  } 
	    	  
	    	  
	    	  return resultStyles;
	      }

		      
	      var source = new ol.source.Vector({
	    	  features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
	      });    	
		      
	      var layer = new ol.layer.Vector({
		        source: source,
		        style: customStyleFunction
	      });
	      

	      var theMap = this.previewMap; 
	      theMap.getLayers().forEach( function ( layer ) {
	    	  theMap.removeLayer( layer );	
	      });
	      
	      this.previewMap.addLayer( layer );
	      
    },
	// --------------------------------------------------------------------------------------------
	// Renderiza um mapa em uma DIV qualquer (o preview de estilos por enquanto)
	previewMapToDiv : function( ) {
		
		
	      this.previewMap = new ol.Map({
	    	  layers: [  ],
	    	  target: 'stylePreviewMapID',
	    	  renderer: 'canvas',
	    	  loadTilesWhileAnimating: true,
	    	  view: new ol.View({
	              center: [-1056665.479014276,6874440.089719017],
	              zoom: 2
	          })
	      });	
		
	      
	},
    
    
    
    
});