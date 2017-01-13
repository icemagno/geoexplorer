Ext.define('MCLM.view.addlayer.kml.UploadKmlForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.uploadKmlForm',
	id : 'uploadKmlForm',
	
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
        fieldLabel: 'Titulo',
        width: 330,
        name: 'layerAlias',
        id: 'newLayerKmlAlias',
        allowBlank : false,
    }, {
        fieldLabel: 'Descrição',
        width: 330,
        name: 'description',
        allowBlank : false,
    }, {
        fieldLabel: 'Origem',
        width: 330,
        name: 'institute',
        allowBlank : false,
    },{
        xtype: 'filefield',
        id: 'kmlFile',
        emptyText: 'Selecione um arquivo',
        fieldLabel: 'Arquivo',
        name: 'kmlFile',
        buttonText: 'Selecionar',
    },{
        fieldLabel: 'Parend ID',
        width: 350,
        xtype : 'hidden',
        name: 'layerFolderID',
        id:'layerFolderID',
        readOnly: true,
    }],

    buttons: [{
    	// Interceptado pelo controller 'MCLM.view.addlayer.Kml.UploadKmlController'	
        text: 'Fechar',
        id : 'closeUploadKmlWindow'
      },{
    	// Interceptado pelo controller 'MCLM.view.addlayer.Kml.UploadKmlController'	
        text: 'Enviar',
        id : 'uploadKmlFormSubmit'
    }]
});
