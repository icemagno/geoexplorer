Ext.define('MCLM.view.stack.LayerStack', {
	extend: 'Ext.Window',
	xtype: 'view.layerStack',
	id: 'layerStack',
	
    requires: [
       'MCLM.view.stack.LayerStackController',
       'MCLM.view.stack.DetailPanel',
       'MCLM.view.stack.LayerControl'
	],		
	controller : 'stack',
	
	title : "Camadas Ativas",
	width : 750,
	height: 400,
	layout : 'border',
	constrain: true,
	renderTo: Ext.getBody(),
	
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Atualizar',
            handler : 'mountImagePreview'
        },{
            text: 'Ver Legenda',
            handler : 'showLegend'
        }]
    }],		
	
	items: [{
		xtype: 'detailPanel'
	},{
		xtype: 'layerControl'
	}]
	
});