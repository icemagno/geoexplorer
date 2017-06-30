Ext.define('MCLM.view.datawindow.ConfigDataPanelsTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.configDataPanelsTreeController',

    viewready: function (tree) {
    	
        var view = tree.getView();
        var dd = view.findPlugin('treeviewdragdrop');

        dd.dragZone.onBeforeDrag = function (data, e) {
            var rec = view.getRecord( e.getTarget( view.itemSelector ) );
            // Will not drag folders !
            return rec.isLeaf();
        };
        
    },
    
 
});