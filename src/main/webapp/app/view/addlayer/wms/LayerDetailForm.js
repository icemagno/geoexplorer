Ext.define('MCLM.view.addlayer.wms.LayerDetailForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.layerDetailForm',
	id : 'layerDetailForm',

	
    frame: false,
    margin: "0 0 0 0",		
	
    bodyPadding: 5,
    region:'south',
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'under',
        labelWidth: 90
    },	    
    url: 'newWMSLayer',
    items: [{
        fieldLabel: 'Titulo',
        width: 330,
        id:'tituloID',
        name: 'layerAlias',
    }, {
        fieldLabel: 'Descrição',
        width: 330,
        id:'descriptionID',
        name: 'description',
    }, {
        fieldLabel: 'Origem',
        width: 330,
        id:'instituteID',
        name: 'institute',
    },{
        fieldLabel: 'Camada',
        width: 350,
        xtype : 'hidden',
        name: 'layerName',
        id:'layerNameID',
        readOnly: true,
        allowBlank : false,
    },{
        fieldLabel: 'Servidor',
        width: 350,
        xtype : 'hidden',
        name: 'serverUrl',
        id:'serverUrlID',
        readOnly: true,
    },{
        fieldLabel: 'Parend ID',
        width: 350,
        xtype : 'hidden',
        name: 'layerFolderID',
        id:'parentFolderID',
        readOnly: true,
    }],
    buttons: [{
    		  // Interceptado pelo controller 'MCLM.view.addlayer.wms.CapabilitiesController'	
	          text: 'Fechar',
	          id : 'closeCapabilitiesWindow'
	      },{
    		  // Interceptado pelo controller 'MCLM.view.addlayer.wms.CapabilitiesController'	
	          text: 'Gravar',
	          id : 'submitNewLayerForm'
          }
	]

});
