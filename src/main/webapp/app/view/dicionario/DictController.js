Ext.define('MCLM.view.dicionario.DictController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictionary',
    
    onCloseConfigForm : function( button ) {
    	var dictWindow = Ext.getCmp('dictWindow');
    	dictWindow.close();    	
    },
    
    onCloseMessage : function( ) {
    	var dictWindow = Ext.getCmp('dictWindow');
    	dictWindow.close();  
    },
    
    saveDictionary : function( button ) {
    	var dictionaryStore = Ext.data.StoreManager.lookup('store.dictionary');
    	dictionaryStore.sync({
			 params: {
				 	//cenario: MCLM.Globals.currentScenery
			 },
			 success: function (batch, options) {
				 Ext.Msg.alert('Sucesso', 'Dicionário gravado.' /*, me.onCloseMessage */ );
				 
			 },
			 failure: function (batch, options){
			 	Ext.Msg.alert('Falha ao gravar Dicionário', 'Erro desconhecido ao gravar dicionário' /*, me.onCloseMessage */ );
			 }						 
    	});
    	
    	
    	
    	Ext.Msg.alert('Funcionalidade não implementada','Não implementado ainda.' );
        
	}
    
    
});