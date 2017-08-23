package br.mil.mar.casnav.mclm.persistence.services.apolo;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.persistence.services.GenericService;

public class BasicApoloService {
	private Configurator cfg;
	public GenericService gs;
	
	public String arrayToJson( String query, String alias, String aggAlias) {
		String result = "array_to_json( array_agg("+aggAlias+") )::text as "+alias+" FROM (" + query + ") as " + aggAlias;
		return result;
	}	

	public String rowToJson( String query, String alias, String aggAlias) {
		String result = "row_to_json("+aggAlias+")::text as "+alias+" FROM (" + query + ") as " + aggAlias;
		return result;
	}	
	
	public BasicApoloService() throws Exception {
		cfg = Configurator.getInstance();
	}
	
	public Configurator getCfg() {
		return cfg;
	}
	
	public GenericService getGs() {
		return gs;
	}
	
	public void connect() throws Exception {
		String connectionString = "jdbc:postgresql://" + cfg.getApoloDatabaseAddr() +
				":" + cfg.getApoloDatabasePort() + "/" + cfg.getApoloDatabaseName();
		gs = new GenericService( connectionString, cfg.getApoloUserName(), cfg.getApoloPassword() );
		
	}
	
}
