Ext.define('MCLM.view.apolo.aerodromo.AerodromoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aerodromoController',
    
    teste : function() {
    	
    	var aerodromoWindow = Ext.getCmp('aerodromoWindow');
    	var codAerodromo = aerodromoWindow.codAerodromo;
    	
    	MCLM.Functions.showMetarImage( codAerodromo );
    },
    
    
    getMetarTaf : function() {

    	var aerodromoWindow = Ext.getCmp('aerodromoWindow');
    	var codAerodromo = aerodromoWindow.codAerodromo;    	
    	
		Ext.Ajax.request({
			//url: 'getMetarTaf',
			url: 'getNotam',
			params: {
				'codigo': codAerodromo,
			},       
			success: function(response, opts) {
				var respText = Ext.decode( response.responseText );
				
				var result = "";
				
				if ( respText.aisweb ) {
					if ( respText.aisweb.notam  ) {
						var notam = respText.aisweb.notam;
						var item = notam.item;
						
						var result = "<table class='aeroWeather' style='font-weight:normal'>";
						for ( x = 0; x < item.length; x++  ) {
							var dt = item[x].dt.split(" ");
				    		var dtSpt = dt[0].split("-");
				    		var data =  dtSpt[2] + "/" + dtSpt[1] + "/" + dtSpt[0] + " " + dt[1]; 							
							
							result = result + "<tr><td>" + data + "</td> <td>" + item[x].e  + "</td> </tr>";
							console.log( result );
						}
						result = result + "</table>";
						
					} else {
						var aiswebLoc = respText.aisweb.loc; 
						var aiswebMetar = respText.aisweb.metar; 
						var aiswebTaf = respText.aisweb.taf;
					}
				}

				
				
				var metarTafWindow = Ext.getCmp('metarTafWindow');
				if ( !metarTafWindow ) {
					metarTafWindow = Ext.create('MCLM.view.apolo.aerodromo.MetarTafWindow');
				}
				metarTafWindow.show();
				metarTafWindow.setTitle('Dados de METAR/TAF: ' + codAerodromo);
				
				var image = "<div style='background-color:#edeff2;border-bottom:1px dotted #cacaca;width:100%;height:45px'><img style='position:absolute;left:5px;top:2px;width: 120px;' src='img/ais-logo-pt-br.png'></div>"; 
				var content = image + "<div>" + result  + "</div>";
				
				metarTafWindow.update( content );
				
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Erro','Erro ao receber dados de METAR.' );
			}

		});			    
    	
    	
    	
    }
    
});