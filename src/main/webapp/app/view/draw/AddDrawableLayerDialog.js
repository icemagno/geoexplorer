Ext.define('MCLM.view.draw.AddDrawableLayerDialog', {
	extend: 'Ext.Window',
	xtype : 'view.addDrawableLayer',
	id : 'addDrawableLayer',
	title:'Criar Feição',
	bodyPadding: 10,
	
	width : 390,
	height: 200,
	
    requires: [
        'MCLM.view.draw.DrawToolBarController',
	],
    controller : 'drawToolBar',		

    scrollable: false,
    frame : false,
   
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	
    items : [{
    	xtype : 'textfield',
        fieldLabel: 'Nome da Feição',
        width: 350,
        id: 'feicaoNome',
        allowBlank : false,
    },{
    	xtype : 'textareafield',
        fieldLabel: 'Descrição',
        width: 350,
        id: 'feicaoDescricao',
        allowBlank : false,
    },{
		xtype:'combobox',
		fieldLabel:'Tipo',
		name:'feicaoDestino',
		id:'feicaoDestino',
		valueField: 'id',
	    forceSelection: true,
	    allowBlank: false,
	    editable : false,
		queryMode:'local',
		value : 'NE',
		width: 350,
		matchFieldWidth: false,
		store : Ext.create('Ext.data.Store', {
	        fields: ['id', 'name'],
	        data : [
	            {"id":"AN.A", "name":"Áreas Notáveis - Agrícolas"},
	            {"id":"AN.E", "name":"Áreas Notáveis - Endemias"},
	            {"id":"AN.I", "name":"Áreas Notáveis - Interesse"},
	            {"id":"AN.IB", "name":"Áreas Notáveis - Insumos Biocombustíveis"},
	            {"id":"AN.PP", "name":"Áreas Notáveis - Produção Pecuária"},
	            {"id":"OC", "name":"Operações Conjuntas"},
	            {"id":"CE", "name":"Cenário"},
	            {"id":"NE", "name":"Nenhum"},
	        ],
		    proxy: { type: 'memory' }
		}),
		displayField:'name',
    }],
    
    buttons: [{
        text: 'Fechar',
        handler: 'closeAddDrawableLayer'
  	},{
        text: 'Criar',
        handler : 'submitAddDrawableLayer'
  	}],
  	
  	listeners : {
  		//
  	}
	
	
});