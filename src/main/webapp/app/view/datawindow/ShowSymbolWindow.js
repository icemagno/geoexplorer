Ext.define('MCLM.view.datawindow.ShowSymbolWindow', {
	extend: 'Ext.Window',
	xtype : 'showSymbolWindow',
	id : 'showSymbolWindow',
	title : "Símbolo",
	bodyPadding: 0,
	
	width : 200,
	height: 200,
	
    scrollable: false,
    frame : false,
    
    constrain: true,
    bodyStyle:"background:#FFFFFF;",
    renderTo: Ext.getBody(),
	resizable: false,
	
	html : '',

});
