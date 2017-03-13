Ext.define('MCLM.view.rotas.FeatDetailWindow', {
	extend: 'Ext.Window',
	xtype : 'view.featDetailWindow',
	id : 'featDetailWindow',
	title: 'Detalhes',

	width : 400,
	height: 390,
	
	minWidth : 300, 
	minHeight : 200,
	
    scrollable: true,
    frame : false,
    altoScroll : true,
    
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),

	html : '<table style="margin:0px;padding:0px;" id="poiDetails"><tbody></tbody></table>',
	
});
