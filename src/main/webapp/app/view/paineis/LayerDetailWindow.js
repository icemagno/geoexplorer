Ext.define('MCLM.view.paineis.LayerDetailWindow', {
	extend: 'Ext.Window',
	
	id:'layerDetailWindow',    	
	xtype: 'layerDetailWindow',
	title : "Propriedades da camada",
	width : 400,
	height: 320,
	bodyStyle:{"background-color":"white"},
	autoScroll: true,
	constrain: true,
	renderTo: Ext.getBody(),

	html : '',
	
});