Ext.define('MCLM.view.servers.PostgreGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'postgresGrid',
	id: 'postgresGrid',
	border: true,
	title : 'Fontes Externas - PostgreSQL',
	store : 'store.postgresource', 
    frame: false,
    margin: "0 0 0 0", 
    flex:1,
    loadMask: true,
    autoScroll: true,
    columns:[
	     {text:'Nome', dataIndex:'name', width:200},
	     {text:'Endereço', dataIndex:'serverAddress', width:200},
	     {text:'Banco', dataIndex:'serverDatabase', width:100}
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'postgres-icon',
        	id: 'addPg',
            handler : 'addPostgreSource'
        }, {
        	iconCls: 'remove-external-icon',
        	id: 'deletePg',
            handler : 'askDeletePostgreSource'
        }]
    }],	
    
	listeners:{
		afterrender:function(){
			
		    Ext.tip.QuickTipManager.register({
		        target: 'addPg',
		        title: 'Adicionar Fonte PostgreSQL',
		        text: 'Adiciona um servidor PosgreSQL como fonte de dados.',
		        width: 250,
		        dismissDelay: 5000 
		    },{
		        target: 'deletePg',
		        title: 'Remover Fonte Externa PostgreSQL',
		        text: 'Remove a Fonte Externa selecionada.',
		        width: 150,
		        dismissDelay: 5000 
		    });			
			
		}
	}, 
});	