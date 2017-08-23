Ext.define('MCLM.view.tools.RestToolsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.restToolsController',
    
    toggleAeroTraffic : function() {
    	MCLM.Map.toggleAeroTraffic();
    },
    
    updateMaritmTraffic : function() {
    	MCLM.Map.toggleShipTraffic();
    },

    showStreetPhoto : function() {
    	MCLM.Map.toggleStreetPhoto();
    },
    
	toggleSeaMapLayer : function( button ) {
		MCLM.Map.toggleSeaMapLayer();
	},
	
	shoMarineTraffic : function( button ) {
		var center = MCLM.Map.map.getView().getCenter();
		var mapZoom = MCLM.Map.map.getView().getZoom();
		
		var center2 = center;
		//var center2 = ol.proj.transform([center[0], center[1]], 'EPSG:3857', 'EPSG:4326');
		
		var mapCenterLong = center2[0];
		var mapCenterLat = center2[1];
		var url = "https://www.marinetraffic.com/en/ais/embed/zoom:" + mapZoom + "/centery:"+mapCenterLat+"/centerx:"+mapCenterLong+"/maptype:4/shownames:true/mmsi:0/shipid:0/fleet:/fleet_id:/vtypes:/showmenu:false/remember:false";
		
		var frame = "<iframe scrolling='no' style='overflow:hidden;border:0px; width:100%;height:100%' src='"+url+"'></iframe>";
		
		var mTWindow = Ext.getCmp('mTWindow');
		if ( !mTWindow ) {
			mTWindow = Ext.create('MCLM.view.marinetraffic.MTWindow');
		}
		
		mTWindow.update( frame );
		mTWindow.show();
		
		
	}

    
});