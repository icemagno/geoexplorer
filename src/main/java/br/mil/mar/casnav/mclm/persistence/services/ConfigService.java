package br.mil.mar.casnav.mclm.persistence.services;

import java.io.File;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.ConfigRepository;

public class ConfigService {
	private ConfigRepository rep;
	
	public ConfigService() throws DatabaseConnectException {
		this.rep = new ConfigRepository();
	}
	
	public String getAsJson( User user ) {
		String result = "";
		try {
			Config cfg = null;
			try {
				cfg = getConfig();
			} catch ( Exception ex ) {
				cfg = new Config();
				cfg.setBaseLayer("osm_auto:all");
				cfg.setGeoserverUrl("http://129.206.228.72/cached/osm");
				cfg.setMapCenter("-48.129374999999925,-14.120633163259185");
				cfg.setServicosCptecUrl("http://servicos.cptec.inpe.br/");
				cfg.setServerHostName("CASNAV");
				cfg.setRoutingPort(5432);
				cfg.setMapZoom(5);
				cfg.setProxyPort(8080);
				cfg.setUseProxy(false);
				cfg.setDistanceFromRoute( 1000 ); // Metros
				newTransaction();
				insertConfig(cfg);
				
			}
			cfg.setUser( user );
			Configurator.getInstance().updateConfiguration( cfg );
			
			JSONObject itemObj = new JSONObject( cfg );
			result = itemObj.toString();
			
		} catch ( Exception e ) {
			result = "{ \"error\": true, \"msg\": \"" + e.getMessage()+ ".\" }";
			e.printStackTrace();
		}
		
		return result;
	}

	public void updateConfig(Config config) throws Exception {
		Config oldConfig;
		
		File fil = new File( config.getShapeFileTargetPath() );
		fil.mkdirs();

		try {
			oldConfig = rep.getConfig();
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldConfig.setBaseLayer( config.getBaseLayer() );
		oldConfig.setGeoserverPassword( config.getGeoserverPassword() );
		oldConfig.setGeoserverUrl( config.getGeoserverUrl() );
		oldConfig.setGeoserverUser( config.getGeoserverUser() );
		oldConfig.setNonProxyHosts( config.getNonProxyHosts() );
		oldConfig.setProxyHost( config.getProxyHost() );
		oldConfig.setProxyPassword( config.getProxyPassword() );
		oldConfig.setProxyPort( config.getProxyPort() );
		oldConfig.setProxyUser( config.getProxyUser() );
		oldConfig.setUseProxy( config.isUseProxy() );
		oldConfig.setMapZoom( config.getMapZoom() );
		oldConfig.setMapCenter( config.getMapCenter() );
		oldConfig.setQueryFactorRadius( config.getQueryFactorRadius() );
		oldConfig.setExternalWorkspaceName( config.getExternalWorkspaceName() );
		oldConfig.setExternalLayersToLocalServer( config.isExternalLayersToLocalServer() );
		oldConfig.setShapeFileTargetPath( config.getShapeFileTargetPath() );
		oldConfig.setServicosCptecUrl( config.getServicosCptecUrl() );
		
		oldConfig.setRoutingPassword( config.getRoutingPassword() );
		oldConfig.setRoutingPort( config.getRoutingPort() );
		oldConfig.setRoutingServer( config.getRoutingServer() );
		oldConfig.setRoutingUser( config.getRoutingUser() );
		oldConfig.setRoutingDatabase( config.getRoutingDatabase() );
		
		oldConfig.setApoloServer( config.getApoloServer() );
		oldConfig.setDistanceFromRoute( config.getDistanceFromRoute() );
		
		oldConfig.setServicosCptecUrl( config.getServicosCptecUrl() );
		oldConfig.setSymbolServerURL( config.getSymbolServerURL() );
		
		rep.newTransaction();
		rep.updateConfig( oldConfig );
		
		Configurator cfg = Configurator.getInstance();
		cfg.updateConfiguration( oldConfig );

	}	

	
	public Config getConfig() throws Exception{
		return rep.getConfig();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public Config insertConfig(Config config) throws InsertException {
		Config expRet = rep.insertConfig( config );
		return expRet ;
	}	


}
