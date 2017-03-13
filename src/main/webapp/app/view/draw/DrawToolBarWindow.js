Ext.define('MCLM.view.draw.DrawToolBarWindow', {
	extend: 'Ext.Window',
	xtype : 'view.drawToolBar',
	id : 'drawToolBar',
	title:'Ferramentas de Desenho',
	
    requires: [
        'MCLM.view.draw.DrawToolBarController',
	],
    controller : 'drawToolBar',	
	
	
	width : 410,
	height: 150,
	resizable: false,

    scrollable: false,
    frame : false,
   
	constrain: true,
	bodyStyle:"background:#FFFFFF;",
	renderTo: Ext.getBody(),

    dockedItems: [{
        xtype: 'toolbar',
        border: false,
        items: [{
        	iconCls: 'plus-icon',
        	id: 'addDrawableLayerBtn',
            handler : 'addDrawableLayer'
        },{
        	iconCls: 'save-icon',
        	id: 'saveDrawableBtn',
            handler : 'saveDrawableLayer',
            disabled : true	
        },{
        	xtype: 'tbseparator'
        },{
        	iconCls: 'line-tool',
        	id: 'drawLineBtn',
            handler : 'drawLine',
            disabled : true
            	
        },{
        	iconCls: 'rectangle-tool',
        	id: 'drawBoxBtn',
            handler : 'drawBox',
            disabled : true
            	
        },{
        	iconCls: 'polygon-tool',
        	id: 'drawPolygonBtn',
            handler : 'drawPolygon',
            disabled : true
            	
        },{
        	iconCls: 'point-tool',
        	id: 'drawPointBtn',
            handler : 'drawPoint',
            disabled : true
            	
        },{
        	iconCls: 'square-tool',
        	id: 'drawSquareBtn',
            handler : 'drawSquare',
            disabled : true
            	
        },{
        	iconCls: 'circle-tool',
        	id: 'drawCircleBtn',
            handler : 'drawCircle',
            disabled : true
            	
        },{
        	xtype: 'tbseparator'
        },{
    		xtype: 'combobox',
    		editable : false,
    		name: 'idFeicaoStyle',
    		labelWidth: 30,
    		fieldLabel: 'Estilo:',
    		displayField: 'featureStyleName',	    	
    		id: 'idFeicaoStyle',
    		store: 'store.styles',	    	
    	    forceSelection: true,
    	    allowBlank: false,
    	    valueField: 'idFeatureStyle',
    	    listeners : {
    	    	select : function( ele, rec, idx ) {
    	    		
    	        	var feicaoNome = MCLM.DrawHelper.feicaoNome;
    	        	var feicaoDescricao = MCLM.DrawHelper.feicaoDescricao;
    	        	var feicaoDestino = MCLM.DrawHelper.feicaoDestino;
    	        	
    	        	
    	        	MCLM.DrawHelper.updateStyle( rec.data );
    	        	
    	        	var estiloNome = Ext.getCmp("idFeicaoStyle").getRawValue();
    	        	if ( feicaoNome ) {
    	        		Ext.getCmp("drawToolBar").update( "<b>Nome: </b>" + feicaoNome + 
    	        				"<br><b>Destino: </b>" + feicaoDestino + 
    	        				"<br><b>Estilo: </b>" + estiloNome + "<br><b>Descrição: </b>"+feicaoDescricao  );
    	        		}
    	    	}
    	    } 
        
        }]
    }],
    
    listeners: {
        
    	itemclick: 'onLayerTreeItemClick',
        checkchange: 'onLayerTreeCheckChange',
        itemcontextmenu: 'onContextMenu',
        viewready: 'viewready',
        
		afterrender:function(){
			
			
		    Ext.tip.QuickTipManager.register({
		        target: 'addDrawableLayerBtn',
		        title: 'Nova Feição',
		        text: 'Adiciona uma nova feição.',
		        width: 190,
		        dismissDelay: 5000 
		    },{
		        target: 'saveDrawableBtn',
		        title: 'Salvar Feição',
		        text: 'Salva a feição atual.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'drawLineBtn',
		        title: 'Desenhar Linha',
		        text: 'Desenha uma linha.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'drawBoxBtn',
		        title: 'Desenhar Retângulo',
		        text: 'Desenha um Retângulo.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'drawPolygonBtn',
		        title: 'Desenhar Poligono',
		        text: 'Desenha um Poligono.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'drawPointBtn',
		        title: 'Desenhar Ponto',
		        text: 'Desenha um Ponto.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'drawSquareBtn',
		        title: 'Desenhar Caixa',
		        text: 'Desenha uma Caixa.',
		        width: 150,
		        dismissDelay: 5000 
		    },{
		        target: 'drawCircleBtn',
		        title: 'Desenhar Círculo',
		        text: 'Desenha um Círculo.',
		        width: 150,
		        dismissDelay: 5000 
		    })
		    
		},
		
		close : function() {
			 // Remove o registro de balao de dicas (hints) dos botoes da janela.
			 // meramente preventivo para evitar erros de javascript mas nao interfere no sistema.
		 	 Ext.tip.QuickTipManager.unregister('addDrawableLayerBtn');
		 	 Ext.tip.QuickTipManager.unregister('drawLineBtn');
		 	 Ext.tip.QuickTipManager.unregister('drawPointBtn');
		 	 Ext.tip.QuickTipManager.unregister('drawPolygonBtn');
		 	 Ext.tip.QuickTipManager.unregister('drawBoxBtn');
		 	 Ext.tip.QuickTipManager.unregister('drawSquareBtn');
		 	 Ext.tip.QuickTipManager.unregister('drawCircleBtn');
		 	 Ext.tip.QuickTipManager.unregister('saveDrawableBtn');
		 	 MCLM.DrawHelper.finish();
		},	
    }
	
});
