Ext.define('MCLM.view.addlayer.shp.UploadShpForm', {
	extend: 'Ext.form.Panel',
	xtype : 'view.uploadShpForm',
	id : 'uploadShpForm',
	
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
        id: 'newLayerShpAlias',
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
        id: 'shpFile',
        emptyText: 'Selecione um arquivo',
        fieldLabel: 'Arquivo',
        name: 'shpFile',
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
    	// Interceptado pelo controller 'MCLM.view.addlayer.shp.UploadShpController'	
        text: 'Fechar',
        id : 'closeUploadShpWindow'
      },{
    	// Interceptado pelo controller 'MCLM.view.addlayer.shp.UploadShpController'	
        text: 'Enviar',
        id : 'uploadShpFormSubmit'
    }]
});
