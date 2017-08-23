
Ext.define('MCLM.store.Dictionary', {
    extend: 'Ext.data.Store',
    storeId:'store.dictionary',
    requires: ['Ext.data.proxy.Memory'],

    autoLoad : false,
    autoSync: false,    
    
    fields: [
         {name: 'idDictionaryItem', type:'int', mapping:'idDictionaryItem' },
         {name: 'idNodeData',type:'int', mapping:'node.idNodeData'},
         {name: 'layerName',type:'string', mapping:'node.layerName'},
         {name: 'dataType',type:'string', mapping:'dataType'},
         {name: 'originalName',type:'string', mapping:'originalName'},
         {name: 'translatedName',type:'string', mapping:'translatedName'},
         {name: 'description',type:'string', mapping:'description'},
         {name: 'visible',type:'boolean', mapping:'visible'},
         {name: 'indexOrder',type:'int', mapping:'indexOrder'},
         {name: 'primaryKey',type:'boolean', mapping:'primaryKey'},
    ], 


	proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
        },
        api: {
            read: 'getDictionary',
            create: 'updateDictionary',
            update: 'updateDictionary',
            destroy: 'deleteDictionary'
        },         
        writer: {
            type:'json',
            allowSingle:false,
            writeAllFields : true,
            encode:true,
            rootProperty:'dictionary'
        }          
	},    
    
    
	listeners: {
        load: function(store, records){
        	console.log( records );
    	}			
	},
    
    sorters: [{
    	property: 'originalName',
    	direction: 'ASC'
    }]
        
});    
