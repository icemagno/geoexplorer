Ext.define('MCLM.view.addlayer.wms.ServersCombo', {
	extend: 'Ext.form.ComboBox',
	xtype : 'serversCombo',
	id : 'serversCombo',
	fieldLabel: 'Fonte Externa',
	displayField: 'name',
	valueField:'idServer',
	width:400,
	emptyText:'Selecione...',
    store : 'store.externalsource',
    listeners: {
    	select: function(combo, record, index) {
    		// este evento esta sendo interceptado pelo controller 
    		// MCLM.view.addlayer.wms.CapabilitiesController
        }
    }        
});
