Ext.define('MCLM.view.clima.WeatherCoordinateWindow', {
	
	extend: 'Ext.Window',
	
	id:'weatherCoordinateWindow',    	
	xtype: 'weatherCoordinateWindow',
	title : "Previsão Para Município",
	width : 450,
	height: 450,
	bodyStyle:"background:#FFFFFF;padding:2px;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

	autoScroll : true,
	
	html : ''
    
});