Ext.define('MCLM.view.datawindow.CloneToCenarioWindow', {
	extend: 'Ext.Window',
	xtype : 'view.cloneToCenarioWindow',
	id : 'cloneToCenarioWindow',
	title : "Copiar para o Cenário",
	bodyPadding: 10,
	
	width : 400,
	height: 200,
	
    requires: [
        'MCLM.view.datawindow.CloneToCenarioController',
	],	
    controller : 'cloneToCenario',	

    scrollable: false,
    frame : false,
    
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),
    
	feicao : null,
	resizable: false,
	

    items : [{
			xtype: 'combobox',
			editable : false,
			name: 'idFeicaoStyle',
			width: 350,
			fieldLabel: 'Estilo',
			displayField: 'featureStyleName',	    	
			id: 'idFeicaoStyle',
			store: 'store.styles',	    	
		    forceSelection: true,
		    allowBlank: false,
		    valueField: 'idFeatureStyle',
		    matchFieldWidth: false,
		    listeners : {
		    	select : function( ele, rec, idx ) {
		    		Ext.getCmp('doCloneBtn').enable();
		    	}
		    } 
    	},{
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
	    }],	
	
	
    dockedItems: [{
        xtype: 'toolbar',
        border: false,
        items: [{
        	iconCls: 'save-icon',
        	id: 'doCloneBtn',
            handler : 'doClone',
            disabled : true	
        }]
    }],
	

    listeners: {
		close : function() {
		 	 Ext.tip.QuickTipManager.unregister('doCloneBtn');
		},
		
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'doCloneBtn',
		        title: 'Salvar',
		        text: 'Salva o elemento com o estilo selecionado.',
		        width: 190,
		        dismissDelay: 5000 
		    });
		    
		}
    }


});
