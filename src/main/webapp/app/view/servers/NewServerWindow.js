Ext.define('MCLM.view.servers.NewServerWindow', {
	extend: 'Ext.Window',
	xtype : 'newServerWindow',
	id : 'newServerWindow',
	title : "Nova Fonte Externa (Geoserver)",
	width : 380,
	height: 220,
    scrollable: false,
    modal:true,
	requires: [
	    'MCLM.view.servers.NewServerForm',
	    'MCLM.view.servers.NewServerController',
	], 
    controller : 'newServerController',
	
    frame : false,
	layout : 'fit',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
    items : [{
        xtype: 'newServerForm',
    }],
});
	