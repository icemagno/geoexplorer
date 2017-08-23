Ext.define('MCLM.view.apolo.orgmil.OrgMilWindow', {
	extend: 'Ext.Window',
	xtype : 'orgMilWindow',
	id : 'orgMilWindow',
	
	title : "Organização",
	bodyPadding: 0,
	
	width : 236,
	height: 500,
	
    scrollable: true,
    frame : false,
    
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),
	resizable: false,
	
	html : '',

});
