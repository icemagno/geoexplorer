Ext.define('MCLM.view.addlayer.kml.UploadKmlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uploadKml',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addlayer.Kml.UploadKmlForm' 
            '#uploadKmlFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addlayer.Kml.UploadKmlForm' 
            '#closeUploadKmlWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var uploadKmlWindow = Ext.getCmp('uploadKmlWindow');
    	uploadKmlWindow.close();
    },
    
    submitForm : function( ) {
    	var me = this;
    	
		var uploadKmlForm = Ext.getCmp('uploadKmlForm');
		var form = uploadKmlForm.getForm();        
        
        if( form.isValid() ){
            
        	form.submit({
                url: 'newKmlLayer',
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