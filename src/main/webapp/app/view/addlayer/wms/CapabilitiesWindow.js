Ext.define('MCLM.view.addlayer.wms.CapabilitiesWindow', {
	extend: 'Ext.Window',
	xtype : 'view.capabilitiesWindow',
	id : 'capabilitiesWindow',
	width : 900,
	height: 500,
    scrollable: false,
    frame : false,
    modal : true,
    requires: [
       'MCLM.view.addlayer.wms.CapabilitiesGrid',
       'MCLM.view.addlayer.wms.LayerPreviewPanel',
       'MCLM.view.addlayer.wms.ServersCombo',
       'MCLM.view.addlayer.wms.CapabilitiesController',
       
	],	    
	controller : 'capabilities',
	
	
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
    dockedItems: [{
        xtype: 'toolbar',
        items: [ {
    		xtype: 'serversCombo'
        }]
    }],
    
	items: [{
		xtype: 'capabilitiesGrid'
	},{
		xtype: 'view.layerPreviewPanel'
	}],
	
	listeners:{
        afterrender:'afterrenderWindow',
        close : function() {
        	MCLM.Globals.mapLayerPreview = null;
        }
        
	} 	
	
});
