Ext.define('MCLM.view.tools.RestTools', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	id:'restTools',    	
	xtype: 'restTools',

    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    items: [/*{
	    iconCls: 'aeroplane-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    handler: 'toggleAeroTraffic',
	    enableToggle: true,
        id : 'aeroplaneID',
        xtype: 'button',
    },*/{
	    iconCls: 'ship-icon',
	    enableToggle: true,
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    handler: 'updateMaritmTraffic',
        id : 'maritmTrID',
        xtype: 'button',
    },{
	    iconCls: 'ship-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    handler: 'shoMarineTraffic',
        id : 'marineTrafficID',
        xtype: 'button',
    },{
	    iconCls: 'photo-icon',
	    enableToggle: true,
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    handler: 'showStreetPhoto',
        id : 'photoID',
        xtype: 'button',
    }],

	
});