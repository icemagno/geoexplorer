Ext.define('MCLM.model.DataWindowFieldModel', {
    extend: 'Ext.data.TreeModel',
	fields: [
         {name: 'columnName',type:'string'},
	     {name: 'dataType',type:'string'},
	     {name: 'newName',type:'string'},
	     {name: 'newType',type:'string'},
	     {name: 'isId',type:'string'},
    ],

});