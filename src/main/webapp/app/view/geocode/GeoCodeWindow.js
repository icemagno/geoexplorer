Ext.define('MCLM.view.geocode.GeoCodeWindow', {
	extend: 'Ext.Window',
	
	
	requires: [
	   'MCLM.view.geocode.GeoCodeController',
	   'MCLM.view.geocode.GeoCodeLeftPanel',
	   'MCLM.view.geocode.GeoCodeRightPanel',
	],
	  
	
	controller : 'geocode',
	
	id:'geocodeWindow',    	
	xtype: 'geocodeWindow',
	title : "GeoCode",
	width : 800,
	height: 450,
	
	layout:'border',
	constrain: true,
	renderTo: Ext.getBody(),
	
    items : [{
        xtype: 'geoCodeLeftPanel',
    },{
        xtype: 'geoCodeRightPanel',
    }],
    
    
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'add-external-icon',
        	id: 'id311',
            handler : 'getAddress'
        }]
    }],	    
    
});