Ext.define('MCLM.store.DataPanels', {
    extend: 'Ext.data.TreeStore',
    storeId:'store.DataPanels',
    requires: ['Ext.data.proxy.Memory'],

    proxy: { type: 'memory', autoSync:true },
    
    autoSync: true,
    requires: [
       'MCLM.model.DataWindowFieldModel'
    ],	     
    model : 'MCLM.model.DataWindowFieldModel',   
    
    root: {
        'text': 'Janela de Dados',
        'id': 0,
        'index':0,
        'leaf' : false,
        'iconCls': 'datawindow-icon'
    },       

	listeners: {
		beforeload : function( store, operation, options ) {
			//console.log( "Store BL");
			return true;
		}, 
        load: function(store, records){
			//console.log( "Store L");
        	return true;
    	},
    	beforesync: function( operations ) {
			//console.log( "Store BS");
    		return true;
    	}
	}        
    
});    
