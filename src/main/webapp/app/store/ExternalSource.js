Ext.define('MCLM.store.ExternalSource', {
    extend: 'Ext.data.Store',

    alias: 'store.externalsource',
    storeId:'store.externalsource',
    
    autoSync: true,
    
    
	proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty:'servers',
            totalProperty: 'totalCount'
        },
        api: {
            read: 'getExternalSources',
            create: 'setExternalSources',
            update: 'setExternalSources',
            destroy: 'delExternalSources'
        },         
        writer: {
            type:'json',
            allowSingle:false,
            writeAllFields : true,
            encode:true,
            rootProperty:'server'
        }          
	},    
	
    fields: [
         {name:'idServer', type:'int'},    
         {name:'name', type:'string'},
         {name:'url', type:'string'},
         {name:'version', type:'string'}
    ],
	
	listeners: {
        load: function(store, records){
        	
    	}			
	}
}); 