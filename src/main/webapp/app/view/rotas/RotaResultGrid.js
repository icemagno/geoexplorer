Ext.define('MCLM.view.rotas.RotaResultGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'rotaResultGrid',
	id: 'rotaResultGrid',
	border: true,
	title : '',
	store : 'store.RouteResult',
    frame: false,
    flex : 3,
    listeners: {
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        	var osmName = record.get('osm_name');
        	var osmId = record.get('osm_id');
        	if ( osmName == 'null' ) osmName = "<Sem Nome>";
        	var roadDetailPanel = Ext.getCmp('roadDetailPanel');
        	roadDetailPanel.update( osmId + ": " + osmName );
        	
        }
    },	    
    

    loadMask: true,
    columns:[
   	     {text:'Seq', dataIndex:'seq', width:45},
	     {text:'Nome', dataIndex:'osm_name', width:350},
    ]
});	