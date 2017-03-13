Ext.define('MCLM.view.rotas.PainelOrigem', {
	extend: 'Ext.Panel',
	xtype: 'painelOrigem',

	height: 40,
    html : '<div style="cursor:pointer;width:100%;height:45px" id="selectSourceMainDiv">' +
    	'<div style="position:absolute;top:10px;left:5px"> <img id="selectSourceIcon" style="height:15px" src="img/next.svg"> </div>'+
    	'<div class="routeText" id="sourceAddrText" style="margin-left:30px;margin-top:5px">Selecione o endereço de origem</div>' +
    	'<input style="display:none" type="text" id="sourceValue">'+
    '</div>'
    
});

