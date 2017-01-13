Ext.define('MCLM.view.stack.LayerControl', {
	extend: 'Ext.Panel',
	region : 'east',
	xtype: 'layerControl',
    requires: [
       'MCLM.view.stack.MiniImage',
       'MCLM.view.stack.Slider'
	],		
	width : 250,
	border:false,
	frame: true,
	items: [{
		xtype: 'layerMiniImage'
	},{
		xtype: 'slider'
	}]  	
});