Ext.define('MCLM.view.servers.NewPostgreTableForm', {
	extend: 'Ext.form.Panel',
	xtype : 'newPostgreTableForm',
	id : 'newPostgreTableForm',
	bodyPadding: 5,
    defaultType: 'textfield',
    url: 'newTable',
    items: [{
            fieldLabel: 'Nome',
            width: 350,
            msgTarget: 'under',
            id:'newPostgreTableName',
            name: 'tableName',
            allowBlank : false,
            invalidText: '',
        },
	    {
            fieldLabel: 'Atributo de Geometria',
            width: 350,
            msgTarget: 'under',
            name: 'geometryColumnName',
            allowBlank : false,
            invalidText: '',
	    },
	    {
            width: 350,
            name: 'idServer',
            id:'newPostgreTableIdServer',
            xtype : 'hidden',
	}],
    buttons: [{
    	text: 'Fechar',
    	handler: 'closeWindow'
      },{
    	text: 'Gravar',
    	handler: 'commitForm'
    }],


});		

	