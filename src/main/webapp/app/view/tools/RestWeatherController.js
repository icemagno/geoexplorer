Ext.define('MCLM.view.tools.RestWeatherController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.restWeatherController',
    precEnabled : false,
    pressureEnabled : false,
    windEnabled : false,
    tempEnabled : false,
    
    togglePrecipitation : function() {
    	
    	if( this.precEnabled ) {
    		this.precEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_owm_precip' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.precipitacaoLayer );
    		this.precEnabled = true;
    	}
    	
    },

    showCptecAnimation : function() {
    	// http://pituna.cptec.inpe.br/repositorio5/goes13/goes13_web/ams_realce_baixa/2017/08/S11235258_201708081730.jpg
    	// http://pituna.cptec.inpe.br/repositorio5/goes13/goes13_web/ams_vapor_baixa/2017/07/S11232953_201707070000.jpg
    	window.open('http://satelite.cptec.inpe.br/acervo/loop.show.logic?id=2953-1,5258-2', '_blank');
    },
    
    togglePressure : function() {
    	
    	if( this.pressureEnabled ) {
    		this.pressureEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_owm_pressure' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.pressureLayer );
    		this.pressureEnabled = true;
    	}
    	
    },    

    toggleWind : function() {
    	
    	if( this.windEnabled ) {
    		this.windEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_owm_wind' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.windLayer );
    		this.windEnabled = true;
    	}
    	
    },       

    toggleTemp : function() {
    	
    	if( this.tempEnabled ) {
    		this.tempEnabled = false;
    		MCLM.Map.removeLayer( 'mclm_owm_temperature' );
    	} else {
    		MCLM.Map.map.addLayer( MCLM.Map.tempLayer );
    		this.tempEnabled = true;
    	}
    	
    },   
    
    showForecast : function() {
		var previsaoClima = Ext.getCmp('previsaoClima');
		if ( !previsaoClima ) {
			previsaoClima = Ext.create('MCLM.view.clima.PrevisaoWindow');
		}
		previsaoClima.show();
		previsaoClima.alignTo(Ext.getBody(), "tl-tl", [0, 0]);
		MCLM.ClimaHelper.init();
		MCLM.ClimaHelper.getAlerts();
    },
    
    enableQueryLocation : function() {
    	MCLM.Map.enableQueryLocation();
    },
    
    showWindyWindow : function() {
    	MCLM.Map.showWindyWindow();
    },
    
});