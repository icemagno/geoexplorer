Ext.define('MCLM.view.apolo.feicoes.AreasNotaveisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.areasNotaveis',


    
    closeAnWindow : function() {
    	Ext.getCmp("anWindow").close();
    },
    
    
    submitAn : function() {
    	var me = this;
    	
		Ext.Ajax.request({
		       url: 'newFeicao',
		       params: {
		           'data': data,
		       },       
		       success: function(response, opts) {
		    	   Ext.Msg.alert('Sucesso','Feição gravada com sucesso.' );
		    	   Ext.getCmp("drawToolBar").close();
		       },
		       failure: function(response, opts) {
		    	   Ext.Msg.alert('Erro','Erro ao gravar Feição.' );
		       }
		});
		
    	
    }
    
});