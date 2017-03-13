Ext.define('MCLM.view.style.StyleEditorTabContainer', {
	extend: 'Ext.tab.Panel',
	xtype : 'view.styleEditorTC',
	id : 'styleEditorTC',

	layoutOnTabChange: true, 
	deferredRender: false,
	
	selectedPolygonColorField : 'polygonFillColor',
	selectedLineColorField : 'lineStrokeColor',
	selectedTextColorField : 'textFillColor',
	
	plain: true,
	autoHeight:true,
	
	flex : 1,

	items: [{
		// ========================= PONTOS ====================================
		title:'Pontos',
	    layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },  		
	    bodyPadding: '0',
	    
	    defaults: {
	        anchor: '100%',
	        msgTarget: 'under',
	        labelWidth: 90
	    },	    
	    
		items:[{
	        xtype: 'container',
	        padding: '10, 30, 10, 10',
	        layout: 'vbox',    
		    items: [{
		        xtype: 'textfield',
		        fieldLabel: 'Caminho do Ícone',
		        name : 'iconSrc',
		        id : 'iconSrc',
		        listeners: {
		        	change: function(element) {
		        		var imagePath = element.getValue();
		        		var svgImage = '<object id="iconPreview" style="width:39px;height:39px" type="image/svg+xml" data="'+imagePath+'" class="logo"></object>';
		        		var image = "<img id='iconPreview' style='width:39px;height:39px' src='" + imagePath + "'>"
		        		if ( imagePath.search(".svg") ) {
		        			$("#iconSrcContainer").html( svgImage );
		        		} else {
		        			$("#iconSrcContainer").html( image );
		        		}
		        	}
		        }	        
		    }, {
		        xtype: 'component',
		        autoEl: 'div',
		        width: 41,
		        height: 41,
		        id : 'iconSrcContainer',
		    }, {
		    	xtype: 'textfield',
		    	fieldLabel: 'Escala',
		    	name: 'iconScale',
		    	id: 'iconScale',
		    	emptyText: '0.6',
		    },{
		    	xtype: 'textfield',
		    	fieldLabel: 'Opacidade',
		    	name: 'iconOpacity',
		    	id: 'iconOpacity',
		    	emptyText: '1',
		    },{
		    	xtype: 'textfield',
		    	fieldLabel: 'Ancoragem',
		    	name: 'iconAnchor',
		    	id: 'iconAnchor',
		    	emptyText: '[0.5, 46]',
		    },{
				xtype: 'combobox',
				reference: 'iconAnchorXUnits',
				publishes: 'iconAnchorXUnits',
				name: 'iconAnchorXUnits',
				fieldLabel: 'Ancora X',
				displayField: 'iconAnchorXUnits',	    	
				id: 'iconAnchorXUnits',
				store:['fraction','pixels'],	    	
		    },{
				xtype: 'combobox',
				reference: 'iconAnchorYUnits',
				publishes: 'iconAnchorYUnits',
				name: 'iconAnchorYUnits',
				fieldLabel: 'Ancora Y',
				displayField: 'iconAnchorYUnits',	    	
				id: 'iconAnchorYUnits',
				store:['fraction','pixels'],	    	
		    },{
		    	xtype: 'textfield',
		    	fieldLabel: 'Rotação',
		    	emptyText: '0',
		    	name: 'iconRotation',
		    	id: 'iconRotation',
		    }]
	    }, {
	        xtype: 'container',
	        layout: 'vbox',    
	        padding: '10, 10, 10, 0',
	        items: [{
			        xtype: 'textfield',
			        fieldLabel: 'Cor',
			    	allowBlank : false,
			        name : 'iconColor',
			        id : 'iconColor',
			        value: '#000000',
			        labelWidth: 90,
			        emptyText: '#000000',
			        listeners: {
			        	change: function( element ) {
			        		$( '#colorpickerHolder' ).ColorPickerSetColor( element.getValue() );
			        		$( '#iconPreview' ).css("background-color", element.getValue() );
			        	}
			        }	        
			    },{
			        xtype: 'component',
			        autoEl: 'div',
			        id : 'colorpickerHolder',
			    },{
			    	xtype : 'hidden',
			        name : 'idFeatureStyle',
			        id : 'idFeatureStyle',
			    }]
		}]    
	}, {
		// ========================= TEXTO ====================================
		title:'Texto',
	    layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },  		
	    bodyPadding: '0',
	    defaultType: 'textfield',
	    defaults: {
	        anchor: '100%',
	        msgTarget: 'under',
	        labelWidth: 90
	    },	    

		items:[{
			xtype: 'container',
  	        layout: 'vbox',    
   	        padding: '10, 30, 10, 10',
   	        items: [{
			     xtype: 'textfield',
			     fieldLabel: 'Nome da Fonte',
			     //emptyText:'9px Tahoma',
			     name: 'textFont',
			     id: 'textFont',
			},{
			     xtype: 'textfield',
			     fieldLabel: 'Largura do Contorno',
			     emptyText:'0',
			     name: 'textStrokeWidth',
			     id: 'textStrokeWidth',
			},{
			     xtype: 'textfield',
			     fieldLabel: 'Offset Y',
			     emptyText:'0',
			     name: 'textOffsetY',
			     id: 'textOffsetY',
			},{
			     xtype: 'textfield',
			     fieldLabel: 'Offset X',
			     emptyText:'0',
			     name: 'textOffsetX',
			     id: 'textOffsetX',
			}]
		},{
			xtype: 'container',
			layout: 'vbox',    
			padding: '10, 10, 10, 0',
			items: [
				{
					xtype: 'container',
					layout: 'hbox',    
					padding: '0',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'Cor da Fonte',
						emptyText:'#000000',
						name: 'textFillColor',
						id: 'textFillColor',
						value:'#000000',
						listeners: {
							change: function( element ) {
								$( '#textClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
							},
							focus: function( element ) {
								$( '#tfcId' ).css("display","block");
								$( '#tscId' ).css("display","none");
								Ext.getCmp("styleEditorTC").selectedTextColorField = 'textFillColor';
								$( '#textClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
							}
						}
					},{
						xtype: 'component',
						autoEl: 'div',
						width : 30,
						height:30,
						style : 'margin-left:3px',
						html : '<img id="tfcId" style="width:30px;height:30px" src="img/back-arrow.svg">'
					}]
				},{
					xtype: 'container',
					layout: 'hbox',    
					padding: '10, 10, 10, 0',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'Cor do Contorno',
						emptyText:'#000000',
						name: 'textStrokeColor',
						id: 'textStrokeColor',
						value:'#000000',
						listeners: {
							change: function( element ) {
								$( '#textClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
							},
							focus: function( element ) {
								$( '#textClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
								$( '#tfcId' ).css("display","none");
								$( '#tscId' ).css("display","block");
								Ext.getCmp("styleEditorTC").selectedTextColorField = 'textStrokeColor';
							}
						}	
					},{
						xtype: 'component',
						autoEl: 'div',
						width : 30,
						height:30,
						style : 'margin-left:3px',
						html : '<img id="tscId" style="display:none;width:30px;height:30px" src="img/back-arrow.svg">'
					}]    	
				}, {
					xtype: 'component',
					autoEl: 'div',
					id : 'textClrPickerHolder',
				}   	        
			]
		}]
	},{
		// ========================= LINHAS ====================================
		title:'Linhas',
	    layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },  		
	    bodyPadding: '0',
	    defaultType: 'textfield',
	    defaults: {
	        anchor: '100%',
	        msgTarget: 'under',
	        labelWidth: 90
	    },	    

		items:[{
			xtype: 'container',
  	        layout: 'vbox',    
   	        padding: '10, 30, 10, 10',
   	        items: [{
			     xtype: 'textfield',
			     fieldLabel: 'Largura do Contorno',
			     emptyText:'2',
			     name: 'lineStrokeWidth',
			     id: 'lineStrokeWidth',
			},{
			     xtype: 'textfield',
			     fieldLabel: 'Estilo da Linha',
			     emptyText:'[2, 10, 2]',
			     name: 'lineLineDash',
			     id: 'lineLineDash',
   	        }]
		},{
			xtype: 'container',
  	        layout: 'vbox',    
   	        padding: '10, 10, 10, 0',
   	        items: [
				{
					xtype: 'container',
					layout: 'hbox',    
					padding: '0',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'Cor de Contorno da Linha',
						emptyText:'#000000',
						value : '#000000',
						name: 'lineStrokeColor',
						id: 'lineStrokeColor',
						listeners: {
							change: function( element ) {
								$( '#lineClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
							},
							focus: function( element ) {
								$( '#lfcId' ).css("display","block");
								$( '#lscId' ).css("display","none");
								Ext.getCmp("styleEditorTC").selectedLineColorField = 'lineStrokeColor';
								$( '#lineClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
							}
						}
					},{
						xtype: 'component',
						autoEl: 'div',
						width : 30,
						height:30,
						style : 'margin-left:3px',
						html : '<img id="lfcId" style="width:30px;height:30px" src="img/back-arrow.svg">'
					}]
				},{
					xtype: 'container',
					layout: 'hbox',    
					padding: '10, 10, 10, 0',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'Cor da Linha',
						emptyText:'#000000',
						value : '#000000',
						name: 'lineFillColor',	
						id: 'lineFillColor',
						listeners: {
							change: function( element ) {
								$( '#lineClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
							},
							focus: function( element ) {
								$( '#lineClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
								$( '#lfcId' ).css("display","none");
								$( '#lscId' ).css("display","block");
								Ext.getCmp("styleEditorTC").selectedLineColorField = 'lineFillColor';
							}
						}	
					},{
						xtype: 'component',
						autoEl: 'div',
						width : 30,
						height:30,
						style : 'margin-left:3px',
						html : '<img id="lscId" style="display:none;width:30px;height:30px" src="img/back-arrow.svg">'
					}]    	
				}, {
					xtype: 'component',
					autoEl: 'div',
					id : 'lineClrPickerHolder',
				}   	        
   	        ]
		}],
	}, {
		// ========================= POLIGONOS ====================================
		title:'Polígonos',
	    layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },  		
	    bodyPadding: '0',
	    defaultType: 'textfield',
	    defaults: {
	        anchor: '100%',
	        msgTarget: 'under',
	        labelWidth: 90
	    },	    

		items:[{
	        xtype: 'container',
	        padding: '10, 30, 10, 10',
	        layout: 'vbox',      
	        items: [{
		    	xtype: 'textfield',
		    	fieldLabel: 'Largura do Contorno',
		    	name: 'polygonStrokeWidth',
		    	id: 'polygonStrokeWidth',
		    	emptyText: '1',
		    	// change interceptado pelo controller 'MCLM.view.style.StyleEditorController'	    	
		    },{
		    	xtype: 'textfield',
		    	fieldLabel: 'Linha do Contorno',
		    	name: 'polygonLineDash',
		    	id: 'polygonLineDash',
		    	emptyText: '[1, 1]',
		    	// change interceptado pelo controller 'MCLM.view.style.StyleEditorController'	    	
		    },{
				xtype: 'combobox',
				reference: 'polygonStrokeLinecap',
				publishes: 'polygonStrokeLinecap',
				name: 'polygonStrokeLinecap',
				fieldLabel: 'Tipo de Contorno',
				displayField: 'polygonStrokeLinecap',	    	
				id: 'polygonStrokeLinecap',
				store:['butt','round','square'],
		    },{ 
		    	xtype: 'textfield',
		    	fieldLabel: 'Transparência',
		    	name: 'polygonFillOpacity',
		    	id: 'polygonFillOpacity',
		    	emptyText: '1',
		    	value : '1'
		    }]
	    }, {
	        xtype: 'container',
	        layout: 'vbox',    
	        padding: '10, 10, 10, 0',
		    items: [{
			    xtype: 'container',
			    layout: 'hbox',    
			    padding: '0',
			    items: [{
			    	xtype: 'textfield',
			    	fieldLabel: 'Cor de Preenchimento',
			    	emptyText: '#000000',
			    	value: '#000000',
			    	name: 'polygonFillColor',
			    	id: 'polygonFillColor',
			        listeners: {
			        	change: function( element ) {
			        		$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
			        	},
					    focus: function( element ) {
					    	$( '#pfcId' ).css("display","block");
					    	$( '#pscId' ).css("display","none");
					    	Ext.getCmp("styleEditorTC").selectedPolygonColorField = 'polygonFillColor';
							$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
					    }
			        }
			    },{
			        xtype: 'component',
			        autoEl: 'div',
			        width : 30,
			        height:30,
			        style : 'margin-left:3px',
			        html : '<img id="pfcId" style="width:30px;height:30px" src="img/back-arrow.svg">'
			    }]
		    },{
			    xtype: 'container',
			    layout: 'hbox',    
			    padding: '10, 10, 10, 0',
			    items: [{
					xtype: 'textfield',
					fieldLabel: 'Cor do Contorno',
					name: 'polygonStrokeColor',
					id: 'polygonStrokeColor',
					emptyText: '#000000',
					value: '#000000',
					listeners: {
						change: function( element ) {
							$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
						},
					    focus: function( element ) {
							$( '#polyClrPickerHolder' ).ColorPickerSetColor( element.getValue() );
							$( '#pfcId' ).css("display","none");
					    	$( '#pscId' ).css("display","block");
					    	Ext.getCmp("styleEditorTC").selectedPolygonColorField = 'polygonStrokeColor';
					    }
					}	
			    },{
			        xtype: 'component',
			        autoEl: 'div',
			        width : 30,
			        height:30,
			        style : 'margin-left:3px',
			        html : '<img id="pscId" style="display:none;width:30px;height:30px" src="img/back-arrow.svg">'
			    }]    	
		    }, {
		        xtype: 'component',
		        autoEl: 'div',
		        id : 'polyClrPickerHolder',
		    }]
		}]    
	}, {
		// ========================= PADRAO DE PREENCHIMENTO ====================================
		title:'Padrão de Preenchimento',
	    layout: {
	        type: 'hbox',
	        align: 'stretch'
	    },  		
	    bodyPadding: '0',
	    defaultType: 'textfield',
	    defaults: {
	        anchor: '100%',
	        msgTarget: 'under',
	        labelWidth: 90
	    },	    

		items:[{
	        xtype: 'container',
	        padding: '10, 30, 10, 10',
	        layout: 'vbox', 	    
	    
			items:[{ 
				xtype: 'textfield',
				fieldLabel: 'Dist. Horizontal',
				name: 'ptrHDist',
				id: 'ptrHDist',
				value: '',
			},{ 
				xtype: 'textfield',
				fieldLabel: 'Dist. Vertical',
				name: 'ptrVDist',
				id: 'ptrVDist',
				value: '',
			},{ 
				xtype: 'textfield',
				fieldLabel: 'Comprimento',
				name: 'ptrLength',
				id: 'ptrLength',
				emptyText: '6',
			},{ 
				xtype: 'textfield',
				fieldLabel: 'Largura do Risco',
				name: 'ptrWidth',
				id: 'ptrWidth',
				emptyText: '1',
			},{ 
				xtype: 'textfield',
				fieldLabel: 'Altura do Risco',
				name: 'ptrHeight',
				id: 'ptrHeight',
				emptyText: '1',
			}]
		}]
	    
	}],

    listeners: {
    	
        'afterrender' : function ( cmp ) {
        	
			var iconColor = Ext.getCmp("iconColor");
			var initialColor = iconColor.getValue();

			$('#colorpickerHolder').ColorPicker({
				color : initialColor,
				flat: true,
				onChange: function (hsb, hex, rgb) {
					iconColor.setValue( "#" + hex.toUpperCase() );
				}
			});
			
			// ======================================
			var polygonFillColor = Ext.getCmp("polygonFillColor");
			var initialColor = polygonFillColor.getValue();

			$('#polyClrPickerHolder').ColorPicker({
				color : initialColor,
				flat: true,
				onChange: function (hsb, hex, rgb) {
					var selColorField = Ext.getCmp("styleEditorTC").selectedPolygonColorField;
					
					var targetColorFieldId =  selColorField;
					var targetColorField = Ext.getCmp( targetColorFieldId );
					targetColorField.setValue( "#" + hex.toUpperCase() );
				}
			});
			
			// ======================================
			var lineFillColor = Ext.getCmp("lineFillColor");
			var initialLineColor = lineFillColor.getValue();

			$('#lineClrPickerHolder').ColorPicker({
				color : initialLineColor,
				flat: true,
				onChange: function (hsb, hex, rgb) {
					var selLineColorField = Ext.getCmp("styleEditorTC").selectedLineColorField;
					
					var targetColorFieldId =  selLineColorField;
					var targetColorField = Ext.getCmp( targetColorFieldId );
					targetColorField.setValue( "#" + hex.toUpperCase() );
				}
			});
			
			// ======================================
			var textFillColor = Ext.getCmp("textFillColor");
			var initialTextColor = textFillColor.getValue();
			
			$('#textClrPickerHolder').ColorPicker({
				color : initialTextColor,
				flat: true,
				onChange: function (hsb, hex, rgb) {
					var selTextColorField = Ext.getCmp("styleEditorTC").selectedTextColorField;
					
					var targetColorFieldId =  selTextColorField;
					var targetColorField = Ext.getCmp( targetColorFieldId );
					targetColorField.setValue( "#" + hex.toUpperCase() );
				}
			});		
			
			
			
			
			
        }
    }    	
});
