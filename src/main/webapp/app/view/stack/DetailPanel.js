Ext.define('MCLM.view.stack.DetailPanel', {
	extend: 'Ext.Panel',
	xtype: 'detailPanel',
	region: 'center',
	requires: [
           'Ext.layout.container.VBox',
           'MCLM.view.stack.BaseLayerDetailPanel',
           'MCLM.view.stack.GridPanel',
    ],
    layout: {
       type: 'vbox',
       pack: 'start',
       align: 'stretch'
    },
    
	items: [{
		xtype: 'baseLayerDetailPanel'
	},{
		xtype: 'gridPanel'
	}]    
    
});