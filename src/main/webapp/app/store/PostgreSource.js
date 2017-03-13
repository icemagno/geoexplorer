Ext.define('MCLM.store.PostgreSource', {
    extend: 'Ext.data.Store',

    alias: 'store.postgresource',
    storeId:'store.postgresource',
    
	proxy: {
        type: 'ajax',
        url: 'getPostgreSources',
        reader: {
            type: 'json',
            rootProperty:'servers',
            totalProperty: 'totalCount'
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