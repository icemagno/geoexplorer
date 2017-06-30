package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.misc.TreeNode;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.DataWindow;
import br.mil.mar.casnav.mclm.persistence.entity.Feicao;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.NodeRepository;

public class NodeService {
	private NodeRepository rep;
	
	public NodeService() throws DatabaseConnectException {
		this.rep = new NodeRepository();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public NodeData getNode( int idNodeData ) throws NotFoundException{
		return rep.getNode( idNodeData );
	}
	
	
	public void deleteNode( NodeData node ) throws DeleteException {
		try {
			rep.deleteNode(node);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}	
	
	public NodeData addNode( NodeData node ) throws Exception {
        node = rep.insertNode( node );
        DictionaryService ds = new DictionaryService();
        ds.updateDictionary( node );
        return node;
	}
	
	public void updateNode( NodeData node ) throws UpdateException, NotFoundException {
		NodeData oldNode = rep.getNode( node.getIdNodeData() );

		try {
			DataLayerService dls = new DataLayerService();
			Feicao feicao = dls.getFeicao( node.getFeicao().getIdFeicao() );
			oldNode.setFeicao( feicao );
		} catch ( Exception e ) {
			// Sem feicao para este node...
		}

		
		try {
			DataWindowService dws = new DataWindowService();
			DataWindow dw = dws.getDataWindow( node.getDataWindow().getIdDataWindow() );
			oldNode.setDataWindow( dw );
		} catch ( Exception e ) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldNode.setChildren( node.getChildren() );
		oldNode.setIdNodeParent( node.getIdNodeParent() );
		oldNode.setLayerAlias( node.getLayerAlias() );
		oldNode.setLayerName( node.getLayerName() );
		oldNode.setOriginalServiceUrl( node.getOriginalServiceUrl() );
		oldNode.setServiceUrl( node.getServiceUrl() );
		oldNode.setSerialId( node.getSerialId() );

		/*
		try {
			Integer idDataLayer = node.getDataLayer().getIdDataLayer();
			DataLayerService dss = new DataLayerService();
			DataLayer dl = dss.getDataLayer( idDataLayer );			
			oldNode.setDataLayer( dl );
		} catch ( Exception ex ) {
			throw new UpdateException( ex.getMessage() );
		}
		*/
		
		rep.newTransaction();
		rep.updateNode( oldNode );

	}		

	public Set<NodeData> getList() throws Exception {
		return rep.getList( );
	}
	
	/*
	 * Acionado quando o usuario arrasta um nao na arvore de camadas e muda sua posicao
	 */
	public String updateNodeIndexes( String data ) throws Exception {
		JSONArray ja = new JSONArray( data );
		NodeData oldNode = null;
		for( int x=0; x < ja.length(); x++ ) {
			try {
				JSONObject jo = ja.getJSONObject( x );
				// Pega o novo indice do no e seu ID
				int id = jo.getInt( "id" ) ;
				int index = jo.getInt( "index" );
				
				rep.newTransaction();
				// Pega o n. no BD
				oldNode = rep.getNode( id );
				// Guarda o pai atual
				int parentId = oldNode.getIdNodeParent();
				
				try {
					// O pai foi alterado? Se nao foi, nao havera esta variavel no 
					// objeto JSON e um erro sera gerado.
					parentId = jo.getInt( "parentId" );
				} catch ( Exception ignored ) {	}
				
				oldNode.setIndexOrder( index );
				oldNode.setIdNodeParent( parentId );
			
				rep.newTransaction();
				rep.updateNode( oldNode );

			} catch ( Exception ex ) {
				// Os dados da requisiao deste item "x" nao vieram como esperado. Tentar o proximo item...
			}
		}
		
		return "";
	}

	// Pega todas as camadas que possuem o id_parent igual ao id_node
	// informado ( todos os filhos do no que possui ID=idParent )
	// Precisa ser em SQL para poder pegar tambem a quantidade de filhos do no.
	// Esta informacao eh usada pela arvore para decidir se permite expandir
	// o no ou nao e o tipo de icone a ser usado (pasta ou folha)
	public synchronized String getNodesAsJSON( int idParent ) throws Exception {
		String sql = "SELECT nd.*, COUNT(t1.*) as children " +
				"FROM node_data nd " +
				"LEFT OUTER JOIN node_data t1 on t1.id_node_parent = nd.id_node_data " +
				"where nd.id_node_parent = " + idParent + " " +
				"GROUP BY nd.id_node_data ORDER BY nd.index_order";
		
		GenericService gs = new GenericService();
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		DataLayerService dss = new DataLayerService();
		FilterService fs = new FilterService();
		
		JSONArray arrayObj = new JSONArray();
		for ( UserTableEntity ute : utes ) {
			TreeNode tn = new TreeNode( ute, dss, fs );
			// Nao coloca feicao na arvore do catalogo...
			//if ( !tn.getLayerType().equals("FEI") ) {
				JSONObject itemObj = new JSONObject( tn );
	            arrayObj.put( itemObj );	
			//}
		}
		dss.closeSession();
		fs.closeSession();
		rep.closeSession();
		
		return arrayObj.toString();
		
	}

	public String createFolder(String newFolderName, int layerFolderID) {
		
		try {
			NodeData node = new NodeData( layerFolderID, "", "", "", "", newFolderName, LayerType.FDR );
			addNode( node );			
			return "{ \"success\": true, \"msg\": \"Pasta " + newFolderName + " criada com sucesso.\" }";
		} catch ( Exception e ) {
			return "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";	
		}
		
	}

	public NodeData createCRN() throws Exception {
		NodeData node = new NodeData( 0, "", "", "", "", "Feições", LayerType.CRN );
		node.setReadOnly( true );
		NodeData result = addNode( node );
		return result;
	}


	
}
