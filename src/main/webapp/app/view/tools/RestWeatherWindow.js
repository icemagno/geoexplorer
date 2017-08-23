Ext.define('MCLM.view.tools.RestWeatherWindow', {
	
	extend: 'Ext.Window',
	
	id:'restWeatherWindow',    	
	xtype: 'restWeatherWindow',
	title : "Serviços Meteorológicos",
	width : 286,
	height: 70,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

    requires: [
       'MCLM.view.tools.RestWeatherController',
       'MCLM.view.tools.RestWeather',
    ],	
    
    controller : 'restWeatherController',
	
    items: [{
        xtype: 'restWeather',
    }],

    listeners: {

    	close : function() {
    		Ext.tip.QuickTipManager.unregister('showForecastID');    	
    		Ext.tip.QuickTipManager.unregister('enableQueryLocationID');    	
    		Ext.tip.QuickTipManager.unregister('showWindyWindowID');   
    		
    		Ext.tip.QuickTipManager.unregister('toggleTempID');    	
    		Ext.tip.QuickTipManager.unregister('toggleWindID');    	
    		Ext.tip.QuickTipManager.unregister('togglePrecipitationID');    	
    		Ext.tip.QuickTipManager.unregister('togglePressureID');
    		
    		Ext.tip.QuickTipManager.unregister('showCptecAnimationID');
    		
    		MCLM.Map.unbindMapClick();
    	},
	    
	    afterrender : function ( cmp ) {
        	
    	    Ext.tip.QuickTipManager.register({
    	        target: 'togglePrecipitationID',
    	        title: 'Chuva',
    	        text: 'Exibe / Oculta camada de chuva OpenWeatherMap.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleWindID',
    	        title: 'Vento',
    	        text: 'Exibe / Oculta camada de vento OpenWeatherMap.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleTempID',
    	        title: 'Temperatura',
    	        text: 'Exibe / Oculta camada de temperatura OpenWeatherMap.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'showForecastID',
    	        title: 'Avisos Meteorológicos INMET',
    	        text: 'Centro Virtual para Avisos Meteorológicos Severos - INMET.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'enableQueryLocationID',
    	        title: 'Previsão para coordenadas',
    	        text: 'Previsão do tempo CPTEC para município em coordenada do mapa. Clique no mapa.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'showWindyWindowID',
    	        title: 'Previsão Windy',
    	        text: 'Previsão do tempo e informações avançadas do site Windy.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'togglePressureID',
    	        title: 'Pressão',
    	        text: 'Exibe / Oculta camada de pressão atmosférica OpenWeatherMap.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'showCptecAnimationID',
    	        title: 'Animação de Imagens',
    	        text: 'Abre nova janela com animação de imagens meteorológicas do CPTEC/INPE.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    });			
        	
        }
	
    },	
	
    
});