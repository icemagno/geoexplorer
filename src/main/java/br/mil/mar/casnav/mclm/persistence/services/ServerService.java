package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

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
	
	public void closeSession() {
		rep.closeSession();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public Server getServerWMS( int serverId ) throws Exception {
		return rep.getServerWMS(serverId);
	}
	
	public Postgres getServerPGR( int IdServer ) throws Exception {
		return rep.getServerPGR( IdServer );
	}
	
	public int insertServerWMS( Server server ) throws Exception {
		return rep.insertServerWMS( server ).getIdServer();
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
				rep.newTransaction();
				rep.deteleTablePGRDepends( idServer );
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
	
	public String addTable( String tableName, String geometryColumnName, String idColumnName, int idServer ) throws Exception {
		Postgres server = getServerPGR( idServer );
		
		String result = "{ \"success\": true, \"msg\": \"Tabela " + tableName + " adicionada com sucesso ao servidor " + server.getName() + "\" }";
		try {
			PostgresTable table = new PostgresTable(tableName, geometryColumnName, idColumnName, server);
			
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

	public String saveServer(String server) throws Exception {
		// [{"name":"ANA - Cheiasgfdgfgfdgf","version":"1.1.1","url":"http://www.snirh.gov.br/arcgis/services/SNIRH2016/Cheias/MapServer/WMSServer/","idServer":33,"id":"extModel25-3"}]
		JSONArray arr = new JSONArray( server );
		
		for( int x=0; x < arr.length(); x++ ){
			
			try {
				JSONObject srvObj = arr.getJSONObject( x );
				int idServer = srvObj.getInt("idServer");
				
				rep.newTransaction();
				Server oldServ = rep.getServerWMS( idServer );
				oldServ.setName( srvObj.getString("name") );
				oldServ.setVersion( srvObj.getString("version") );
				oldServ.setUrl( srvObj.getString("url") );
				
				rep.newTransaction();
				rep.updateServer(oldServ);
				
			} catch ( Exception e ) {
				e.printStackTrace();
			}
			
		}
		
		rep.closeSession();
		return "";
	}

	public String savePGRServer(String server) throws Exception  {
		// [{"idServer":5,"tables":[{"idTable":7,"name":"public.planet_osm_polygon","geometryColumnName":"way","idColumnName":"osm_id","id":"extModel32-1"},{"idTable":6,"name":"public.planet_osm_line","geometryColumnName":"way","idColumnName":"osm_id","id":"extModel32-2"},{"idTable":5,"name":"public.planet_osm_point","geometryColumnName":"way","idColumnName":"osm_id","id":"extModel32-3"},{"idTable":9,"name":"public.pointscanner(8)","geometryColumnName":"way","idColumnName":"osm_id","id":"extModel32-4"}],"serverAddress":"10.5.115.122","name":"OSM Defesagfhghgfhf","type":"WMS","serverUser":"postgres","serverDatabase":"osm","serverPassword":"admin","serverPort":5432,"id":"extModel26-2"}]
		
		JSONArray arr = new JSONArray( server );
		for( int x=0; x < arr.length(); x++ ){
			try {
				JSONObject srvObj = arr.getJSONObject( x );
				int idServer = srvObj.getInt("idServer");
				
				rep.newTransaction();
				Postgres oldSrv = rep.getServerPGR( idServer );
				// "serverAddress":"10.5.115.122","name":"OSM Defesagfhghgfhf","type":"WMS","serverUser":"postgres","serverDatabase":"osm","serverPassword":"admin","serverPort":5432,"id":"extModel26-2"}]
				String serverAddress = srvObj.getString("serverAddress");
				String name = srvObj.getString("name");
				String type =srvObj.getString("type");
				String serverUser = srvObj.getString("serverUser");
				String serverDatabase = srvObj.getString("serverDatabase");
				String serverPassword = srvObj.getString("serverPassword");
				int serverPort = srvObj.getInt("serverPort");
				
				oldSrv.setName(name);
				oldSrv.setServerAddress(serverAddress);
				oldSrv.setServerDatabase(serverDatabase);
				oldSrv.setServerPassword(serverPassword);
				oldSrv.setServerPort(serverPort);
				oldSrv.setServerUser(serverUser);
				oldSrv.setType(type);
				
				
				rep.newTransaction();
				rep.updatePGRServer( oldSrv );				
				
			} catch ( Exception e ) {
				e.printStackTrace();
			}
		}		
		
		rep.closeSession();
		return "";
		
	}

	public String deletePgTable(int idTable) {
		String result = "{ \"success\": true, \"msg\": \"Tabela removida.\" }";
		try {
			rep.deletePgTable( idTable );
		} catch ( Exception e ) {
			result = "{ \"error\": true, \"msg\": \""+e.getMessage()+".\" }";
		}
		return result;
	}	
	
	
	
	
	
}
