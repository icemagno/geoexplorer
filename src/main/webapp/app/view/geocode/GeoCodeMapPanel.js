Ext.define('MCLM.view.geocode.GeoCodeMapPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'geoCodeMapPanel',
	id: 'geoCodeMapPanel',
	
	region: 'north',
	
	height: 400,
	
	border : false,
    frame: false,
    margin: "0",		
	
	html: '<div style="width: 100%;height: 100%;" id="geocodeMap"></div><div class="alert-icon" id="alert_geocode" style="position:absolute;top:5px;right:5px"><img style="width:27px;height:27px;" src="img/loading.gif"></div>'
});	