package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.ExternalSourcesCollection;
import br.mil.mar.casnav.mclm.misc.PostgresSourcesCollection;
import br.mil.mar.casnav.mclm.misc.TablesCollection;
import br.mil.mar.casnav.mclm.persistence.entity.Postgres;
import br.mil.mar.casnav.mclm.persistence.entity.PostgresTable;
import br.mil.mar.casnav.mclm.persistence.entity.Server;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.ServerRepository;

public class ServerService {
	private ServerRepository rep;

	public ServerService() throws DatabaseConnectException {
		this.rep = new ServerRepository();
	}

	public void updateServerWMS(Server server) throws UpdateException {
		Server oldServer;

		try {
			oldServer = rep.getServerWMS( server.getIdServer() );
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldServer.setUrl( server.getUrl() );
		
		rep.newTransaction();
		rep.updateServer(oldServer);

	}	

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public Postgres getServerPGR( int IdServer ) throws Exception {
		return rep.getServerPGR( IdServer );
	}
	
	public String insertServerWMS( String name, String url, String version ) throws InsertException {
		String result = "{ \"success\": true, \"msg\": \"Fonte de Dados criada com sucesso.\" }";
		try {
			if ( !url.endsWith("/") ) {
				url = url + "/";
			}
			Server server = new Server( name, url, version, "WMS" );
			rep.insertServerWMS( server );
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
	}	

	public String insertServerPGR(String name, String serverAddress, String serverUser, String serverPassword, String serverDatabase, int serverPort ) throws InsertException {
		String result = "{ \"success\": true, \"msg\": \"Fonte de Dados criada com sucesso.\" }";
		try {
			Postgres server = new Postgres( name, serverAddress, serverUser, serverPassword, serverDatabase, serverPort, "WMS" );
			rep.insertServerPGR( server );
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
	}	
	
	
	public String deleteServer( int idServer, String type ) {
		String result = "{ \"success\": true, \"msg\": \"Fonte de Dados removida com sucesso.\" }";
		
		try {
			
			if ( type.equals("WMS") ) {
				Server server = rep.getServerWMS(idServer);
				rep.newTransaction();
				rep.deleteServerWMS(server);
			}
			
			if ( type.equals("PGR") ) {
				Postgres server = rep.getServerPGR( idServer );
				rep.newTransaction();
				rep.deleteServerPGR(server);
			}
			
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
	}

	public List<Server> getWMSList( ) throws Exception {
		return rep.getListWMS( );
	}

	public List<Postgres> getPGRList( ) throws Exception {
		return rep.getListPGR( );
	}

	public PostgresTable getTable( int idTable ) throws Exception {
		return rep.getTable( idTable );
	}
	
	public List<PostgresTable> getTablesList( ) throws Exception {
		return rep.getListTables( );
	}

	public String getWMSAsJson() throws Exception {
		List<Server> servers = getWMSList();
		ExternalSourcesCollection esc = new ExternalSourcesCollection( servers );
		JSONObject itemObj = new JSONObject( esc );
		return itemObj.toString();		
	}	

	public String getPGRAsJson() throws Exception {
		List<Postgres> servers = getPGRList();
		PostgresSourcesCollection esc = new PostgresSourcesCollection( servers );
		JSONObject itemObj = new JSONObject( esc );
		return itemObj.toString();		
	}	
	
	public String getTablesAsJson() throws Exception {
		List<PostgresTable> tables = getTablesList();
		TablesCollection esc = new TablesCollection( tables );
		JSONObject itemObj = new JSONObject( esc );
		return itemObj.toString();		
	}	
	
}
