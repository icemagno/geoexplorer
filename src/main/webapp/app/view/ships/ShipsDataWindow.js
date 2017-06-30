Ext.define('MCLM.view.ships.ShipsDataWindow', {
	extend: 'Ext.Window',
	id:'shipsDataWindow',    	
	xtype: 'shipsDataWindow',
	title : "Dados do Navio",
	width : 550,
	height: 530,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

	html : '',
    
});