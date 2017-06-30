Ext.define('MCLM.view.datawindow.CloneToCenarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cloneToCenario',

   
    doClone : function( ) {
    	var styleCombo = Ext.getCmp("idFeicaoStyle").getValue();
    	var feicaoNome = Ext.getCmp("feicaoNome").getValue();
    	var feicaoDescricao = Ext.getCmp("feicaoDescricao").getValue();
    	
    	if ( !feicaoNome || !feicaoDescricao ) {
    		Ext.Msg.alert('Erro','Preencha todos os campos solicitados.');
    		return true;
    	}
    	
    	
    	var cloneToCenarioWindow = Ext.getCmp('cloneToCenarioWindow');
    	var obj = cloneToCenarioWindow.feicao;

    	obj.features[0].properties.feicaoNome = feicaoNome;
    	obj.features[0].properties.feicaoDescricao = feicaoDescricao;
    	
    	
    	var feicao = Ext.encode( obj );
    	
		Ext.Ajax.request({
		       url: 'newFeicao',
		       params: {
		           'data': feicao,
		           'idFeatureStyle' : styleCombo
		       },       
		       success: function(response, opts) {
		    	   
		    	   var respObj = Ext.decode( response.responseText );
		    	   
		    	   if( respObj.success ) {
		    		   
		    		   
		    		   // A feicao foi gravada no banco. Cria um no para ela na arvore do cenario
		    		   var layerAlias = respObj.layerAlias;
		    		   var serialId = "FE" + MCLM.Functions.guid().substring(1, 8);
		    		   var trabalhoTree = Ext.getCmp('trabalhoTree');
		    		   var root = trabalhoTree.getRootNode();
		    		   
		    		   var idLayer = respObj.idLayer;
		    		   var newFeicao = respObj.feicao;
		    		   
		    		   // **************************************************
	                	var layerTree = Ext.getCmp('layerTree');
			    		var rootMaintree = layerTree.getRootNode();
			    		var feicaoRootNode = null;
			    		
			    		rootMaintree.cascadeBy( function(n) { 
			    			if ( n.get('layerType') == 'CRN' ) {
			    				feicaoRootNode = n;
			    			}
			    		});					    		
			    		
			    		if ( feicaoRootNode.get('expanded')  ) {
					  		var layerTreeStore = Ext.getStore('store.layerTree');
					  		layerTreeStore.load( { node: feicaoRootNode } );
			    		}
		    		   // **************************************************		    		   
		    		   
		    		   
		    		   var newId = 0;
		    		   root.cascadeBy( function(n) { 
				    		var temp = n.get('id');
				    		if ( temp > newId ) newId = temp;
		    		   });
		    		   newId++;
		    		   
		    		   newNode =  root.appendChild({
		    			   'id' : newId,
		    			   'text' : obj.features[0].properties.feicaoNome,
		    			   'layerAlias' : layerAlias,
		    			   'layerName' : obj.features[0].properties.feicaoNome,
		    			   'layerType' : 'FEI',
		    			   'description' : obj.features[0].properties.feicaoDescricao,
		    			   'readOnly' : false,
		    			   'checked' : false,
		    			   'selected' : false,
		    			   'institute' : obj.features[0].properties.feicaoTipo,
		    			   'indexOrder' : 0,
		    			   'iconCls' : 'fei-icon',
		    			   'leaf' : true,
		    			   'idNodeParent' : 0,
		    			   'serialId' : serialId,
		    			   'idNodeData' : idLayer,
		    			   'feicao' : newFeicao
		    		   });			    		   
		    		   
		    		   // Torna a aba de cenario ativa, caso nao esteja
		    		   var painelEsquerdo = Ext.getCmp("painelesquerdo");
		    		   var tabTrabalho = Ext.getCmp("abaTrabalho"); 
		    		   painelEsquerdo.setActiveTab(tabTrabalho);
		    		   
		    		   Ext.Msg.alert('Sucesso','Elemento gravada com sucesso.');
		    		   
		    		   
		    		   
		    	   } else {
		    		   Ext.Msg.alert('Erro','Erro ao gravar Elemento: ' + respObj.msg );
		    	   }
		    	   
		       },
		       failure: function(response, opts) {
		    	   var respObj = Ext.decode( response.responseText );
		    	   Ext.Msg.alert('Erro','Erro ao gravar Elemento: ' + respObj.msg );
		       }		       
		});    	
		
    },
    
});