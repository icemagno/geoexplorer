Ext.define('MCLM.view.paineis.QueryResultWindow', {
	extend: 'Ext.Window',
	
	id:'queryResultWindow',    	
	xtype: 'queryResultWindow',
	title : "Dados das Camadas",
	width : 730,
	height: 520,
	bodyStyle:{"background-color":"white"},
	autoScroll: true,
	constrain: true,
	renderTo: Ext.getBody(),

});