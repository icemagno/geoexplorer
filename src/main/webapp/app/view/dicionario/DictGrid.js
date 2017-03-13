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
	     {text:'Descrição', dataIndex:'description', width:200, editor: 'textfield'},
	     {text:'Tipo de Dado', dataIndex:'dataType', width:100},
	     
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