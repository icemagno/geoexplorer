package br.mil.mar.casnav.mclm.persistence.services;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.DataFieldType;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.DataField;
import br.mil.mar.casnav.mclm.persistence.entity.DataPanel;
import br.mil.mar.casnav.mclm.persistence.entity.DataWindow;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.repository.DataWindowRepository;

public class DataWindowService {

	public DataWindow getDataWindow(int idDataWindow ) throws Exception {
		DataWindowRepository rep = new DataWindowRepository();
		return rep.getDataWindow(idDataWindow);
	}
	
	public String getWindow(String data) {
		String result = "{ \"error\": true, \"msg\": \"Camada não informada.\" }";
		
		try {
			
			JSONObject jsonData = new JSONObject( data );
			int idNodeData = jsonData.getInt("node_data" );
			
			NodeService ns = new NodeService();
			NodeData nodeData = ns.getNode(idNodeData);
			
			DataWindow dataWindow = nodeData.getDataWindow();			
			
			if ( dataWindow == null ) {
				return "{ \"error\": true, \"msg\": \"Não há janela de dados cadastrada para esta camada.\" }";
			}
			
			String relationShip = dataWindow.getSqlDataAcquisition();
			
			Iterator<?> iterator = jsonData.keys();
		    while (iterator.hasNext()) {
		        String obj = iterator.next().toString();
		        if ( obj.startsWith("mclm_pk_") ) {
		        	String pk = obj.substring(8);
		        	relationShip = relationShip.replace("$%"+ pk +"%$", "'" + jsonData.get(obj).toString() + "'");
		        }
		        
		    }    
			
		    String sql = "select * from " + dataWindow.getSourceTable() + " where " + relationShip;
		    
		    System.out.println("Criando Janela com os dados de: " + sql );
		    
		    String databaseConn = dataWindow.getSourceServer() +
					":" + dataWindow.getSourcePort() + "/" + dataWindow.getSourceDatabase();
		    
			String connectionString = "jdbc:postgresql://" + databaseConn;

			GenericService gs = new GenericService( connectionString, dataWindow.getSourceUser(), 
					dataWindow.getSourcePassword()  );
			
			List<UserTableEntity> utes = gs.genericFetchList( sql );			
			if ( utes.size() > 0 ) {
				UserTableEntity record = utes.get(0);
				result = createWindow( dataWindow, record );
			} else {
				throw new Exception("Não foi encontrada correspondência entre os dados da camada " + nodeData.getLayerAlias() +
						" e a tabela " + dataWindow.getSourceTable() + " no banco " + databaseConn + " usando o critério [" + relationShip + "]");
			}
			
			
		} catch ( Exception e ) {	
			//e.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ e.getMessage() + ".\" }";
		}
		
		return result;
	}

	
	private String createWindow( DataWindow dataWindow, UserTableEntity record ) {
		String result = "";
		JSONObject window = new JSONObject();
		window.put("windowName", dataWindow.getDataWindowName() );
		
		JSONArray panels = new JSONArray();
		for ( DataPanel dataPanel : dataWindow.getDataPanels() ) {
			JSONObject panel = new JSONObject();
			panel.put("panelName", dataPanel.getDataPanelName() );
			panels.put( panel );
			
			JSONArray fields = new JSONArray();
			for ( DataField dataField : dataPanel.getFields() ) {
				String fieldName = dataField.getFieldName();
				String fieldCaption = dataField.getCaption();
				String fieldType = dataField.getFieldType().name();
				String fieldDescription = dataField.getDescription();
				

				JSONObject field = new JSONObject();
				for( String key : record.getColumnNames() ) {
					if ( key.equals( fieldName ) ) {
						String value = record.getData( key );
						field.put("fieldValue", value);
						field.put("fieldName", key);
						field.put("fieldType", fieldType);
						field.put("fieldCaption", fieldCaption);
						field.put("fieldDescription", fieldDescription);
					}
				}		
				fields.put( field );
				
			}
			panel.put("fields", fields);
			
		}
		
		window.put("panels", panels);
		
		result = window.toString();
		
		return result;
	}


