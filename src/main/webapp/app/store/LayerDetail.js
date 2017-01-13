Ext.define('MCLM.store.LayerDetail', {
    extend: 'Ext.data.Store',
    storeId:'store.LayerDetail',
    requires: ['Ext.data.proxy.Memory'],
    fields: [{name: 'layerAlias'},
             {name: 'description'},
             {name: 'layerName'},
             {name: 'originalServiceUrl'},
             {name: 'serviceUrl'},
             {name: 'institute'},
             {name: 'childrenCount'} ], 
    proxy: { type: 'memory' }
});    
