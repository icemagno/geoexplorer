Ext.define('MCLM.store.RouteResult', {
    extend: 'Ext.data.Store',
    storeId:'store.RouteResult',
    requires: ['Ext.data.proxy.Memory'],
    fields: [
         {name: 'way_name'},
         {name: 'seq'},
         {name: 'km'},
    ], 
    proxy: { type: 'memory' },
    sorters: [{
    	property: 'seq',
    	direction: 'ASC'
    }]    
});    
