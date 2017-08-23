Ext.define('MCLM.store.PostgreSource', {
    extend: 'Ext.data.Store',

    alias: 'store.postgresource',
    storeId:'store.postgresource',
    
    autoSync: true,
    
	proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty:'servers',
            totalProperty: 'totalCount'
        },
        api: {
            read: 'getPostgreSources',
            create: 'setPostgreSources',
            update: 'setPostgreSources',
            destroy: 'delPostgreSources'
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
         {name:'serverAddress', type:'string'},
         {name:'serverDatabase', type:'string'}
    ],
	
	listeners: {
        load: function(store, records){
        	//
    	}			
	}
}); 