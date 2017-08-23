Ext.define('MCLM.view.trabalho.TrabalhoTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trabalho',
    
    addingText : false,
    
    init : function(app) {
        this.control({
            '#trabalhoTreeView' : {
            	drop: this.afterDropNode 
            }
            
        });
    },     
    
    listen : {
        controller : {
            '*' : { 
            	// Disparado por MCLM.view.paineis.LayerTreeController ao mudar o estado de uma camada.
            	syncLayerNodeInTrabalhoTree : 'syncLayerNodeInTrabalhoTree',
            	afterDropNode : 'afterDropNode',
            	doClearWorkspace : 'doClearWorkspace'
            }
        }
    },  
    // Disparado apos um no ser movido para outra pasta
    afterDropNode : function  (node, data, overModel, dropPosition) {
		var theNode = data.records[0];
		theNode.data.idNodeParent = overModel.data.id;
    },
    
    // Marca/desmarca camadas de acordo com a arvore principal.
    // Disparado por MCLM.view.paineis.LayerTreeController ao mudar o estado de uma camada.
    syncLayerNodeInTrabalhoTree : function( serialId, status ) {
    	var trabalhoTree = Ext.getCmp("trabalhoTree");
    	var node = trabalhoTree.getRootNode().findChild('serialId',serialId,true);
    	if ( node ) {
	    	node.set('checked', status );
	    	node.dirty = true;
	    	this.clearCheckToTheRoot ( node.parentNode );
    	}
    	return true;
    },
        
    
    // Expande toda a arvore
    onTreeExpandAll : function( button ) {
    	var tree = Ext.getCmp('trabalhoTree');
    	tree.expandAll();
    },
    
    // Recolhe toda a arvore
    onTreeCollapseAll : function( button ) {
    	var tree = Ext.getCmp('trabalhoTree');
    	tree.collapseAll();
    },
    
    // Responde ao clique em um no. Mostra os detalhes do no painel abaixo da arvore
    onLayerTreeItemClick : function( view, record, item, index, e ) {
    	//
    },
    // Limpa  Cenário
    doClearWorkspace : function() {
    	var me = this;
		var tree = Ext.getCmp('trabalhoTree');
		var root = tree.getRootNode();
		root.set("text","Cenário");
		//root.set("checked",false);
		
    	var painelEsquerdo = Ext.getCmp('painelesquerdo');
    	painelEsquerdo.setTitle("");		    		
		
    	// Limpa a arvore principal
    	var layerTree = Ext.getCmp("layerTree");
    	
    	layerTree.getRootNode().cascade( function(node) { 
    		if (  (node.get('layerType') != '') && (node.get('layerType') != 'CRN') && (node.get('layerType') != 'FDR') ) node.set('checked', false );
		});   
    	
    	
    	// Apaga do layer stack
    	var trabalhoTree = Ext.getCmp("trabalhoTree");
    	trabalhoTree.getRootNode().cascade( function(node) { 
    		if (  (node.get('layerType') != '') && (node.get('layerType') != 'CRN') && (node.get('layerType') != 'FDR') ) node.set('checked', false );
    		me.toggleNode( node );
		});			    	
    	
    	// Limpa a arvore do cenario (trabalho)
		root.removeAll();
		MCLM.Globals.currentScenery = -1;
		
		var cloneSceneryButton = Ext.getCmp('svCenaryAsBtn'); 
		cloneSceneryButton.disable();
		
		
		var mapZoom = MCLM.Globals.config.mapZoom; 
		var mapCenter = MCLM.Globals.config.mapCenter;		
		MCLM.Map.panTo( mapCenter, mapZoom );
		
		
    },
    // Pergunta se deseja limpar o Cenário
    clearWorkspace : function() {
    	var me = this;
		Ext.Msg.confirm('Limpar Cenário', 'Deseja realmente limpar o Cenário? As alterações não gravadas serão perdidas.', function( btn ){
			   if( btn === 'yes' ){
				   me.doClearWorkspace();
			   } else {
			       return;
			   }
		 });
		
    },
    // Processa cada nó da árvore de cenário após o cenário ser carregado.
    // Interceptado de 'MCLM.view.trabalho.TrabalhoTree' evento 'load'.
    onLoadNode : function(loader, nodes, response) {
    	var me = this;
    	for (x=0; x< nodes.length; x++  ) {
    		var node = nodes[x];
            var chk = node.get('checked');
            var layerName = node.get('layerName');
            var serialId = node.get('serialId');
            
            if ( layerName ) {
            	// Evento interceptado pelo controller da árvore principal. 
            	// 'MCLM.view.main.MainController'. Marca/desmarca camada de acordo o status da mesma camada do cenário.
    			this.fireEvent( "syncLayerNodeInMainTree", serialId, chk );
            	if ( chk ) {
					var layer = MCLM.Map.addLayer( node );
					me.clearCheckToTheRoot( node.parentNode );
            	}
            }
            
    	}
		this.fireEvent('mountImagePreview');		                    	
	},
    
    // Recursivamente marca/desmarca pais dos nos até o root
    recursiveCheckParent : function( node, pChildCheckedCount ) {
    	/*
	    if( node ) {
	    	node.set('checked', !!pChildCheckedCount);
	    	var parent = node.parentNode;
	    	this.recursiveCheckParent( parent, pChildCheckedCount );
	    }
	    */
    },
    
    clearCheckToTheRoot : function ( parentNode ) {
    	/*
    	var me = this;
	    
	    var pChildCheckedCount = 0;
	    parentNode.suspendEvents();
	    parentNode.eachChild(function(c) { 
	        if ( c.get('checked') ) pChildCheckedCount++; 
	    });
	    
	    parentNode.set('checked', !!pChildCheckedCount);
	    me.recursiveCheckParent( parentNode, pChildCheckedCount );
	    */	    	
    },
    
    // Quando o estado do no muda (selecionado/nao selecionado)
    // Adiciona ou remove uma camada na lista de camadas e no mapa
    onLayerTreeCheckChange : function( node, checked, eOpts ) {
    	if ( !node.isLeaf() ) {
			Ext.Msg.alert('Operação Inválida', 'Não é permitido marcar um grupo de camadas. Você deve marcar as camadas individualmente.' );
			node.set('checked',false);
			return;
    	}
    	var me = this;
	    var serialId = node.get('serialId');
	    // Interceptado por 'MCLM.view.paineis.LayerTreeController'
	    this.fireEvent( "syncLayerNodeInMainTree", serialId, checked );
	    
	    this.toggleNode( node );
	    node.dirty = true;
	    node.set("selected", node.get("checked") );
	    
	    var p = node.parentNode;
	    if ( !p ) return true;
	    me.clearCheckToTheRoot( p );
	    
    },

    // Mosta o menu de contexto quando clica com botao direito do mouse em um no da arvore
    onContextMenu : function( tree, record, item, index, e, eOpts ) {
    	var me = this;
    	var data = record.data;
    	
		if ( data.layerType == 'FEI' ) {

		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
		    	  { iconCls: 'goto-icon', text: 'Ir para...', handler: function() { me.goToFeicao( record ); } },
	  	          { iconCls: 'add-folder-icon', text: 'Criar Nova Pasta', handler: function() { me.addNewFolder(record); } },
				  { xtype: 'menuseparator' },
		          { iconCls: 'delete-icon', text: 'Apagar', handler: function() { me.askDeleteLayer( record ); } }
		        ]
		    });
			
			
		} else if ( data.layerType == 'TXT' ) { 
		
		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
		          { iconCls: 'delete-icon', text: 'Remover', handler: function() { me.askDeleteLayer( record ); } },
		        ]
		    });
		
		} else {    	
    	
		    var menu_grid = new Ext.menu.Menu({ 
		    	items: [
	  	          { iconCls: 'add-folder-icon', text: 'Criar Nova Pasta', handler: function() { me.addNewFolder(record); } },
		          { xtype: 'menuseparator' },
		          { iconCls: 'delete-icon', text: 'Remover', handler: function() { me.askDeleteLayer( record ); } },
		        ]
		    });
		}
		
	    var position = [e.getX()-10, e.getY()-10];
	    menu_grid.showAt( position );
		e.stopEvent();    	
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
		trabalhoAddFolder.setValue( 'true' );  		
    	
    	Ext.getCmp('newFolderName').focus(true, 100);    	
    },
    reloadScenery : function() {
    	var me = this;
    	
    	// Apaga do layer stack
    	var trabalhoTree = Ext.getCmp("trabalhoTree");
    	trabalhoTree.getRootNode().cascade( function(node) { 
    		
    		if( (node.get('layerType') != '') && (node.get('layerType') != 'CRN') && (node.get('layerType') != 'FDR') ) {
    			node.set('checked', false );
    			me.toggleNode( node );
    		}
    		
		});			    	
			
		
    	var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
		trabalhoTreeStore.load({
			params:{cenario: MCLM.Globals.currentScenery},
		    callback: function(records, operation, success) {
		    	if ( success ) {
		    		var tree = Ext.getCmp('trabalhoTree');
		    		var root = tree.getRootNode();
		    		if( root ) {
		    			root.collapse();
		    			tree.expandAll();
		    		}	
		    	}
		    }
		});      	
    },  

    
    onFormClose : function() {
    	var textBoxWindow = Ext.getCmp('textBoxWindow');
    	textBoxWindow.close();
    	this.addingText = false;
    },
    
    onFormSubmit : function() {
    	var boxDescription = Ext.getCmp('boxDescriptionId');
    	var boxTitle = Ext.getCmp('boxTitleId');
    	var textBoxWindow = Ext.getCmp('textBoxWindow');
    	this.addingText = false;
    	var center = textBoxWindow.boxCenter;
    	
    	textBoxWindow.close();
    	if( (boxTitle.getValue() != '') && (boxDescription.getValue() != '') ) {
    		this.createText( center, boxTitle.getValue(), boxDescription.getValue() );   
    	}
    	
    },
    
    
    createText : function( center, titulo, texto ) {
    	MCLM.Globals.totalTextBoxes++;
    	var qtd = MCLM.Globals.totalTextBoxes;
    	
    	var divId = 'popup'+qtd;
    	
    	var div = $('<div id="'+divId+'"></div>').addClass("popupArea");
    	$(document.body).append( div );
    	var domDiv = document.getElementById(divId);
    	
		var popup = new ol.Overlay({
			  element: domDiv,
			  stopEvent: false,
			  dragging: false,
			  positioning: 'left-top',

			  autoPan: true,
			  autoPanAnimation: { duration: 250 },
			  titulo : '',
			  texto : '',
				  			  
			  
		});
		MCLM.Map.map.addOverlay(popup);    	
		popup.setPosition( center );
		
		popup.set('titulo', titulo);
		popup.set('texto', texto)
		
		var boxDiv = '<div class="popupText"><div class="popupTitle">'+titulo+'</div>' + 
		'<div class="popupContent">'+texto+'</div></div>';
		
		domDiv.innerHTML = boxDiv;   	
    	
		var dragPan;
		MCLM.Map.map.getInteractions().forEach(function(interaction){
			if (interaction instanceof ol.interaction.DragPan) {
				dragPan = interaction;  
		  }
		});

		domDiv.addEventListener('mousedown', function(evt) {
			dragPan.setActive(false);
			popup.set('dragging', true);
			console.info('start dragging ' + popup.get('titulo') );
			$(this).css('opacity','1');
		});

		domDiv.addEventListener('mouseup', function(evt) {
			$(this).css('opacity','0.7');
		});
		
		MCLM.Map.map.on('pointermove', function(evt) {
			if (popup.get('dragging') === true) {
				popup.setPosition(evt.coordinate);
			}
		});

		MCLM.Map.map.on('pointerup', function(evt) {
			if (popup.get('dragging') === true) {
			    dragPan.setActive(true);
			    popup.set('dragging', false);
			    console.info('stop dragging ' + popup.get('titulo') );
			}
		});		
		
		

		// Cria o no no cenario
		
		var serialId = "FE" + MCLM.Functions.guid().substring(1, 8);
		var trabalhoTree = Ext.getCmp('trabalhoTree');
		var root = trabalhoTree.getRootNode();		
		
		var newId = 0;
		root.cascadeBy( function(n) { 
			var temp = n.get('id');
			if ( temp > newId ) newId = temp;
		});
		newId++;		
		
		var feicao = {};
		feicao.nome = titulo;
		feicao.descricao = texto;
		feicao.geomType = 'POINT';
		feicao.metadados = center.toString();
		
		var newNode =  root.appendChild({
			   'id' : newId,
			   'text' : titulo,
			   'layerAlias' : titulo,
			   'layerName' : titulo,
			   'layerType' : 'TXT',
			   'description' : texto,
			   'readOnly' : false,
			   'checked' : true,
			   'selected' : true,
			   'institute' : 'Criado pelo Usuário',
			   'indexOrder' : 0,
			   'iconCls' : 'text-icon',
			   'leaf' : true,
			   'idNodeParent' : 0,
			   'serialId' : serialId,
			   'idNodeData' : -1,
			   'feicao' : feicao
		});			

    },
    
    // Adiciona um texto em uma posição geográfica
    addTextToScenery : function() {
    	var me = this;

    	MCLM.Map.unbindMapClick();
    	if ( me.addingText ) {
    		$("#painelCentral").css('cursor','default');
    		me.addingText = false;
    		return true;
    	}
    	
		$("#painelCentral").css('cursor','copy');
		
		me.addingText = true;
		
		MCLM.Map.onClickBindKey = MCLM.Map.map.on('click', function(event) {
			var center = event.coordinate;
			MCLM.Map.unbindMapClick();	
			
			var textBoxWindow = Ext.getCmp('textBoxWindow');
			if( !textBoxWindow ) {
				textBoxWindow = Ext.create('MCLM.view.trabalho.TextBoxWindow');
			}
			textBoxWindow.show();
			textBoxWindow.boxCenter = center;
			Ext.getCmp('boxTitleId').focus(true, 100);
			
		});    	
    	
    	
    	
    },
    
    
    // Abre a janela de seleção de cenários para carregar um cenario para a area de trabalho.
    loadScenery : function() {
    	var sceneryStore = Ext.getStore('store.Scenery');
    	sceneryStore.load();
    	sceneryStore.sort('sceneryName','ASC');
    	
    	var cenarioWindow = Ext.getCmp('cenarioWindow');
    	if ( cenarioWindow ) return;
    	cenarioWindow = Ext.create('MCLM.view.cenarios.CenarioWindow');
    	cenarioWindow.show();
    },
    // Salva a arvore do cenario
    updateSceneryTree : function() {
    	var me = this;
		// Salva a arvore de camadas
    	var trabalhoTreeStore = Ext.getStore('store.trabalhoTree');
    	
		trabalhoTreeStore.data.each( function( item, index, totalItems ) {
	        var layerName = item.get('layerName');
	        var serialId = item.get('serialId');
	        var layerType = item.get('layerType');
	        var layers = MCLM.Map.getLayers();
	        var length = layers.getLength(); 
	        	
	        if ( (layerType != 'FDR') && serialId) {

				for (var i = 0; i < length; i++) {
					var serial = layers.item(i).get('serialId');
					var opacity = layers.item(i).getOpacity() * 10;
					
					if (serial === serialId) {
			        	item.set("transparency", opacity );
			        	item.set("layerStackIndex", i );
			        	
					}
				}		        
				
	        }
	        
	    });	    	
    	
    	trabalhoTreeStore.sync({
			 params: {
			 	cenario: MCLM.Globals.currentScenery
			 },
		     success: function (action, options) {
		    	me.reloadScenery(); 
			 },
			 failure: function (action, options){
			    Ext.Msg.alert('Falha', 'Falha ao gravar Árvore de Camadas do Cenário.');
			 }	
    	});
    	
    },
    // Salva os dados do cenario (zoom, center, etc)
    updateSceneryData : function() {
    	var me = this;
		var mapCenter = MCLM.Map.getMapCenter();
		var mapZoom = parseInt( MCLM.Map.getMapZoom() );	    	
		var mapaBase = MCLM.Map.getBaseMapName();
		var servidorBase = MCLM.Map.getBaseServerURL();
		var mapaBaseAtivo = MCLM.Map.isBaseMapActive();
		var gradeAtiva = MCLM.Map.isGraticuleActive();
		var mapBbox = MCLM.Map.getMapCurrentBbox();		    	
    	
		Ext.Ajax.request({
			url: 'updateSceneryData',
		    params: {
		        'idScenery' 	: MCLM.Globals.currentScenery,
		        'mapCenter' 	: mapCenter,
		        'mapZoom' 		: mapZoom,
		        'mapaBase' 		: mapaBase,
		        'servidorBase' 	: servidorBase,
		        'mapaBaseAtivo' : mapaBaseAtivo,
		        'gradeAtiva' 	: gradeAtiva,
		        'mapBbox' 		: mapBbox,
		    },						
			success: function(response, opts) {
				me.updateSceneryTree();
		    	Ext.Msg.alert('Sucesso', 'Cenário gravado.');
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Erro','Não foi possível atualizar os dados do cenário.' );
			}
		});
		
    },
    // Salva a area de trabalho atual como um cenario
    saveScenery : function() {
    	var me = this;
    	if ( MCLM.Globals.currentScenery == -1 ) {
    		// Nao temos cenario. Abre a janela para o usuario criar um.
    		// Apos o submit do form do cenario novo eh necessario enviar os dados
    		// da arvore. Isso esta sendo feito pelo evento do submit do form em
    		// MCLM.view.cenarios.SaveCenarioController
	    	var saveCenarioWindow = Ext.getCmp('saveCenarioWindow');
	    	if ( saveCenarioWindow ) return;
	    	saveCenarioWindow = Ext.create('MCLM.view.cenarios.SaveCenarioWindow');
	    	saveCenarioWindow.show();
	    	
			Ext.getCmp('mapCenterConfigField').setValue( MCLM.Map.getMapCenter() );
			Ext.getCmp('mapZoomConfigField').setValue( MCLM.Map.getMapZoom() );	    	
			Ext.getCmp('mapaBaseID').setValue( MCLM.Map.getBaseMapName() );
			Ext.getCmp('servidorBaseID').setValue( MCLM.Map.getBaseServerURL() );
			Ext.getCmp('mapaBaseAtivoID').setValue( MCLM.Map.isBaseMapActive() );
			Ext.getCmp('gradeAtivaID').setValue( MCLM.Map.isGraticuleActive() );
			Ext.getCmp('mapBbox').setValue( MCLM.Map.getMapCurrentBbox() );		
			Ext.getCmp('mapCenterHDMSId').setValue( MCLM.Map.getCenterHDMS() );
			
			Ext.getCmp('nomeCenarioID').focus(true, 100);
	    	
    	} else {
    		// Salva o cenario atual.
    		me.updateSceneryData();
    	}

   	
    },    
    
	askDeleteLayer: function( record ) {
		
		var name = record.data.layerAlias;
		var me = this;

		// nao pode apagar o root
		var id = record.get('id');
		if ( id == 0 ) {
			return true;
		}
		
		Ext.Msg.confirm('Apagar Camada', 'Deseja realmente remover a Camada/Pasta "' + name + '"  do cenário atual?', function( btn ){
			   if( btn === 'yes' ){
				   record.set("checked",false);
				   me.clearCheckToTheRoot( record );
				   me.deleteLayer( record );
			   } else {
			       return;
			   }
		 });	
		
	},
	
	// Efetivamente apaga um no da arvore
	deleteLayer : function ( record ) {
		var layerName = record.data.layerName;
		var serialId = record.data.serialId;
 	   	MCLM.Map.removeLayer( serialId );	
		record.parentNode.removeChild(record);
	},

    goToFeicao : function ( record ) {
		var parentNode = record.parentNode;
		var data = record.data;
		var layerName = data.layerName;
		var checked = record.get('checked');
		
		if ( !checked ) {
			Ext.Msg.alert('Zoom em Feição', 'Marque a Feição para que ela apareça no mapa antes.');
			return true;
			
		} 
		
		var layer = MCLM.Map.getLayerByName( layerName );
		var source = layer.getSource();
		MCLM.Map.theView.fit( source.getExtent(), {duration: 2000, maxZoom: 14});
		
    },
	
    
	// Responde a mudanca de estado de um no ( selecionado/nao selecionado )
	toggleNode: function( node ) {
		var checked = node.get('checked');
		var layerName = node.get('layerName');
		var serialId = node.get('serialId' );
		var layerType = node.get('layerType' );
		
		
		console.log( node );
		
		if ( layerName == "" ) return;
		
		if( checked == true ) {
			if( layerType == "FEI") {
				MCLM.Map.addFeicao( node );
			} else {
				// adiciona a camada no mapa
				var layer = MCLM.Map.addLayer( node );
				this.fireEvent('mountImagePreview');
			}
		} else {
			if( layerType == "FEI") {
				MCLM.Map.removeFeicao( node );
			} else {
				// Remove a camada do mapa
				MCLM.Map.removeLayer( serialId );
				// Interceptado por MCLM.view.stack.LayerStackController
				this.fireEvent('mountImagePreview');
			}
		}	
		
		
	},
	
    viewready: function (tree) {
    	// nao limita o drag nesta arvore
    }	
	
});