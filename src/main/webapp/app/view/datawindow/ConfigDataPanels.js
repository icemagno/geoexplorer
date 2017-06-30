Ext.define('MCLM.view.datawindow.ConfigDataPanels', {
	extend: 'Ext.Window',
	xtype : 'view.configDataPanels',
	id : 'configDataPanels',
	title : "Configurar / Criar Painéis da Janela de Dados",
	bodyPadding: 0,
	
	width : 800,
	height: 500,
	
    requires: [
        'MCLM.view.datawindow.ConfigDataPanelsController',
        'MCLM.view.datawindow.ConfigDataPanelsTree',
        'MCLM.view.datawindow.DataPanelsDetails'
	],	
    controller : 'configDataPanels',	

    layout: 'border',	
    
	items: [{
		xtype: 'dataPanelsDetails'
	},{
		xtype: 'view.configDataPanelsTree'
	}],    
    
    scrollable: true,
    frame : false,
    
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),

    dataWindowData : null,
	resizable: false,
	
    dockedItems: [{
        xtype: 'toolbar',
        border: false,
        items: [{
        	iconCls: 'save-icon',
        	id: 'saveWindow',
            handler : 'saveWindow',
        },{
        	iconCls: 'add-icon',
        	id: 'doAddFoldertBtn',
            handler : 'doAddFolder',
        }]
    }],
	

    listeners: {
		close : function() {
		 	 Ext.tip.QuickTipManager.unregister('saveWindow');
		},
		
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'saveWindow',
		        title: 'Salvar Janela',
		        text: 'Salva a Janela de Dados com os dados abaixo.',
		        width: 190,
		        dismissDelay: 5000 
		    });
		    
		}
    }


});
