Ext.define('MCLM.view.servers.PostgreTablesGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'postgresTablesGrid',
	id: 'postgresTablesGrid',
	border: true,
	title : 'Tabelas',
	store : 'store.postgreTable', 
    frame: false,
    margin: "0 0 0 0", 
    flex:1,
    loadMask: true,
    
    autoScroll: true,
    columns:[
	     {text:'Nome', dataIndex:'name', width:200},
	     {text:'Geometria', dataIndex:'geometryColumnName', width:100},
	     {text:'Chave Primária', dataIndex:'idColumnName', width:100},
    ],
    
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'pgtable-icon',
        	id: 'addPgTable',
            handler : 'addPgTable'
        }, {
        	iconCls: 'remove-pgtable-icon',
        	id: 'deletePgTable',
            handler : 'askDeletePgTable'
        }]
    }],	    
    listeners:{
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'addPgTable',
		        title: 'Adicionar Tabela',
		        text: 'Adiciona uma Tabela ao servidor PosgreSQL selecionado.',
		        width: 250,
		        dismissDelay: 5000 
		    },{
		        target: 'deletePgTable',
		        title: 'Remover Tabela selecionada',
		        text: 'Remove a Tabela selecionada desta Fonte Externa',
		        width: 250,
		        dismissDelay: 5000 
		    });			
			
		}

    }


});	