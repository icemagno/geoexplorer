package br.com.cmabreu.geoexplorer.persistence.services;

import java.util.List;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.com.cmabreu.geoexplorer.misc.ExternalSourcesCollection;
import br.com.cmabreu.geoexplorer.misc.PostgresSourcesCollection;
import br.com.cmabreu.geoexplorer.misc.TablesCollection;
import br.com.cmabreu.geoexplorer.persistence.entity.Postgres;
import br.com.cmabreu.geoexplorer.persistence.entity.PostgresTable;
import br.com.cmabreu.geoexplorer.persistence.entity.Server;
import br.com.cmabreu.geoexplorer.persistence.exceptions.DatabaseConnectException;
import br.com.cmabreu.geoexplorer.persistence.exceptions.InsertException;
import br.com.cmabreu.geoexplorer.persistence.exceptions.UpdateException;
import br.com.cmabreu.geoexplorer.persistence.repository.ServerRepository;

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
	
	public String addTable( String tableName, String geometryColumnName, int idServer ) throws Exception {
		Postgres server = getServerPGR( idServer );
		
		String result = "{ \"success\": true, \"msg\": \"Tabela " + tableName + " adicionada com sucesso ao servidor " + server.getName() + "\" }";
		try {
			PostgresTable table = new PostgresTable(tableName, geometryColumnName, server);
			newTransaction();
			rep.addTable( table );
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}		
		return result;
	}
	
	public List<PostgresTable> getTablesList( ) throws Exception {
		return rep.getListTables( );
	}

	public String getWMSAsJson() throws Exception {
		List<Server> servers = getWMSList();
		ExternalSourcesCollection esc = new ExternalSourcesCollection( servers );
		JSONObject itemObj = new JSONObject( esc );
		rep.closeSession();
		return itemObj.toString();		
	}	

	public String getPGRAsJson() throws Exception {
		/*
		{"servers":[{"serverDatabase":"siglmd","tables":[{"idTable":1,"geometryColumnName":"geom","name":"servicos.view_cidades_brasil"},{"idTable":2,"geometryColumnName":"geom","name":"servicos.view_bacias_hidrograficas"}],"serverUser":"geoserver","name":"Apolo","serverAddress":"10.5.115.21","serverPort":5432,"serverPassword":"G305erV31","idServer":3}],"totalCount":1}
		*/
		
		List<Postgres> servers = getPGRList( );
		PostgresSourcesCollection esc = new PostgresSourcesCollection( servers );
		
		Gson gson = new GsonBuilder().create();
		String result = gson.toJson( esc ); 
		
		return result;		
	}	
	
	public String getTablesAsJson() throws Exception {
		List<PostgresTable> tables = getTablesList();
		TablesCollection esc = new TablesCollection( tables );
		JSONObject itemObj = new JSONObject( esc );
		rep.closeSession();
		return itemObj.toString();		
	}	
	
}
