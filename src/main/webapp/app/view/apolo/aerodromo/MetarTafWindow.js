Ext.define('MCLM.view.apolo.aerodromo.MetarTafWindow', {
	extend: 'Ext.Window',
	
	id:'metarTafWindow',    	
	xtype: 'metarTafWindow',
	title : "Dados de METAR/TAF",
	width : 650,
	height: 500,
	bodyStyle:{"background-color":"white"},
	constrain: true,
	renderTo: Ext.getBody(),
	resizable: false,
	autoScroll:true,
	html : '',
	
});