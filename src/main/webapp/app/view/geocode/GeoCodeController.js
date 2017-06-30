Ext.define('MCLM.view.geocode.GeoCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.geocode',
    
    getAddress : function ( ) {
    	
    	var geocodeWindow = Ext.getCmp('geocodeWindow');
    	var geoCodePanel = Ext.getCmp('geoCodePanel');
    	
    	geoCodePanel.update( "Não implementado ainda" );    
    	
    }
    
});