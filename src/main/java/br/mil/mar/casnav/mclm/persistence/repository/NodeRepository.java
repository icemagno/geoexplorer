package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class NodeRepository extends BasicRepository {

	public NodeRepository() throws DatabaseConnectException {
		super();
	}

	public NodeData getNode(int idNodeData ) throws NotFoundException {
		DaoFactory<NodeData> df = new DaoFactory<NodeData>();
		IDao<NodeData> fm = df.getDao(this.session, NodeData.class);
		NodeData node = null;
		try {
			node = fm.getDO( idNodeData );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return node;
	}	
	
	public void updateNode( NodeData node ) throws UpdateException {
		DaoFactory<NodeData> df = new DaoFactory<NodeData>();
		IDao<NodeData> fm = df.getDao(this.session, NodeData.class);
		try {
			fm.updateDO(node);
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}	
	
	public Set<NodeData> getList( ) throws Exception {
		DaoFactory<NodeData> df = new DaoFactory<NodeData>();
		IDao<NodeData> fm = df.getDao(this.session, NodeData.class);
		Set<NodeData> node = null;
		
		try {
			node = new HashSet<NodeData>( fm.getList("select * from node_data" ) );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		
		closeSession();
		return node;
	}

	public NodeData insertNode(NodeData node) throws InsertException {
		DaoFactory<NodeData> df = new DaoFactory<NodeData>();
		IDao<NodeData> fm = df.getDao(this.session, NodeData.class);
		
		try {
			fm.insertDO(node);
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return node;
	}

	
	public void deleteNode(NodeData node) throws DeleteException {
		DaoFactory<NodeData> df = new DaoFactory<NodeData>();
		IDao<NodeData> fm = df.getDao(this.session, NodeData.class);
		try {
			fm.deleteDO(node);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}

	public List<NodeData> getSameOrignNodes(String layerName) throws Exception {
		DaoFactory<NodeData> df = new DaoFactory<NodeData>();
		IDao<NodeData> fm = df.getDao(this.session, NodeData.class);
		List<NodeData> node = null;
		
		try {
			node = new ArrayList<NodeData>( fm.getList("select * from node_data where layername = '" + layerName + "'" ) );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		
		closeSession();
		return node;
	}

	public NodeData getFeicaoRootNode() throws Exception {
		Set<NodeData> nodes = getList();
		for( NodeData node : nodes ) {
			if ( node.getLayerType() == LayerType.CRN) return node;
		}
		return null;
	}		
	
}
