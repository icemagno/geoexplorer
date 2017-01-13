Ext.define('MCLM.view.config.ConfigController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.config',
    
    onCloseConfigForm : function( button ) {
    	var configWindow = Ext.getCmp('configWindow');
    	configWindow.close();    	
    },
    
    onCloseMessage : function( ) {
    	var configWindow = Ext.getCmp('configWindow');
    	configWindow.close();  
    	location.reload();
    },
    
	onSubmitConfigForm : function( button ) {
		var me = this;
	
		var form = button.up('form').getForm();
		
        if ( form.isValid() ) {
      	  form.submit({
              success: function(form, action) {
                 Ext.Msg.alert('Sucesso', action.result.msg, me.onCloseMessage);
              },
              failure: function(form, action) {
                 Ext.Msg.alert('Failed', action.result.msg, me.onCloseMessage);
              }                		  
      	  });
        } else { 
            Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
        }
        
	}
    
    
});