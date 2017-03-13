Ext.define('MCLM.view.servers.NewPostgreTableController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.newPostgreTableController',
    
    closeWindow : function( button ) {
    	var newPostgreTableWindow = Ext.getCmp('newPostgreTableWindow');
    	newPostgreTableWindow.close();
    },
    
    commitForm : function( button ) {
    	var me = this;
        var win = button.up('window');
        var formPanel = win.down('form');
        var form = formPanel.getForm();
        
		if ( formPanel.isValid() ) {
			formPanel.submit({
                method: 'POST',
			    success: function(form, action) {
			        Ext.Msg.alert('Sucesso', action.result.msg);
			    	var postgresource = Ext.data.StoreManager.lookup('store.postgresource');
			    	postgresource.load();
			    	
					var postgreTable = Ext.data.StoreManager.lookup('store.postgreTable');
					postgreTable.load([]);			    	
			    	
			        me.closeWindow();
			    },
			    failure: function(form, action) {
			        Ext.Msg.alert('Falha', action.result.msg);
			        me.closeWindow();
			    }                		  
			});
		  } else { 
		      Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
		  }
		
    },    	
    	
    
});