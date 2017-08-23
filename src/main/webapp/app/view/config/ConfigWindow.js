Ext.define('MCLM.view.config.ConfigWindow', {
	extend: 'Ext.Window',
	
	requires: [
	   'MCLM.view.config.ConfigForm',
	   'MCLM.view.config.ConfigController'
	],  
	
	controller : 'config',
	
	id:'configWindow',    	
	xtype: 'configWindow',
	title : "Configurações",
	width : 550,
	height: 550,
	
	layout : 'fit',
	constrain: true,
	renderTo: Ext.getBody(),
    items : [{
        xtype: 'configForm',
    }],
    
    
    listeners: {
    	
    	
    	close : function() {
    		//
    	},
	    

    }      
    
});