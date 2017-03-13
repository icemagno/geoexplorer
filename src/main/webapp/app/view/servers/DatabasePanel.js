Ext.define('MCLM.view.servers.DatabasePanel', {
	extend: 'Ext.Panel',
	xtype: 'databasePanel',

	layout: {
        type: 'vbox',
        align: 'stretch'
    },		
	flex : 1,
	
    margin: '0 0 0 0',

	requires: [
	   'MCLM.view.servers.PostgreGrid',
	   'MCLM.view.servers.PostgreTablesGrid',
	],    
    
    items : [{
        xtype: 'postgresGrid',
    },{
        xtype: 'postgresTablesGrid',
    }]

}); 