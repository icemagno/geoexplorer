Ext.define('MCLM.Application', {
    extend: 'Ext.app.Application',
    
    name: 'MCLM',

    requires: [
       'MCLM.view.main.TelaPrincipal',
       'MCLM.Globals',
       'MCLM.Functions',
       'MCLM.DrawHelper',
       'MCLM.RouteHelper',
       'MCLM.ClimaHelper',
       'MCLM.view.photo.PhotoHelper',
       
    ],
    
    stores: [
       'MCLM.store.LayerTree',
       'MCLM.store.ExternalSource',
       'MCLM.store.PostgreSource',
       'MCLM.store.LayerStack',
       'MCLM.store.Capabilities',
       'MCLM.store.TrabalhoTree',
       'MCLM.store.Scenery',
       'MCLM.store.RouteResult',
       'MCLM.store.Tables',
       'MCLM.store.PostgreTable',
       'MCLM.store.Dictionary',
       'MCLM.store.Styles',
       'MCLM.store.DataPanels',
    ],
    
    onCloseWindow : function() {
    	location.href = 'http://apolo.defesa.mil.br/';
    },    
   
    launch: function () {
        var me = this;
        
        
        Ext.define('Ext.form.PasswordField', {
            extend: 'Ext.form.field.Base',
            alias: 'widget.passwordfield',
            inputType: 'password',
        });        
        
    	Ext.Ajax.on("beforerequest", function (conn, options, eOpts) {
    		MCLM.Functions.showMainLoadingIcon( options.url );
    		
    		conn.setUseDefaultXhrHeader(false);
    		conn.setWithCredentials(true);
        });    	
    	
    	Ext.Ajax.on("requestcomplete", function(conn, options, eOpts){
    		MCLM.Functions.hideMainLoadingIcon();
        });    	
    	
    	Ext.Ajax.on('requestexception', function (con, resp, op, e) {
    		$("#mainLoadingInfo").text( "" );
    		$("#mainLoadingIcon").css('display','none');
           if (resp.status === 401) {
               Ext.Msg.alert('Falha de autenticação','A sessão de usuário expirou!', me.onCloseWindow);
           }
           if (resp.status === 403) {
        	   location.href = 'http://apolo.defesa.mil.br/';
               //Ext.Msg.alert('Falha de autenticação','O MCLM não pode ser acessado diretamente. Use o sistema APOLO!', me.onCloseWindow );
           }
    	});    	
    	
    	
		Ext.Ajax.request({
			url: 'getConfig',
			success: function(response, opts) {
				var config = Ext.decode(response.responseText);
				
				// O Mapa é inicializado em 'MCLM.view.paineis.PainelCentral' no 
				// metodo 'afterRender'.
				
				
				// Nao modifique a ordem das chamadas abaixo
				
				/* 1. */ MCLM.Globals.config = config;				// A aplicacao precisa das configuracoes
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
				    	
				    	// Icone piscante da tela de rotas
				    	setInterval( function() {
				    		if ( !MCLM.Globals.routeBlinkEnabled ) return true;
				    		$("#"+MCLM.Globals.selectRouteActiveIcon).fadeTo(250, 0.2).fadeTo(250, 1.0); 
				    	}, 1000);					    	
				
				/* 5. */ MCLM.view.photo.PhotoHelper.init();		// inicializa o Mapilary
				
				
				/* 6. */ $("#topMainToolBarUserName").html( config.user.name );
						 $("#topMainToolBarUserNameName").html( config.user.userName );
				/* 7. */ //$("#osmSource").html( config.geoserverUrl );
				
		        // ---------------------------------------------
			},
			failure: function(response, opts) {
				//
			}
			
		});

    },


});
