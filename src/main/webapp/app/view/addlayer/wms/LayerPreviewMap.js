Ext.define('MCLM.view.addlayer.wms.LayerPreviewMap', {
	extend: 'Ext.panel.Panel',
	xtype: 'view.layerPreviewMap',
	id: 'layerPreviewMap',
	width : 350,
	region: 'center',
	

    frame: false,
    margin: "0 0 0 0",		
	
	html: '<div style="width: 100%;height: 100%;" id="previewLayerMap"></div>'
});	