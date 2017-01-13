Ext.define('MCLM.view.paineis.AbaTrabalho', {
	extend: 'Ext.container.Container',
	xtype: 'abaTrabalho',
	id: 'abaTrabalho',
    title: 'Trabalho',

	requires: [
	   'MCLM.view.trabalho.TrabalhoTree'
	],    
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },		
	
    width: 300,
    minWidth: 100,
    maxWidth: 300,
    
	items: [{
		flex:1,
		xtype: 'view.trabalhoTree'
	}]
    
});
