Ext.define('MCLM.view.stack.LayerStackController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stack',
    listen : {
        controller : {
            '*' : { 
            	mountImagePreview : 'mountImagePreview',
            	removeFromLayerStack : 'removeFromLayerStack',
            	addToLayerStack : 'addToLayerStack',
            	
            }
        }
    },    
    
    init : function(app) {
        this.control({
        	// Intercepta o metodo 'dragend' do slider 
            '#stackSlider' : {
            	dragend: this.sliderDragEnd 
            },
            // Intercepta metodos da grid (lista de camadas)
            '#stackGridPanel' : {
            	drop : this.gridDrop,
            	rowclick : this.gridRowClick,
            	afterrender : this.afterRenderGrid
            }
        	
        });
    },
    
    // --------------------------------------------------------------------------------------------------------
    // Metodos interceptados de controles da view 
    sliderDragEnd : function( slider, thumb, value ) {
    	var opacity = slider.getValue(0) / 10;
    	this.setSelectedLayerOpacity( opacity );
    },
    
    gridDrop: function (node, data, dropRec, dropPosition) {
    	var layerStackStore = Ext.getStore('store.layerStack');
    	var totalLayerCount = layerStackStore.getCount();
    	var indx = totalLayerCount;
    	layerStackStore.each( function( rec ){
    		var layerName = rec.get('layerName');
    		var newIndex = ( totalLayerCount - indx ) + 1;
    	    MCLM.Map.setNewIndex( layerName , newIndex );
    	    indx--;
    	});            	
    	this.mountImagePreview();
    },    
    
    gridRowClick: function(grid, record, tr, rowIndex, e, eOpts) {
    	var layerName = record.get('layerName');
    	MCLM.Map.selectLayer( layerName );
		var opacity = MCLM.Map.getSelectedLayerOpacity();
		var newOpacity = opacity * 10;
		var stackSlider = Ext.getCmp('stackSlider');
		stackSlider.setValue( 0, newOpacity );
    },    
    // Fim dos metodos interceptados
    // --------------------------------------------------------------------------------------------------------
    addToLayerStack : function( data ) {
    	// remover este metodo
		// Adiciona a camada na lista de camadas 
    	alert("Remover LayerStackController:addToLayerStack");
    },
    // --------------------------------------------------------------------------------------------------------
    removeFromLayerStack : function( layerName ) {
    	// remover este metodo
		// Remove a camada de lista de camadas 
    	alert("Remover LayerStackController:removeFromLayerStack");
    },
    // --------------------------------------------------------------------------------------------------------
    setSelectedLayerOpacity : function( value ) {
    	MCLM.Map.setSelectedLayerOpacity( value );
    },
    // --------------------------------------------------------------------------------------------------------
    showLegend : function( button ) {
    	var stackGridPanel = Ext.getCmp('stackGridPanel');
    	
		if (stackGridPanel.getSelectionModel().hasSelection()) {
		   var row = stackGridPanel.getSelectionModel().getSelection()[0];
		   var layerName = row.get('layerName');
		   var layerAlias = row.get('layerAlias');
		   var serviceUrl = row.get('serviceUrl' );
		   var serialId = row.get('serialId' );
		   this.showLegendScreen( layerName, serviceUrl, serialId, layerAlias );
		} else {
			Ext.Msg.alert('Camada não selecionada','Selecione uma camada da lista antes de solicitar a legenda.' );
		}	    
    	
    },
    // --------------------------------------------------------------------------------------------------------
    showLegendScreen : function( layerName, serviceUrl, serialId, layerAlias ) {
    	var legendImageUrl = MCLM.Map.getLayerLegendImage( layerName, serviceUrl );
    	
    	var legendWindow = Ext.getCmp('legendWindow');
    	if ( legendWindow ) return;
    	legendWindow = Ext.create('MCLM.view.legend.LegendWindow',{title:"Legenda da Camada '" + layerAlias + "'"});
    	legendWindow.show();

    	$("#legend_image").attr('src', legendImageUrl );
    	
    	$("#legend_image").one("load", function() {
    		$("#legend_image").css("display","block");
    		$("#legend_loading").css("display","none");
    	}).each(function() {
    		if(this.complete) $(this).load();
    	});    	
    	    	
    },
    // --------------------------------------------------------------------------------------------------------
    mountImagePreview : function() {
    	var baseLayerUrlPreview = MCLM.Map.getLayerImagePreview( MCLM.Globals.config.baseLayer, MCLM.Globals.config.geoserverUrl );

    	var layerMiniImage = Ext.getCmp('layerMiniImage');
    	layerMiniImage.body.update( "" );
    	
    	var content = "";
    	var zindex = 0;
    	
    	var imgElement = Ext.get( 'mclm_landlayer_cmoa' );
    	if( imgElement ) {
    		// Imagem pequena da lista de camadas
    		imgElement.dom.src = baseLayerUrlPreview;
    		// Imagem do painel grande
    		content = content + "<img class='minithumb mergeable' id='big_mclm_landlayer_cmoa' style='display:none;z-index:"+ 
    			zindex +";position: absolute;width:238px;height:150px' src='"+baseLayerUrlPreview+"' />";
    		zindex++;
    	}
    	
    	var layerStackStore = Ext.getStore('store.layerStack');
    	
    	layerStackStore.each( function( record ){
			var layerName = record.get('layerName');
			var serviceUrl = record.get('serviceUrl');
			var serialId = record.get('serialId');
			var thumImg = MCLM.Map.getLayerImagePreview ( layerName, serviceUrl );
			var imgElement = Ext.get( serialId );
			
			if( imgElement ) {
				// Imagem pequena da lista de camadas 
				imgElement.dom.src = thumImg;
				// Imagem do painel grande
				content = content + "<img class='minithumb mergeable' id='big_"+serialId+"' style='display:none;z-index:"+ 
					zindex +";position: absolute;width:238px;height:150px' src='"+thumImg+"' />";
			}
			zindex++;
		});
		
    	
    	layerMiniImage.body.update( content );
    	this.checkPreviewImages();    	
    	
    },
    // --------------------------------------------------------------------------------------------------------
    checkPreviewImages : function() {
    	$('.minithumb').each(function(){
    		var me = $( this );
    	    var img = new Image();
    	    img.onload = function() {
    	        me.css("display","block");
    	    }
    	    img.src = $(this).attr('src');
    	});	
    },
    afterRenderGrid : function() {
		var me = this;
		setInterval( function(){ me.checkLayerIsReady(); }, 5000);
    },
	// --------------------------------------------------------------------------------------------
	// De tempo em tempo verifica se as camadas estao prontas e remove o icone de loading.
	// Provavel bug no evento "tileLoadEnd" da camada. 
	checkLayerIsReady : function () {
		MCLM.Map.getLayers().forEach( function ( layer ) {
			var ready = layer.get('ready');
			var layerName = layer.get('name');
			var layerType = layer.get('layerType');
			
			if ( ready || layerType == 'KML' ) {
				var serialId = layer.get('serialId');
				$("#alert_" + serialId).css("display","none");
			}
		});
	},
    
    
});