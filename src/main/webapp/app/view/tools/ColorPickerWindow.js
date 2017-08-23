Ext.define('MCLM.view.tools.ColorPickerWindow', {
	
	extend: 'Ext.Window',
	
	id:'colorPickerWindow',    	
	xtype: 'colorPickerWindow',
	title : "Seletor de Cor",
	width : 368,
	height: 240,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),
	
    items: [{
        xtype: 'component',
        autoEl: 'div',
        id : 'colorpickerWHolder',
    }],
    
    oldColor : null,
    currentColor : null,
    colorComponent : null,

    init : function( initialColor, component ) {
    	var me = this;
    	me.colorComponent = component;
    	me.oldColor = initialColor;
    	me.currentColor = initialColor;
    	
		$('#colorpickerWHolder').ColorPicker({
			color : initialColor,
			flat: true,
			onChange: function (hsb, hex, rgb) {
				me.currentColor = "#" + hex.toUpperCase();
			}
		});
    	
    },
    
    buttons: [{
        text: 'Padrão',
        handler: function() {
        	var colorPickerWindow = Ext.getCmp('colorPickerWindow');
        	colorPickerWindow.colorComponent.setValue( '#EFF1F2' );
        	colorPickerWindow.close();
        }
      },{
        text: 'Cancelar',
        handler: function() {
        	var colorPickerWindow = Ext.getCmp('colorPickerWindow');
        	colorPickerWindow.colorComponent.setValue( colorPickerWindow.oldColor );
        	colorPickerWindow.close();
        }
      },{
        text: 'Ok',
        handler: function() {
        	var colorPickerWindow = Ext.getCmp('colorPickerWindow');
        	colorPickerWindow.colorComponent.setValue( colorPickerWindow.currentColor );
        	colorPickerWindow.close();
        }
    }],    
    
    
    listeners: {
    	
    	
    	close : function() {
    		//
    	},
	    
	    afterrender : function ( cmp ) {    
	    	//
	    }
    }


});