Ext.define('MCLM.view.rotas.RoadDetailPanel', {
	extend: 'Ext.Panel',
	xtype: 'roadDetailPanel',
	id: 'roadDetailPanel',
	height: 175,

	autoScroll : true,
	
    requires: [
      'MCLM.view.rotas.RoutePoi',
    ],	

	items: [{
		xtype: 'routePoi'
	}],    
	
});
