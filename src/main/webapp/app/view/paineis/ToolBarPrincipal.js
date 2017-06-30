Ext.define('MCLM.view.paineis.ToolBarPrincipal', {
	extend: 'Ext.toolbar.Toolbar',
	xtype: 'toolBarPrincipal',
	dock: 'right',
    overflowHandler: 'scroller',
    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    
    
    items: [
    {
    	// Config
    	xtype: 'button',
		id: 'id111',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'setting-icon',
	    handler : 'showConfig',
    }, 
    {
    	// Exibe / Oculta Mapa de Base
    	xtype: 'button',
    	id: 'id119',
    	enableToggle: true,
    	pressed: true,
    	width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'base-icon',
        handler: 'toggleBaseLayer'
    }, 
    {
    	// Fontes Externas
    	xtype: 'button',
    	id: 'id112',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'server-icon',
        handler: 'manageServers'
    }, 
    {
    	// Grade de coordenadas
    	xtype: 'button',
    	id: 'id115',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'grid-icon',
	    enableToggle: true,
        handler: 'toggleMapGrid'
    }, 

    {
    	// Lista de Camadas
    	xtype: 'button',
    	id: 'id116',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'layers-icon',
        handler: 'showLayerStack'
    }, 
    {
    	xtype: 'button',
    	id: 'id117',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    enableToggle: true,
	    iconCls: 'query-icon',
        handler: 'toggleQueryTool'
    }, 
    {
    	xtype: 'button',
    	id: 'id118',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'socket-icon',
        handler: 'checkInternetConnection'
    }, 
    {
    	xtype: 'button',
    	id: 'id120',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'route-icon',
        handler: 'calcRoute'
    }, 
    {
    	xtype: 'button',
    	id: 'btnStyle',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'styles-icon',
        handler: 'editStyles'
    },{
    	iconCls: 'draw-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'drawFeicaoBtn',
        handler : 'showDrawToolBar'
    },{
    	iconCls: 'cloud-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'showRestToolsBtn',
        handler : 'showRestTools'
    }]
});