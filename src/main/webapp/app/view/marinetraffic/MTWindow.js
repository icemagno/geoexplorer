Ext.define('MCLM.view.marinetraffic.MTWindow', {
	
	extend: 'Ext.Window',
	
	id:'mTWindow',    	
	xtype: 'mTWindow',
	title : "Tráfego Marítimo",
	width : 600,
	height: 500,
	bodyStyle:"background:#FFFFFF;",
	resizable: true,
	constrain: true,
	renderTo: Ext.getBody(),

	html : '',
    
});