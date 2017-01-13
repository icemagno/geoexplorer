Ext.define('MCLM.model.LayerTreeModel', {
    extend: 'Ext.data.TreeModel',
	fields: [
		{ name: 'index', type: 'int' },
		{ name: 'text', type: 'string' },
		{ name: 'serviceUrl', type: 'string' },
		{ name: 'layerName', type: 'string' },
		{ name: 'originalServiceUrl', type: 'string' },
		{ name: 'layerType', type: 'string' },
		{ name: 'serialId', type: 'string' },
		{ name: 'version', type: 'string' },
		{ name: 'layerAlias', type: 'string' },
		{ name: 'description', type: 'string' },
		{ name: 'institute', type: 'string' },
		{ name: 'idNodeParent', type: 'int' },
		{ name: 'transparency', type: 'int' },
		{ name: 'layerStackIndex', type: 'int' },
		{ name: 'readOnly', type: 'boolean' },
		{ name: 'idNodeData', type: 'string' },
		{ name: 'checked', type: 'boolean' },
		{ name: 'selected', type: 'boolean' }
    ],

});