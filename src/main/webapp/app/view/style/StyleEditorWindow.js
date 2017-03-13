Ext.define('MCLM.view.style.StyleEditorWindow', {
	extend: 'Ext.Window',
	xtype : 'view.styleEditorWindow',
	id : 'styleEditorWindow',
	title:'Editor de Estilos',
    requires: [
        'MCLM.view.style.StyleEditorForm',
        'MCLM.view.style.StyleEditorController',
	],
	
    controller : 'styleEditor',	
	
	width : 670,
	height: 480,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	
    scrollable: false,
    frame : false,
   
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'view.styleEditorForm'
	}],
	
});
