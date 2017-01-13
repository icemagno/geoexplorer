Ext.define('MCLM.view.paineis.PainelDireito', {
	extend: 'Ext.Panel',
	xtype: 'painelDireito',
    region:'east',
    floatable: false,
    margin: '0 0 0 0',
    width: 40,
    minWidth: 40,
    maxWidth: 50,
    collapsed: false,
    
	requires: [
	   'MCLM.view.paineis.ToolBarPrincipal'
	],    
    
    items : [{
        xtype: 'toolBarPrincipal',
    }]

}); 