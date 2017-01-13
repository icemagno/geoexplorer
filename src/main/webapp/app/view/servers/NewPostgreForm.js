Ext.define('MCLM.view.servers.NewPostgreForm', {
	extend: 'Ext.form.Panel',
	xtype : 'newPostgreForm',
	id : 'newPostgreForm',
	bodyPadding: 5,
    defaultType: 'textfield',
    url: 'newExternalSource',
    items: [{
            fieldLabel: 'Nome',
            width: 350,
            msgTarget: 'under',
            id:'newPostgreName',
            name: 'name',
            allowBlank : false,
            invalidText: '',
        },
	    {
            fieldLabel: 'Endereço',
            width: 350,
            msgTarget: 'under',
            name: 'serverAddress',
            allowBlank : false,
            invalidText: '',
	    },
	    {
            fieldLabel: 'Usuário',
            width: 350,
            msgTarget: 'under',
            name: 'serverUser',
            allowBlank : false,
            invalidText: '',
	    },
	    {
            fieldLabel: 'Senha',
            width: 350,
            msgTarget: 'under',
            name: 'serverPassword',
            inputType: 'password',
            allowBlank : false,
            invalidText: '',
	    },
	    {
            width: 350,
            name: 'type',
            value : 'PGR',
            xtype : 'hidden',
	    },
	    {
            fieldLabel: 'Porta',
            width: 350,
            msgTarget: 'under',
            name: 'serverPort',
            maskRe: /[0-9.]/,
            value:'5432',
            allowBlank : false,
            invalidText: '',
	    },
	    {
            fieldLabel: 'Banco de Dados',
            width: 350,
            msgTarget: 'under',
            name: 'serverDatabase',
            allowBlank : false,
            invalidText: '',
	}],
    buttons: [{
    	text: 'Fechar',
    	handler: 'closeWindow'
      },{
    	text: 'Gravar',
    	handler: 'commitForm'
    }],


});		

	