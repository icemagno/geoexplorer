package br.mil.mar.casnav.mclm.persistence.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.repository.GenericRepository;

public class GenericService {
	private GenericRepository rep;
	
	public GenericService( String connectionString, String user, String password ) throws DatabaseConnectException {
		this.rep = new GenericRepository(connectionString, user, password);
	}
	
	public GenericService() throws DatabaseConnectException {
		this.rep = new GenericRepository();
	}
	
	public void closeSession() {
		rep.closeSession();		
	}
	
	public String getActiveDatabaseTasks() throws Exception {
		String resTasks = "";
		
		/*
		String sql = "select array_to_json( array_agg( f ) )::json As tasks from (" +
				"select application_name, query_start, state_change, query, datname, state FROM pg_stat_activity order by query_start" + 
		") as f ";
		List<UserTableEntity> result = genericFetchList( sql );
		
		String resTasks = "";
		if ( result.size() > 0 ) {
			UserTableEntity ute = result.get(0);
			resTasks = ute.getData("tasks");
		}	
		*/
		
		return resTasks;
	}

	@SuppressWarnings("rawtypes")
	public List<UserTableEntity> genericFetchList(String query) throws Exception {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
		List<UserTableEntity> result = new ArrayList<UserTableEntity>();
		List<?> objs = rep.genericFetchList(query);
		for ( Object obj : objs ) {
			UserTableEntity ut = new UserTableEntity( (Map)obj );
			result.add(ut);
		}
		rep.closeSession();
		return result;
	}	
	
	
	public List<String> getColumnNames(String query) throws Exception {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
		List<String> result = rep.getColumnNames(query);
		rep.closeSession();
		return result;
	}		
}

