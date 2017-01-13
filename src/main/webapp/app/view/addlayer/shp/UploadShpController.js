Ext.define('MCLM.view.addlayer.shp.UploadShpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uploadShp',
   
    init : function(app) {
        this.control({
        	// Intercepta o evento 'click' do botao 'Enviar' do painel 'MCLM.view.addlayer.shp.UploadShpForm' 
            '#uploadShpFormSubmit' : {
            	click: this.submitForm 
            },
        	// Intercepta o evento 'click' do botao 'Fechar' do painel 'MCLM.view.addlayer.shp.UploadShpForm' 
            '#closeUploadShpWindow' : {
            	click: this.closeWindow 
            },
            
        })
    },
    
    closeWindow : function() {
    	var uploadShpWindow = Ext.getCmp('uploadShpWindow');
    	uploadShpWindow.close();
    },
    
    submitForm : function( ) {
    	var me = this;
    	
		var uploadShpForm = Ext.getCmp('uploadShpForm');
		var form = uploadShpForm.getForm();        
        
        if( form.isValid() ){
            
        	form.submit({
                url: 'newSHPLayer',
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