Ext.define('MCLM.view.paineis.LayerTree', {
	extend: 'Ext.tree.TreePanel',
	xtype: 'view.layerTree',
	id: 'layerTree',
	
    requires: [
       'MCLM.view.paineis.LayerTreeController',
       'MCLM.TreeFilter'
    ],	
    animate : false,
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
        }
    },    
    
    plugins: [{  ptype: 'treefilter', allowParentFolders: true }],
    
    store: 'store.layerTree',
   
    controller : 'tree',
    columns: [{
        xtype: 'treecolumn', 
        text: 'Nome',
        dataIndex: 'text',
        width : 260,
        sortable: true
    },{
        text: 'Origem',
        dataIndex: 'institute',
        width : 170,
        sortable: true,
        align: 'left'
    },{
        text: 'Tipo',
        dataIndex: 'layerType',
        sortable: true,
        width : 50,
        align: 'left'
    },{
        text: 'Camada',
        dataIndex: 'layerName',
        sortable: true,
        width : 60,
        align: 'left'
    }],     
    rootVisible: true,

    
    scrollable: true,
    scroll: 'both',

    region:'center',
    
    useArrows: true,
    border:false,
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
        	iconCls: 'plus-icon',
        	id: 'id011',
            handler : 'onTreeExpandAll'
        },{
        	iconCls: 'minus-icon',
        	id: 'id012',
            handler : 'onTreeCollapseAll'
        },{
        	iconCls: 'reload-icon',
        	id: 'reloadTreeBtn',
            handler : 'onReloadTree'
        },{
            labelWidth: 150,
            xtype: 'triggerfield',
            fieldLabel: '',
            triggerCls: 'x-form-clear-trigger',
            onTriggerClick: function() {
                this.reset();
                this.focus();
                var me = Ext.getCmp('layerTree');
                me.clearFilter();
            },
            enableKeyEvents: true,
            listeners: {
                keyup: function() {
                    var me = Ext.getCmp('layerTree');
                    var v = me.down('textfield').getValue();
                    me.filter( v )
                },
                buffer: 250
            }        
        }]
    }],    
    
    listeners: {
    	itemclick: 'onLayerTreeItemClick',
        checkchange: 'onLayerTreeCheckChange',
        itemcontextmenu: 'onContextMenu',
        viewready: 'viewready',
        load:'onLoadNode'
    }    
    
});