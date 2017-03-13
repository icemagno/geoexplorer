Ext.define('MCLM.view.servers.ServersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.serversController',
    
    // ----------------------------------------------------------------------------------------------	
    addPostgreSource : function() {
    	var newPostgreWindow = Ext.getCmp('newPostgreWindow');
    	if ( newPostgreWindow ) return;
    	newPostgreWindow = Ext.create('MCLM.view.servers.NewPostgreWindow');
    	newPostgreWindow.show();
    	Ext.getCmp('newPostgreName').focus(true, 100);
    },
    // ----------------------------------------------------------------------------------------------	
    addPgTable : function() {
    	var postgresGrid = Ext.getCmp('postgresGrid');
    	var me = this;    
    	if ( postgresGrid.getSelectionModel().hasSelection() ) {
    		var row = postgresGrid.getSelectionModel().getSelection()[0];
			var idServer = row.get('idServer');
			var name = row.get('name');

	    	var newPostgreTableWindow = Ext.getCmp('newPostgreTableWindow');
	    	if ( newPostgreTableWindow ) return;
	    	newPostgreTableWindow = Ext.create('MCLM.view.servers.NewPostgreTableWindow');
	    	newPostgreTableWindow.show();
	    	newPostgreTableWindow.setTitle('Nova Tabela para a Fonte Externa "' + name + '"');
	    	Ext.getCmp('newPostgreTableName').focus(true, 100);
	    	Ext.getCmp('newPostgreTableIdServer').setValue( idServer );
			
    	} else {
			Ext.Msg.alert('Fonte não selecionada','Selecione uma Fonte Externa PostgreSQL na lista e tente novamente.' );
    	}	
    },
    // ----------------------------------------------------------------------------------------------	
    askDeletePgTable : function() {
    	var postgresTablesGrid = Ext.getCmp('postgresTablesGrid');
    	var me = this;    
    	if ( postgresTablesGrid.getSelectionModel().hasSelection() ) {
    		var row = postgresTablesGrid.getSelectionModel().getSelection()[0];
			var id = row.get('idTable');
			var name = row.get('name');
			
			// ...
			alert( id + " " + name );
			
    	} else {
			Ext.Msg.alert('Tabela não selecionada','Selecione uma Tabela na lista e tente novamente.' );
    	}	
    	/*

			var row = postgresGrid.getSelectionModel().getSelection()[0];
			var id = row.get('idServer');
			var name = row.get('name');
			var postgresource = Ext.getStore('store.postgresource');
			
			Ext.Msg.confirm('Remover Fonte Externa PostgreSQL', 'Deseja realmente remover a Fonte Externa PostgreSQL "' + name + '" ?', function(btn){
				   if( btn === 'yes' ){
					   me.deleteExternalSource( id, name, 'PGR', postgresource );
				   } else {
				      return;
				   }
			 });	
    		
    	} else {
			Ext.Msg.alert('Fonte não selecionada','Selecione uma Fonte Externa PostgreSQL na lista e tente novamente.' );
		}	
    	*/
    	
    },
    // ----------------------------------------------------------------------------------------------	
    addExternalSource : function() {
    	var newServerWindow = Ext.getCmp('newServerWindow');
    	if ( newServerWindow ) return;
    	newServerWindow = Ext.create('MCLM.view.servers.NewServerWindow');
    	newServerWindow.show();
    	Ext.getCmp('newServerName').focus(true, 100);
    },    	
    // ----------------------------------------------------------------------------------------------	
    askDeletePostgreSource : function() {
    	var postgresGrid = Ext.getCmp('postgresGrid');
    	var me = this;    
    	if ( postgresGrid.getSelectionModel().hasSelection() ) {

			var row = postgresGrid.getSelectionModel().getSelection()[0];
			var id = row.get('idServer');
			var name = row.get('name');
			var postgresource = Ext.getStore('store.postgresource');
			
			Ext.Msg.confirm('Remover Fonte Externa PostgreSQL', 'Deseja realmente remover a Fonte Externa PostgreSQL "' + name + '" ?', function(btn){
				   if( btn === 'yes' ){
					   me.deleteExternalSource( id, name, 'PGR', postgresource );
				   } else {
				      return;
				   }
			 });	
    		
    	} else {
			Ext.Msg.alert('Fonte não selecionada','Selecione uma Fonte Externa PostgreSQL na lista e tente novamente.' );
		}	
    	
    	
    },
    askDeleteExternalSource : function() {
    	var externalGrid = Ext.getCmp('serversGrid');
    	var me = this;
    	
		if ( externalGrid.getSelectionModel().hasSelection() ) {
			var row = externalGrid.getSelectionModel().getSelection()[0];
			var id = row.get('idServer');
			var name = row.get('name');
			var externalsource = Ext.getStore('store.externalsource');
			
			Ext.Msg.confirm('Remover Fonte Externa', 'Deseja realmente remover a Fonte Externa "' + name + '" ?', function(btn){
				   if( btn === 'yes' ){
					   me.deleteExternalSource( id, name, 'WMS', externalsource );
				   } else {
				      return;
				   }
			 });	
		    
		} else {
			Ext.Msg.alert('Fonte não selecionada','Selecione uma Fonte Externa na lista e tente novamente.' );
		}	
	},   
    // ----------------------------------------------------------------------------------------------	
    deleteExternalSource : function( id, name, type, store ) {
    	
    	Ext.Ajax.request({
 	       url: 'deleteExternalSource',
 	       params: {
 	           'idServer': id,
 	           'type' : type
 	       },       
 	       success: function(response, opts) {
 	    	   var resp = JSON.parse( response.responseText );
 	    	   if ( resp.success ) {
 	    		   store.load();
 	    		   Ext.Msg.alert('Sucesso','Fonte Externa ' + name + ' removida com sucesso.' );
 	    	   } else {
 	    		   Ext.Msg.alert('Falha', resp.msg );
 	    	   }  
 	       },
 	       failure: function(response, opts) {
 	    	   Ext.Msg.alert('Falha','Erro ao excluir Fonte Externa.' );
 	       }
     	});	
    			
	}      
    
});