package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import br.mil.mar.casnav.mclm.persistence.entity.Scenery;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class SceneryRepository extends BasicRepository {

	public SceneryRepository() throws DatabaseConnectException {
		super();
	}

	public void updateScenery( Scenery scenery ) throws UpdateException {
		DaoFactory<Scenery> df = new DaoFactory<Scenery>();
		IDao<Scenery> fm = df.getDao(this.session, Scenery.class);
		try {
			fm.updateDO(scenery);
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}
	
	public Scenery insertScenery(Scenery scenery) throws Exception {
		DaoFactory<Scenery> df = new DaoFactory<Scenery>();
		IDao<Scenery> fm = df.getDao(this.session, Scenery.class);

		Set<SceneryNode> layers = scenery.getNodes();
		scenery.setNodes( new HashSet<SceneryNode>() );
		
		try {
			fm.insertDO(scenery);
			
			scenery.setNodes(layers);
			fm.updateDO( scenery );
			
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return scenery;
	}
	
	public Scenery getScenery( int sceneryId ) throws NotFoundException {
		DaoFactory<Scenery> df = new DaoFactory<Scenery>();
		IDao<Scenery> fm = df.getDao(this.session, Scenery.class);
		Scenery scenery = null;
		try {
			scenery = fm.getDO(sceneryId);
		} catch ( NotFoundException e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return scenery;
	}

	public Set<Scenery> getList() throws Exception {
		DaoFactory<Scenery> df = new DaoFactory<Scenery>();
		IDao<Scenery> fm = df.getDao(this.session, Scenery.class);
		Set<Scenery> scenery = null;
		try {
			scenery = new HashSet<Scenery>( fm.getList("select * from sceneries") );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return scenery;
	}

	public Set<Scenery> getList( int idUser ) throws Exception {
		DaoFactory<Scenery> df = new DaoFactory<Scenery>();
		IDao<Scenery> fm = df.getDao(this.session, Scenery.class);
		Set<Scenery> scenery = null;
		try {
			scenery = new HashSet<Scenery>( fm.getList("select * from sceneries where is_public = true or id_user=" + idUser) );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return scenery;
	}	
	
	public Scenery getScenery( String name ) throws Exception {
		DaoFactory<Scenery> df = new DaoFactory<Scenery>();
		IDao<Scenery> fm = df.getDao(this.session, Scenery.class);
		List<Scenery> scenerys = null;
		try {
			scenerys = fm.getList("select * from sceneries where scenery_name = '" + name + "'");
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return scenerys.get(0);
	}
	

	public void deleteScenery(Scenery scenery) throws DeleteException {
		DaoFactory<Scenery> df = new DaoFactory<Scenery>();
		IDao<Scenery> fm = df.getDao(this.session, Scenery.class);
		try {
			fm.deleteDO(scenery);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}		
}
