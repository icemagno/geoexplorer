Ext.define('MCLM.view.paineis.PainelSuperior', {
	extend: 'Ext.Panel',
	xtype: 'painelSuperior',
	id: 'painelSuperior',
    region: 'north',
    floatable: false,
    margin: '0 0 0 0',
    height: 45,
    frame: false,
    collapsed: false,
    html : 	"<div id='topMainToolBar'>" +
    			"<a href='http://apolo.defesa.mil.br'><img style='margin-left:17px;height:40px;' src='img/geoexplorer-barra.png'></a>" +
    		"</div>",
});
