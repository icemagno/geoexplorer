Ext.define('MCLM.store.LayerTree', {
    extend: 'Ext.data.TreeStore',
    storeId:'store.layerTree',
    //autoLoad : true,
    autoSync: false,
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
        	// Ao recarregar os filhos de um no, verificar se algum deles ja
        	// estava selecionado (a camada ja exixtia no mapa)
        	// pois ao recarregar eles vem desmarcados.
        	// Se existir, marca novamente
        	for ( var x=0; x < records.length; x++ ) {
        		var serial = records[x].data.serialId;
        		var layer = MCLM.Map.findBySerialID( serial );
        		if( layer ) {
        			records[x].data.checked = true;
        			records[x].data.selected = true;
        		}
        	}
        	
    	}			
	} 
    
});