Ext.define('MCLM.view.cenarios.CenarioWindow', {
	extend: 'Ext.Window',
	xtype : 'view.cenarioWindow',
	id : 'cenarioWindow',

    requires: [
        'MCLM.view.cenarios.CenarioController',
        'MCLM.view.cenarios.PainelEsquerdo',
        'MCLM.view.cenarios.PainelCentral',
	],	    
    controller : 'cenario',	
	
	width : 750,
	height: 500,
    scrollable: false,
    frame : false,
	layout : 'border',
	title : "Carregar Cenário",
	constrain: true,
	margin: '0 0 0 0',
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'cenariosPainelEsquerdo'
	},{
		xtype: 'cenariosPainelCentral'
	}],	
	  
	listeners : {
		 close : function() {
			 // Remove o registro de balao de dicas (hints) dos botoes da janela.
			 // meramente preventivo para evitar erros de javascript mas nao interfere no sistema.
		 	 Ext.tip.QuickTipManager.unregister('id300');
		 	 Ext.tip.QuickTipManager.unregister('id301');
		 	 Ext.tip.QuickTipManager.unregister('id302');
		 	 Ext.tip.QuickTipManager.unregister('id303');
		 	 Ext.tip.QuickTipManager.unregister('id304');
		 },	
	}


});
