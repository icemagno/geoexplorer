Ext.define('MCLM.view.apolo.feicoes.AreasNotaveisForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.areasNotaveisForm',
	id : 'areasNotaveisForm',
	
    frame: false,
    
    flex : 1,
    bodyPadding: '0',
   
    layout: {
        type: 'hbox',
        align: 'stretch'
    },    
    
    items: [{
    	xtype: 'container',
		layout: 'vbox',    
		padding: '5',
        flex: 1,
        
        defaults: {
            anchor: '100%',
            msgTarget: 'under',
            labelWidth: 150,
            width: 350,
        },
        
		items: [{
			xtype: 'hidden',
	    	fieldLabel: 'Json Data',
	    	name: 'anData',
	    	id: 'anData',
	    	allowBlank : false,
	    },{
	    	// INT - Interesse, END - Endemias ou Condições Sanitárias adversas, AGR - Agrícola, 
	    	// PEC - Produção Pecuária, BIO - Insumos de Biocombustíveis.
	    	xtype: 'hidden',
	    	fieldLabel: 'Código da Categoria', 
	    	name: 'cat_code',
	    	id: 'cat_code',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Código',
	    	name: 'codigo',
	    	id: 'codigo',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Nome',
	    	name: 'nome',
	    	id: 'nome',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Área Km2',
	    	name: 'areakm2',
	    	id: 'areakm2',
	    },{
			xtype: 'textarea',
	    	fieldLabel: 'Inf. Contato',
	    	name: 'inf_contato',
	    	id: 'inf_contato',
	    },{
			xtype: 'textarea',
	    	fieldLabel: 'Características Notáveis',
	    	name: 'inf_adicionais',
	    	id: 'inf_adicionais',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Referência WEB',
	    	name: 'link_web',
	    	id: 'link_web',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'orgid_controladora',
	    	name: 'orgid_controladora',
	    	id: 'orgid_controladora',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'simb_poligono_id',
	    	name: 'simb_poligono_id',
	    	id: 'simb_poligono_id',
	    	allowBlank : false,
	    },{
			xtype: 'component',
			autoEl: 'div',
			width : 250,
			height: 50,
			id:'mappolycolorBoxContainer',
			style : 'width:300px',
			html : '<div style="line-height:25px;width:155px;float:left">Cor no Mapa:</div><div style="border:1px solid black;float:left;width:25px;height:25px" id="mappolycolorBox"></div>',
	    },{
			xtype: 'hidden',
	    	fieldLabel: 'mappolycolor',
	    	name: 'mappolycolor',
	    	id: 'mappolycolor',
	    	allowBlank : false,
	    }]
	},{
    	xtype: 'container',
		layout: 'vbox',    
		padding: '5',
		flex: 1,

        defaults: {
            anchor: '100%',
            msgTarget: 'under',
            labelWidth: 150,
            width: 350,
        },
		
		items: [{
			xtype: 'textfield',
	    	fieldLabel: 'Json Data 2',
	    	name: 'anData2',
	    	id: 'anData2',
	    	allowBlank : false,
	    },{
			xtype: 'textfield',
	    	fieldLabel: 'Json Data 3',
	    	name: 'anData3',
	    	id: 'anData3',
	    	allowBlank : false,
	    }]

	}],
	
    listeners: {

		afterrender:function(){
			//
		}
    
    }
    
		
});
