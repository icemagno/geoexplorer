Ext.define('MCLM.view.style.StyleListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.styleListController',
   
 
    
    init : function(app) {
    	
        this.control({
        	
            '#closeStyleListWindow' : {
            	click: this.closeWindow 
            },
            
        });
        
    },
    
    newStyle : function() {
    	
    	var styleEditorWindow = Ext.getCmp('styleEditorWindow');
    	if ( !styleEditorWindow ) styleEditorWindow = Ext.create('MCLM.view.style.StyleEditorWindow');
    	styleEditorWindow.show();
    	
    }
    
});