package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.DataLayersCollection;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.entity.PostgresTable;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.repository.DataLayerRepository;

public class DataLayerService {
	private DataLayerRepository rep;

	public DataLayerService() throws DatabaseConnectException {
		this.rep = new DataLayerRepository();
	}

	public void updateDataLayer(DataLayer dataLayer) throws UpdateException {
		DataLayer oldDataLayer;

		try {
			oldDataLayer = rep.getDataLayer( dataLayer.getIdDataLayer() );
		} catch ( Exception e) {
			throw new UpdateException( e.getMessage() );
		}		
		
		oldDataLayer.setDataLayerName( dataLayer.getDataLayerName() );
		oldDataLayer.setHint( dataLayer.getHint() );
		//oldDataLayer.setTable( dataLayer.getTable() );
		
		rep.newTransaction();
		rep.updateDataLayer(oldDataLayer);

	}	

	public DataLayer getDataLayer(int idDataLayer) throws Exception{
		return rep.getDataLayer(idDataLayer);
	}


	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public String insertDataLayer(String dataLayerName, String hint, Integer idTable, String institute,
			Integer layerFolderID, String whereClause, String propertiesColumns) throws InsertException {
		
		String result = "{ \"success\": true, \"msg\": \"Camada de Dados criada com sucesso.\" }";
		
		try {
			
			ServerService ss = new ServerService();
			PostgresTable table = ss.getTable( idTable );
			
			DataLayer dataLayer = new DataLayer(dataLayerName, hint,  whereClause, propertiesColumns, table);
			dataLayer = rep.insertDataLayer( dataLayer );
			
			String layerAlias = table.getName() + ":" + dataLayer.getIdDataLayer();
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "", hint, institute, layerAlias, dataLayerName, LayerType.DTA);
			node.setReadOnly( true );
			ns.addNode( node );				
			
			
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
	}
		

	public void deleteDataLayer( int idDataLayer ) throws DeleteException {
		try {
			DataLayer dataLayer = rep.getDataLayer(idDataLayer);
			rep.newTransaction();
			rep.deleteDataLayer(dataLayer);
		} catch (Exception e) {
			throw new DeleteException( e.getMessage() );
		}
	}

	public List<DataLayer> getList( ) throws Exception {
		return rep.getList( );
	}

	public String getAsJson() throws Exception {
		List<DataLayer> dataLayers = getList();
		DataLayersCollection esc = new DataLayersCollection( dataLayers );
		JSONObject itemObj = new JSONObject( esc );
		return itemObj.toString();		
	}

	
}
