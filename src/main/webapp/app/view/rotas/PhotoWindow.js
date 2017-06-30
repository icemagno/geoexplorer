Ext.define('MCLM.view.rotas.PhotoWindow', {
	extend: 'Ext.Window',
	xtype : 'photoWindow',
	id : 'photoWindow',

	title: 'Imagem de Rua',

	width : 300,
	height: 300,
	
    scrollable: false,
    frame : false,
    
	
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
    
	html : ''
	
});
