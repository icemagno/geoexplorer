Ext.define('MCLM.view.dicionario.DictWindow', {
	extend: 'Ext.Window',
	
	requires: [
	   'MCLM.view.dicionario.DictController',
	   'MCLM.view.dicionario.DictGrid'
	],
	  
	
	controller : 'dictionary',
	
	id:'dictWindow',    	
	xtype: 'dictWindow',
	title : "Dicionário de Dados",
	width : 550,
	height: 550,
	
	layout : 'fit',
	constrain: true,
	renderTo: Ext.getBody(),
	
    items : [{
        xtype: 'dictGrid',
    }]
    
});