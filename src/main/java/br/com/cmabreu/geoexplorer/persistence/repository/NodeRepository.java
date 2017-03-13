package br.com.cmabreu.geoexplorer.persistence.repository;

import java.util.HashSet;
import java.util.Set;

import br.com.cmabreu.geoexplorer.persistence.entity.NodeData;
import br.com.cmabreu.geoexplorer.persistence.exceptions.DatabaseConnectException;
import br.com.cmabreu.geoexplorer.persistence.exceptions.DeleteException;
import br.com.cmabreu.geoexplorer.persistence.exceptions.InsertException;
import br.com.cmabreu.geoexplorer.persistence.exceptions.NotFoundException;
import br.com.cmabreu.geoexplorer.persistence.exceptions.UpdateException;
import br.com.cmabreu.geoexplorer.persistence.infra.DaoFactory;
import br.com.cmabreu.geoexplorer.persistence.infra.IDao;

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
	
}
