Ext.define('MCLM.Application', {
    extend: 'Ext.app.Application',
    
    name: 'MCLM',

    requires: [
       'MCLM.view.main.TelaPrincipal',
       'MCLM.Globals',
       'MCLM.Functions'
    ],
    
    
    stores: [
       'MCLM.store.LayerTree',
       'MCLM.store.LayerDetail',
       'MCLM.store.ExternalSource',
       'MCLM.store.PostgreSource',
       'MCLM.store.LayerStack',
       'MCLM.store.Capabilities',
       'MCLM.store.TrabalhoTree',
       'MCLM.store.Scenery',
       'MCLM.store.RouteResult',
       'MCLM.store.Tables',
    ],
   
    launch: function () {
        
    	Ext.Ajax.on("beforerequest", function (con) {
            con.setUseDefaultXhrHeader(false);
            con.setWithCredentials(true);
        });    	
    	
    	
    	Ext.Ajax.on('requestexception', function (con, resp, op, e) {
           if (resp.status === 401) {
               Ext.Msg.alert('','A sessão de usuário expirou!');
           }
           if (resp.status === 403) {
               Ext.Msg.alert('','Este usuário não tem permissão de acesso a esta funcionalidade!');
           }
    	});    	
    	
    	
		Ext.Ajax.request({
			url: 'getConfig',
			success: function(response, opts) {
				var config = Ext.decode(response.responseText);
				
				// Nao modifique a ordem das chamadas abaixo
				
				/* 1. */ MCLM.Globals.config = config;				// A aplicacao precida das configuracoes
				/* 2. */ Ext.create({ xtype: 'telaPrincipal' });	// 
				/* 3. */ MCLM.Functions.inicializaDicas();			// As dicas dos botoes precisam dos botoes instanciados

				
				/* 4. */
						// Expande a arvore principal ( nao coloque automatico na arvore por causa da autenticacao)
						var layerTree = Ext.getCmp('layerTree');
				    	var root1 = layerTree.getRootNode();
				    	root1.expand();
				    	
				    	// Expande a arvore de trabalho ( nao coloque automatico na arvore por causa da autenticacao)
				    	var trabalhoTree = Ext.getCmp('trabalhoTree');
				    	var root2 = trabalhoTree.getRootNode();
				    	root2.expand();
				    	
				    	setInterval( function() {
				    		if ( !MCLM.Globals.routeBlinkEnabled ) return true;
				    		$("#"+MCLM.Globals.selectRouteActiveIcon).fadeTo(250, 0.2).fadeTo(250, 1.0); 
				    	}, 1000);					    	
				
				
		        // ---------------------------------------------
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Erro ao receber a configuração do servidor' );
			}
			
		});

    },


});
