Ext.define('MCLM.view.style.StyleListWindow', {
	extend: 'Ext.Window',
	xtype : 'view.styleListWindow',
	id : 'styleListWindow',
	title:'Gerenciador de Estilos',
    requires: [
        'MCLM.view.style.StyleListGrid',
        'MCLM.view.style.StyleListController',
	],
	
    controller : 'styleListController',	
	
	width : 670,
	height: 400,

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
		xtype: 'styleListGrid'
	}],
	
    listeners: {

    	close : function() {
		 	 Ext.tip.QuickTipManager.unregister('newStyleBtn');    	
    	},
	    
	    afterrender : function ( cmp ) {
        	
        	var stylesStore = Ext.getStore('store.styles');
        	stylesStore.load();
        	
    	    Ext.tip.QuickTipManager.register({
    	        target: 'newStyleBtn',
    	        title: 'Novo Estilo',
    	        text: 'Cria um novo estilo.',
    	        width: 150,
    	        dismissDelay: 5000 
    	    });			
        	
        }
	
    },
    
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'plus-icon',
        	id: 'newStyleBtn',
            handler : 'newStyle'
        }]
    }]
	
});
