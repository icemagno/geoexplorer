Ext.define('MCLM.view.rotas.CalcRotaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.calcRota',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addfolder.NewFolderForm' 
            '#calcRotaFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addfolder.NewFolderForm' 
            '#closeRotaWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    addRouteToCurrentScenery : function() {
		var routeResultStore = Ext.data.StoreManager.lookup('store.RouteResult');
		var routeData = routeResultStore.getRange();
		var count = routeData.length;    	
		   
		if ( count == 0 ) {
			Ext.Msg.alert('Rota Inexistente','Calcule uma rota antes de efetuar esta operação.' );
			return true;
		}
		
		var geoJsonData = MCLM.Map.convertRouteLayerToJson();
		//console.log( geoJsonData );

		Ext.Msg.alert('Não Implementado Ainda','MCLM.views.rotas.CalcRotaController :: 32' );

    },
    
    closeWindow : function() {
    	var rotaWindow = Ext.getCmp('rotaWindow');
    	rotaWindow.close();
    	MCLM.Globals.routeBlinkEnabled = false;
    	MCLM.Map.unbindMapClick();
    	
    	MCLM.Globals.selectRouteActiveIcon = 'selectSourceIcon';
    	$("#selectTargetIcon").css("display","none");    	
    },
    
    submitForm : function( ) {
    	var me = this;
    	var source = $("#sourceValue").val();
    	var target = $("#targetValue").val();
    	//var	bbox = MCLM.Map.getMapCurrentBbox();

    	if ( !source || !target ) {
    		Ext.Msg.alert('Erro','Selecione uma origem e um destino para a rota.' );
    		return true;
    	}
    	
    	Ext.Ajax.setTimeout(120000);
    	
		Ext.Ajax.request({
	       url: 'calcRoute',
	       params: {
	           'source': source,
	           'target' : target,
	           'kpaths' : 1,
	           'directed' : true
	       },       
	       success: function(response, opts) {
	    	   var respText = Ext.decode(response.responseText);
	    	   var routeResultStore = Ext.data.StoreManager.lookup('store.RouteResult');
	    	   routeResultStore.loadData( respText );
	    	   me.getFeaturesFromRouteData( respText );
	       },
	       failure: function(response, opts) {
	    	   Ext.Msg.alert('Erro','Erro ao calcular a rota.' );
	       }
		});
    	
        
    	return true;
    },
    
    
    getFeaturesFromRouteData : function( routeData ) {
    	
    	var geojsonObject = "{\"type\": \"FeatureCollection\",\"crs\": {\"type\": \"name\",\"properties\": {\"name\": \"EPSG:4326\"} },\"features\": ["; 
    	var prefix = "";
    	for(x=0; x < routeData.length; x++ ) {
    		var featureProperties = "{\"osm_name\":\""+ routeData[x].osm_name +"\", \"osm_id\":\""+ routeData[x].osm_id + "\"}";
    		geojsonObject = geojsonObject + prefix + "{\"type\": \"Feature\",\"properties\": "+featureProperties+
    			",\"geometry\":" +JSON.stringify( routeData[x].geometry ) + "}";
    		prefix = ",";
    	}
    	
    	geojsonObject = geojsonObject + "]}";

    	MCLM.Map.loadRouteDataToRouteLayer( geojsonObject );
		
    }

    
});