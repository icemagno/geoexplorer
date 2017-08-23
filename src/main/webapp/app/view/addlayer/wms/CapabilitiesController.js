Ext.define('MCLM.view.addlayer.wms.CapabilitiesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.capabilities',
    
    listen : {
        controller : {
            '*' : { 
            	createMapPreview : 'createMap'
            }
        }
    },     
    
    init : function(app) {
        this.control({
        	// Intercepta o metodo 'select' do combo de fontes externas 'MCLM.view.addlayer.wms.ServersCombo' 
            '#serversCombo' : {
            	select: this.serversComboSelect 
            },
            // Intercepta o click de selecao numa camada da lista na grid 
            // 'MCLM.view.addlayer.wms.CapabilitiesGrid'
            '#capabilitiesGrid' : {
            	rowclick: this.serversGridRowClick 
            },
            // Intercepta o click no botao 'Fechar' no form 'MCLM.view.addlayer.wms.LayerDetailForm'
            '#closeCapabilitiesWindow' : {
            	click: this.closeCapabilitiesWindow 
            },
            // Intercepta o click no botao 'Gravar' no form 'MCLM.view.addlayer.wms.LayerDetailForm'
            '#submitNewLayerForm' : {
            	click: this.submitForm 
            },
            '#serverUrlID' : {
            	change: this.serverUrlIDChange 
            },
            '#layerNameID' : {
            	change: this.layerNameIDChange 
            },
        });
    }, 
    
    serverUrlIDChange : function() {
		var serverUrlForm = Ext.getCmp('serverUrlID');
		var serverUrl = serverUrlForm.getValue( );
		
		var layerNameForm = Ext.getCmp('layerNameID');
		var layerName = layerNameForm.getValue();

		/*
		var idServerForm = Ext.getCmp('idServer');
		idServerForm.setValue( null );		
		
		if ( !layerName && MCLM.Globals.lastServerSelectedID ) {
			idServerForm.setValue( MCLM.Globals.lastServerSelectedID );
		}
		*/
		
		this.addLayerToPreviewPanel( serverUrl, layerName  );
    	
    },
    layerNameIDChange : function() {
		var serverUrlForm = Ext.getCmp('serverUrlID');
		var serverUrl = serverUrlForm.getValue( );
		
		var layerNameForm = Ext.getCmp('layerNameID');
		var layerName = layerNameForm.getValue();

		/*
		var idServerForm = Ext.getCmp('idServer');
		idServerForm.setValue( null );		
		*/
		
		this.addLayerToPreviewPanel( serverUrl, layerName  );
    },
    
    
    onClearFilters: function () {
    	var capabilitiesGrid = Ext.getCmp('capabilitiesGrid');
    	capabilitiesGrid.filters.clearFilters();
    },       
    
    submitForm : function() {
    	var capabilitiesGrid = Ext.getCmp('capabilitiesGrid');
    	var me = this;
    	
		var tituloForm = Ext.getCmp('tituloID');
		var titulo = tituloForm.getValue( );
		
		var serverUrlForm = Ext.getCmp('serverUrlID');
		var serverUrl = serverUrlForm.getValue( );
		
		var layerNameForm = Ext.getCmp('layerNameID');
		var layerName = layerNameForm.getValue();
			
		
		var layerTree = Ext.getCmp('layerTree');
		var selectedTreeNode = layerTree.getSelectionModel().getSelection()[0];
		var layerFolderID = selectedTreeNode.data.id;
		
		var layerParentForm = Ext.getCmp('parentFolderID');
		layerParentForm.setValue( layerFolderID );
		
		var layerDetailForm = Ext.getCmp('layerDetailForm');
		var form = layerDetailForm.getForm();
		
		if ( form.isValid() ) {
			form.submit({
				success: function(form, action) {
			  		var layerTreeStore = Ext.getStore('store.layerTree');
			  		layerTreeStore.load( { node: selectedTreeNode } );
			  		me.closeCapabilitiesWindow();
			  		Ext.Msg.alert('Sucesso', action.result.msg);
				},
			  	failure: function(form, action) {
			  		Ext.Msg.alert('Falha', action.result.msg);
			    }                		  
			});
        } else { 
        	Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
        }
         
    	
	},
    // ---------------------------------------------------------------------------------------------------------------
    // Chamado quando o usuario troca de fonte externa no combo. Eh necessario dar um
    // GetCapabilities no geoserver da fonte externa e atualizar a grid.
    serversComboSelect: function(combo, record, index) {
		this.removeLayerFromPreviewPanel();
		this.requestCapabilities( record.data );
		
		MCLM.Globals.lastServerSelected = record.data.name;
		MCLM.Globals.lastServerSelectedID = record.data.idServer; 
		
		var layerDetailForm = Ext.getCmp('layerDetailForm');
		layerDetailForm.getForm().reset();
		
		var idServerForm = Ext.getCmp('idServer');
		idServerForm.setValue( MCLM.Globals.lastServerSelectedID );	    	
		
    },  
    // ---------------------------------------------------------------------------------------------------------------
    // Chamado quando o usuario clica em uma camada na lista oferecida apos selecionar uma fonte externa do combo.
    // Exibe um preview da camada selecionada no mini mapa de preview
    serversGridRowClick: function(grid, record, tr, rowIndex, e, eOpts) {
    	var layerName = record.get('layerName');
    	var titulo = record.get('layerTitle');
    	var serverUrl = record.get('serverUrl');
    	
		var tituloForm = Ext.getCmp('tituloID');
		tituloForm.setValue( titulo );     
		
		var layerNameForm = Ext.getCmp('layerNameID');
		layerNameForm.setValue( layerName );
		
		var serverUrlForm = Ext.getCmp('serverUrlID');
		serverUrlForm.setValue( serverUrl );

		var descriptionForm = Ext.getCmp('descriptionID');
		descriptionForm.setValue( layerName );

		var combo = Ext.getCmp('serversCombo');
		var comboValue = combo.getRawValue();
		var origemForm = Ext.getCmp('instituteID');
		origemForm.setValue( comboValue ); 				
		
    	this.addLayerToPreviewPanel( serverUrl , layerName  );  
    	
    },    
    // Fecha a janela. Interceptado do botao 'fechar' no form 'MCLM.view.addlayer.wms.LayerDetailForm' 
    closeCapabilitiesWindow : function() {
    	var capabilitiesWindow = Ext.getCmp('capabilitiesWindow');
    	capabilitiesWindow.close();
    },
    // ---------------------------------------------------------------------------------------------------------------
    createMap : function ( record ) {
    	
    	var layerPreviewMap = Ext.getCmp('layerPreviewMap');
    	var container = layerPreviewMap.body.dom.id;

    	var config = MCLM.Globals.config;
		var geoserverUrl = config.geoserverUrl;
		var baseLayerName = config.baseLayer;    	
    	
    	
    	var previewView = new ol.View({
            //center: ol.proj.transform([-55.37109375,-17.39257927105777], 'EPSG:4326', 'EPSG:3857'),
            center: [-55.37109375,-17.39257927105777],
            projection: 'EPSG:4326',
            zoom: 3
        })	
    	
    	var previewLandLayer = new ol.layer.Tile({
    	    source: new ol.source.TileWMS({
    	        url: geoserverUrl,
    	        params: {
    	            'LAYERS': baseLayerName, 
    	            'FORMAT': 'image/png8'
    	        }
    	    })
    	});			
    	
    	MCLM.Globals.mapLayerPreview = new ol.Map({
    	    target: 'previewLayerMap',
    	    layers: [ previewLandLayer ],
    	    view: previewView
    	    
    	});	
    },
    // ---------------------------------------------------------------------------------------------------------------
    // Adiciona a camada selecionada no mapa na tela de preview
    addLayerToPreviewPanel : function ( serverUrl, serverLayers ) {
    	this.removeLayerFromPreviewPanel();
    	
    	var newLayer = new ol.layer.Tile({
    	    source: new ol.source.TileWMS({
    	        url: serverUrl,
    	        isBaseLayer : false,
    	        params: {
    	        	tiled: true,
    	            'layers': serverLayers,
    	            'VERSION': '1.1.1', 
    	            'FORMAT': 'image/png8'
    	        },
    	        projection: ol.proj.get('EPSG:4326')
    	    })
    	});	
    	newLayer.set('name', 'preview_layer');
    	
    	MCLM.Globals.mapLayerPreview.addLayer( newLayer );
    	this.bindTileEvent( newLayer );
    	
    	
    },
	bindTileEvent : function( layer ) {
		
		
		layer.getSource().on('tileloadstart', function(event) {
			$("#alert_preview").css("display","block");
			layer.set('ready', false);
			
		});
	
		layer.getSource().on('tileloadend', function(event) {
			$("#alert_preview").css("display","none");
			layer.set('ready', true);
			
		});
		
		layer.getSource().on('tileloaderror', function(event) {
			$("#alert_preview").css("display","none");
			layer.set('ready', false);
			
		});
		
	},    
    // ---------------------------------------------------------------------------------------------------------------
    // remove a camada do mapa na tela de preview
    removeLayerFromPreviewPanel : function () {
    	MCLM.Globals.mapLayerPreview.getLayers().forEach(function (lyr) {
    		if( lyr.get('name') ==  'preview_layer') {
    			MCLM.Globals.mapLayerPreview.removeLayer( lyr );	
    			return;
    		}
    	});
    },
    // ---------------------------------------------------------------------------------------------------------------
    // Solicita o getCapabilities ao sistema do servidor selecionado
    // e preenche a lista atraves do store.
    requestCapabilities : function ( node ) {
    	var version = node.version;
    	var url = node.url;
    	
    	MCLM.Functions.mainLog("Consultando " + url + " ...");
    	
    	var capabilitiesStore = Ext.getStore('store.Capabilities');
    	
    	capabilitiesStore.load({
    		params:{'version': version , 'url':url}
    	}); 	
    	
    	var capabilitiesGrid = Ext.getCmp('capabilitiesGrid');
    	capabilitiesGrid.getView().refresh();
    	
    }    
    
    
});