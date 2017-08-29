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
    			"<a href='http://geodata.cmabreu.com.br/'><img style='margin-left:17px;height:44px;' src='img/geoexplorer-barra.png'></a>" +
				"<div id='topMainToolBarUserName'>by Carlos Magno Abreu</div>" +
    		"</div>",
});
