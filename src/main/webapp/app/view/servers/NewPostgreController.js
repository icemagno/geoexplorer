Ext.define('MCLM.view.servers.NewPostgreController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.newPostgreController',
    
    closeWindow : function( button ) {
    	var newPostgreWindow = Ext.getCmp('newPostgreWindow');
    	newPostgreWindow.close();
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
			    	var postgresource = Ext.getStore('store.postgresource');
			    	postgresource.load();
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