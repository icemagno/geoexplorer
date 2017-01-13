Ext.define('MCLM.view.addfolder.NewFolderWindow', {
	extend: 'Ext.Window',
	xtype : 'view.newFolderWindow',
	id : 'newFolderWindow',

    requires: [
        'MCLM.view.addfolder.NewFolderController',
        'MCLM.view.addfolder.NewFolderForm',
	],	    
    controller : 'newFolder',	
	
	width : 500,
	height: 250,
    scrollable: false,
    frame : false,
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.newFolderForm'
	}],
	
	
});
