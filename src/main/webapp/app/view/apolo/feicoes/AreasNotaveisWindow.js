Ext.define('MCLM.view.apolo.feicoes.AreasNotaveisWindow', {
	extend: 'Ext.Window',
	
    requires: [
         'MCLM.view.apolo.feicoes.AreasNotaveisController',
         'MCLM.view.apolo.feicoes.AreasNotaveisForm',
    ],
    controller : 'areasNotaveis',		
	
	id:'anWindow',    	
	xtype: 'anWindow',
	title : "Áreas Notáveis",
	width : 750,
	height: 450,
	
	resizable : false,
	
	layout : 'fit',
	constrain: true,
	renderTo: Ext.getBody(),
	
	
    items: [{
    	xtype: 'view.areasNotaveisForm'
    }],
	
	
    buttons: [{
		  // Interceptado pelo controller 'MCLM.view.apolo.feicoes.AreasNotaveisController'	
	      text: 'Fechar',
	      handler: 'closeAnWindow'
	},{
			  // Interceptado pelo controller 'MCLM.view.apolo.feicoes.AreasNotaveisController'	
	      text: 'Gravar Feição',
	      handler: 'submitAn'
	}],	
    
});