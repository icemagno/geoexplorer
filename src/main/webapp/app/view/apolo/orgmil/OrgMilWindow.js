Ext.define('MCLM.view.apolo.orgmil.OrgMilWindow', {
	extend: 'Ext.Window',
	xtype : 'orgMilWindow',
	id : 'orgMilWindow',
	
	title : "Organização",

    requires: [
      'MCLM.view.apolo.orgmil.OrgMilTabContainer',
      'MCLM.view.apolo.orgmil.OrgMilController',
	],		
	
	controller : 'orgMilController',
	
	bodyPadding: 0,
	width : 800,
	height: 500,
	layout : 'border',
    frame : false,
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),
	resizable: false,
    
    
    renderTo: Ext.getBody(),
	
	
    items: [{
        xtype: 'orgMilTabContainer'
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
