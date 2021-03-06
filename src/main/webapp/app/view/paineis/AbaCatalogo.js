Ext.define('MCLM.view.paineis.AbaCatalogo', {
	extend: 'Ext.container.Container',
	xtype: 'abaCatalogo',
	
	requires: [
        'MCLM.view.paineis.LayerTree'
	],
	
    layout: {
        type: 'vbox',
        align: 'stretch'
    },	
	
    title: 'Camadas',

    width: 300,
    minWidth: 100,
    maxWidth: 300,
    
	items: [{
		flex:5,
		xtype: 'view.layerTree'
	}]
});
