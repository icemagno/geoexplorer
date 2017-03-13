Ext.define('MCLM.view.servers.ServersWindow', {
	extend: 'Ext.Window',
	id:'serversWindow',    	
	xtype: 'serversWindow',
	title : "Gerenciar Fontes Externas",
	width : 850,
	height: 490,
	
	requires: [
	   'MCLM.view.servers.ServersGrid',
	   'MCLM.view.servers.DatabasePanel',
	   'MCLM.view.servers.ServersController'
	],  
	controller: 'serversController',
	autoScroll: true,
    scrollable: true,
    frame : false,
    
	layout: {
        type: 'hbox',
        align: 'stretch'
    },	
	
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
    items : [{
        xtype: 'serversGrid',
    },{
        xtype: 'databasePanel',
    }],
    
	    
});	