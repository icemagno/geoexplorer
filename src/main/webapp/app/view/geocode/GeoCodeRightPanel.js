Ext.define('MCLM.view.geocode.GeoCodeRightPanel', {
	extend: 'Ext.grid.Panel',
	xtype: 'geoCodeRightPanel',
	id: 'geoCodeRightPanel',
	
	region: 'east',
	flex : 2,
	border: true,
    frame: false,

    hidden : true,
    
    store : Ext.create("Ext.data.Store", {
        fields: ["osm_id", "st_astext", "name", "coordinates", "cidade", "estado"]
    }),
    
    columns:[
 	     {text:'Nome', dataIndex:'name', width:200},
 	     {text:'Cidade', dataIndex:'cidade', width:200},
 	     {text:'Estado', dataIndex:'estado', width:200},
    ],    
    
    
    listeners: {
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
//        	console.log( record.data );
        	var geocodeWindow = Ext.getCmp('geocodeWindow');
        	
        	var coordenadas = record.data.st_astext.replace('POINT(','').replace(')','').replace(' ',',');
//        	console.log( coordenadas );
        	geocodeWindow.helper.processCoordinates( coordenadas );
        }
    }
    
    
});		
