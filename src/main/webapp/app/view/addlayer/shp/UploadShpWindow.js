Ext.define('MCLM.view.addlayer.shp.UploadShpWindow', {
	extend: 'Ext.Window',
	xtype : 'view.uploadShpWindow',
	id : 'uploadShpWindow',

    requires: [
        'MCLM.view.addlayer.shp.UploadShpController',
        'MCLM.view.addlayer.shp.UploadShpForm',
	],	    
    controller : 'uploadShp',	
    modal : true,	
	width : 500,
	height: 250,
    scrollable: false,
    frame : false,
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.uploadShpForm'
	}],
	
	
});
