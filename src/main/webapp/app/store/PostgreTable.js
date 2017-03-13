Ext.define('MCLM.store.PostgreTable', {
    extend: 'Ext.data.Store',
    storeId:'store.postgreTable',
    requires: ['Ext.data.proxy.Memory'],
    fields: [{name: 'name', type:'string'},
             {name: 'geometryColumnName', type:'string'},
             {name: 'idTable', type:'int'}
    ],
    proxy: { type: 'memory' },
    
	listeners: {
        load: function(store, records){
        	//
    	}			
	}
    
});    
