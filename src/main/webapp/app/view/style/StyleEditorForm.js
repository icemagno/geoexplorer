Ext.define('MCLM.view.style.StyleEditorForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.styleEditorForm',
	id : 'styleEditorForm',
	
    frame: false,
    
    requires: [
        'MCLM.view.style.StyleEditorTabContainer',
    ],    
    
    
    flex : 1,
    bodyPadding: '0',

   
    layout: {
        type: 'vbox',
        align: 'stretch'
    },      
  
    items: [{
    	xtype: 'container',
		layout: 'hbox',    
		padding: '5',
		height : 100,
		items: [{
			xtype: 'textfield',
	    	fieldLabel: 'Nome do Estilo',
	    	name: 'featureStyleName',
	    	id: 'featureStyleName',
	    	allowBlank : false,
	    },{
			xtype: 'component',
			autoEl: 'div',
			width : 360,
			height: 90,
			id:'stylePreviewMapID',
			style : 'border:1px solid black;margin-left:20px',
	    }]
	},{
        xtype: 'view.styleEditorTC',
    }],

    
    buttons: [{
    	text: 'Fechar',
    	id: 'closeStyleEditorWindow'
   	},{
        text: 'Enviar',
        id : 'styleEditorFormSubmit'
    }],
    
   
    
});
