Ext.define('MCLM.view.addlayer.kml.UploadKmlWindow', {
	extend: 'Ext.Window',
	xtype : 'view.uploadKmlWindow',
	id : 'uploadKmlWindow',

    requires: [
        'MCLM.view.addlayer.kml.UploadKmlController',
        'MCLM.view.addlayer.kml.UploadKmlForm',
	],	    
    controller : 'uploadKml',	
	
	width : 500,
	height: 250,
    scrollable: false,
    frame : false,
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.uploadKmlForm'
	}],
	
	
});
