package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.Postgres;
import br.mil.mar.casnav.mclm.persistence.entity.PostgresTable;
import br.mil.mar.casnav.mclm.persistence.entity.Server;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class ServerRepository extends BasicRepository {

	public ServerRepository() throws DatabaseConnectException {
		super();
	}

	public void updateServer( Server server ) throws UpdateException {
		DaoFactory<Server> df = new DaoFactory<Server>();
		IDao<Server> fm = df.getDao(this.session, Server.class);
		try {
			fm.updateDO(server);
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}
	
	public void updatePGRServer( Postgres server ) throws UpdateException {
		DaoFactory<Postgres> df = new DaoFactory<Postgres>();
		IDao<Postgres> fm = df.getDao(this.session, Postgres.class);
		try {
			fm.updateDO(server);
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}	
	
	public Server insertServerWMS(Server server) throws InsertException {
		DaoFactory<Server> df = new DaoFactory<Server>();
		IDao<Server> fm = df.getDao(this.session, Server.class);
		
		try {
			fm.insertDO(server);
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return server;
	}
	
	public Postgres insertServerPGR(Postgres server) throws InsertException {
		DaoFactory<Postgres> df = new DaoFactory<Postgres>();
		IDao<Postgres> fm = df.getDao(this.session, Postgres.class);
		
		try {
			fm.insertDO(server);
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return server;
	}

	public Server getServerWMS( int serverId ) throws Exception {
		DaoFactory<Server> df = new DaoFactory<Server>();
		IDao<Server> fm = df.getDao(this.session, Server.class);
		Server server = null;
		try {
			server = fm.getDO(serverId);
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return server;
	}

	public Postgres getServerPGR( int serverId ) throws Exception {
		DaoFactory<Postgres> df = new DaoFactory<Postgres>();
		IDao<Postgres> fm = df.getDao(this.session, Postgres.class);
		Postgres server = null;
		try {
			server = fm.getDO(serverId);
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return server;
	}

	public List<Server> getListWMS() throws Exception {
		DaoFactory<Server> df = new DaoFactory<Server>();
		IDao<Server> fm = df.getDao(this.session, Server.class);
		List<Server> server = null;
		try {
			server = fm.getList("select * from servers");
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return server;
	}

	public List<Postgres> getListPGR() throws Exception {
		DaoFactory<Postgres> df = new DaoFactory<Postgres>();
		IDao<Postgres> fm = df.getDao(this.session, Postgres.class);
		List<Postgres> servers = null;
		try {
			servers = fm.getList("select * from servers_postgres");
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return servers;
	}	
	
	public List<PostgresTable> getListTables() throws Exception {
		DaoFactory<PostgresTable> df = new DaoFactory<PostgresTable>();
		IDao<PostgresTable> fm = df.getDao(this.session, PostgresTable.class);
		List<PostgresTable> server = null;
		try {
			server = fm.getList("select * from postgres_tables order by id_server");
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return server;
	}	

	public Server getServer( String url ) throws Exception {
		DaoFactory<Server> df = new DaoFactory<Server>();
		IDao<Server> fm = df.getDao(this.session, Server.class);
		List<Server> servers = null;
		try {
			servers = fm.getList("select * from servers where url = '" + url + "'");
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return servers.get(0);
	}
	
	public void deleteServerWMS(Server server) throws DeleteException {
		DaoFactory<Server> df = new DaoFactory<Server>();
		IDao<Server> fm = df.getDao(this.session, Server.class);
		try {
			fm.deleteDO(server);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}
	
	public void deteleTablePGRDepends( int idServer ) throws DeleteException {
		try {
			String tables = "select id_table from postgres_tables where id_server = " + idServer;
			String dataLayers = "select id_data_layer from data_layers where id_table in  (" + tables + ")";
			String nodeDatas = "select id_node_data from node_data where id_data_layer in  ("+dataLayers+") ";
			
			String sqlA = "delete from dictionary where id_node_data in (" + nodeDatas + ")";
			String sqlB = "delete from node_data where id_data_layer in  ("+dataLayers+") ";
			String sqlC = "delete from data_layers where id_table in  (" + tables + ")";
			String sqlD = "delete from postgres_tables where id_server = " + idServer;
			String sqlE = "delete from servers_postgres where id_server = " + idServer;
			
			DaoFactory<PostgresTable> df = new DaoFactory<PostgresTable>();
			IDao<PostgresTable> fm = df.getDao(this.session, PostgresTable.class);			
			
			fm.executeQuery( sqlA, false);
			fm.executeQuery( sqlB, false);
			fm.executeQuery( sqlC, false);
			fm.executeQuery( sqlD, false);
			fm.executeQuery( sqlE, true);
			
		} catch ( Exception e ) {
			throw new DeleteException( e.getMessage() );
		}
		
	}
	
	public void deleteServerPGR(Postgres server) throws DeleteException {
		DaoFactory<Postgres> df = new DaoFactory<Postgres>();
		IDao<Postgres> fm = df.getDao(this.session, Postgres.class);
		try {
			fm.deleteDO(server);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}

	public void deleteTablePGR(PostgresTable table) throws DeleteException {
		DaoFactory<PostgresTable> df = new DaoFactory<PostgresTable>();
		IDao<PostgresTable> fm = df.getDao(this.session, PostgresTable.class);
		try {
			fm.deleteDO(table);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}	
	
	public PostgresTable getTable(int idTable) throws Exception {
		DaoFactory<PostgresTable> df = new DaoFactory<PostgresTable>();
		IDao<PostgresTable> fm = df.getDao(this.session, PostgresTable.class);
		PostgresTable table = null;
		try {
			table = fm.getDO( idTable );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return table;
	}

	public PostgresTable addTable(PostgresTable table) throws Exception {
		DaoFactory<PostgresTable> df = new DaoFactory<PostgresTable>();
		IDao<PostgresTable> fm = df.getDao(this.session, PostgresTable.class);
		
		try {
			fm.insertDO( table );
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return table;		
	}

	public void deletePgTable(int idTable) throws Exception {
		String sel = "select id_data_layer from data_layers where id_table = " + idTable;
		String nodeDatas = "select id_node_data from node_data where id_data_layer in ("+sel+") ";
		
		String sqlA = "delete from dictionary where id_node_data in ("+nodeDatas+") ";
		String sqlB = "delete from node_data where id_data_layer in ("+sel+") ";
		String sqlC = "delete from data_layers where id_table = " + idTable;
		String sqlD = "delete from postgres_tables where id_table = " + idTable;
		
		DaoFactory<PostgresTable> df = new DaoFactory<PostgresTable>();
		IDao<PostgresTable> fm = df.getDao(this.session, PostgresTable.class);			
		
		fm.executeQuery( sqlA, false);
		fm.executeQuery( sqlB, false);		
		fm.executeQuery( sqlC, false);		
		fm.executeQuery( sqlD, true);		
	}		
	
	
	
	
	
}
