Ext.define('MCLM.Functions', {

	statics: {
		countLog : 0,
		
		translateAerodromos : function( what ) {
			var aeroWindow = {};
			aeroWindow["id"] = "Identificador";
			aeroWindow["sigla"] = "Sigla";
			aeroWindow["nome"] = "Nome";
			aeroWindow["logradouro"] = "Rua";
			aeroWindow["numeroEnd"] = "Número";
			aeroWindow["bairro"] = "Bairro";
			aeroWindow["cep"] = "CEP";
			aeroWindow["caractNotaveis"] = "Características";
			aeroWindow["fonte"] = "Fonte";
			aeroWindow["infoContato"] = "Contato";
			aeroWindow["sumarioPistas"] = "Sumário";
			aeroWindow["distancia"] = "Distância";
			aeroWindow["orgControladora"] = "Controlador";
			aeroWindow["listCapacidadesLogisticas"] = "Cap. Logísticas";
			aeroWindow["listTiposCapacidadeLogistica"] = "Tipos Cap. Logística";
			aeroWindow["anacSlotControlado"] = "anacSlotControlado";
			aeroWindow["anacSituacaoAerodromo"] = "anacSituacaoAerodromo";
			aeroWindow["anacLocalidade"] = "anacLocalidade";
			aeroWindow["tipoNome"] = "Tipo";
			aeroWindow["paisNome"] = "País";
			aeroWindow["estadoNome"] = "Estado";
			aeroWindow["anacAerodromoSituacaoAtualizacaoNome"] = "Sit. Nome";
			aeroWindow["administracaoNome"] = "Administração";
			aeroWindow["cidadeNome"] = "Cidade";
			aeroWindow["anacAerodromoUtilizacaoNome"] = "Utilização";
			
			
			
			return aeroWindow[what];
			
		} ,
				 
	
		syntaxHighlight : function(json) {
		    if (typeof json != 'string') {
		         json = JSON.stringify(json, undefined, 2);
		    }
		    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		        var cls = 'number';
		        if (/^"/.test(match)) {
		            if (/:$/.test(match)) {
		                cls = 'key';
		            } else {
		                cls = 'string';
		            }
		        } else if (/true|false/.test(match)) {
		            cls = 'boolean';
		        } else if (/null/.test(match)) {
		            cls = 'null';
		        }
		        return '<span class="' + cls + '">' + match + '</span>';
		    });
		},
		
		showMetarImage : function( aeroporto ) {
			var metarImageWindow = Ext.getCmp('metarImageWindow');
			if ( !metarImageWindow ) {
				metarImageWindow = Ext.create('MCLM.view.apolo.aerodromo.MetarImageWindow');
			}
			
			var image = "<div style='background-color:#edeff2;border-bottom:1px dotted #cacaca;width:100%;height:45px'><img style='position:absolute;left:5px;top:2px;width: 220px;' src='img/clima/cptec/logocomp.gif'><img style='width: 50px;position:absolute;right:5px;top:2px;' src='img/clima/cptec/logo_cptec.png'></div>" + 
			    	   "<img style='margin-top:5px;margin-left:10px;width:400px;height:450px' src='http://img0.cptec.inpe.br/~rmetop/meteograma/"+aeroporto+".gif'>";
			
			metarImageWindow.update( image );
			metarImageWindow.setTitle('Dados de METAR - ' + aeroporto);
			metarImageWindow.show();
		},
		
		getClimaDesc : function( value ) {
			var climaDesc = [];
			climaDesc["ec"] = "Encoberto com Chuvas Isoladas";
				climaDesc["ci"] = "Chuvas Isoladas";
				climaDesc["c"] = "Chuva";
				climaDesc["in"] = "Instável";
				climaDesc["pp"] = "Poss. de Pancadas de Chuva";
				climaDesc["cm"] = "Chuva pela Manhã";
				climaDesc["cn"] = "Chuva a Noite";
				climaDesc["pt"] = "Pancadas de Chuva a Tarde";
				climaDesc["pm"] = "Pancadas de Chuva pela Manhã";
				climaDesc["np"] = "Nublado e Pancadas de Chuva";
				climaDesc["pc"] = "Pancadas de Chuva";
				climaDesc["pn"] = "Parcialmente Nublado";
				climaDesc["cv"] = "Chuvisco";
				climaDesc["ch"] = "Chuvoso";
				climaDesc["t"] = "Tempestade";
				climaDesc["ps"] = "Predomínio de Sol";
				climaDesc["e"] = "Encoberto";
				climaDesc["n"] = "Nublado";
				climaDesc["cl"] = "Céu Claro";
				climaDesc["nv"] = "Nevoeiro";
				climaDesc["g"] = "Geada";
				climaDesc["ne"] = "Neve";
				climaDesc["nd"] = "Não Definido";
				climaDesc["pnt"] = "Pancadas de Chuva a Noite";
				climaDesc["psc"] = "Possibilidade de Chuva";
				climaDesc["pcm"] = "Possibilidade de Chuva pela Manhã";
				climaDesc["pct"] = "Possibilidade de Chuva a Tarde";
				climaDesc["pcn"] = "Possibilidade de Chuva a Noite";
				climaDesc["npt"] = "Nublado com Pancadas a Tarde";
				climaDesc["npn"] = "Nublado com Pancadas a Noite";
				climaDesc["ncn"] = "Nublado com Poss. de Chuva a Noite";
				climaDesc["nct"] = "Nublado com Poss. de Chuva a Tarde";
				climaDesc["ncm"] = "Nubl. c/ Poss. de Chuva pela Manhã";
				climaDesc["npm"] = "Nublado com Pancadas pela Manhã";
				climaDesc["npp"] = "Nublado com Possibilidade de Chuva";
				climaDesc["vn"] = "Variação de Nebulosidade";
				climaDesc["ct"] = "Chuva a Tarde";
				climaDesc["ppn"] = "Poss. de Panc. de Chuva a Noite";
				climaDesc["ppt"] = "Poss. de Panc. de Chuva a Tarde";
				climaDesc["ppm"] = "Poss. de Panc. de Chuva pela Manhã";	
			
				return climaDesc[ value ];
			
			
		},

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

		createOrgMilWindow : function( respText, record ) {
			console.log( respText );
			
			var orgMilWindow = Ext.getCmp('orgMilWindow');
			if( !orgMilWindow ) {
				orgMilWindow = Ext.create('MCLM.view.apolo.orgmil.OrgMilWindow');
			}
			
			//orgMilWindow.update( Ext.encode(respText) );
			
			orgMilWindow.show();
		},

		createAerodromoWindow : function( sigla, data, record ) {
			
			var aerodromoWindow = Ext.getCmp('aerodromoWindow');
			if( !aerodromoWindow ) {
				aerodromoWindow = Ext.create('MCLM.view.apolo.aerodromo.AerodromoWindow');
			}
			
			aerodromoWindow.codAerodromo = sigla;
			
			var image = "<div style='position:relative;background-color:#edeff2;border-bottom:1px dotted #cacaca;width:100%;height:45px'><img style='position:absolute;left:5px;top:2px;width: 220px;' src='img/clima/cptec/logocomp.gif'><img style='width: 50px;position:absolute;right:5px;top:2px;' src='img/clima/cptec/logo_cptec.png'></div>";
			
			
			var table = "<table style='width:370px' class='dataWindow'>";
		    for ( var key in data ) {
		    	
		        if ( data.hasOwnProperty( key ) ) {
		        	var value = data[key];
		        	if ( !value ) { 
		        		value = "";
		        	} 
		        	var translatedKey = MCLM.Functions.translateAerodromos( key );
		        	if ( translatedKey ) {
			        	table = table + "<tr class='dataWindowLine'><td class='dataWindowLeft'>" + translatedKey + 
							"</td><td class='dataWindowMiddle'>" + value + "</td></tr>";
		        	}
		        	
		        } 
		    }			
		    table = table + "</table>";
			
		    var frame = "<iframe frameBorder='0' width='100%' height='100%' src='http://www.aisweb.aer.mil.br/_inc/iframe.cfm?pagina=rotaer&codigo=" + sigla + "'>" 
			 
			var content =  "<div style='witdt:100%;height:100%'>" + 
				"<div style='width:380px;float:left;'>" + table + "</div>" +
				"<div style='border-left:1px dotted #cacaca;width:385px;height:2000px;float:left;'>" +
					image +
					"<div id='aeroWeatherContent' style='border:0px;width:384px;height:65px'></div>" +
					"<div style='border:0px;width:384px;height:2000px'>" + frame + "</div>" +
				"</div>" + 
			"</div>";

			Ext.Ajax.request({
				url: 'getWeatherAerodromo',
				params: {
					'codigo': sigla,
				},       
				success: function(response, opts) {
					var respText = Ext.decode( response.responseText );
					
					if ( respText.metar ) {
						var mtr = respText.metar;
						
						var att = mtr.atualizacao;
						var pressao = mtr.pressao;
						var temp = mtr.temperatura + " ºC";
						var tempo = '<img style="width:60px;height:50px;" src="img/clima/cptec/'+ mtr.tempo + '.png">';
						var tempoDesc = mtr.tempo_desc;
						var umidade = mtr.umidade;
						var ventoDir = mtr.vento_dir;
						var ventoInt = mtr.vento_int;
						var visibilidade = mtr.visibilidade.replace('>','&gt;').replace('<','&lt;');
						
						var metar = '<table class="aeroWeather" style="height:60px;width:100%">' +
								'<tr><td rowspan="4">'+tempo+'</td><td>' + tempoDesc + '</td> <td>' + att +'</td></tr>' + 
								'<tr><td>Temperatura: '+temp+'</td> <td>Pressão: '+ pressao +'</td></tr>' + 
								'<tr><td>Umidade: '+umidade+'%</td> <td>Vento: '+ventoDir+'  '+ ventoInt +'</td></tr>' + 
								'<tr><td colspan="3">Visibilidade: '+visibilidade+' metros</td> </tr>' + 
								'</table>';
						
						$('#aeroWeatherContent').html( metar );
					}
					
				},
				failure: function(response, opts) {
					Ext.Msg.alert('Erro','Erro ao receber dados de METAR.' );
				}

			});			    
		    
		    
		    aerodromoWindow.show();		    
		    var dataPanel = Ext.getCmp('dataPanel');
		    dataPanel.update( content );
		    
		},
		
		
		showAerodromo : function( record ) {

			var sigla = null;
			if ( record.hasOwnProperty( 'Sigla' ) ) {
				sigla = record.Sigla;
			} else {
				sigla = record.sigla;				
			}
			
			// TESTE
			//var respText = {"id":58040160825162140000,"sigla":"SWIQ","nome":"Mina\u00e7u","pais":{"codigoPais":"BRA","nome":"BRASIL","continente":{"idContinente":3,"nome":"Am\u00e9rica do Sul","area":17757691,"linkWeb":"http://en.wikipedia.org/wiki/South_America","mapcolor":"#00FF00","geom":null,"versao":1374175227526,"emptyLinkWeb":false},"tipo":{"codigo":1,"nome":"Pais Soberano","ordem":1,"mapFields":{"mapColor":{"value":"CC9966","unformattedValue":"#CC9966"},"symbology":24,"geometryTypes":["Polygon"]},"handler":{},"newRecord":false,"hibernateLazyInitializer":{}},"regiao":{"idRegiao":18,"nome":"Am\u00e9rica do Sul","area":17757691,"linkWeb":"http://en.wikipedia.org/wiki/South_America","mapcolor":"#CCFFCC","geom":null,"versao":1374175229159,"emptyLinkWeb":false},"nomeLongoPais":"Brazil","nomeFormalPais":"Rep\u00fablica Federativa do Brasil","observacoes":null,"populacaoEstimada":198739269,"anoPopulacao":null,"area":8459420,"ultimoCenso":2010,"isoa2":"BR","isoa3":"BRA","ison3":"076","linkWeb":"http://en.wikipedia.org/wiki/Brazil; www.google.com.br","podeApagar":false,"versao":1435841340935,"linkWebList":["http://en.wikipedia.org/wiki/Brazil","http://www.google.com.br"],"ddi":"55","nomeAlternativo":null,"nomeEntidadeForDialogMessage":"o Pa\u00eds","emptyLinkWeb":false,"newVersion":false,"brasil":true,"fieldForDialogMessage":"BRASIL"},"estado":{"id":2927,"codigo":"BRA-GO","sigla":"GO","nome":"Goi\u00e1s","iso":"BR-GO","area":341247,"popEstimada":6004045,"observacao":null,"linkWeb":"http://pt.wikipedia.org/wiki/Goi%C3%A1s","versao":1374175264666,"linkWebList":["http://pt.wikipedia.org/wiki/Goi%C3%A1s"],"emptyLinkWeb":false},"cidade":{"idCidade":21644,"nome":"MINA\u00c7U","nomeAlternativo":null,"tipo":{"ordem":4,"idTipoCidades":4,"nome":"Cidade","mapFields":{"mapColor":{"value":"FF00FF","unformattedValue":"#FF00FF"},"mapsymbol":704,"symbol":null}},"populacao":31149,"observacao":null,"linkWeb":"http://cidades.ibge.gov.br/xtras/perfil.php?codmun=5213087","ddd":"62","versao":1374175799975,"distancia":0,"linkWebList":["http://cidades.ibge.gov.br/xtras/perfil.php?codmun=5213087"],"codEstado":2927,"codPais":"BRA","handler":{},"emptyLinkWeb":false,"newRecord":false,"hibernateLazyInitializer":{}},"logradouro":null,"numeroEnd":null,"bairro":null,"cep":null,"caractNotaveis":null,"fonte":null,"infoContato":null,"sumarioPistas":null,"linkWeb":null,"dhCriacao":1472142099016,"versao":1472142099030,"tipo":{"codigo":"AER","nome":"Aeroporto","ordem":1,"mapFields":{"mapColor":{"value":"0000FF","unformattedValue":"#0000FF"},"mapsymbol":473,"symbol":null},"label":"Aeroporto","newRecord":false,"id":"AER"},"orgControladora":null,"distancia":0,"linkWebList":[],"mapFields":{"mapColor":{"value":"0000FF","unformattedValue":"#0000FF"},"mapsymbol":473,"symbol":null},"listCapacidadesLogisticas":[],"listTiposCapacidadeLogistica":[],"anacSlotControlado":false,"anacSituacaoAerodromo":"A","anacAerodromoUtilizacao":{"codigo":"R","nome":"Reservado"},"anacLocalidade":"N","anacAerodromoSituacaoAtualizacao":{"codigo":"A","nome":"A - N\u00e3o Informado"},"nomeEntidadeForDialogMessage":"o Aer\u00f3dromo","emptyLinkWeb":true,"fieldForDialogMessage":"Mina\u00e7u","emptyOrgControladora":true,"newRecord":false}
			//MCLM.Functions.createAerodromoWindow( sigla, respText, record );
			//return true;
			// -------------------------
			
			Ext.Ajax.request({
				url: 'apoloGetAerodromo',
				params: {
					'codigo': sigla,
				},       
				success: function(response, opts) {
					
					var respText = Ext.decode( response.responseText );

					if ( respText.error ) {
						Ext.Msg.alert('Erro', respText.msg );
					} else {
						MCLM.Functions.createAerodromoWindow( sigla, respText, record );
					}

				},
				failure: function(response, opts) {
					Ext.Msg.alert('Erro','Erro ao receber dados.' );
				}

			});				
			
		},
		
		showOrgMil : function( record ) {
			
			Ext.Ajax.request({
				url: 'apoloGetOM',
				params: {
					'orgid': record.id,
				},       
				success: function(response, opts) {
					
					console.log( response.responseText );
					
					var respText = Ext.decode( response.responseText );

					if ( respText.error ) {
						Ext.Msg.alert('Erro', respText.msg );
					} else {
						MCLM.Functions.createOrgMilWindow( respText, record );
					}

				},
				failure: function(response, opts) {
					Ext.Msg.alert('Erro','Erro ao receber dados.' );
				}

			});				
			
		},
		
		openWindowData : function( layerName, record ) {
			
			/*
				public enum WindowType {
					ORGMIL, DEFAULT, AERODROMO
				}			
			*/
			
			if ( record.window_type == 'DEFAULT' ) {
				MCLM.Functions.createSimpleDataWindow( layerName, record );
				MCLM.Functions.mainLog("Janela de Features criada.");
				return true;
			}
			
			
			// update node_data set windowtype = 'ORGMIL' where layername = 'view_org_mil'
			if ( record.window_type == 'ORGMIL' ) {
				MCLM.Functions.showOrgMil( record );
				return true;
			}

			if ( record.window_type == 'AERODROMO' ) {
				MCLM.Functions.showAerodromo( record );
				return true;
			}
			
			
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
		
		showImages : function( imageList ) {
			var imgArr = imageList.split(";");
			
			var table = "<table style='margin:0px;padding:0px;width:100%'>";
			for ( img in imgArr ) {
				var imgLink = "<img style='width:200px;height:200px' src='" + imgArr[img] + "'>";
				table = table + "<tr><td>" + imgLink + "</td></tr>";
				
				console.log( imgLink );
			}
			table = table + "</table>";
			
			
			var	showImagesWindow = Ext.getCmp('showImagesWindow');
			if ( !showImagesWindow ) {
				showImagesWindow = Ext.create('MCLM.view.datawindow.ShowImagesWindow');
			}
			showImagesWindow.update( table );
			showImagesWindow.show();
			
		},
		
		showSymbol : function( url ) {
			var attrValue = '<object id="iconPreview" style="width:100%;height:100%" type="image/svg+xml" data="'+url+'"></object>';
			var	showSymbolWindow = Ext.getCmp('showSymbolWindow');
			if ( !showSymbolWindow ) {
				showSymbolWindow = Ext.create('MCLM.view.datawindow.ShowSymbolWindow');
			}
			showSymbolWindow.update( attrValue );
			showSymbolWindow.show();
		},

		// Cria uma janela de dados simples usando somente os dados vindos da camada WMS (publicado no Geoserver)
		createSimpleDataWindow( layerName, record ) {
			var	dataWindow = Ext.getCmp('dataWindow');
			
			if ( dataWindow ) {
				MCLM.Functions.removeDataWindowTooltip();
				dataWindow.destroy();
			} 	
			
			dataWindow = Ext.create('Ext.Window', {
				id: 'dataWindow',    	
				xtype: 'dataWindow',
				title : layerName + ' (' + record.layer_source + ')',
				width : 555,
				height: 500,
				bodyStyle:{"background-color":"white"},
				autoScroll: true,
				constrain: true,
				renderTo: Ext.getBody(),
				listeners : {
					close : function() {
						MCLM.Functions.removeDataWindowTooltip();
					},
				},
				resizable: false,
			});	

			var metaData = record.mclm_metadata_property;
			
			var content = "<table class='dataWindow'>";
		    for ( var key in record ) {
		    	
		        if ( record.hasOwnProperty( key ) ) {
		        	if ( key != 'id' && key != 'mclm_metadata_property' && key != 'mclm_pk_gid' && key != 'window_type' && key != 'layer_description'
		        			&& key != 'data_window' && key != 'layer_source' && key != 'node_data') {
			        	var value = record[key];
						content = content + "<tr class='dataWindowLine'><td class='dataWindowLeft'>" + key + 
						"</td><td class='dataWindowMiddle'>" + value + "</td></tr>";
		        	}
		        } 
		    }			
			content = content + "</table>";
			
			var dataTabPanel = Ext.create('Ext.Panel', {
				//layout: 'fit',
				width : 525,
				border: false,
				bodyPadding: 2,
				html : content,
				autoHeight: true
			});			

			var windowData = {};
			windowData.windowName = layerName;
			
			dataWindow.add( dataTabPanel );
			
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
			
			dataWindow.updateLayout();	
			dataTabPanel.updateLayout(); 
		    MCLM.Functions.bindDataWindowTooltips();
		    
			
		},
		
		// Cria uma janela de dados complexa, indo ao Banco para requisitar os dados da camada.
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
						theColor = fieldValue.replace('#','');
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

		exibeClima : function( data, record ) {
			var objRecord = Ext.decode( record.mclm_metadata_property );
			var features = new ol.format.GeoJSON().readFeatures( objRecord , {
				//featureProjection: 'EPSG:3857'
			});			
			
			var theFeature = features[0];
		    var aa = theFeature.getGeometry().getExtent();
		    var center = ol.extent.getCenter(aa);			
			
	    	var center2 = center;//ol.proj.transform( center , 'EPSG:3857', 'EPSG:4326');
	    	lon = center2[0];
	    	lat = center2[1];
	    	
	    	//console.log( lon + " " + lat);
	    	
	    	MCLM.Map.getWeatherFromLocation( lat, lon );
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
						target: 'topMainToolBarHomeIcon',
						title: 'Sair',
						text: 'Sair do sistema.',
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
						title: 'Limpar Catálogo',
						text: 'Limpa as camadas selecionadas do Catálogo e o Mapa.',
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
					},{
		    	        target: 'showForecastToolBarID',
		    	        title: 'Serviços Meteorológicos',
		    	        text: 'Ferramentas de Serviços Meteorológicos.',
		    	        width: 180,
		    	        dismissDelay: 5000 
		    	    },{
		    	        target: 'zoomUndo',
		    	        title: 'Voltar Zoom Anterior',
		    	        text: 'Retorna a posição e zoom anterior do mapa.',
		    	        width: 180,
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
