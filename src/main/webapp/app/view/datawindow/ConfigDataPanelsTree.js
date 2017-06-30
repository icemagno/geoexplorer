Ext.define('MCLM.view.datawindow.ConfigDataPanelsTree', {
	extend: 'Ext.tree.TreePanel',
	xtype: 'view.configDataPanelsTree',
	id: 'configDataPanelsTree',
	
    store: 'store.DataPanels',
    rootVisible: true,
    animate : false,
    
	width : 800,
	height: 400,
    
    region:'south',
    
	requires: [
	   'MCLM.view.datawindow.ConfigDataPanelsTreeController'
	],     
	controller : 'configDataPanelsTreeController',
    
    
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        listeners: {
            beforeedit: function( e, editor, options ){
            	var isLeaf =  editor.record.get("leaf") ;
                if ( !isLeaf ) return false;
            }
        }        
    },
    
    
    columns: [{
        xtype: 'treecolumn', 
        text: 'Nome',
        dataIndex: 'text',
        width : 260,
        sortable: false
    },{
        text: 'Título', 
        dataIndex: 'newName',
        sortable: false,
        width : 200,
        editor: {
            xtype: 'textfield'
        }        
    },{
        text: 'Tipo Original', 
        dataIndex: 'dataType', 
        sortable: false,
    },{
        text: 'Novo Tipo', 
        dataIndex: 'newType', 
        sortable: false,
        queryMode: 'local',
        editor: {
			xtype: 'combobox',
			store:['TEXT','COLOR','URL','SYMBOL'],	
        }        
    },{
        text: 'Identificador', 
        dataIndex: 'isId', 
        sortable: false,
        editor: {
			xtype: 'combobox',
			store:['Sim','Não'],
			listeners : {
			    change : function(field, newVal, oldVal) {
			    	var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
			    	var selectedNode = configDataPanelsTree.getSelectionModel().getSelection()[0];
			    	
			    	configDataPanelsTree.fieldsId = [];
			    	var fieldsId = "";
			    	var virgula = "";
			    	var fieldName = selectedNode.get("text");
			    	var root = configDataPanelsTree.getRootNode();
			    	root.cascadeBy( function( currentChild ) {
			    		var fieldIsId = currentChild.get("isId");			    		
			    		var currentFieldName = currentChild.get("text");
			    		
				    	if ( (currentFieldName == fieldName )  && newVal == 'Sim')  {
				    		var obj = {'fieldName': currentFieldName};
				    		configDataPanelsTree.fieldsId.push( obj );
				    		fieldsId = fieldsId + virgula + currentFieldName;
				    		virgula = ", ";
			    		}
			    		
				    	if ( (currentFieldName != fieldName )  && fieldIsId == 'Sim')  {
				    		var obj = {'fieldName': currentFieldName};
				    		configDataPanelsTree.fieldsId.push( obj );
				    		fieldsId = fieldsId + virgula + currentFieldName;
				    		virgula = ", ";
				    	}
				    	
			    	});
			    	
			    	var dataWindowIdAttrs =  Ext.get('dataWindowIdAttrs');
			    	dataWindowIdAttrs.update( fieldsId );
			    	
			    }
			}			
        }        
    }],
    
    scrollable: true,
    scroll: 'both',

    // Custom fields
    tempParent : null,
    tempIndex : 0,
    fieldsId : [],
    // -----------------
    
    viewConfig: {
    	//markDirty:false,
    	id:'configDataPanelsView',
        plugins: {
            ptype: 'treeviewdragdrop'
        },
        listeners: {   
        	
        	beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
        		dropHandlers.wait = true;
        		var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
        		configDataPanelsTree.tempParent = data.records[0].parentNode;
        		configDataPanelsTree.tempIndex = data.records[0].data.index;
        		dropHandlers.processDrop();
        	},
        	
        	drop: function (node, data, overModel, dropPosition) {
        		var me = data.records[0];
        		var configDataPanelsTree = Ext.getCmp('configDataPanelsTree');
        		var oldParent = configDataPanelsTree.tempParent;
        		var oldIndex = configDataPanelsTree.tempIndex;
        		var currentParent = data.records[0].parentNode;
        		if ( !currentParent.parentNode ) {
            		me.remove();
            		oldParent.insertChild( oldIndex, me);
        		}

        	},
        	
        } 
    },        
    useArrows: true,
    border:false,
    frame : false,   
    

    listeners: {
    	 viewready: 'viewready',
    }
    
});