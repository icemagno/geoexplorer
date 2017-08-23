Ext.define('MCLM.view.trabalho.TextBoxWindow', {
	extend: 'Ext.Window',
	id:'textBoxWindow',    	
	xtype: 'textBoxWindow',
	title : "Caixa de Texto",
	width : 400,
	height: 170,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

	boxCenter : null,
	
	requires: [
	   'MCLM.view.trabalho.TrabalhoTreeController',
	   'MCLM.view.trabalho.TextBoxForm'
	],     
	controller : 'trabalho',	
	
	items: [{
		xtype: 'textBoxForm'
	}]		
	
	
    
});