Ext.define('MCLM.view.dicionario.DictGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'dictGrid',
	id: 'dictGrid',
	border: false,
	store : 'store.dictionary', 
    frame: false,
    margin: "0 0 0 0", 
    flex:1,
    loadMask: true,
    autoScroll: true,
    columns:[
	     {text:'Nome Original', dataIndex:'originalName', width:200},
	     {text:'Nome Traduzido', dataIndex:'translatedName', width:200, editor: 'textfield'},
	     {text:'Descrição', dataIndex:'description', width:260, editor: 'textfield'},
	     {text:'Tipo de Dado', dataIndex:'dataType', width:100,  editor: {
				xtype: 'combobox',
				store:['IMAGELIST', 'TEXT','COLOR','URL','SYMBOL', 'INT', 'STRING', 'POINT', 'GEOMETRY', 'LINESTRING', 'POLYGON', 'MULTILINESTRING', 'MULTIPOLYGON', 'MULTIPOINT'],	
	        }   
	     },
	     {text:'Visível', dataIndex:'visible', width:50, xtype: 'booleancolumn', editor: {
	    	 xtype: 'checkboxfield',
	    	 allowBlank: false
	     }, falseText:'Não', trueText: 'Sim'},
	     {text:'Identificador', dataIndex:'primaryKey', width:80, xtype: 'booleancolumn', editor: {
	    	 xtype: 'checkboxfield',
	    	 allowBlank: false
	     }, falseText:'Não', trueText: 'Sim'},
	     {text:'Ordem', dataIndex:'indexOrder', width:50, editor: 'textfield'},
	     
    ],
    
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'save-icon',
        	id: 'saveDictionaryID',
            handler : 'saveDictionary'
        }]
    }],
    
    listeners: {
    	
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'saveDictionaryID',
		        title: 'Salvar',
		        text: 'Salva as alterações neste dicionário.',
		        width: 150,
		        dismissDelay: 5000 
		    });
		}
    } 
    
});	