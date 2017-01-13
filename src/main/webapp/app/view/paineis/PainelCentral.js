Ext.define('MCLM.view.paineis.PainelCentral', {
	extend: 'Ext.Panel',
	xtype: 'painelCentral',
	collapsible: false,
	region: 'center',
	margin: '0 0 0 0',
	layout:'fit',
	id: 'painelCentral',
	
	requires: [
	  'MCLM.Map'
	],
	
	listeners:{
    	resize: function () {
    		MCLM.Map.map.updateSize();
        },
        
        afterrender:function(){
			var container = this.body.dom.id;
			MCLM.Map.loadMap( container ); 
		}
	} 
   
	
});

