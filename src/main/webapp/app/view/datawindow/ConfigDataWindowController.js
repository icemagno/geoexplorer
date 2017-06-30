Ext.define('MCLM.view.datawindow.ConfigDataWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.configDataWindow',

    
    getTableSchema : function( ) {
    	var tableName = Ext.getCmp("tableName").getValue();
    	var serverAddress = Ext.getCmp("serverAddress").getValue();
    	var databaseName = Ext.getCmp("databaseName").getValue();
    	var password = Ext.getCmp("password").getValue();
    	var user = Ext.getCmp("user").getValue();
    	var serverPort = Ext.getCmp("serverPort").getValue();
    	var dataWindowName = Ext.getCmp("dataWindowName").getValue();
    	
    	if ( !tableName || !serverAddress || !databaseName || !user || !serverPort ) {
    		Ext.Msg.alert('Erro','Preencha todos os campos solicitados.');
    		return true;
    	}
    	
    	var configDataWindow = Ext.getCmp('configDataWindow');
    	var dataWindowData = {};
    	dataWindowData.nodeData = configDataWindow.nodeData; 
    	
    	var idNodeData = configDataWindow.nodeData.idNodeData;
    	
   	
    	var layerType = configDataWindow.nodeData.layerType;
    	var layerAlias = configDataWindow.nodeData.layerAlias;
    	
    	var windowData = {};
    	windowData.tableName = tableName;
    	windowData.dataWindowName = dataWindowName;
    	windowData.serverAddress = serverAddress;
    	windowData.databaseName = databaseName;
    	windowData.password = password;
    	windowData.user = user;
    	windowData.serverPort = serverPort;

    	dataWindowData.windowData = windowData;
    	
		Ext.Ajax.request({
		       url: 'getTableSchema',
		       params: {
		           'tableName': tableName,
		           'dataWindowName': dataWindowName,
		           'serverAddress' : serverAddress,
		           'databaseName' : databaseName,
		           'password' : password,
		           'user' : user,
		           'serverPort' : serverPort,
		           'idNodeData' : idNodeData,
		       },       
		       success: function(response, opts) {
		    	   var respObj = Ext.decode( response.responseText );
		    	   
		    	   if ( respObj.error ) {
		    		   Ext.Msg.alert('Erro', respObj.msg );
		    		   return false;
		    	   }
		    	   
		    	   
		    	   var attributes = respObj.attributes;
		    	   var dictionaryIds = respObj.dictionaryIds;
		    	   
		    	   //dataWindowData.fields = attributes;
		    	   dataWindowData.dictionaryIds = dictionaryIds;

		    	   var dataPanelsStore = Ext.getStore('store.DataPanels');
		    	   dataPanelsStore.load([{}]);		    	   

		    	   
		    	   var configDataPanels = Ext.getCmp('configDataPanels');
		    	   if ( configDataPanels ) {
		    		   configDataPanels.close();
		    		   configDataPanels.destroy();
		    	   }
		    	   
		    	   configDataPanels = Ext.create('MCLM.view.datawindow.ConfigDataPanels');
		    	   configDataPanels.dataWindowData = dataWindowData;
		    	   configDataPanels.show();
		    	   
		    	   var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
		    	   var root = configDataPanelsTree.getRootNode();
		    	   root.set('text', dataWindowName);

		    	   var firstFolder = {
	    		        'text': 'Painel 1',
	    		        'id': 'panel1',
	    		        'leaf' : false,
	    		        'iconCls': 'panel-icon'
	    		   };
		    	   root.appendChild( firstFolder );
		    	   firstFolder = dataPanelsStore.getNodeById('panel1');
		    	   
		    	   var count = 0;
		    	   var targetFolder = firstFolder;
		     	   for(var i = 0; i < attributes.length; i++) { 
		     		  var columnName = attributes[i].columnName;
		     		  var dataType = attributes[i].dataType;
		     		  var translatedName = attributes[i].translatedName;
		     		  
		     		  if( count == 5 ) {
		     			  count = 0;
		     			  var idNumber = root.childNodes.length + 1;
		     			  targetFolder = {
     				        'text' : 'Painel ' + idNumber,
     				        'id'   : 'panel' + idNumber,   
							'leaf' : false,
							'iconCls': 'panel-icon'
		     			  };
		     			  root.appendChild( targetFolder );
		     			  targetFolder = dataPanelsStore.getNodeById('panel' + idNumber);		     			  
		     		  }
		     		  
		     		  var newNode = {
		    		        'text'		 : columnName,
		    		        'id'		 : 'id_' + columnName,
		    		        'leaf' 		 : true,
		    		        'columnName' : columnName,
		    		        'dataType'   : dataType,
		    		        'newName'    : translatedName,
		    		        'newType'    : 'TEXT',
		    		        'isId'     : 'Não',
		    		        'iconCls'    : 'field-icon'
		    		  };
		     		  
		     		  targetFolder.appendChild( newNode );
		     		  count++;  
		     	   }		    	   
		     	   root.expand();
		     	   
		     	   var ids = "";
		     	   for ( var zz = 0; zz < dictionaryIds.length; zz++ ) {
		     		   ids = ids + dictionaryIds[zz].fieldName;
		     		   if ( zz < dictionaryIds.length -1 ) ids = ids + ", ";
		     	   }
		     	   
		    	   var dataPanelsDetails = Ext.getCmp('dataPanelsDetails');
		    	   dataPanelsDetails.update('<table class="dataWindow" style="border:0px;width:100%;height:30px">' + 
		    			   '<tr class="dataWindowLine">' +
		    			   		'<td class="dataWindowLeft">'+ tableName + '</td>' + 
		    			   		'<td class="dataWindowLeft">'+ ids  +'</td>' + 
		    			   		'<td class="dataWindowLeft">'+databaseName+'@'+serverAddress+'</td>'+
		    			   	'</tr>' +	
		    			   '<tr class="dataWindowLine">' +
		    			   		'<td class="dataWindowLeft">('+layerType + ') ' + layerAlias + '</td>' +
		    			   		'<td id="dataWindowIdAttrs" class="dataWindowLeft">&nbsp;</td>' +
		    			   		'<td class="dataWindowLeft">&nbsp;</td>' + 
		    			   		'</tr>' +
		    			   '</table>');		     	   
	     	   
		       },
		       failure: function(response, opts) {
		    	   Ext.Msg.alert('Erro','Erro ao receber dados da Tabela "' + tableName + '".' );
		       }		       
		});    	
		
		
		var configDataWindow = Ext.getCmp('configDataWindow');
		configDataWindow.close();			
		configDataWindow.destroy();			
    },
    
});