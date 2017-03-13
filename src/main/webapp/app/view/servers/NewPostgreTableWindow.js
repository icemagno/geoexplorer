Ext.define('MCLM.view.servers.NewPostgreTableWindow', {
	extend: 'Ext.Window',
	xtype : 'newPostgreTableWindow',
	id : 'newPostgreTableWindow',
	title : '',
	width : 380,
	height: 250,
    scrollable: false,
    modal:true,
	requires: [
	    'MCLM.view.servers.NewPostgreTableForm',
	    'MCLM.view.servers.NewPostgreTableController',
	], 
    controller : 'newPostgreTableController',
	
    frame : false,
	layout : 'fit',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
    items : [{
        xtype: 'newPostgreTableForm',
    }],
});
	