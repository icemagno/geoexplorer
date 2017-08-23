Ext.define('MCLM.view.apolo.aerodromo.AerodromoWindow', {
	extend: 'Ext.Window',
	xtype : 'aerodromoWindow',
	id : 'aerodromoWindow',
	
	codAerodromo : null,
	
    requires: [
       'MCLM.view.apolo.aerodromo.AerodromoController',
       'MCLM.view.apolo.aerodromo.DataPanel',
	],		
	
	controller : 'aerodromoController',
	
	title : "Aerodromo",
	bodyPadding: 0,
	
	width : 800,
	height: 500,
	
	layout : 'border',
	
    frame : false,
    
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),
	resizable: false,

    items: [{
        xtype: 'dataPanel'
    }],

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'owm-rain-icon',
        	id: 'ttt1',
            handler : 'getMetarTaf'
        },{
        	iconCls: 'owm-wind-icon',
        	id: 'ttt2',
            handler : 'teste'
        }]
    }]

});
