package br.mil.mar.casnav.mclm.persistence.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;

import br.mil.mar.casnav.mclm.misc.SceneryTree;
import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.persistence.entity.Scenery;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.SceneryRepository;

public class SceneryService {
	private SceneryRepository rep;

	public SceneryService() throws DatabaseConnectException {
		this.rep = new SceneryRepository();
	}

	
	public void clone( int idScenery, String sceneryName, String mapCenter, String zoomLevel, User user ) throws Exception {
		/*
		Scenery source = getScenery(idScenery);
		Scenery target = new Scenery();
		
		target.setActive( true );
		target.setSceneryName(sceneryName);
		target.setUser(user);
		target.setZoomLevel( Integer.valueOf( zoomLevel ) );
		target.setMapCenter(mapCenter);
		
		for ( SceneryLayer sl : source.getLayers() ) {
			target.addNode( sl.getNode() );
		}
		
		newTransaction();
		target = insertScenery(target);
		
		newTransaction();
		source.setActive( false );
		updateScenery(source);
		
		user.addScenery( target );
		user.deactivateScenery( source );
	*/
	}
	
	
	public String updateScenery(Integer idScenery, String mapCenter, Integer mapZoom, String mapaBase,
			String servidorBase, String mapBbox, Boolean mapaBaseAtivo, Boolean gradeAtiva) throws Exception {
		
		String resp = "{ \"success\": true, \"msg\": \"Opera��o efetuada com sucesso.\" }";
		
		try {
			Scenery oldScenery;
			oldScenery = rep.getScenery( idScenery );
			
			oldScenery.setBaseMap( mapaBase );
			oldScenery.setZoomLevel( mapZoom );
			oldScenery.setMapCenter( mapCenter );
			oldScenery.setGraticule( gradeAtiva );
			oldScenery.setMapBbox(mapBbox);
			oldScenery.setBaseServerURL( servidorBase );
			oldScenery.setBaseMapActive( mapaBaseAtivo );
			
			rep.newTransaction();
			rep.updateScenery(oldScenery);
		} catch ( Exception e ) {
			resp = "{ \"error\": true, \"msg\": \"" + e.getMessage() + "\" }";
		}
		
		return resp;
	}
	
	public void updateScenery(Scenery scenery) throws UpdateException {
		Scenery oldScenery;

		try {
			oldScenery = rep.getScenery( scenery.getIdScenery() );
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldScenery.setBaseMap( scenery.getBaseMap() );
		oldScenery.setSceneryName( scenery.getSceneryName() );
		oldScenery.setZoomLevel( scenery.getZoomLevel() );
		oldScenery.setMapCenter( scenery.getMapCenter() );
		oldScenery.setGraticule( scenery.getGraticule() );
		oldScenery.setIsPublic( scenery.getIsPublic() );
		
		oldScenery.getNodes().clear();
		for ( SceneryNode sl : scenery.getNodes() ) {
			oldScenery.addNode( sl );
		}		

		rep.newTransaction();
		rep.updateScenery(oldScenery);
	}	

	public Scenery getScenery( int idScenery ) throws NotFoundException  {
		return rep.getScenery( idScenery );
	}

	public Scenery getScenery(String name) throws Exception{
		return rep.getScenery(name);
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public Scenery insertScenery(Scenery scenery) throws Exception {
		Scenery expRet = rep.insertScenery( scenery );
		return expRet ;
	}	

	public String deleteScenery( int idScenery ) throws DeleteException {
		String result = "{ \"success\": true, \"msg\": \"Operação efetuada com sucesso.\" }";

		try {
			Scenery scenery = rep.getScenery(idScenery);
			rep.newTransaction();
			rep.deleteScenery(scenery);
		} catch (Exception e) {
			result = "{ \"error\": true, \"msg\": \"" + e.getMessage()+ ".\" }";
		}
		
		return result;
	}

	public Set<Scenery> getList( ) throws Exception {
		return rep.getList();
	}

	public Set<Scenery> getList( int idUser ) throws Exception {
		return rep.getList( idUser );
	}


	public String createScenery(Boolean isPublic, Boolean graticule, String nomeCenario, String mapCenter, String description, String mapaBase,
			String servidorBase, Integer mapZoom, Boolean mapaBaseAtivo, User user, String mapBbox) {
		
		Scenery scenery = new Scenery();
		scenery.setBaseMap(mapaBase);
		scenery.setBaseMapActive(mapaBaseAtivo);
		scenery.setBaseServerURL( servidorBase );
		scenery.setGraticule( graticule );
		scenery.setIdUser( user.getIdUser() );
		scenery.setIsPublic( false );
		scenery.setMapCenter( mapCenter );
		scenery.setSceneryName( nomeCenario );
		scenery.setZoomLevel( mapZoom );
		scenery.setDescription( description );
		scenery.setMapBbox(mapBbox);
		
		String result;
		try {
			insertScenery( scenery );
			result = "{\"success\": true, \"msg\": \"Cenário criado com sucesso.\", \"idScenery\":" + scenery.getIdScenery() + "}";
		} catch ( Exception e ) {
			result = "{\"error\": true, \"msg\": \"" + e.getMessage() + "\"}";
		}
		
		return result;
	}


	public String getSceneryTreeAsJSON( int idScenery, int idNodeParent ) throws Exception {
		SceneryTree scenery = new SceneryTree( getScenery( idScenery ) );
		JSONArray sceneryJSON = new JSONArray( scenery.getNodes( idNodeParent ) );
		return sceneryJSON.toString();
	}


	public String getSceneriesAsJSON(User loggedUser) throws Exception {
		List<SceneryTree> lst = new ArrayList<SceneryTree>();
		List<Scenery> ls = new ArrayList<Scenery>( getList( loggedUser.getIdUser() ) );
		for ( Scenery scenery : ls ) {
			SceneryTree sceneryTree = new SceneryTree( scenery );
			lst.add( sceneryTree );
		}
		JSONArray sceneryJSON = new JSONArray( lst );
		return "{sceneries:" + sceneryJSON.toString() + "}";
	}


	public String changeVisibility(int idScenery, String operation) {
		String result;
		
		try {
			Scenery scenery = rep.getScenery( idScenery );
			scenery.setIsPublic( operation.equals("PUB") ); 
			rep.newTransaction();
			updateScenery(scenery);
			result = "{\"success\": true, \"msg\": \"Visibilidade alterada com sucesso.\", \"idScenery\":" + scenery.getIdScenery() + "}";
		} catch ( Exception e ) {
			result = "{\"error\": true, \"msg\": \"" + e.getMessage() + "\"}";
		}
		
		return result;
	}


}
