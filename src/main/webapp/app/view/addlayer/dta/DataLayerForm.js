Ext.define('MCLM.view.addlayer.dta.DataLayerForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.dataLayerForm',
	id : 'dataLayerForm',
	
    frame: false,
    region: 'center',
    fileUpload: true,
    bodyPadding: '10 10 0',
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'under',
        labelWidth: 90
    },

    items: [
    {
        fieldLabel: 'Nome',
        width: 330,
        name: 'dataLayerName',
        id: 'dataLayerName',
        allowBlank : false,
    }, {
        fieldLabel: 'Descrição',
        width: 330,
        name: 'hint',
        allowBlank : false,
    }, {
        fieldLabel: 'Origem',
        width: 330,
        name: 'institute',
        allowBlank : false,
    },{
        fieldLabel: 'Fonte de Dados',
        width: 330,
        name: 'idTable',
        xtype: 'combo',
        store : 'store.tables',
    	valueField: 'idTable',
    	displayField: 'name',
    	editable: false,
    	triggerAction: 'all'
    }, {
        fieldLabel: 'Critério de Seleção',
        width: 330,
        name: 'whereClause',
        allowBlank : false,
    }, {
    	fieldLabel: 'Atributos de Propriedade',
    	width: 330,
    	name: 'propertiesColumns',
    	allowBlank : false,
    },
    {
    	fieldLabel: 'Atributo de Exibição',
    	width: 330,
    	name: 'displayColumn',
    	allowBlank : false,
    },
    {
    	
		xtype: 'combobox',
		name: 'idFeatureStyle',
		fieldLabel: 'Estilo da Camada',
		displayField: 'featureStyleName',	    	
		id: 'idFeatureStyle',
		store: 'store.styles',	    	
		editable : false,
	    queryMode: 'local',
	    valueField: 'idFeatureStyle',		
		
    },   
    {
        fieldLabel: 'Parend ID',
        width: 350,
        xtype : 'hidden',
        name: 'layerFolderID',
        id:'layerFolderID',
        readOnly: true,
    }],

    buttons: [{
    	// Interceptado pelo controller 'MCLM.view.addlayer.dta.DataLayerController'	
        text: 'Fechar',
        id : 'closeDataLayerWindow'
      },{
    	// Interceptado pelo controller 'MCLM.view.addlayer.dta.DataLayerController'	
        text: 'Enviar',
        id : 'dataLayerFormSubmit'
    }]
});
