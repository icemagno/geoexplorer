package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.ArrayList;
import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.DictionaryItem;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;



public class DictionaryRepository extends BasicRepository {

	public DictionaryRepository() throws DatabaseConnectException {
		super();
	}

	public void updateItem( DictionaryItem item ) throws UpdateException {
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		try {
			fm.updateDO( item );
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}
	
	public DictionaryItem insertItem(DictionaryItem item) throws Exception {
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		
		
		if ( item.getNode() != null ) {
			// Coloca o Node no contexto de persistencia
			DaoFactory<NodeData> dfnd = new DaoFactory<NodeData>();
			IDao<NodeData> ndd = dfnd.getDao(this.session, NodeData.class);
			NodeData node = null;
			node = ndd.getDO( item.getNode().getIdNodeData() );
			item.setNode(node);
		}
		
		try {
			fm.insertDO( item );
			commit();
		} catch (InsertException e) {
			//e.printStackTrace();
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return item;
	}
	

	public DictionaryItem getItem( int idDictionaryItem ) throws Exception {
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		DictionaryItem node = null;
		try {
			node = fm.getDO( idDictionaryItem );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return node;
	}
	
	public void deleteList( List<DictionaryItem> list ) throws Exception {
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		fm.deleteList(list);
	}
	
	public List<DictionaryItem> getList( int idNodeData ) throws Exception {
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		List<DictionaryItem> users = null;
		try {
			users = new ArrayList<DictionaryItem>( fm.getList("select * from dictionary where id_node_data = " + idNodeData ) );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return users;
	}

	
	public List<DictionaryItem> getDictionaryByLayer( String layerName ) throws Exception {
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		List<DictionaryItem> users = null;
		try {
			users = new ArrayList<DictionaryItem>( fm.getList("select * from dictionary d join node_data nd on d.id_node_data = nd.id_node_data and nd.layername = '" + layerName + "'" ) );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return users;
	}	
	
	public List<DictionaryItem> getList() throws Exception {
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		List<DictionaryItem> users = null;
		try {
			users = new ArrayList<DictionaryItem>( fm.getList("select * from dictionary") );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return users;
	}

	
	public void executeQuery(String sql, boolean withCommit ) throws Exception {
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		fm.executeQuery( sql , withCommit);
	}
	
	public void deleteDictionary(int idNodeData, boolean withCommit ) throws Exception {
		String sql = "delete from dictionary where id_node_data = " + idNodeData ;
		DaoFactory<DictionaryItem> df = new DaoFactory<DictionaryItem>();
		IDao<DictionaryItem> fm = df.getDao(this.session, DictionaryItem.class);
		fm.executeQuery( sql , withCommit);
	}
	
}
