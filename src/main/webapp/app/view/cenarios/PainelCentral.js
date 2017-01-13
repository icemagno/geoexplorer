Ext.define('MCLM.view.cenarios.PainelCentral', {
	extend: 'Ext.Panel',
	xtype: 'cenariosPainelCentral',
	width: 300,
	region: 'east',
	margin: '0 0 0 0',
	layout:'border',
	id: 'cenariosPainelCentral',
	
    requires: [
       'MCLM.view.cenarios.MiniImage',
       'MCLM.view.cenarios.PainelInferiorDireito'
     ],	  	
	
	items: [{
		xtype: 'cenarioMiniImage'
	},{
		xtype: 'inferiorDireito'
	}]

});
