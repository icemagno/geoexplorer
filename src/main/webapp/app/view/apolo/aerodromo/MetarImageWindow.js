Ext.define('MCLM.view.apolo.aerodromo.MetarImageWindow', {
	extend: 'Ext.Window',
	
	id:'metarImageWindow',    	
	xtype: 'metarImageWindow',
	title : "Dados de METAR",
	width : 430,
	height: 550,
	bodyStyle:{"background-color":"white"},
	constrain: true,
	renderTo: Ext.getBody(),
	resizable: false,
	html : '',
	
});