package br.mil.mar.casnav.mclm.persistence.services;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.entity.Scenery;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.repository.SceneryNodeRepository;

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
			
			for ( int xx = 0; xx < array.length(); xx++  ) {
				JSONObject jsonobj = array.getJSONObject( xx );
			//}
			//for ( Object obj : array ) {
				//JSONObject jsonobj = (JSONObject)obj;
				
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
			System.out.println("The data was: " + data );
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

	
	private void deleteScenery( JSONObject sceneryNode ) throws Exception {
		int idSceneryNode =  sceneryNode.getInt( "idSceneryNode" );
		rep.newTransaction();
		SceneryNode SceneryNode = rep.getSceneryNode( idSceneryNode );
		rep.newTransaction();
		rep.deleteSceneryNode(SceneryNode);
		
	}
	
	public String deleteSceneryNode( String data ) throws DeleteException {
		String result = "{ \"success\": true, \"msg\": \"Cenário atualizado com sucesso.\" }";
		try {
			
			try {
				JSONObject sceneryNode = new JSONObject( data );
				deleteScenery( sceneryNode );
			} catch ( org.json.JSONException jj ) {
				
				JSONArray arr = new JSONArray( data );
				for ( int x=0; x < arr.length(); x++ ) {
					JSONObject sceneryNode = arr.getJSONObject(x);
					deleteScenery( sceneryNode );
				}
				
			}
					 			
			
		} catch (Exception e) {
			result = "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";
			e.printStackTrace();
			System.out.println("The data was: " + data );
		}
		
		return result;
	}

	/*
	public Set<SceneryNode> getList( ) throws Exception {
		return rep.getList( );
	}
	*/
	
	public SceneryNode getSceneryNode(int idSceneryNode) throws Exception {
		return rep.getSceneryNode( idSceneryNode );
	}

	public SceneryNode getSceneryNodeByNodeData( int idNodeData ) throws Exception  {
		return rep.getSceneryNodeByNodeData( idNodeData );
	}
	
}
