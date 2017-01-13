Ext.define('MCLM.Functions', {
	
	statics: {
		
		guid : function() {
			  function s4() {
			    return Math.floor((1 + Math.random()) * 0x10000)
			      .toString(16)
			      .substring(1);
			  }
			  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			    s4() + '-' + s4() + s4() + s4();
		},
		
		
		inicializaDicas : function() {
		    Ext.tip.QuickTipManager.init();
		    
		    Ext.tip.QuickTipManager.register(
		    
			{
			  target: 'id011',
			  title: 'Expandir Tudo',
			  text: 'Expande toda a árvore. Poderá demorar.',
			  width: 150,
			  dismissDelay: 5000 
			  	      
		    },     	
		    {
		      target: 'id012',
		      title: 'Recolher Tudo',
		      text: 'Recolhe toda a árvore.',
		      width: 150,
		      dismissDelay: 5000 
		    	      
		    },{
		      target: 'id111',
		      title: 'Configurações',
		      text: 'Configura aspectos gerais do sistema.',
		      width: 150,
		      dismissDelay: 5000 
		    }, {
		        target: 'id112',
		        title: 'Fontes Externas',
		        text: 'Gerencia os servidores de fontes externas de mapas.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id113',
		        title: 'Previsão do Tempo',
		        text: 'Diversos aspectos climáticos em tempo real. Necessita acesso à Internet.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id114',
		        title: 'Elementos de Navegação',
		        text: 'Exibe elementos de carta náutica que auxiliam a navegação. Necessário nível de zoom apropriado.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id115',
		        title: 'Grade Auxiliar',
		        text: 'Exibe a grade auxiliar do mapa.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id116',
		        title: 'Controle de Camadas',
		        text: 'Controla a disposição e visualizaçao das camadas ativas no mapa.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id117',
		        title: 'Interrogar Camadas',
		        text: 'Interroga as camadas ativas no mapa em determinada posição.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'id118',
		        title: 'Verificar Conectividade',
		        text: 'Verifica se o Sistema possui acesso externo à Ineternet (não o usuário).',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id119',
		        title: 'Ocultar/Exibir Base',
		        text: 'Oculta ou exibe a camada de base do mapa.',
		        width: 150,
		        dismissDelay: 5000 
		    }, {
		        target: 'id120',
		        title: 'Calcular Rota',
		        text: 'Calcula a rota entre dois pontos.',
		        width: 150,
		        dismissDelay: 5000 
		    }); 	
		},
		
		getFeatureStyle : function( featureType ) {
			
			/*
			
			var icon = feature.get("icon");
				var styleTemperature = new ol.style.Style({
				        image: new ol.style.Icon({
				        src: 'http://prognoza.hr/metsimboli/' + icon + '.gif'
				})
			});			
			
			
			*/
			var styles = {
    	        'Point': new ol.style.Style({
    	          image: image
    	        }),
    	        'LineString': new ol.style.Style({
    	          stroke: new ol.style.Stroke({
    	            color: 'green',
    	            width: 1
    	          })
    	        }),
    	        'MultiLineString': new ol.style.Style({
    	          stroke: new ol.style.Stroke({
    	            color: 'green',
    	            width: 1
    	          })
    	        }),
    	        'MultiPoint': new ol.style.Style({
    	          image: image
    	        }),
    	        'MultiPolygon': new ol.style.Style({
    	          stroke: new ol.style.Stroke({
    	            color: 'yellow',
    	            width: 1
    	          }),
    	          fill: new ol.style.Fill({
    	            color: 'rgba(255, 255, 0, 0.1)'
    	          })
    	        }),
    	        'Polygon': new ol.style.Style({
    	          stroke: new ol.style.Stroke({
    	            color: 'blue',
    	            lineDash: [4],
    	            width: 3
    	          }),
    	          fill: new ol.style.Fill({
    	            color: 'rgba(0, 0, 255, 0.1)'
    	          })
    	        }),
    	        'GeometryCollection': new ol.style.Style({
    	          stroke: new ol.style.Stroke({
    	            color: 'magenta',
    	            width: 2
    	          }),
    	          fill: new ol.style.Fill({
    	            color: 'magenta'
    	          }),
    	          image: new ol.style.Circle({
    	            radius: 10,
    	            fill: null,
    	            stroke: new ol.style.Stroke({
    	              color: 'magenta'
    	            })
    	          })
    	        }),
    	        'Circle': new ol.style.Style({
    	          stroke: new ol.style.Stroke({
    	            color: 'red',
    	            width: 2
    	          }),
    	          fill: new ol.style.Fill({
    	            color: 'rgba(255,0,0,0.2)'
    	          })
    	        })
			};
		      
			return styles[featureType];
			
		} 
		

	}

});
