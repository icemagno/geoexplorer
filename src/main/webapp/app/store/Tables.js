Ext.define('MCLM.store.Tables', {
    extend: 'Ext.data.Store',
    autoLoad : false,
    alias: 'store.tables',
    storeId:'store.tables',
    
	proxy: {
        type: 'ajax',
        url: 'getTables',
        reader: {
            type: 'json',
            rootProperty:'tables',
            totalProperty: 'totalCount',
            safeMappings: true
        }        
	},
	
	/*
		{"tables":[
			{
				"server":{"serverDatabase":"siglmd","serverUser":"geoserver","name":"Apolo","serverAddress":"10.5.115.21","serverPort":5432,"serverPassword":"G305erV31","idServer":3},
				"name":"servicos.view_cidades_brasil","idTable":1 
			},
			{
				"server":{"serverDatabase":"siglmd","serverUser":"geoserver","name":"Apolo","serverAddress":"10.5.115.21","serverPort":5432,"serverPassword":"G305erV31","idServer":3},
				"name":"mapas.bacias_hidrograficas","idTable":2
			}
		],"totalCount":2}	
	*/
	
    fields: [
         {name:'name', type:'string',
        	 convert: function( v, record ) {
                 return record.data.server.name + '.' + record.data.server.serverDatabase + '.' + record.data.name;
        	 }
         },
         {name:'idTable', type:'int', mapping: 'idTable'},    
         {name:'idServer', type:'int', mapping: 'server.idServer'},    
         {name:'serverPort', type:'int', mapping: 'server.serverPort'},    
         {name:'serverAddress', type:'string', mapping: 'server.serverAddress'},
         {name:'serverDatabase', type:'string', mapping: 'server.serverDatabase'},  
         {name:'serverUser', type:'string', mapping: 'server.serverUser'},  
         {name:'serverName', type:'string', mapping: 'server.name'},  
    ],
	
	listeners: {
        load: function(store, records){
        	//console.log( records );
    	}			
	}
}); 