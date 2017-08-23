Ext.define('MCLM.view.paineis.MapImageWindow', {
	extend: 'Ext.Window',
	
	id:'mapImageWindow',    	
	xtype: 'mapImageWindow',
	title : "Imagem do Mapa",
	width : 510,
	height: 332,
	resizable: false,
	border: true,
	bodyStyle:{"background-color":"white"},
	autoScroll: false,
	constrain: true,
	renderTo: Ext.getBody(),
	html : '',
});