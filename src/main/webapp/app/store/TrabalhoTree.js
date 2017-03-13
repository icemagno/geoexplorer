Ext.define('MCLM.store.TrabalhoTree', {
    extend: 'Ext.data.TreeStore',
    storeId:'store.trabalhoTree',
    autoLoad : false,
    
    
    requires: [
       'MCLM.model.TrabalhoTreeModel',
    ],	    
           
	model:  'MCLM.model.TrabalhoTreeModel',    
    
	proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
		extraParams: {
			cenario: MCLM.Globals.currentScenery
		},
        api: {
            read: 'getCenarioTreeNode',
            create: 'createCenarioTreeNode',
            update: 'updateCenarioTreeNode',
            destroy: 'destroyCenarioTreeNode'
        },
               
        writer: {
            type:'json',
            encode:true,
            rootProperty:'data',
            writeAllFields: true
        }        
    },	
	
    plugins: [{  ptype: 'treefilter', allowParentFolders: true }],
    
    root: {
        text: 'Área de Trabalho',
        id: 0,
        index:0,
        description : 'Raiz'
    },
    
	listeners: {
		beforeload : function( store, operation, options ) {
			store.proxy.extraParams.cenario = MCLM.Globals.currentScenery;
			return true;
		}, 
        load: function(store, records){
        	//
        	return true;
    	},
    	beforesync: function( operations ) {
    		return true;
    	}
	}     
});