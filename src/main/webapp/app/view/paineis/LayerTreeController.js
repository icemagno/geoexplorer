Ext.define('MCLM.view.paineis.LayerTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree',
    
    listen : {
        controller : {
            '*' : { 
            	// Disparado por MCLM.view.trabalho.TrabalhoTreeController APÓS carregar um cenário.
            	syncLayerNodeInMainTree : 'syncLayerNodeInMainTree',
            	// disparado por MCLM.view.cenarios.CenarioController ANTES de carregar um cenário
           		clearMainTree : 'clearMainTree'
            }
        }
    },     
    
    // Expande toda a arvore
    onTreeExpandAll : function( button ) {
    	var tree = Ext.getCmp('layerTree');
    	tree.expandAll();
    },
    // Desmarca todas as camadas e limpa o stack.
    // Disparado por MCLM.view.cenarios.CenarioController ao carregar um cenário.
    clearMainTree : function() {
    	var me = this;
    	var layerTree = Ext.getCmp("layerTree");
    	layerTree.getRootNode().cascade( function(node) { 
    		node.set('checked', false );
    		me.toggleNode( node );
		});    	
    },
    // Marca/desmarca camadas de acordo com o cenário carregado.
    // Disparado por MCLM.view.trabalho.TrabalhoTreeController ao carregar um cenário.
    syncLayerNodeInMainTree : function( serialId, status ) {
    	var layerTree = Ext.getCmp("layerTree");
    	var node = layerTree.getRootNode().findChild('serialId',serialId,true);
    	if ( node ) {
	    	node.set('checked', status );
	    	this.clearCheckToTheRoot ( node.parentNode );
    	}
    	return true;
    },
    
    // Recolhe toda a arvore
    onTreeCollapseAll : function( button ) {
    	var tree = Ext.getCmp('layerTree');
    	tree.collapseAll();
    },
    
    // Responde ao clique em um no. Mostra os detalhes do no painel abaixo da arvore
    onLayerTreeItemClick : function( view, record, item, index, e ) {
		var tempData = [];
		tempData.push( record.data );

		var layerDetailStore = Ext.data.StoreManager.lookup('store.LayerDetail');
		layerDetailStore.loadData( tempData );
		
		if( record.data.readOnly ) {
			$("#id_lock_icon").css("display","block");
		}
		
    },
    // Recursivamente marca/desmarca pais dos nos até o root
    recursiveCheckParent : function( node, pChildCheckedCount ) {
	    if( node ) {
	    	node.set('checked', !!pChildCheckedCount);
	    	var parent = node.parentNode;
	    	this.recursiveCheckParent( parent, pChildCheckedCount );
	    }
    },
    clearCheckToTheRoot : function ( parentNode ) {
    	var me = this;
	    var pChildCheckedCount = 0;
	    parentNode.suspendEvents();
	    parentNode.eachChild(function(c) { 
	        if (c.get('checked')) pChildCheckedCount++; 

	    });
       	me.recursiveCheckParent( parentNode, pChildCheckedCount );	    	
    },
    // Quando o estado do no muda (selecionado/nao selecionado)
    // Adiciona ou remove uma camada na lista de camadas e no mapa
    onLayerTreeCheckChange : function( node, checked, eOpts ) {
    	if ( !node.isLeaf() ) {
			Ext.Msg.alert('Operação Inválida', ' Não é permitido marcar um grupo de camadas. Você deve marcar as camadas individualmente.' );
			node.set('checked',false);
			return;
    	}
    	var me = this;
	    var serialId = node.get('serialId');
	    this.fireEvent( "syncLayerNodeInTrabalhoTree", serialId, checked );	    
	    
	    this.toggleNode( node );

	    var p = node.parentNode;
	    if( !p ) return true;
	    me.clearCheckToTheRoot( p );
    },

    // Mosta o menu de contexto quando clica com botao direito do mouse em um no da arvore
    onContextMenu : function( tree, record, item, index, e, eOpts ) {
    	var me = this;
    	if ( !record.data.leaf ) {
		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
		          { iconCls: 'kml-icon', text: 'Adicionar Camada KML', handler: function() { me.addNewLayerKML(record); } },
		          { iconCls: 'wms-icon', text: 'Adicionar Camada WMS', handler: function() { me.addNewLayerWMS(record); } },
		          { iconCls: 'shp-icon', text: 'Adicionar Camada SHP', handler: function() { me.addNewLayerSHP(record); } },
		          { iconCls: 'tif-icon', text: 'Adicionar Camada TIF', handler: function() { me.addNewLayerTIF(record); } },
		          { iconCls: 'cube-icon', text: 'Adicionar Camada de Dados', handler: function() { me.addNewLayerData(record); } },
		          { xtype: 'menuseparator' },
		          { iconCls: 'add-folder-icon', text: 'Criar Nova Pasta', handler: function() { me.addNewFolder(record); } },
		          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { me.askDeleteFolder( record ); } },
		        ]
		    });
		} else {
		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
				  { iconCls: 'add-scenery-icon', text: 'Copiar para Área de Trabalho', handler: function() { me.addToScenery(record); } },
				  { iconCls: 'dictionary-icon', text: 'Configurar Dicionário', handler: function() { me.configDictionary(record); } },
				  { xtype: 'menuseparator' },
		          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { me.askDeleteLayer( record ); } }
		        ]
		    });
		}
	    var position = [e.getX()-10, e.getY()-10];
	    menu_grid.showAt( position );
		e.stopEvent();    	
    },
    // Edita o dicionario de dados para uma camada
    configDictionary : function(record) {
    	var data = record.data;
    	
    	var layerName = data.layerName;
    	var layerType = data.layerType;
    	var serviceUrl = data.serviceUrl;
    	var idNodeData = data.idNodeData;
    	
    	var dictionaryStore = Ext.data.StoreManager.lookup('store.dictionary');
    	dictionaryStore.load({
    			params:{
    				'layerName': layerName,
    				'serviceUrl' : serviceUrl,
    				'idNodeData' : idNodeData
    			},
    			callback: function(records, operation, success) {
    				if ( records.length > 0 ) {
    					var dictWindow = Ext.create('MCLM.view.dicionario.DictWindow');
    					dictWindow.show();		            	   
    				}
    			}
    	});    	
    	
    },
    // Adiciona para o cenario atual / area de trabalho
    addToScenery : function( record ) {
    	var trabalhoTree = Ext.getCmp('trabalhoTree');
    	var root = trabalhoTree.getRootNode();
    	
    	// clona o no da arvore
    	var copy = record.copy();
    	
    	var y = 0;
    	// pega o maior id do cenario 
    	root.cascadeBy( function(n) { 
    		var temp = n.get('id');
    		if ( temp > y ) y = temp;
    	});
    	// incrementa
    	y++;
    	// troca o id que era da arvore pelo proximo id livre do cenario
    	copy.set('id', y);
    	// o pai agora eh root
    	copy.set('idNodeParent', 0);
    	// nao e somente leitura
    	copy.set('readOnly', false);
    	// adiciona o novo no ao root do cenario
    	root.appendChild( copy );
    	// se o novo no estava marcado na arvore principal, marca ele e o pai no cenario
    	if ( copy.get( 'checked' ) ) {
    		copy.set( 'selected', true );
    		root.set( 'checked', true );
    	}

   	
    	
    },
    
    // Adiciona uma nova pasta na arvore 
    addNewFolder : function( record ) {
		var data = record.data;
		record.expand();
		
    	var newFolderWindow = Ext.getCmp('newFolderWindow');
    	if ( newFolderWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova pasta em " + path,
    	
    	newFolderWindow = Ext.create('MCLM.view.addfolder.NewFolderWindow');
    	newFolderWindow.setTitle( title );

    	newFolderWindow.show();	

		var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );      

		var trabalhoAddFolder = Ext.getCmp('trabalhoAddFolder');
		trabalhoAddFolder.setValue( 'false' );      
		
    	Ext.getCmp('newFolderName').focus(true, 100);    	
    },
    
    // Pergunta se quer deletar uma camada / no da arvore
	askDeleteLayer: function( record ) {
		var parentNode = record.parentNode;
		var data = record.data;
		var name = data.layerAlias;
		var me = this;

		if ( record.data.readOnly ) {
			Ext.MessageBox.show({
				title: 'Camada Bloqueada',
				msg: 'Não é possível apagar esta camada.',
				buttons: Ext.MessageBox.OK,
				icon: 'lock-icon'
			});			
			return true;
		}
		
		
		Ext.Msg.confirm('Apagar Camada', 'Deseja realmente apagar a Camada "' + name + '" ?', function( btn ){
			   if( btn === 'yes' ){
				   record.set("checked",false);
				   me.clearCheckToTheRoot( record );
				   me.deleteLayer( parentNode, data );
			   } else {
			       return;
			   }
		 });	
		
	},
	
    // Pergunta se quer deletar uma camada / no da arvore
	askDeleteFolder: function( record ) {
		var parentNode = record.parentNode;
		var data = record.data;
		var name = data.layerAlias;
		var me = this;
		
		if ( record.data.readOnly ) {
			
			Ext.MessageBox.show({
				title: 'Pasta Bloqueada',
				msg: 'Não é possível apagar esta pasta.',
				buttons: Ext.MessageBox.OK,
				icon: 'lock-icon'
			});			
			
			return true;
		}
		
		if ( record.data.childrenCount > 0 ) {
			Ext.Msg.alert('Apagar Pasta', 'Não é possível apagar pastas com camadas ou outras pastas. Remova todas as camadas e pastas desta pasta antes.');
			return true;
		}
		
		Ext.Msg.confirm('Apagar Pasta', 'Deseja realmente apagar a pasta "' + name + '" ?', function( btn ){
			   if( btn === 'yes' ){
				   me.clearCheckToTheRoot( record );
				   me.deleteLayer( parentNode, data );
			   } else {
			       return;
			   }
		});	
		
	},

	// Efetivamente apaga uma camada
	deleteLayer : function ( parentNode, data ) {
		var nodeId = data.id;
		var layerName = data.layerName;
		var me = this;
		
		Ext.Ajax.request({
		       url: 'deleteLayer',
		       params: {
		           'nodeId': nodeId 
		       },       
		       success: function(response, opts) {
		    	   var result = JSON.parse( response.responseText );
		    	   
		    	   var layerTreeStore = Ext.getStore('store.layerTree');
		    	   layerTreeStore.load({ node: parentNode });
		    	   MCLM.Map.removeLayer( layerName );
		    	   
		    	   Ext.Msg.alert('Sucesso', result.msg );

		       },
		       failure: function(response, opts) {
		    	   var result = JSON.parse( response.responseText );
		    	   Ext.Msg.alert('Falha', result.msg );
		       }
		});
		
	},
	
	// Abre o dialogo para adicionar uma nova camada WMS 
	addNewLayerWMS : function ( record ) {
		var data = record.data;
		record.expand();
		
    	var capabilitiesWindow = Ext.getCmp('capabilitiesWindow');
    	if ( capabilitiesWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada WMS para " + path;
    	
    	capabilitiesWindow = Ext.create('MCLM.view.addlayer.wms.CapabilitiesWindow');
    	capabilitiesWindow.setTitle( title );
    	capabilitiesWindow.show();		
    	
    	// Interceptado pelo controller 'MCLM.view.addlayer.wms.CapabilitiesController'
    	this.fireEvent('createMapPreview', record);
	},
	
	// Abre o dialogo para adicionar uma camada SHP
	addNewLayerSHP : function ( record ) {
		var data = record.data;
		record.expand();
		
    	var uploadShpWindow = Ext.getCmp('uploadShpWindow');
    	if ( uploadShpWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada ShapeFile para " + path,
    	
    	uploadShpWindow = Ext.create('MCLM.view.addlayer.shp.UploadShpWindow');
    	uploadShpWindow.setTitle( title );

    	uploadShpWindow.show();	

		var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );      
    	
    	Ext.getCmp('newLayerShpAlias').focus(true, 100);
    	
	},
	addNewLayerData : function( record ) {
		var data = record.data;
		record.expand();
		
		
    	var dataLayerWindow = Ext.getCmp('dataLayerWindow');
    	if ( dataLayerWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada de Dados para " + path,
    	
    	dataLayerWindow = Ext.create('MCLM.view.addlayer.dta.DataLayerWindow');
    	dataLayerWindow.setTitle( title );

    	dataLayerWindow.show();	
    	
    	var stylesStore = Ext.getStore('store.styles');
    	stylesStore.load();

    	var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );
		
    	Ext.getCmp('dataLayerName').focus(true, 100);
		
	},
	// Abre o dialogo para adicionar uma camada GeoTIFF
	addNewLayerTIF : function ( record ) {
		var data = record.data;
		record.expand();
		
    	var uploadTifWindow = Ext.getCmp('uploadTifWindow');
    	if ( uploadTifWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada GeoTIFF para " + path,
    	
    	uploadTifWindow = Ext.create('MCLM.view.addlayer.tif.UploadTifWindow');
    	uploadTifWindow.setTitle( title );

    	uploadTifWindow.show();	

		var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );      
    	
    	Ext.getCmp('newLayerTifAlias').focus(true, 100);
    	
	},
	
	
	// Abre o dialogo para adicionar uma camada KML
	addNewLayerKML : function ( record ) {
		var data = record.data;
		record.expand();
		
    	var uploadKmlWindow = Ext.getCmp('uploadKmlWindow');
    	if ( uploadKmlWindow ) return;
    	
    	var path = record.getPath("text");
    	var title = "Nova Camada KML para " + path,
    	
    	uploadKmlWindow = Ext.create('MCLM.view.addlayer.kml.UploadKmlWindow');
    	uploadKmlWindow.setTitle( title );

    	uploadKmlWindow.show();	

		var layerFolderID = Ext.getCmp('layerFolderID');
		layerFolderID.setValue( data.id );      
    	
    	Ext.getCmp('newLayerKmlAlias').focus(true, 100);
    	
	},

	// Responde a mudanca de estado de um no ( selecionado/nao selecionado )
	toggleNode: function( node ) {
		var checked = node.get('checked');
		var layerName = node.get('layerName');
		var serialId = node.get('serialId');
		
		if ( layerName == "" ) return;
		
		if( checked == true ) {
			// adiciona a camada no mapa
			var layer = MCLM.Map.addLayer( node );
			this.fireEvent('mountImagePreview');
		} else {
			// Remove a camada do mapa
			MCLM.Map.removeLayer( serialId );
			this.fireEvent('mountImagePreview');
		}	
	},
	
    viewready: function (tree) {
        var view = tree.getView();
        var dd = view.findPlugin('treeviewdragdrop');

        view.on({
            'drop': function () {
        		var layerTreeStore = Ext.data.StoreManager.lookup('store.layerTree');
        		layerTreeStore.sync();

            }
        });
        
        dd.dragZone.onBeforeDrag = function (data, e) {
            var rec = view.getRecord(e.getTarget(view.itemSelector));
            return !rec.data.readOnly;
        };
    },
    
    onLoadNode : function (loader, nodes, response) {
    	if( !nodes ) return;
    	var me = this;
    	var trabalhoTree = Ext.getCmp("trabalhoTree");
    	for ( x=0; x< nodes.length; x++ ) {
    		var node = nodes[x];
            var layerName = node.get('layerName');
            var serialId = node.get('serialId');

        	var nodeTrabalho = trabalhoTree.getRootNode().findChild('serialId',serialId,true);
        	if( nodeTrabalho ) {
        		node.set('checked', nodeTrabalho.get('checked') );
        		me.clearCheckToTheRoot( node.parentNode );
        	} 
            
    	}
    }
	
});