Ext.define('MCLM.view.cenarios.PainelEsquerdo', {
	extend: 'Ext.Panel',
	xtype: 'cenariosPainelEsquerdo',
	region: 'center',
	margin: '0 0 0 0',
	
	layout:'fit',
	id: 'cenariosPainelEsquerdo',
	
    requires: [
        'MCLM.view.cenarios.CenarioGrid',
    ],		
	
	items : [{
		xtype: 'cenarioGrid'
	}]
});
