Ext.define('MCLM.store.Capabilities', {
    extend: 'Ext.data.Store',
    storeId:'store.Capabilities',
	proxy: {
        type: 'ajax',
        url: 'getCapabilities',
        reader: {
            type: 'json',
            rootProperty:'capabilities',
            totalProperty: 'totalCount'
        }	        
	},
    fields: [
         {name:'layerTitle', type:'string'},    
         {name:'queryable', type:'boolean'},
         {name:'serverUrl', type:'string'},
         {name:'layerName', type:'string'}
    ],
	autoLoad: false,
	listeners: {
        load: function(store, records, success, operation){
            var reader = store.getProxy().getReader();
            var response = operation.getResponse();
            var resp = JSON.parse( response.responseText );
            if ( resp.error ) {
            	Ext.Msg.alert('Falha', resp.msg );
            }                 
        }			
	}
}); 
