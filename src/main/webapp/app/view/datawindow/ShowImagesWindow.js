Ext.define('MCLM.view.datawindow.ShowImagesWindow', {
	extend: 'Ext.Window',
	xtype : 'showImagesWindow',
	id : 'showImagesWindow',
	title : "Imagens",
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
