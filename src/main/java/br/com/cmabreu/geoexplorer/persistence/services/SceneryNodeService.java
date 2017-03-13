package br.com.cmabreu.geoexplorer.persistence.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

import br.com.cmabreu.geoexplorer.persistence.entity.NodeData;
import br.com.cmabreu.geoexplorer.persistence.entity.Scenery;
import br.com.cmabreu.geoexplorer.persistence.entity.SceneryNode;
import br.com.cmabreu.geoexplorer.persistence.exceptions.DatabaseConnectException;
import br.com.cmabreu.geoexplorer.persistence.exceptions.DeleteException;
import br.com.cmabreu.geoexplorer.persistence.exceptions.InsertException;
import br.com.cmabreu.geoexplorer.persistence.repository.SceneryNodeRepository;

public class SceneryNodeService {
	private SceneryNodeRepository rep;

	public SceneryNodeService() throws DatabaseConnectException {
		this.rep = new SceneryNodeRepository();
	}

	
	public String updateOrCreateNodes(String data, Integer idScenery) {
		String result = "{ \"success\": true, \"msg\": \"Cenário atualizado com sucesso.\" }";

		try {
			SceneryService ss = new SceneryService();
			Scenery scenery = ss.getScenery( idScenery );  
			
			// Veio so um registro. Transforma em array devido ao JSONArray abaixo.
			if( !data.startsWith("[") ) data = "["+data+"]";
			
			Gson gson = new Gson();
			JSONArray array = new JSONArray( data );
			List<SceneryNode> nodes = new ArrayList<SceneryNode>();
			
			
			for ( Object obj : array ) {
				JSONObject jsonobj = (JSONObject)obj;
				NodeData layer = gson.fromJson( jsonobj.toString(), NodeData.class);

				int id = jsonobj.getInt( "id" );
				SceneryNode sn = new SceneryNode();
				
				try {
					int idSceneryNode = jsonobj.getInt( "idSceneryNode" );
					int indexOrder = jsonobj.getInt( "indexOrder" );
					sn.setIdSceneryNode(idSceneryNode);
					sn.setIndexOrder(indexOrder);
				} catch ( Exception isANewNode ) {
					// ignore
				}
				
				int idNodeParent = jsonobj.getInt( "idNodeParent" );
				int layerStackIndex = jsonobj.getInt( "layerStackIndex" );
				int transparency = jsonobj.getInt( "transparency" );
				boolean selected = jsonobj.getBoolean( "selected" );

				sn.setSelected(selected);
				sn.setTransparency(transparency);
				sn.setLayerStackIndex(layerStackIndex);
				sn.setScenery( scenery );
				sn.setIdNodeParent(idNodeParent);
				sn.setLayer( layer );
				sn.setId(id);
				nodes.add( sn );
			}
			
			
			insertSceneryNodeList( nodes );
			
		} catch ( Exception e ) {
			e.printStackTrace();
			result = "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";
		}
		return result;
	}	
	
	
	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public void insertSceneryNodeList(List<SceneryNode> SceneryNodeList) throws Exception {
		rep.insertSceneryNodeList( SceneryNodeList );
	}
	
	public SceneryNode insertSceneryNode(SceneryNode SceneryNode) throws InsertException {
		SceneryNode expRet = rep.insertSceneryNode( SceneryNode );
		return expRet ;
	}	

	public void deleteSceneryNode( int idSceneryNode ) throws DeleteException {
		try {
			SceneryNode SceneryNode = rep.getSceneryNode(idSceneryNode);
			rep.newTransaction();
			rep.deleteSceneryNode(SceneryNode);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public Set<SceneryNode> getList( ) throws Exception {
		return rep.getList( );
	}

	
}
