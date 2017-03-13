Ext.define('MCLM.view.style.StyleListGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'styleListGrid',
	id: 'styleListGrid',
	border: true,
	title : '',
	store : 'store.styles', 
    frame: false,
    margin: "0 0 0 0", 
    flex:1,
    loadMask: true,
    columns:[
	     {text:'Nome', dataIndex:'featureStyleName', width:200},
	     {text:'Cor do Ponto', dataIndex:'iconColor'},
	     {text:'Cor do Polígono', dataIndex:'polygonFillColor'},
	     {text:'Cor da Linha', dataIndex:'lineStrokeColor'},
	     {text:'Ícone', dataIndex:'iconSrc', width:300},
    ],
    listeners: {
    	rowdblclick : function( grid , record , element , rowIndex , e , eOpts ){
    		var theData = record.data; 
        	var styleEditorWindow = Ext.getCmp('styleEditorWindow');
        	if ( !styleEditorWindow ) styleEditorWindow = Ext.create('MCLM.view.style.StyleEditorWindow');
        	styleEditorWindow.show();
        	
        	//console.log( theData );
        	Ext.getCmp('styleEditorForm').getForm().setValues( theData );
        	
    	},
    	
        rowclick: function(grid, record, tr, rowIndex, e, eOpts) {
        	//
        },
      
    },	 
    

});	

