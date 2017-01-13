Ext.define('MCLM.view.addlayer.tif.UploadTifWindow', {
	extend: 'Ext.Window',
	xtype : 'view.uploadTifWindow',
	id : 'uploadTifWindow',

    requires: [
        'MCLM.view.addlayer.tif.UploadTifController',
        'MCLM.view.addlayer.tif.UploadTifForm',
	],	    
    controller : 'uploadTif',	
	
	width : 500,
	height: 250,
    scrollable: false,
    frame : false,
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.uploadTifForm'
	}],
	
	
});
