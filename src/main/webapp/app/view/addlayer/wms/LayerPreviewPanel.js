Ext.define('MCLM.view.addlayer.wms.LayerPreviewPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'view.layerPreviewPanel',
	width : 350,
	region: 'east',
    requires: [
       'MCLM.view.addlayer.wms.LayerPreviewMap',
       'MCLM.view.addlayer.wms.LayerDetailForm',
	],	    
          
	border: false,
    frame: false,
    margin: "0 0 0 0",	
	layout:'border',
	items: [{
		xtype: 'view.layerPreviewMap'
	},{
		xtype: 'view.layerDetailForm'
	}]	

});		
