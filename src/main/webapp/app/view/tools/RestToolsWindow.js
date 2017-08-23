Ext.define('MCLM.view.tools.RestToolsWindow', {
	
	extend: 'Ext.Window',
	
	id:'restToolsWindow',    	
	xtype: 'restToolsWindow',
	title : "Serviços Externos / Camadas",
	width : 240,
	height: 300,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

    requires: [
       'MCLM.view.tools.RestToolsController',
       'MCLM.view.tools.RestTools',
    ],	
    
    controller : 'restToolsController',
	
    items: [{
        xtype: 'restTools',
    }],
    
    html : '<table id="externalTableLayer" >' +
    	'<tr><td><img onclick="MCLM.Map.toggleImagery()" id="toggleImageryID" class="externalImageLayer" src="img/external_satelite.png"></td>' +
    	'<td><img onclick="MCLM.Map.toggleHillshade()" id="toggleHillshadeID" class="externalImageLayer" src="img/external_hillshade.png"></td>' +
    	'<td><img onclick="MCLM.Map.toggleOcean()" id="toggleOceanID" class="externalImageLayer" src="img/external_leito.png"></td></tr>'+
    	'<tr><td><img onclick="MCLM.Map.toggleTopo()" id="toggleTopoID" class="externalImageLayer" src="img/external_topo.png"></td>' +
    	'<td><img onclick="MCLM.Map.toggleSeaMapLayer()" id="seaMapID" class="externalImageLayer" src="img/external_nautical.png"></td>'+
    	'<td><img onclick="MCLM.Map.toggleOsm()" id="toggleOsmID" class="externalImageLayer" src="img/external_osm.png"></td></tr>'+
    	'<td><img onclick="MCLM.Map.toggleAeroTraffic()" id="toggleAirTrafficID" class="externalImageLayer" src="img/external_aircraft.png"></td></tr>'+
    	'</table>',

    listeners: {

    	close : function() {
		 	Ext.tip.QuickTipManager.unregister('maritmTrID');    	
		 	//Ext.tip.QuickTipManager.unregister('aeroplaneID');    	
		 	Ext.tip.QuickTipManager.unregister('photoID');    	
		 	Ext.tip.QuickTipManager.unregister('seaMapID');    
		 	Ext.tip.QuickTipManager.unregister('marineTrafficID'); 
		 	
		 	Ext.tip.QuickTipManager.unregister('toggleTopoID');
		 	Ext.tip.QuickTipManager.unregister('toggleOceanID');
		 	Ext.tip.QuickTipManager.unregister('toggleHillshadeID');
		 	Ext.tip.QuickTipManager.unregister('toggleImageryID');
		 	Ext.tip.QuickTipManager.unregister('toggleOsmID');
		 	Ext.tip.QuickTipManager.unregister('toggleAirTrafficID');
		 	
		 	
		 	MCLM.Map.shipsHelper.deleteShips();
		 	
		 	MCLM.Map.shipTrafficEnabled = false;
		 	MCLM.Map.streetPhotoEnabled = false;
		 	
		 	MCLM.view.photo.PhotoHelper.clearPhotos();
		 	MCLM.Map.unbindMapClick();
		 	
    	},
	    
	    afterrender : function ( cmp ) {

	    	if ( MCLM.Map.seaMapEnabled ) {
	    		$("#toggleOsmID").css("border","2px solid #ff5d00");
	    	} else {
	    		$("#toggleOsmID").css("border","1px solid #cacaca");
	    	}
	    	
	    	if ( MCLM.Map.aeroTrafficEnabled ) {
	    		$("#toggleAirTrafficID").css("border","2px solid #ff5d00");
	    	} else {
	    		$("#toggleAirTrafficID").css("border","1px solid #cacaca");
	    	}
	    	
	    	if ( MCLM.Map.seaMapEnabled ) {
	    		$("#seaMapID").css("border","2px solid #ff5d00");
	    	} else {
	    		$("#seaMapID").css("border","1px solid #cacaca");
	    	}	    	
	    	
	    	if ( MCLM.Map.topoEnabled ) {
	    		$("#toggleTopoID").css("border","2px solid #ff5d00");
	    	} else {
	    		$("#toggleTopoID").css("border","1px solid #cacaca");
	    	}
	    	
	    	if ( MCLM.Map.oceanEnabled ) {
	    		$("#toggleOceanID").css("border","2px solid #ff5d00");
	    	} else {
	    		$("#toggleOceanID").css("border","1px solid #cacaca");
	    	}
	    	
	    	if ( MCLM.Map.hillshadeEnabled ) {
	    		$("#toggleHillshadeID").css("border","2px solid #ff5d00");
	    	} else {
	    		$("#toggleHillshadeID").css("border","1px solid #cacaca");
	    	}
	    	
	    	if ( MCLM.Map.imageryEnabled ) {
	    		$("#toggleImageryID").css("border","2px solid #ff5d00");
	    	} else {
	    		$("#toggleImageryID").css("border","1px solid #cacaca");
	    	}	    	

	    	if ( MCLM.Map.osmEnabled ) {
	    		$("#toggleOsmID").css("border","2px solid #ff5d00");
	    	} else {
	    		$("#toggleOsmID").css("border","1px solid #cacaca");
	    	}	    	
	    	
	    	
    	    Ext.tip.QuickTipManager.register({
    	        target: 'maritmTrID',
    	        title: 'Tráfego Marítimo',
    	        text: 'Exibe dados de tráfego marítimo AIS via SISTRAM.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    }/*,{
    	        target: 'aeroplaneID',
    	        title: 'Tráfego Aéreo',
    	        text: 'Exibe tráfego aéreo.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    }*/,{
    	        target: 'seaMapID',
    	        title: 'Elementos de Navegação',
    	        text: 'Exibe elementos de carta náutica que auxiliam a navegação. Necessário nível de zoom apropriado.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	    	target: 'marineTrafficID',
    	    	title: 'Tráfego Marítimo',
    	    	text: 'Exibe mapa com o tráfego marítimo oriundo do site MarineTraffic.',
    	    	width: 150,
    	    	dismissDelay: 5000 
    	    },{
    	        target: 'photoID',
    	        title: 'Fotos de Rua',
    	        text: 'Permite consultar fotos criadas por usuários do Mapilary.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleTopoID',
    	        title: 'Topografia',
    	        text: 'Ativa/Desativa camada de topografia do ArcGIS.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleOceanID',
    	        title: 'Leito Marinho',
    	        text: 'Ativa/Desativa camada de relevo do leito marinho do ArcGIS.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleHillshadeID',
    	        title: 'Relevo',
    	        text: 'Ativa/Desativa camada de relevo do ArcGIS.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleImageryID',
    	        title: 'Imagens de Satélite',
    	        text: 'Ativa/Desativa camada de imagens de satélite do ArcGIS.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'toggleOsmID',
    	        title: 'OpenStreetMap Original',
    	        text: 'Ativa/Desativa camada OpenStreetMap original online.',
    	        width: 150,
    	        dismissDelay: 5000 
		    },{
		    	target: 'toggleAirTrafficID',
		    	title: 'Monitorar Tráfego Aéreo',
		    	text: 'Ativa/Desativa camada exibindo tráfego aéreo em tempo real.',
		    	width: 150,
		    	dismissDelay: 5000 
		    });			
        	
        }
	
    },	
	
    
});