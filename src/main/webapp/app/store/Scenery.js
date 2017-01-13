Ext.define('MCLM.store.Scenery', {
    extend: 'Ext.data.Store',
    storeId:'store.Scenery',
    
    fields: [{name: 'idScenery'},
         {name: 'creationDate'},
         {name: 'sceneryName'},
         {name: 'zoomLevel'},
         {name: 'mapCenter'},
         {name: 'baseMap'},
         {name: 'description'},
         {name: 'baseMapActive'},
         {name: 'isPublic'},
         {name: 'graticule'},
         {name: 'nodes'},
         {name: 'mapBbox'},
         {name: 'idUser'},
         {name: 'baseServerURL'} 
    ],
             
 	proxy: {
        type: 'ajax',
        url: 'getCenarios',
        reader: {
            type: 'json',
            rootProperty:'sceneries',
        }        
	},
	
	listeners: {
        load: function(store, records){
        	//console.log( records );
    	}			
	},
 
	sortInfo:{
	    field: 'sceneryName',
	    direction: 'ASC'
	}	
             
});