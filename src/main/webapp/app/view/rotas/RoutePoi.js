Ext.define('MCLM.view.rotas.RoutePoi', {
    extend: 'Ext.panel.Panel',
    
    id: 'routePoi',
    xtype: 'routePoi',
    layout: 'accordion',

    frame : false,
    border : false,
    
    defaults: {
        bodyPadding: 2
    },
    
    height: 200,
    
    items: [{
        title: 'Órgãos Policiais',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'police-button',
            	id: 'police-button',
            	enableToggle: true,

            }]
        }],	        
    }, {
        title: 'Estações de Transporte',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'rodoviaria-button',
            	id: 'rodoviaria-button',
            	enableToggle: true,
            },{
            	xtype : "button",
            	cls: 'helipad-button',
            	id: 'helipad-button',
            	enableToggle: true,
            },{
            	xtype : "button",
            	cls: 'airport-button',
            	id: 'airport-button',
            	enableToggle: true,
            },{
            	xtype : "button",
            	cls: 'port-button',
            	id: 'port-button',
            	enableToggle: true,
            },{
            	xtype : "button",
            	cls: 'trainstation-button',
            	id: 'trainstation-button',
            	enableToggle: true,
            }]
        }],	        
    }, {
        title: 'Obras de Arte',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'obras-button',
            	id: 'obras-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'ponte-button',
            	id: 'ponte-button',
            	enableToggle: true,

            }]
        }],	        
    }, {
        title: 'Saúde',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'hospital-button',
            	id: 'hospital-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'clinic-button',
            	id: 'clinic-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'blood-button',
            	id: 'blood-button',
            	enableToggle: true,

            }]
        }],	        
    }, {
        title: 'Estádios / Escolas',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'estadio-button',
            	id: 'estadio-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'school-button',
            	id: 'school-button',
            	enableToggle: true,

            }]
        }],	        
    }, {
        title: 'Diversos',
        dockedItems: [{
            xtype: 'toolbar',
            style: {
                background: '#FFFFFF'
            },
            frame : false,
            border : false,
            items: [{
            	xtype : "button",
            	cls: 'toll-button',
            	id: 'toll-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'gasolina-button',
            	id: 'gasolina-button',
            	enableToggle: true,

            },{
            	xtype : "button",
            	cls: 'prison-button',
            	id: 'prison-button',
            	enableToggle: true,
            },{
            	xtype : "button",
            	cls: 'levelcrossing-button',
            	id: 'levelcrossing-button',
            	enableToggle: true,
            },{
            	xtype : "button",
            	cls: 'railway-button',
            	id: 'railway-button',
            	enableToggle: true,
            }]
        }],	        
    }],
    
	listeners: {
		
		afterrender: function(component, eOpts) {
			
			var buttons = this.query('button');
			Ext.Array.each(buttons, function(button) {
			    button.setDisabled(true);
			    button.on('click', MCLM.RouteHelper.locatePois  );
			});			
			
		}
    
	}	
});
    