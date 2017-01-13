Ext.define('MCLM.store.RouteResult', {
    extend: 'Ext.data.Store',
    storeId:'store.RouteResult',
    requires: ['Ext.data.proxy.Memory'],
    fields: [
         {name: 'osm_name'},
         {name: 'seq'},
         {name: 'path_id'},
         {name: 'path_seq'},
         {name: 'cost'}
    ], 
    proxy: { type: 'memory' },
    sorters: [{
    	property: 'seq',
    	direction: 'ASC'
    }]    
});    
