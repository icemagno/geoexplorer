Ext.define('MCLM.view.datawindow.ConfigDataWindow', {
	extend: 'Ext.Window',
	xtype : 'view.configDataWindow',
	id : 'configDataWindow',
	title : "Configurar / Criar Janela de Dados",
	bodyPadding: 10,
	
	width : 400,
	height: 350,
	
    requires: [
        'MCLM.view.datawindow.ConfigDataWindowController',
	],	
    controller : 'configDataWindow',	

    scrollable: false,
    frame : false,
    
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),
    
	nodeData : null,
	resizable: false,
	

    items : [{
    	xtype : 'textfield',
        fieldLabel: 'Nome da Janela',
        width: 350,
        id: 'dataWindowName',
        allowBlank : false,
    },{
    	xtype : 'textfield',
        fieldLabel: 'Tabela de Aquisição',
        width: 350,
        id: 'tableName',
        allowBlank : false,
        value : 'servicos.view_org_mil',
	},{
    	xtype : 'textfield',
        fieldLabel: 'Endereço do Servidor',
        width: 350,
        id: 'serverAddress',
        allowBlank : false,
        value : '10.5.115.21',
	},{
    	xtype : 'textfield',
        fieldLabel: 'Nome do Banco de Dados',
        width: 350,
        id: 'databaseName',
        allowBlank : false,
        value : 'siglmd',
	},{
    	xtype : 'textfield',
        fieldLabel: 'Usuário do Banco de Dados',
        width: 350,
        id: 'user',
        allowBlank : false,
        value : 'geoserver',
        
	},{
    	xtype : 'textfield',
        fieldLabel: 'Senha do Banco de Dados',
        width: 350,
        id: 'password',
        allowBlank : false,
        value : 'G305erV31',
        inputType: 'password'
	},{
    	xtype : 'textfield',
        fieldLabel: 'Porta do Banco de Dados',
        width: 350,
        id: 'serverPort',
        allowBlank : false,
        value : '5432',
	}],	
	
    dockedItems: [{
        xtype: 'toolbar',
        border: false,
        items: [{
        	iconCls: 'next-icon',
        	id: 'getTableSchemaBtn',
            handler : 'getTableSchema',
        }]
    }],
	

    listeners: {
		close : function() {
		 	 Ext.tip.QuickTipManager.unregister('getTableSchemaBtn');
		},
		
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'getTableSchemaBtn',
		        title: 'Solicitar Esquema',
		        text: 'Solicita o esquema da Tabela de Aquisição de Dados.',
		        width: 190,
		        dismissDelay: 5000 
		    });
		    
		}
    }


});