	@SuppressWarnings("unused")
	public String saveWindow(String dataWindowData) {
		String result = "{ \"success\": true }";
		try {
			JSONObject window = new JSONObject( dataWindowData );
			JSONArray nodes = window.getJSONArray("nodes");
			JSONObject nodeData = window.getJSONObject("nodeData");
			JSONObject windowData = window.getJSONObject("windowData");
			
			JSONArray dictionaryIds = window.getJSONArray("dictionaryIds");
			JSONArray windowIds = window.getJSONArray("windowIds");
			
			
			DataWindow dw = new DataWindow();
			dw.setDataWindowName( windowData.getString("dataWindowName") );
			dw.setSourceDatabase( windowData.getString("databaseName") );
			dw.setSourcePassword( windowData.getString("password") );
			dw.setSourcePort( windowData.getInt("serverPort") );
			dw.setSourceServer( windowData.getString("serverAddress") );
			dw.setSourceTable( windowData.getString("tableName") );
			dw.setSourceUser( windowData.getString("user") );
			
			// Cria assimilacao das chaves de acordo com o indice delas no array.
			// Obviamente precisa haver um mesmo numero de chaves primarias e estrangeiras para
			// realizar a combinacao. Cada chave da camada em dictionaryIds sera usada para identificar um
			// registro na tabela de windowId ( where dictionaryIds[x] = windowIds[x] ) mas dictionaryIds[x] sera trocado
			// pelo valor real do registro entao precisa estar em forma de TAG ( $%fieldName%$ )
			StringBuilder sb = new StringBuilder();
			String andClause = "";
			for( int x=0; x< dictionaryIds.length(); x++ ) {
				String dictionaryId = dictionaryIds.getJSONObject(x).getString("fieldName") ;
				String windowId = "$%" + windowIds.getJSONObject(x).getString("fieldName") + "%$";
				sb.append( andClause + dictionaryId + "=" + windowId );
				andClause = " and ";
			}
			
			dw.setSqlDataAcquisition( sb.toString() );
			
			// Pega os paineis
			Set<DataPanel> dataPanels = new HashSet<DataPanel>();
			for ( int x=0; x< nodes.length(); x++  ) {
				JSONObject node = nodes.getJSONObject(x);
				int parentId = -1;
				try {
					parentId = node.getInt("parentId");
				} catch ( JSONException je ) {
					continue;
				}
				
				
				if( parentId == 0 ) {
					DataPanel dp = new DataPanel();
					dp.setDataPanelName( node.getString("text") );
					dp.setAlias( node.getString("id") );
					dp.setDataWindow(dw);
					dp.setOrder( node.getInt("index") );
					dataPanels.add(dp);
				}
			}
			dw.setDataPanels(dataPanels);

			// Pega os campos
			for ( int x=0; x< nodes.length(); x++  ) {
				JSONObject node = nodes.getJSONObject(x);
				try {
					// Se for um numero eh pq eh uma pasta. Os campos possuem String aqui.
					int testIgnore = node.getInt("parentId");
				} catch ( JSONException je ) {
					String parentId = node.getString("parentId");
					DataPanel dp = this.getDataPanelByName( dw.getDataPanels(), parentId );
					//if ( dp != null ) {
						DataField df = new DataField();
						df.setCaption( node.getString("newName") );
						df.setDataPanel( dp );
						df.setDescription("");
						df.setFieldName( node.getString("columnName") );
						df.setFieldType( DataFieldType.valueOf( node.getString("newType") ));
						df.setOrder( node.getInt("index") );
						dp.getFields().add( df );
					//}
					
				}
				
			}
			
			// Grava a Janela
			DataWindowRepository rep = new DataWindowRepository();
			dw = rep.insertDataWindow(dw);
			
			// Liga o Layer com a Janela
			NodeService ns = new NodeService();
			NodeData nd = ns.getNode( nodeData.getInt("idNodeData") );
			nd.setDataWindow( dw );
			ns.newTransaction();
			ns.updateNode(nd);
			
			
		} catch ( Exception e ) {
			result = "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";
			e.printStackTrace();			
		}
		return result;
	}
	
	private DataPanel getDataPanelByName( Set<DataPanel> dataPanels, String dataPanelName ) {
		for ( DataPanel dp : dataPanels ) {
			if( dp.getAlias().equals( dataPanelName ) ) return dp;
		}
		return null;
	}
	
}
