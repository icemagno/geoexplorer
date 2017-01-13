Ext.define('MCLM.view.stack.Slider', {
	extend: 'Ext.slider.Single',
	xtype:'slider',
    width: 240,
    id: 'stackSlider',
    hideLabel: false,
    useTips: true,
    increment: 1,
    minValue: 0,
    maxValue: 10,
    value:0,
    listeners : {
        dragend: function(slider, thumb, value){
        	// Este metodo esta sendo interceptado pelo controller LayerStackController
        }
    }        
});
