Ext.define('MCLM.store.LayerStack', {
    extend: 'Ext.data.TreeStore',
    storeId:'store.layerStack',
    requires: ['Ext.data.proxy.Memory'],
    fields: [{name: 'layerAlias'},{name: 'description'} ], 
    proxy: { type: 'memory' }
});    