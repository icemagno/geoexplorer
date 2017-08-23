Ext.define('MCLM.view.paineis.PainelSuperior', {
	extend: 'Ext.Panel',
	xtype: 'painelSuperior',
	id: 'painelSuperior',
    region: 'north',
    floatable: false,
    margin: '0 0 0 0',
    height: 35,
    frame: false,
    collapsed: false,
    html : 	"<div id='topMainToolBar'>" +
    			"<a href='http://apolo.defesa.mil.br'><img style='margin-left:17px;' src='img/apolo_logo_small.png'></a>" +
    			"<a href='logout'><img id='topMainToolBarHomeIcon' src='img/power.svg'></a>" +
    			/*"<div id='topMainToolBarUserNameName'>&nbsp;</div>" +*/
    			"<div id='topMainToolBarUserName'>&nbsp;</div>" +
    			
    		"</div>",
});
