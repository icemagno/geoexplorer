Ext.define('MCLM.view.addlayer.tif.UploadTifController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uploadTif',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addlayer.Tif.UploadTifForm' 
            '#uploadTifFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addlayer.Tif.UploadTifForm' 
            '#closeUploadTifWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var uploadTifWindow = Ext.getCmp('uploadTifWindow');
    	uploadTifWindow.close();
    },
    
    submitForm : function( ) {
    	var me = this;
    	
		var uploadTifForm = Ext.getCmp('uploadTifForm');
		var form = uploadTifForm.getForm();        
        
        if( form.isValid() ){
            
        	form.submit({
                url: 'newTIFLayer',
                waitMsg: 'Enviando arquivo...',
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