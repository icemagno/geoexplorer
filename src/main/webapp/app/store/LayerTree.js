Ext.define('MCLM.store.LayerTree', {
    extend: 'Ext.data.TreeStore',
    storeId:'store.layerTree',
    //autoLoad : true,
    autoSync: true,
    requires: [
       'MCLM.model.LayerTreeModel'
    ],	    
           
	model:  'MCLM.model.LayerTreeModel',    
    
	proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        }, 
        api: {
            read: 'getLayersTreeNode',
            create: 'createLayersTreeNode',
            update: 'updateLayersTreeNode',
            destroy: 'destroyLayersTreeNode'
        },        
        writer: {
            type:'json',
            allowSingle:false,
            writeAllFields : false,
            encode:true,
            rootProperty:'data'
        }        
    },
   
    root: {
        text: 'APOLO',
        id: 0,
        index:0,
        //expanded: true,
        description : 'Raiz'
    },
    
	listeners: {
        load: function(store, records){
        	//console.log( records );
    	}			
	} 
    
});