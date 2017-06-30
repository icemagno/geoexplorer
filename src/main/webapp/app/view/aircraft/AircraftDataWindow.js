Ext.define('MCLM.view.aircraft.AircraftDataWindow', {
	extend: 'Ext.Window',
	id:'aircraftDataWindow',    	
	xtype: 'aircraftDataWindow',
	title : "Dados da Aeronave",
	width : 550,
	height: 530,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

	html : '',
    
});