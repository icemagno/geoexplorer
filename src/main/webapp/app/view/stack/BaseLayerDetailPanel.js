Ext.define('MCLM.view.stack.BaseLayerDetailPanel', {
	xtype : 'baseLayerDetailPanel',
	extend: 'Ext.Panel',
	height : 60,
	border: false,
	bodyPadding: 5,
	html: '<div data-qtip="A Camada de Base não pode <br> ter sua ordem modificada." style="position:relative;float: left; width: 100%; padding:0px;">' +
    '<div style="margin-right:5px;border:1px solid black;float:left;width:102px;height:52px">' +
    	'<img class="minithumb" style="display:none;width:100px;height:50px" id="mclm_landlayer_cmoa" src="img/loading2.gif">' +
    '</div>' +
    '<div style="float: left;margin-left:5px;width:75%">'+
        '<div style="padding: 0px;"><b>Camada de Base</b></div>'+
        '<div id="mclm_landlayer_cmoa_layer" style="padding: 2px 5px 2px 5px;">A camada de base do mapa.</div>'+
    '</div></div>'+
    '<div id="error_mclm_landlayer_cmoa" style="display:none;position:absolute;top:2px;left:2px"><img style="width:24px;height:24px;" src="img/alert.png"></div>'+
    '<div class="alert-icon" id="alert_mclm_landlayer_cmoa" style="display:none;position:absolute;top:2px;left:2px"><img style="width:24px;height:24px;" src="img/loading.gif"></div>',
});	