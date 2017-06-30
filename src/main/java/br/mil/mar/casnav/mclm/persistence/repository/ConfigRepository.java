package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;



public class ConfigRepository extends BasicRepository {

	public ConfigRepository() throws DatabaseConnectException {
		super();
	}

	public void updateConfig( Config config ) throws UpdateException {
		DaoFactory<Config> df = new DaoFactory<Config>();
		IDao<Config> fm = df.getDao(this.session, Config.class);
		try {
			fm.updateDO(config);
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}
	
	public Config insertConfig(Config user) throws InsertException {
		DaoFactory<Config> df = new DaoFactory<Config>();
		IDao<Config> fm = df.getDao(this.session, Config.class);
		
		try {
			fm.insertDO(user);
			commit();
		} catch (InsertException e) {
			//e.printStackTrace();
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return user;
	}
	

	public Config getConfig() throws Exception {
		ArrayList<Config> configs = new ArrayList<Config>( getList() );
		Config config = configs.get(0);
		return config;
	}
	
	private Set<Config> getList() throws Exception {
		DaoFactory<Config> df = new DaoFactory<Config>();
		IDao<Config> fm = df.getDao(this.session, Config.class);
		Set<Config> users = null;
		try {
			users = new HashSet<Config>( fm.getList("select * from config") );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return users;
	}
	
}
