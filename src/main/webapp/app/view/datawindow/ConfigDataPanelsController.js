Ext.define('MCLM.view.datawindow.ConfigDataPanelsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.configDataPanels',

    doAddFolder : function( button ) {
    	var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
    	var root = configDataPanelsTree.getRootNode();
	   
    	var idNumber = root.childNodes.length + 1;
    	
    	var anotherFolder = {
		        'text': 'Painel ' + idNumber,
		        'id': 'panel' + idNumber,         
		        'leaf' : false,
		        'iconCls': 'panel-icon'
    	};
    	root.appendChild( anotherFolder );
	   
    },
    
    saveWindow : function( button ) {
    	var configDataPanels = Ext.getCmp('configDataPanels');
    	var dataWindowData = configDataPanels.dataWindowData;    	
    	var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
    	var dataPanelsStore = Ext.getStore('store.DataPanels');
    	
    	dataWindowData.windowIds = configDataPanelsTree.fieldsId;
    	
    	var buff = [];
    	configDataPanelsTree.expandAll();
    	var foundAnId = false;
    	dataPanelsStore.each( function(record) {
    		if ( !record.data.root ) {
		    		var obj = {};
		    		obj.text = record.data.text;
		    		obj.index = record.data.index;
		    		obj.id = record.data.id;
		    		obj.parentId = record.data.parentId;
		    		obj.columnName = record.data.columnName;
		    		obj.dataType = record.data.dataType;
		    		obj.newName = record.data.newName;
		    		obj.newType = record.data.newType;
		    		obj.isId = record.data.isId;
		    		if ( obj.isId == 'Sim' ) {
		    			foundAnId = true;
		    		}
		    		buff.push ( obj );
	    	}
    	});

    	if( !foundAnId ) {
    		Ext.Msg.alert('Erro','Nenhum atributo foi marcado como Identificador. Não será possível estabelecer relação entre esta Janela e a camada selecionada.'+
    				' Marque ao menos um atributo que se relacione com os identificadores da camada.');
    		return false;
    	}
    	
    	dataWindowData.nodes = buff;
		Ext.Ajax.request({
		       url: 'saveDataWindow',
		       params: {
		           'dataWindowData': Ext.encode( dataWindowData ),
		       },       
		       success: function(response, opts) {
		    	   var respObj = Ext.decode( response.responseText );
		    	   
		    	   if ( respObj.error ) {
		    		   Ext.Msg.alert('Erro', respObj.msg );
		    		   return false;
		    	   }
		    	   
		    	   if ( respObj.success ) {
		    		   Ext.Msg.alert('Concluído', 'Janela gravada com sucesso.' );
		    		   configDataPanels.close();
		    		   configDataPanels.destroy();
		    		   return false;
		    	   }		    	   
		    	   
		       },
		       failure: function(response, opts) {
		    	   Ext.Msg.alert('Erro','Erro gravando dados da Janela.' );
		       }		       
		});     	
    	
    	
    },
    

 
});