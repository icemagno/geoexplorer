Ext.define('MCLM.view.photo.PhotoHelper', {
	
	statics: {
		photoLayer : null,
		photoSource : null,
		
		clear : function() {
			MCLM.Map.removeLayerByName('photoLayer');
		},
		init : function() {
			var me = this;
			this.photoSource = new ol.source.Vector();
			
	    	// Estilo da foto
			var photoStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    stroke: new ol.style.Stroke({
                        color: '#fcaa0a',
                        width: 1
                    }),                    
                    fill: new ol.style.Fill({
                        color: '#ffc656',
                        opacity: 0.5
                    })
                })
			});
			
			this.photoLayer = new ol.layer.Vector({
				source: this.photoSource,
				style: photoStyle
			});	
			
			this.photoLayer.set('name', 'photoLayer');
			this.photoLayer.set('alias', 'photoLayer');
			this.photoLayer.set('serialId', 'photoLayer');
			this.photoLayer.set('baseLayer', false);
			this.photoLayer.set('ready', true);
			
			MCLM.Map.removeLayerByName('photoLayer');
			MCLM.Map.map.addLayer( this.photoLayer );
		},
		
	    viewPhoto : function( imageUrl ) {
	    	// https://d1cuyjsrcm0gby.cloudfront.net/<KEY>/thumb-320.jpg
	    	var photoWindow = Ext.getCmp('photoWindow');
	    	if ( !photoWindow ) {
	    		photoWindow = Ext.create('MCLM.view.rotas.PhotoWindow');
	    	}
	    	photoWindow.update("<img style='width:100%;height:100%' src='" + imageUrl + "'>");
	    	photoWindow.show();
	    	
	    },
	    
	    clearPhotos : function() {
	    	var features = this.photoSource.getFeatures();
	    	for ( x=0; x < features.length; x++ ) {
	    		var feature = features[x];
	   			this.photoSource.removeFeature( feature );
	    	}	    	
	    },

		getPhotosCloseTo : function( coordinate ) {
			coordinate = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')
			
			var me = this;
			var lon = coordinate[0];
			var lat = coordinate[1];
			var distance = 400;

			Ext.Ajax.request({
	            url: 'getPhotosCloseTo',
	            params: {
	                'lat': lat,
	                'lon': lon,
	                'distance': distance,
	                'minca': 0,
	                'maxca' : 360,
	                'maxresults' : 200,
	            },
	            failure: function (response, opts) {
	            	//
	            },
	            success: function (response, opts) {
	            	var respObj = Ext.decode(response.responseText);
	            	
	            	if ( respObj ) {

	            		for (var x=0; x<respObj.length;x++  ) {
	            			var lon = respObj[x].lon;
	            			var lat = respObj[x].lat;
	            			var key = respObj[x].key;
	            			
			    			var point = new ol.geom.Point( ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857') );
	 		    			var feature = new ol.Feature({
	 		    				geometry: point,
	 		    			});	            		

	 		    			feature.set("key", key);
	 		    			me.photoSource.addFeature( feature );
	            		}
	            	}
	            }
	        });
			
		}, 	    
		
	}

});