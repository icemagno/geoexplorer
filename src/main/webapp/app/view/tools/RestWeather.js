Ext.define('MCLM.view.tools.RestWeather', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	id:'restWeather',    	
	xtype: 'restWeather',

    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    items: [{
	    iconCls: 'inmet-icon',
        handler: 'showForecast',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'showForecastID',
        xtype: 'button',
    },{
	    iconCls: 'cptec-icon',
        handler: 'enableQueryLocation',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'enableQueryLocationID',
        xtype: 'button',
    },{
	    iconCls: 'windy-icon',
        handler: 'showWindyWindow',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'showWindyWindowID',
        xtype: 'button',
    },{
	    iconCls: 'owm-rain-icon',
	    enableToggle: true,
        handler: 'togglePrecipitation',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'togglePrecipitationID',
        xtype: 'button',
    },{
	    iconCls: 'owm-wind-icon',
	    enableToggle: true,
        handler: 'toggleWind',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'toggleWindID',
        xtype: 'button',
    },{
	    iconCls: 'owm-temp-icon',
	    enableToggle: true,
        handler: 'toggleTemp',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'toggleTempID',
        xtype: 'button',
    },{
	    iconCls: 'owm-pressure-icon',
	    enableToggle: true,
        handler: 'togglePressure',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'togglePressureID',
        xtype: 'button',
    },{
	    iconCls: 'cptec-anim-icon',
        handler: 'showCptecAnimation',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'showCptecAnimationID',
        xtype: 'button',
    }],

	
});