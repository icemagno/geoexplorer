Ext.define('MCLM.view.servers.NewPostgreWindow', {
	extend: 'Ext.Window',
	xtype : 'newPostgreWindow',
	id : 'newPostgreWindow',
	title : "Nova Fonte Externa (Database)",
	width : 380,
	height: 250,
    scrollable: false,
    modal:true,
	requires: [
	    'MCLM.view.servers.NewPostgreForm',
	    'MCLM.view.servers.NewPostgreController',
	], 
    controller : 'newPostgreController',
	
    frame : false,
	layout : 'fit',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
    items : [{
        xtype: 'newPostgreForm',
    }],
});
	