Ext.define('MCLM.view.legend.LegendWindow', {
	extend: 'Ext.Window',
	id:'legendWindow',    	
	xtype: 'legendWindow',	
	title : '',
	width : 550,
	height: 400,
    scrollable: true,
    frame : false,
    scroll: 'both',
	layout : 'border',
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	html: "<img id='legend_loading' style='padding:30px' src='img/loading.gif'>" +
			"<img id='legend_image' style='display:none' src=''>"
});