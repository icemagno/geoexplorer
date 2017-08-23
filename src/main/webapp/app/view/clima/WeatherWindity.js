Ext.define('MCLM.view.clima.WeatherWindity', {
	
	extend: 'Ext.Window',
	
	id:'weatherWindity',    	
	xtype: 'weatherWindity',
	title : "Windy Forecast",
	width : 600,
	height: 550,
	bodyStyle:"background:#FFFFFF;padding:2px;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

	autoScroll : true,
	
	html : ''
    
});