Ext.define('MCLM.view.main.TelaPrincipal', {
	extend: 'Ext.Panel',
	xtype: 'telaPrincipal',
	plugins: 'viewport',
	
    requires: [
       'MCLM.view.paineis.PainelInferior',
       'MCLM.view.paineis.PainelCentral',
       'MCLM.view.paineis.AbaTrabalho',
       'MCLM.view.paineis.AbaCatalogo',
       'MCLM.view.paineis.PainelDireito',
       'Ext.plugin.Viewport',
       'MCLM.view.main.MainController',
    ],
    
    layout: 'border',
    margin: '0 0 0 0',
    controller: 'main',
    id:'telaPrincipal',
    bodyBorder: false,
    border:false,
    defaults: {
        collapsible: true,
        split: false,
        bodyPadding: 0
    },
    items: [{
        
    	xtype: 'tabpanel',
    	id : 'painelesquerdo',
        region:'west',
        layout: 'border',
        floatable: true,
        title:'',
        width: 300,
        minWidth: 100,
        maxWidth: 300,
        collapsed: false,
        animCollapse: false,   

        items: [{
        	xtype: 'abaCatalogo'
        }, {
            xtype: 'abaTrabalho'
        }],
    	
    	
    },{
        xtype: 'painelCentral', collapsible: false
    },{
        xtype: 'painelDireito', collapsible: false
    },{
        xtype: 'painelInferior', collapsible: false
    }]
});

