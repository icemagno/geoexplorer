Ext.define('MCLM.view.geocode.GeoCodeLeftPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'geoCodeLeftPanel',
	id: 'geoCodeLeftPanel',
	
	region: 'center',
	layout:'border',
	
	requires: [
	   'MCLM.view.geocode.GeoCodePanel',
	   'MCLM.view.geocode.GeoCodeMapPanel',
	],  	
	
	border: false,
    frame: false,
    
    flex : 2,

    items : [{
        xtype: 'geoCodeMapPanel',
    },{
        xtype: 'geoCodePanel',
    }],

	

});		
