Ext.define('MCLM.view.paineis.AbaCatalogo', {
	extend: 'Ext.container.Container',
	xtype: 'abaCatalogo',
	
	requires: [
        'MCLM.view.paineis.LayerDetail',
        'MCLM.view.paineis.LayerTree'
	],
	
    layout: {
        type: 'vbox',
        align: 'stretch'
    },	
	
    title: 'Catálogo',

    width: 300,
    minWidth: 100,
    maxWidth: 300,
    
	items: [{
		flex:5,
		xtype: 'view.layerTree'
	},{
		flex:1,
		xtype: 'view.layerDetail'
	}]
});
