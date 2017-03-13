Ext.define('MCLM.view.paineis.LayerDetail', {
	extend: 'Ext.grid.Panel',
	xtype: 'view.layerDetail',
	
    requires: [
        'MCLM.store.LayerDetail'
    ],
	
	border:false,
	
    store: 'store.LayerDetail',
    
    region:'south',
  
    columns: [{
    	cellWrap: true,
    	header:'Detalhes da Camada',
        flex: 1,
        sortable: false,
        hideable: false,
        xtype: 'templatecolumn',
        tpl: [
            '<tpl for=".">',
        	'<div style="display:none;position:absolute;top:2px;right:2px;width:20px;height:20px" id="id_lock_icon"><img  src="img/lock.svg"></div>',
                    '<div style="float: left; width: 93%; padding:0px;">',
                    	'<div style="font-weight:bold;padding: 0px 0px 2px 0px;">{layerAlias}</div>',
                    	'<div style="font-weight:bold;padding: 0px;">{institute}</div>',
                    	'<div style="width:100%;border-top:1px dotted black; padding: 0px;">{description}</div>',
                    	'<div style="width:100%;border-top:1px dotted black; padding: 0px;">{layerName}</div>',
                        '<div style=" padding: 0px;">{serviceUrl}</div>',
                        '<div style=" padding: 0px;">{originalServiceUrl}</div>',
                        '<div style=" padding: 0px;">{childrenCount} subconjuntos.</div>',
                        '<div style=" padding: 0px;">Estilo: {dataLayer.style.featureStyleName}</div>',
                        '<div style=" padding: 0px;">{dataLayer.table.server.serverDatabase} / {dataLayer.whereClause}</div>',
                    '</div>',
             '</tpl>'
            ]
    }],
});
