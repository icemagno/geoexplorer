
// http://examples.sencha.com/extjs/6.0.2/examples/kitchensink/#grid-filtering

Ext.define('MCLM.view.addlayer.wms.CapabilitiesGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'capabilitiesGrid',
	id: 'capabilitiesGrid',
	border: false,
	title : '',
	store : 'store.Capabilities',
    frame: false,
    margin: "0 0 0 0", 
    listeners: {
    	// atualiza a janela de preview com a camada selecionada na lista
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        	// Interceptado pelo controller 'MCLM.view.addlayer.wms.CapabilitiesController'
        }
    },	    
    region:'center',
    loadMask: true,
    columns:[
	     {text:'Título', dataIndex:'layerTitle', width:200,         
	    	 filter: {
	            type: 'string',
	            itemDefaults: {
	                emptyText: 'Procurar...'
	            }
	        }
	     },
	     {text:'Camada', dataIndex:'layerName', width:200,
	    	 filter: {
		            type: 'string',
		            itemDefaults: {
		                emptyText: 'Procurar...'
		            }
		        }
	     },
	     {text:'Consultável', dataIndex:'queryable', width:75, xtype: 'booleancolumn', falseText:'Não', trueText: 'Sim', filter: 'boolean'},
	     {text:'URL', dataIndex:'serverUrl', width:200},
    ],
    
    
    tbar: [{
        text: 'Limpar Filtros',
        // Processado por 'MCLM.view.addlayer.wms.CapabilitiesController'
        handler: 'onClearFilters'
    }],    
    
    
    plugins: 'gridfilters',
    emptyText: 'Nenhum Registro Encontrado',
    loadMask: true,
    stateful: false,    
    
});	