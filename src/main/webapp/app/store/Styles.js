Ext.define('MCLM.store.Styles', {
    extend: 'Ext.data.Store',
    autoLoad : false,
    alias: 'store.styles',
    storeId:'store.styles',
    
	proxy: {
        type: 'ajax',
        url: 'getFeatureStyles',
        reader: {
            type: 'json',
            rootProperty:'featureStyles',
            totalProperty: 'totalCount',
            safeMappings: true
        }        
	},
	
	listeners: {
        load: function(store, records){
        	//console.log( records );
    	}			
	}
	
}); 