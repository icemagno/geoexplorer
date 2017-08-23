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
	
	width : 300,
	height: 590,
	
	minWidth : 300, 
	minHeight : 500,
	
    scrollable: false,
    frame : false,
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },  

    buttons: [{
		  // Interceptado pelo controller 'MCLM.view.rotas.CalcRotaController'	
	      text: 'Calcular Rota',
	      id : 'calcRotaFormSubmit'
		},{
			  // Interceptado pelo controller 'MCLM.view.rotas.CalcRotaController'	
	      text: 'Limpar Tudo',
	      id : 'clearRoutes'
		},{
			  // Interceptado pelo controller 'MCLM.view.rotas.CalcRotaController'	
	      text: 'Fechar',
	      id : 'closeRotaWindow'
	}],    
    
    dockedItems: [{
        xtype: 'toolbar',
        frame : false,
        border : false,
        items: [{
        	iconCls: 'save-icon',
        	id: 'idAddRoute',
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
	
	listeners: {
		
		close : function() {
			Ext.tip.QuickTipManager.unregister('idAddRoute');
			Ext.tip.QuickTipManager.unregister('estadio-button');
			Ext.tip.QuickTipManager.unregister('toll-button');
			Ext.tip.QuickTipManager.unregister('hospital-button');
			Ext.tip.QuickTipManager.unregister('clinic-button');
			Ext.tip.QuickTipManager.unregister('blood-button');
			Ext.tip.QuickTipManager.unregister('obras-button');
			Ext.tip.QuickTipManager.unregister('rodoviaria-button');
			Ext.tip.QuickTipManager.unregister('police-button');
			Ext.tip.QuickTipManager.unregister('helipad-button');
			Ext.tip.QuickTipManager.unregister('ponte-button');
			Ext.tip.QuickTipManager.unregister('gasolina-button');
			Ext.tip.QuickTipManager.unregister('prison-button');
			Ext.tip.QuickTipManager.unregister('airport-button');
			Ext.tip.QuickTipManager.unregister('levelcrossing-button');
			Ext.tip.QuickTipManager.unregister('school-button');
			Ext.tip.QuickTipManager.unregister('railway-button');
			Ext.tip.QuickTipManager.unregister('port-button');
			Ext.tip.QuickTipManager.unregister('trainstation-button');
			
	    	MCLM.Globals.routeBlinkEnabled = false;
	    	$("#selectTargetIcon").css("display","none");  
	    	MCLM.Globals.selectRouteActiveIcon = 'selectSourceIcon';
	    	MCLM.RouteHelper.clear();
	    	MCLM.Map.unbindMapClick();
		},
		
		afterrender: function(component, eOpts) {
			MCLM.RouteHelper.init();
		    Ext.tip.QuickTipManager.register({
		        target: 'idAddRoute',
		        title: 'Adicionar Rota ao Cenário',
		        text: 'Adiciona a rota atual ao Cenário.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'trainstation-button',
		        title: 'Estações Ferroviárias',
		        text: 'Localiza estações ferroviárias próximas à rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'port-button',
		        title: 'Portos / Terminais de Container',
		        text: 'Localiza portos e terminais próximos da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'school-button',
		        title: 'Escolas',
		        text: 'Localiza escolas próximos à rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'railway-button',
		        title: 'Ferrovias',
		        text: 'Localiza ferrovias próximos à rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'airport-button',
		        title: 'Aeroportos',
		        text: 'Localiza aeroportos e aeródromos próximos à rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'prison-button',
		        title: 'Presídios',
		        text: 'Localiza presídios próximos à rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'obras-button',
		        title: 'Viadutos',
		        text: 'Localiza viadutos na rota selecionada, seja no trajeto ou cruzando a rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'police-button',
		        title: 'Delegacias de Polícia',
		        text: 'Localiza delegacias de polícia no trajeto da rota selecionada. No momento inclui postos da PRF.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'estadio-button',
		        title: 'Estádios',
		        text: 'Localiza estádios no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'rodoviaria-button',
		        title: 'Rodoviária',
		        text: 'Localiza rodoviárias no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'helipad-button',
		        title: 'Pouso de Helicópteros',
		        text: 'Localiza pontos de pouso de helicóptero no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'toll-button',
		        title: 'Pedágio',
		        text: 'Localiza postos de pedágio no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'hospital-button',
		        title: 'Hospital',
		        text: 'Localiza hospitais no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'clinic-button',
		        title: 'Clínica',
		        text: 'Localiza clínicas no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'blood-button',
		        title: 'Doação/Banco de Sangue',
		        text: 'Localiza pontos de doação ou banco de sangue no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'ponte-button',
		        title: 'Pontes',
		        text: 'Localiza pontes na rota selecionada, seja no trajeto ou cruzando a rota.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'gasolina-button',
		        title: 'Postos de Abastecimento',
		        text: 'Localiza postos de abastecimento (gasolina, diesel, etanol, gás, etc) no trajeto da rota selecionada.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'levelcrossing-button',
		        title: 'Passagem de Nível',
		        text: 'Localiza locais de cruzamento com linha férrea na rota.',
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
