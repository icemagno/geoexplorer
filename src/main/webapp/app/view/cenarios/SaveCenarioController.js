Ext.define('MCLM.view.cenarios.SaveCenarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.savecenario',

    onCloseWindow : function() {
    	var saveCenarioWindow = Ext.getCmp('saveCenarioWindow');
    	saveCenarioWindow.close();
    },
    reloadScenery : function() {
    	var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
    	
		trabalhoTreeStore.load({
			params:{cenario: MCLM.Globals.currentScenery}
		});
		
		
    },
    onSubmitForm : function( button ) {
		var form = button.up('form').getForm();
		var me = this;
		
    	// Talvez o usuario malandro tenha trocado alguma coisa com a janela aberta...
		// Pegar tudo denovo pra garantir. O Zoom e centro atualizam sozinhos
		Ext.getCmp('mapaBaseID').setValue( MCLM.Map.getBaseMapName() );
		Ext.getCmp('servidorBaseID').setValue( MCLM.Map.getBaseServerURL() );
		Ext.getCmp('mapaBaseAtivoID').setValue( MCLM.Map.isBaseMapActive() );
		Ext.getCmp('gradeAtivaID').setValue( MCLM.Map.isGraticuleActive() );
		Ext.getCmp('mapBbox').setValue( MCLM.Map.getMapCurrentBbox() );
		
        if ( form.isValid() ) {
      	  form.submit({
              success: function(form, action) {
            	  
					// Ao criar o cenario novo, o servidor vai responder com o ID dele junto com
					// a mensagem de sucesso.
					MCLM.Globals.currentScenery = action.result.idScenery;
					
					
					var sceneryName = Ext.getCmp('nomeCenarioID').getValue();
			    	var trabalhoTree = Ext.getCmp('trabalhoTree');
			    	var root = trabalhoTree.getRootNode();
			    	root.data.text = sceneryName;
			    	
			    	var painelEsquerdo = Ext.getCmp('painelesquerdo');
			    	painelEsquerdo.setTitle(sceneryName);
			    	
					// Depois de criar o cenario, precisamos salvar a arvore de trabalho. 
					// O ID do cenario recem-criado precisa ja ter retornado.
					var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
					
					if ( trabalhoTreeStore.getCount() > 1 ) { // 1 = So tem o root. Nao faz nada
					
						// Para cada no da arvore que nao eh uma pasta...
						// ... ajusta a transparencia e o index da camada
						trabalhoTreeStore.data.each( function( item, index, totalItems ) {
					        var layerName = item.get('layerName');
					        var serialId = item.get('serialId');
					        var layerType = item.get('layerType');
					        var layers = MCLM.Map.getLayers();
					        var length = layers.getLength(); 
					        	
					        if ( (layerType != 'FDR') && serialId) {

								for (var i = 0; i < length; i++) {
									var serial = layers.item(i).get('serialId');
									var opacity = layers.item(i).getOpacity() * 10;
									
									if (serial === serialId) {
							        	item.set("transparency", opacity );
							        	item.set("layerStackIndex", i );
							        	
									}
								}		        
								
					        }
					        
					    });	
						
						
						
						trabalhoTreeStore.sync({
							 params: {
							 	cenario: MCLM.Globals.currentScenery
							 },
						     success: function (batch, options) {
						    	 Ext.Msg.alert('Sucesso', 'Cenário criado com sucesso.', me.onCloseWindow);
						    	 me.reloadScenery();
							 },
							 failure: function (batch, options){
							    Ext.Msg.alert('Falha ao gravar camadas do Cenário', 'Erro desconhecido ao gravar camadas do cenário', me.onCloseWindow);
							 }						 
						});
					} else {
						Ext.Msg.alert('Sucesso', 'Cenário gravado, porém não possui camadas.', me.onCloseWindow);
					}
            	  
                 
              },
              failure: function(form, action) {
                 Ext.Msg.alert('Falha ao gravar Cenário', action.result.msg, me.onCloseWindow);
              }                		  
      	  });
        } else { 
            Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
        }    	
    	
    	
    	
    }
    
});