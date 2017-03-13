Ext.define('MCLM.view.addlayer.dta.DataLayerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dataLayer',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addlayer.dta.DataLayerForm' 
            '#dataLayerFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addlayer.dta.DataLayerForm' 
            '#closeDataLayerWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var uploadKmlWindow = Ext.getCmp('dataLayerWindow');
    	uploadKmlWindow.close();
    },
    
    submitForm : function( ) {
    	var me = this;
    	
		var dataLayerForm = Ext.getCmp('dataLayerForm');
		var form = dataLayerForm.getForm();        
        
        if( form.isValid() ){
            
        	form.submit({
                url: 'newDtaLayer',
                success: function( form, action ) {
                	var layerTree = Ext.getCmp('layerTree');
        	  		var selectedTreeNode = layerTree.getSelectionModel().getSelection()[0];
			  		var layerTreeStore = Ext.getStore('store.layerTree');
			  		layerTreeStore.load( { node: selectedTreeNode } );
			  		me.closeWindow();
                	Ext.Msg.alert('Sucesso', action.result.msg);
                },
              	failure: function(form, action) {
              		me.closeWindow();
              		Ext.Msg.alert('Falha', action.result.msg);
                       
              	} 
            });
        	
        }
    }
    
    
    
});