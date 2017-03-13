Ext.define('MCLM.view.addlayer.dta.DataLayerWindow', {
	extend: 'Ext.Window',
	xtype : 'view.dataLayerWindow',
	id : 'dataLayerWindow',

    requires: [
        'MCLM.view.addlayer.dta.DataLayerController',
        'MCLM.view.addlayer.dta.DataLayerForm',
	],	    
    controller : 'dataLayer',	
    modal : true,	
	width : 500,
	height: 380,
    scrollable: false,
    frame : false,
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.dataLayerForm'
	}],
	
	
});
