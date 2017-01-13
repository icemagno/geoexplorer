Ext.define('MCLM.view.rotas.PainelDestino', {
	extend: 'Ext.Panel',
	xtype: 'painelDestino',

	flex : 1,
    html : '<div style="cursor:pointer;width:100%;height:45px" id="selectTargetMainDiv">' +
		'<div style="position:absolute;top:10px;left:5px"> <img id="selectTargetIcon" style="display:none;height:15px" src="img/next.svg"> </div>'+
		'<div class="routeText" id="targetAddrText" style="margin-left:30px;margin-top:5px">Selecione o endereço de destino</div>' +
		'<div class="routeSubText" id="targetAddrSubText" style="margin-left:40px;margin-top:5px">Clique aqui e depois no mapa para selecionar o endereço de destino.</div>' +
    	'<input style="display:none" type="text" id="targetValue">'+
	'</div>'
});
