Ext.define('MCLM.view.rotas.RotaResultGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'rotaResultGrid',
	id: 'rotaResultGrid',
	border: true,
	title : '',
	store : 'store.RouteResult',
    frame: false,
    flex : 1,
    
    features: [{
        ftype: 'summary'
    }],
    
    listeners: {
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        	
        	var extent = record.data.geometry;
			var lineString = new ol.geom.MultiLineString( extent.coordinates );
 			var feature = new ol.Feature({
 				geometry: lineString,
 			});
 			MCLM.RouteHelper.inspectRoute( feature );
 			
        }
    },	    
    

    loadMask: true,
    columns:[
   	     {text:'Seq', dataIndex:'seq', width:45},
	     {text:'Nome', dataIndex:'way_name', width:300,
             summaryRenderer: function(val, summaryData, dataIndex) {
                 return '<b>Total:</b> '; 
             },   	    	 
	     },
	     {text:'Distância', dataIndex:'km', width:80, summaryType: 'sum',
	    	 
	    	 renderer: function(value, metaData, record, row, col, store, gridView){
	    		 return value + " Km";
	    	 },
	     
             summaryRenderer: function(val, summaryData, dataIndex) {
                 return '<b>' + Ext.util.Format.number( val, '0.00') + ' Km</b>'; 
             },
	     }
    ]
});	