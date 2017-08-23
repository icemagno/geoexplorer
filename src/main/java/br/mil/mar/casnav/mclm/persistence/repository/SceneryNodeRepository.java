package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.entity.Scenery;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class SceneryNodeRepository extends BasicRepository {

	public SceneryNodeRepository() throws DatabaseConnectException {
		super();
	}

	public SceneryNode insertSceneryNode(SceneryNode SceneryNode) throws InsertException {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		
		try {
			fm.insertDO(SceneryNode);
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return SceneryNode;
	}

	
	public void insertSceneryNodeList(List<SceneryNode> sceneryNodeList) throws Exception {
		
		DaoFactory<SceneryNode> sn = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> snDao = sn.getDao(this.session, SceneryNode.class);

		DaoFactory<Scenery> sf = new DaoFactory<Scenery>();
		IDao<Scenery> sfDao = sf.getDao(this.session, Scenery.class);
		
		DaoFactory<NodeData> nd = new DaoFactory<NodeData>();
		IDao<NodeData> ndDao = nd.getDao(this.session, NodeData.class);
		
		try {
			for( SceneryNode newSceneryNode : sceneryNodeList ) {
				
				try {
					// Tenta encontrar a camada para atualizar.
					SceneryNode oldSceneryNode = snDao.getDO( newSceneryNode.getIdSceneryNode() );
					// Estes atributos PRECISAM ser duplicados da tabela de Camadas (NodeData)
					oldSceneryNode.setIdNodeParent( newSceneryNode.getIdNodeParent() );
					oldSceneryNode.setIndexOrder( newSceneryNode.getIndexOrder() );
					oldSceneryNode.setLayerStackIndex( newSceneryNode.getLayerStackIndex() );
					oldSceneryNode.setSelected( newSceneryNode.isSelected() );
					oldSceneryNode.setTransparency( newSceneryNode.getTransparency() );
					snDao.updateDO( oldSceneryNode );
				} catch ( NotFoundException e ) {
					// Nao achou esta camada do cenario. Criar nova.
					Scenery scenery = sfDao.getDO( newSceneryNode.getScenery().getIdScenery() );
					
					if ( (newSceneryNode.getLayerType() != LayerType.FDR) && (newSceneryNode.getLayerType() != LayerType.TXT) ) {
						NodeData layer = ndDao.getDO( newSceneryNode.getLayer().getIdNodeData() );
						newSceneryNode.setLayer( layer );
					} else {
						// Necessario remover o objeto por causa do contexto de persistencia.
						// Quando chega aqui, "layer" representa uma pasta e nao tem correspondente em
						// "NodeData". Entao nao precisamos do "layerAlias" que e o nome da pasta e foi
						// setado no construtor da classe "SceneryNode" durante 
						// SceneryNodeService.updateOrCreateNodes : ( sn.setLayer( layer ) )
						newSceneryNode.setLayer( null );
					}
					
					newSceneryNode.setScenery( scenery );
					snDao.insertDO( newSceneryNode );
				}
				
				
			}
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		
	}
	
	/*
	public Set<SceneryNode> getList() throws Exception {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		Set<SceneryNode> SceneryNode = null;
		try {
			SceneryNode = new HashSet<SceneryNode>( fm.getList("select * from scenery_node") );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return SceneryNode;
	}
	*/
	
	public void deleteSceneryNode(SceneryNode SceneryNode) throws DeleteException {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		try {
			fm.deleteDO(SceneryNode);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}

	public SceneryNode getSceneryNode(int idSceneryNode) throws Exception {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		SceneryNode sceneryNode = null;
		try {
			sceneryNode = fm.getDO(idSceneryNode);
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return sceneryNode;
	}

	public SceneryNode getSceneryNodeByNodeData(int idNodeData) throws Exception {
		DaoFactory<SceneryNode> df = new DaoFactory<SceneryNode>();
		IDao<SceneryNode> fm = df.getDao(this.session, SceneryNode.class);
		Set<SceneryNode> sceneryNodes = null;
		try {
			sceneryNodes = new HashSet<SceneryNode>( fm.getList("select * from scenery_node where id_layer = " + idNodeData) );
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		
		for ( SceneryNode sn : sceneryNodes ) {
			if ( sn.getLayer().getIdNodeData() == idNodeData ) return sn;
		}
		
		
		return null;
	}		
}
