Ext.define('MCLM.view.addlayer.tif.UploadTifForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.uploadTifForm',
	id : 'uploadTifForm',
	
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
        id: 'newLayerTifAlias',
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
        id: 'TifFile',
        emptyText: 'Selecione um arquivo',
        fieldLabel: 'Arquivo',
        name: 'TifFile',
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
    	// Interceptado pelo controller 'MCLM.view.addlayer.Tif.UploadTifController'	
        text: 'Fechar',
        id : 'closeUploadTifWindow'
      },{
    	// Interceptado pelo controller 'MCLM.view.addlayer.Tif.UploadTifController'	
        text: 'Enviar',
        id : 'uploadTifFormSubmit'
    }]
});
