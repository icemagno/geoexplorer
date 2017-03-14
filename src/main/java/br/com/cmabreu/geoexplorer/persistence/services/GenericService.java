package br.com.cmabreu.geoexplorer.persistence.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import br.com.cmabreu.geoexplorer.misc.UserTableEntity;
import br.com.cmabreu.geoexplorer.persistence.exceptions.DatabaseConnectException;
import br.com.cmabreu.geoexplorer.persistence.repository.GenericRepository;

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

	@SuppressWarnings("rawtypes")
	public List<UserTableEntity> genericFetchList(String query) throws Exception {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
		List<UserTableEntity> result = new ArrayList<UserTableEntity>();
		for ( Object obj : rep.genericFetchList(query) ) {
			UserTableEntity ut = new UserTableEntity( (Map)obj );
			result.add(ut);
		}
		rep.closeSession();
		return result;
	}	
	
}