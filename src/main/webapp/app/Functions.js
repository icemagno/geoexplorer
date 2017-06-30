Ext.define('MCLM.Functions', {

	statics: {
		countLog : 0,

		shortGuid : function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return "f" + s4() + s4();
		},		

		hexToRgbA : function(hex, transp){
			var c;
			if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
				c= hex.substring(1).split('');
				if(c.length== 3){
					c= [c[0], c[0], c[1], c[1], c[2], c[2]];
				}
				c= '0x'+c.join('');
				return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+transp+')';
			}
			throw new Error('Bad Hex');
		},			

		guid : function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		},

		hideMainLog : function () {
			$('#mainLogDisplayContainer').css('display','none');
			$('#mainLogDisplayTable tbody').empty();
		},

		mainLog : function ( message ) {
			$('#mainLogDisplayContainer').fadeIn(2000);
			this.countLog++;
			if ( this.countLog == 5 ) {
				this.countLog--;
				$('#mainLogDisplayTable tr:first').remove();
			}
			$("<tr><td>" + message + "</td></tr>").appendTo('#mainLogDisplayTable tbody').hide().fadeIn(2000);
		},

		makePattern : function( color, ptrHDist, ptrVDist, ptrLength, ptrHeight, ptrWidth ) {

			var newColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] +  ')';

			var cnv = document.createElement('canvas');
			var ctx = cnv.getContext('2d');
			cnv.width = ptrHDist;
			cnv.height = ptrVDist;

			ctx.globalAlpha = color[3];
			ctx.fillStyle = newColor;

			// Comprimento nao pode ser maior que a dist H ou V.
			/*
			if ( (ptrLength > ptrHDist) || (ptrLength > ptrVDist) ) {
				// Iguala o comprimento a maior distancia
				if ( (ptrVDist > ptrHDist) ) ptrLength = prtVDist;
				if ( (ptrHDist > ptrVDist) ) ptrLength = prtHDist;
			}
			 */

			for(var i = 0; i < ptrLength; ++i) {
				ctx.fillRect(i, i, ptrWidth, ptrHeight);
			}
			return ctx.createPattern(cnv, 'repeat');
		},	

		openWindowData : function( record ) {

			if ( record.data_window == -1 ) {
				Ext.Msg.alert('Janela de Dados não encontrada','Não há janela de dados cadastrada para esta camada.' );
				return true;
			}

			MCLM.Functions.showMainLoadingIcon();
			MCLM.Functions.mainLog("Requisitando dados complementares da janela...");

			Ext.Ajax.request({
				url: 'getDataWindow',
				params: {
					'data': Ext.encode( record ),
				},       
				success: function(response, opts) {
					MCLM.Functions.hideMainLoadingIcon();
					var respText = Ext.decode(response.responseText);

					if ( respText.error ) {
						Ext.Msg.alert('Erro', respText.msg );
					} else {
						MCLM.Functions.createDataWindow( respText, record );
						MCLM.Functions.mainLog("Janela recebida: " + respText.windowName);
					}

				},
				failure: function(response, opts) {
					MCLM.Functions.hideMainLoadingIcon();
					Ext.Msg.alert('Erro','Erro ao receber dados.' );
				}

			});			

		},		

		createDataWindow( windowData, record ) {
			var symbolServerUrl = MCLM.Globals.config.symbolServerURL;
			var windowName = windowData.windowName;
			var windowPanels = windowData.panels;


			var	dataWindow = Ext.getCmp('dataWindow');
			if ( dataWindow ) {
				MCLM.Functions.removeDataWindowTooltip();
				dataWindow.destroy();
			} 

			dataWindow = Ext.create('Ext.Window', {
				id: 'dataWindow',    	
				xtype: 'dataWindow',
				title : windowName,
				width : 550,
				height: 500,
				bodyStyle:{"background-color":"white"},
				autoScroll: true,
				constrain: true,
				renderTo: Ext.getBody(),
				listeners : {
					close : function() {
						MCLM.Functions.removeDataWindowTooltip();
					},
				}
			});

			var dataTabPanel = Ext.create('Ext.tab.Panel', {
				layout: 'card',
			});

			for (var i = 0; i < windowPanels.length; i++) {
				var fields = windowPanels[i].fields;

				var content = "<table class='dataWindow'>";
				var theColor = "000000";

				for (var x = 0; x < fields.length; x++) {
					var fieldValue = fields[x].fieldValue;
					var fieldType = fields[x].fieldType;
					if( fieldType == 'COLOR' ) {
						theColor = fieldValue.replace('#','');;
					}
				}

				for (var x = 0; x < fields.length; x++) {
					var fieldValue = fields[x].fieldValue;
					var fieldType = fields[x].fieldType;

					if( fieldType == 'SYMBOL' ) {
						var imageLink = symbolServerUrl + "?symbol=" + fieldValue + "&color=_" + theColor;
						var fieldValue = '<div style="width:52px;height:52px;border:1px solid #cacaca"><object id="iconPreview" style="width:50px;height:50px" type="image/svg+xml" data="'+imageLink+'"></object></div>';
						// http://10.5.115.136/SvgService/?symbol=500&color=_FF0000
					}


					if( fieldType == 'URL' ) {
						fieldValue = "<a target='__NEWWINDOW' href='"+fieldValue+"'>Link Externo</a>";
					}


					if( fieldType == 'COLOR' ) {
						fieldValue = "<div style='width:40px;height:20px;border:1px solid #cacaca;background-color:"+fieldValue+"'></div>";
					}


					if( fieldType == 'IMAGE' ) {
						fieldValue = "<img style='border:1px solid #cacaca;width:100px;height:100px' src='" + fieldValue + "'>";
					}

					content = content + "<tr class='dataWindowLine'><td class='dataWindowLeft'>" + fields[x].fieldCaption + 
					"</td><td class='dataWindowMiddle'>" + fieldValue + "</td></tr>";
				}
				content = content + "</table>";

				dataTabPanel.add({
					title : windowPanels[i].panelName,
					html  : content
				});
			}

			dataWindow.addDocked({
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					iconCls: 'scenery-icon',
					id: 'cloneToSceneryBtn',
					handler: function(event, toolEl, panel){
						MCLM.Functions.cloneToScenery( windowData,record );
					}	                
				}, {
					iconCls: 'clima-icon',
					id: 'showWeatherBtn',
					handler: function(event, toolEl, panel){
						MCLM.Functions.exibeClima( windowData, record );
					}	                
				}]
			});

			dataWindow.show();
			dataWindow.add( dataTabPanel );			
			MCLM.Functions.bindDataWindowTooltips();

		},

		cloneToScenery : function( data, record ) {
			var feicao = {};
			var windowName = data.windowName;
			feicao["features"] = Ext.decode( record.mclm_metadata_property ).features;
			feicao.features[0].properties.feicaoNome = windowName;
			feicao.features[0].properties.feicaoDescricao = windowName;
			feicao["type"] = "FeatureCollection";

			var cloneToCenarioWindow = Ext.getCmp('cloneToCenarioWindow');
			if ( !cloneToCenarioWindow ) cloneToCenarioWindow = Ext.create('MCLM.view.datawindow.CloneToCenarioWindow');
			cloneToCenarioWindow.show();
			cloneToCenarioWindow.feicao = feicao;
		},

		exibeClima : function( data ) {
			console.log( data );
		},

		removeDataWindowTooltip : function() {
			Ext.tip.QuickTipManager.unregister('cloneToSceneryBtn');
			Ext.tip.QuickTipManager.unregister('showWeatherBtn');
		},
		bindDataWindowTooltips : function() {
			Ext.tip.QuickTipManager.register({
				target: 'cloneToSceneryBtn',
				title: 'Copiar para o Cenário',
				text: 'Copia os dados do elemento para o Cenário como uma Feição.',
				width: 150,
				dismissDelay: 5000 
			}, {
				target: 'showWeatherBtn',
				title: 'Exibir Previsão',
				text: 'Consulta a previsão do tempo para o local deste elemento.',
				width: 150,
				dismissDelay: 5000 
			});			
		},

		showMainLoadingIcon : function( action ) {
			$("#mainLoadingIcon").css('display','block');
			$("#mainLoadingInfo").text( action );
			$('#mainLoadingIcon').hide().show(0);
			//console.log( action );
		},

		hideMainLoadingIcon : function() {
			$("#mainLoadingInfo").text( "" );
			$("#mainLoadingIcon").css('display','none');			
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
					},{
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
					}, {
						target: 'btnStyle',
						title: 'Gerenciar Estilos',
						text: 'Gerencia os estilos a serem aplicados nas camadas de dados.',
						width: 150,
						dismissDelay: 5000 
					}, {
						target: 'drawFeicaoBtn',
						title: 'Desenhar Feições',
						text: 'Exibe a barra de ferramentas de desenho de feições.',
						width: 150,
						dismissDelay: 5000 
					}, {
						target: 'reloadTreeBtn',
						title: 'Atualizar a Árvore',
						text: 'Atualiza toda a árvore carregando os dados do servidor novamente.',
						width: 150,
						dismissDelay: 5000 
					}, {
						target: 'showRestToolsBtn',
						title: 'Serviços Externos',
						text: 'Exibe ferramentas adicionais para utitilzação de serviços oferecidos por fontes externas.',
						width: 150,
						dismissDelay: 5000 
					}, {
						target: 'zoomMinimum',
						title: 'Zoom para todo o mapa',
						text: 'Exibe todo o mapa na tela.',
						width: 150,
						dismissDelay: 5000 
					}, {
						target: 'zoomDefault',
						title: 'Zoom inicial',
						text: 'Retorna para o zoom inicial da configuração.',
						width: 150,
						dismissDelay: 5000 
					}); 	
		},

		latLonToUTM : function(lon, lat) {
			var latitude,longitude,utmZone,utmEast,utmNorth,defaultUtm ,letra;

			var arrayUTM = [
			                {
			                	nome : 'Airy',
			                	raioEquatorial : 6377563,
			                	eccQuadrado : 0.00667054,
			                	latitudeMax : 60,
			                	latitudeMin : 51,
			                	longitudeMax : 2,
			                	longitudeMin : -6
			                },
			                {
			                	nome : 'Australian National',
			                	raioEquatorial : 6378160,
			                	eccQuadrado : 0.006694542,
			                	latitudeMax : -12,
			                	latitudeMin : -48,
			                	longitudeMax : 156,
			                	longitudeMin : 108
			                },
			                {
			                	nome : 'Bessel 1841l',
			                	raioEquatorial : 6377397,
			                	eccQuadrado : 0.006674372,
			                	latitudeMax : 160,
			                	latitudeMin : 120,
			                	longitudeMax : 45,
			                	longitudeMin : 30
			                },
			                {
			                	nome : 'Bessel 1841 (Nambia)',
			                	raioEquatorial : 6377484,
			                	eccQuadrado : 0.006674372,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Clarke 1866',
			                	raioEquatorial : 6378206,
			                	eccQuadrado : 0.006768658,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Clarke 1880',
			                	raioEquatorial : 6378249,
			                	eccQuadrado : 0.006803511,
			                	latitudeMax : 35,
			                	latitudeMin : -35,
			                	longitudeMax : 40,
			                	longitudeMin : -20
			                },
			                {
			                	nome : 'Everest',
			                	raioEquatorial : 6377276 ,
			                	eccQuadrado : 0.006637847,
			                	latitudeMax : 30,
			                	latitudeMin : -12,
			                	longitudeMax : 140,
			                	longitudeMin : 70
			                },
			                {
			                	nome : 'Fischer 1960 (Mercury)',
			                	raioEquatorial : 6378166,
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Fischer 1968',
			                	raioEquatorial : 6378150,
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'GRS 1967',
			                	raioEquatorial : 6378160,
			                	eccQuadrado : 0.006694605,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'GRS 1980',
			                	raioEquatorial : 6378137,
			                	eccQuadrado : 0.00669438,
			                	latitudeMax : 80,
			                	latitudeMin : 15,
			                	longitudeMax : -60,
			                	longitudeMin : -170
			                },
			                {
			                	nome : 'Helmert 1906',
			                	raioEquatorial : 6378200,
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Hough',
			                	raioEquatorial : 6378270, 
			                	eccQuadrado : 0.00672267,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'International',
			                	raioEquatorial : 6378388,
			                	eccQuadrado : 0.00672267,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Krassovsky',
			                	raioEquatorial : 6378245,
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : 80,
			                	latitudeMin : 45,
			                	longitudeMax : 180,
			                	longitudeMin : 30
			                },
			                {
			                	nome : 'Modified Airy',
			                	raioEquatorial : 6377340,
			                	eccQuadrado : 0.00667054,
			                	latitudeMax : 55,
			                	latitudeMin : 51,
			                	longitudeMax : 11,
			                	longitudeMin : 6
			                },
			                {
			                	nome : 'Modified Everest',
			                	raioEquatorial : 6377304,
			                	eccQuadrado : 0.006637847,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Modified Fischer 1960',
			                	raioEquatorial : 6378155, 
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'South American 1969',
			                	raioEquatorial : 6378160, 
			                	eccQuadrado : 0.006694542,
			                	latitudeMax : 15,
			                	latitudeMin : -60,
			                	longitudeMax : -20,
			                	longitudeMin : -80
			                },
			                {
			                	nome : 'WGS 60',
			                	raioEquatorial : 6378165, 
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'WGS 66',
			                	raioEquatorial : 6378145, 
			                	eccQuadrado : 0.006694542,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'WGS-72',
			                	raioEquatorial : 6378135, 
			                	eccQuadrado : 0.006694318,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'WGS-84',
			                	raioEquatorial : 6378137, 
			                	eccQuadrado : 0.00669438,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                }
			                ];

			var position = function(latitude, longitude) {
				setLatitude(latitude);
				setLongitude(longitude);
				setDefault();
			};

			var setDefault = function() {
				defaultUtm = 22; // wgs 84
			};

			var setLatitude = function(lat) {
				var tmpLat = lat;
				latitude = tmpLat;
			};

			var setLongitude = function(lon) {
				//var tmplon = (long/360000);
				var tmplon = lon;
				longitude = tmplon;
			};

			var getUtmLetter = function(lat) {
				// Esta rotina determina a designação de letra correta para UTM, para uma dada latitude
				// retorna 'Z' se a latitude estiver fora dos limites da UTM de 84N a 80S
				// Original de Chuck Gantz- chuck.gantz@globalstar.com
				//$Lat = (Lat/360000);
				if((84 >= lat) && (lat >= 72))  letra = 'X';
				else if ((72 > lat) && (lat >= 64))   letra = 'W';
				else if ((64 > lat) && (lat >= 56))   letra = 'V';
				else if ((56 > lat) && (lat >= 48))   letra = 'U';
				else if ((48 > lat) && (lat >= 40))   letra = 'T';
				else if ((40 > lat) && (lat >= 32))   letra = 'S';
				else if ((32 > lat) && (lat >= 24))   letra = 'R';
				else if ((24 > lat) && (lat >= 16))   letra = 'Q';
				else if ((16 > lat) && (lat >= 8))    letra = 'P';
				else if (( 8 > lat) && (lat >= 0))    letra = 'N';
				else if (( 0 > lat) && (lat >= -8))   letra = 'M';
				else if ((-8> lat) && (lat >= -16))   letra = 'L';
				else if ((-16 > lat) && (lat >= -24)) letra = 'K';
				else if ((-24 > lat) && (lat >= -32)) letra = 'J';
				else if ((-32 > lat) && (lat >= -40)) letra = 'H';
				else if ((-40 > lat) && (lat >= -48)) letra = 'G';
				else if ((-48 > lat) && (lat >= -56)) letra = 'F';
				else if ((-56 > lat) && (lat >= -64)) letra = 'E';
				else if ((-64 > lat) && (lat >= -72)) letra = 'D';
				else if ((-72 > lat) && (lat >= -80)) letra = 'C';
				else letra = 'Z'; // flag de erro para mostrar
				// que a Latitude está fora dos limites UTM
			};

			var generateUTM = function() {
				var elipsoideRef = defaultUtm;
				var deg2rad = 3.14159265359 / 180.0;

				var a = arrayUTM[elipsoideRef].raioEquatorial;
				var eccSquared = arrayUTM[elipsoideRef].eccQuadrado;
				var k0 = 0.9996;

				var LongTmp1 = Math.floor(((longitude+180)/360));
				var LongTemp =  (longitude+180)-(LongTmp1*360)-180;

				var LatRad = latitude*deg2rad;
				var LongRad = longitude*deg2rad;

				var ZoneNumber = Math.floor(((LongTemp + 180)/6)) + 1;

				if(latitude >= 56.0 && latitude < 64.0 && LongTemp >= 3.0 && LongTemp < 12.0 ) {
					ZoneNumber = 32;
				}

				// zonas especiais para Svalbard
				if(latitude >= 72.0 && latitude < 84.0 ) {
					if(LongTemp >= 0.0  && LongTemp <  9.0 ) {
						ZoneNumber = 31;
					} 
					else if(LongTemp >= 9.0  && LongTemp < 21.0 ) {
						ZoneNumber = 33;
					}
					else if(LongTemp >= 21.0 && LongTemp < 33.0 ) {
						ZoneNumber = 35;
					}
					else if(LongTemp >= 33.0 && LongTemp < 42.0 ) {
						ZoneNumber = 37;
					} 
				}

				var LongOrigin = (ZoneNumber - 1)*6 - 180 + 3;  //+3 coloca a origem no meio da zona 
				var LongOriginRad = LongOrigin * deg2rad;

				getUtmLetter(latitude);
				utmZone = ZoneNumber;

				var eccPrimeSquared = (eccSquared) / (1-eccSquared);

				var N = a/Math.sqrt(1-eccSquared*Math.sin(LatRad)*Math.sin(LatRad));
				var T = Math.tan(LatRad)*Math.tan(LatRad);
				var C = eccPrimeSquared*Math.cos(LatRad)*Math.cos(LatRad);
				var A = Math.cos(LatRad)*(LongRad-LongOriginRad);

				var M = (a * 
						( 
								( 
										(1 - eccSquared/4) - 
										(3*eccSquared*eccSquared/64) - 
										(5 * eccSquared*eccSquared*eccSquared/256) 
								)* LatRad - 
								( 
										(3 * eccSquared/8) + 
										(3*eccSquared*eccSquared/32) + 
										(45 * eccSquared * eccSquared * eccSquared/1024)
								)* Math.sin(2*LatRad) + 
								(
										(15*eccSquared*eccSquared/256) + 
										(45*eccSquared*eccSquared*eccSquared/1024)
								)*Math.sin(4*LatRad) - 
								(
										(35*eccSquared*eccSquared*eccSquared/3072)
								)*Math.sin(6*LatRad)
						));

				utmEast = (k0*N*(A+(1-T+C)*A*A*A/6 + (5-18*T+T*T+72*C-58*eccPrimeSquared)*A*A*A*A*A/120) + 500000.0 );
				utmNorth = (k0*(M+N*Math.tan(LatRad)*(A*A/2+(5-T+9*C+4*C*C)*A*A*A*A/24 + ( 61-58*T+T*T+600*C-330*eccPrimeSquared)*A*A*A*A*A*A/720))); 
				utmNorth = Math.round(utmNorth);
				utmEast = Math.round(utmEast);

				if(latitude < 0) utmNorth += 10000000.0;
			};

			position(lat,lon);
			generateUTM();

			if(utmZone &&  letra && utmNorth && utmEast) {
				return utmZone + '' + letra + ' ' + utmNorth + ' ' + utmEast;
			}

			return '';
		},	

	}

});
