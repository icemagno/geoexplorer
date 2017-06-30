Ext.define('MCLM.view.clima.PrevisaoWindow', {
	
	extend: 'Ext.Window',
	floating: true,
	
	id:'previsaoClima',    	
	xtype: 'previsaoClima',
	title : "Avisos Meteorológicos",
	width : 300,
	height: 550,
	bodyStyle:"background:#FFFFFF;",
	resizable: true,
	constrain: true,
	renderTo: Ext.getBody(),

	autoScroll : true,
	
    listeners: {
		close : function() {
			MCLM.ClimaHelper.clear();
        	var detalheClima = Ext.getCmp('detalheClima');
        	if ( detalheClima ) {
        		detalheClima.close();
        	}			
		}
    }	

    
});