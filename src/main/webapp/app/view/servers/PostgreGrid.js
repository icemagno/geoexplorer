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
	     {text:'Banco', dataIndex:'serverDatabase', width:100},
    ],
    
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'add-server-icon',
        	id: 'addPg',
            handler : 'addPostgreSource'
        }, {
        	iconCls: 'delete-server-icon',
        	id: 'deletePg',
            handler : 'askDeletePostgreSource'
        }]
    }],	
    
	listeners:{
		
		itemclick: function( view, rec, node, index, e, options ) {
			var postgreTable = Ext.data.StoreManager.lookup('store.postgreTable');
			postgreTable.removeAll(true);
			postgreTable.loadData( rec.data.tables );
		},
	
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
		        width: 250,
		        dismissDelay: 5000 
		    });			
			
		}
	}, 
});	