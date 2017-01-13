Ext.define('MCLM.view.rotas.RotaWindow', {
	extend: 'Ext.Window',
	xtype : 'view.rotaWindow',
	id : 'rotaWindow',

	title: 'Calcular Rota',
	
    requires: [
        'MCLM.view.rotas.CalcRotaController',
        'MCLM.view.rotas.PainelOrigem',
        'MCLM.view.rotas.PainelDestino',
        'MCLM.view.rotas.RotaResultGrid',
        'MCLM.view.rotas.RoadDetailPanel'
	],	    
    controller : 'calcRota',	
	
	width : 420,
	height: 400,
    scrollable: false,
    frame : false,
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },    
    
    
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'save-icon',
        	id: 'idAddRoute',
        	// Processado por 'MCLM.view.rotas.CalcRotaController'
            handler : 'addRouteToCurrentScenery'
        }]
    }],	    
	
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'painelOrigem'
	}, {
		xtype: 'painelDestino'
	},{
		xtype: 'roadDetailPanel'
	},{
		xtype: 'rotaResultGrid'
	}],
	
    buttons: [{
		  // Interceptado pelo controller 'MCLM.view.rotas.CalcRotaController'	
        text: 'Fechar',
        id : 'closeRotaWindow'
    },{
		  // Interceptado pelo controller 'MCLM.view.rotas.CalcRotaController'	
        text: 'Calcular Rota',
        id : 'calcRotaFormSubmit'
    }],
    
	listeners: {
		afterrender: function(component, eOpts) {
			
		    Ext.tip.QuickTipManager.register({
		        target: 'idAddRoute',
		        title: 'Adicionar Rota ao Cenário',
		        text: 'Adiciona a rota atual ao Cenário na Área de Trabalho.',
		        width: 190,
		        dismissDelay: 5000 
		    });				
			
			
			// Inicialmente, espera que o clique no mapa selecione a origem:
			MCLM.Map.bindMapToGetSourceAddress();
			
			// Ao clicar na área se "selecione a origem" ...
			$( "#selectSourceMainDiv" ).click(function() {
		    	MCLM.Globals.selectRouteActiveIcon = 'selectSourceIcon';
		    	$("#selectTargetIcon").css("display","none");
		    	$("#selectSourceIcon").css("display","block");
		    	MCLM.Map.bindMapToGetSourceAddress();
		    });			
			
			// Ao clicar na área se "selecione o destino" ...
			$( "#selectTargetMainDiv" ).click(function() {
		    	MCLM.Globals.selectRouteActiveIcon = 'selectTargetIcon';
		    	$("#selectSourceIcon").css("display","none");
		    	$("#selectTargetIcon").css("display","block");
		    	MCLM.Map.bindMapToGetTargetAddress();
		    });			
			
		}           
	},    
    
	
});
