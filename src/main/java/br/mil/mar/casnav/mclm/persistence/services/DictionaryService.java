package br.mil.mar.casnav.mclm.persistence.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.http.conn.HttpHostConnectException;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.misc.WebClient;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayer;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayerAttribute;
import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayersSchema;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.DictionaryItem;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.repository.DictionaryRepository;

public class DictionaryService {
	
	private DictionaryRepository rep;
	
	public DictionaryService() throws DatabaseConnectException {
		this.rep = new DictionaryRepository();
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public void deleteDictionary( int layerNode ) throws Exception {
		rep.deleteDictionary( layerNode, true );
	}
		
	public String getListAsJson( int idNodeData, String layerName, String serviceUrl ) throws Exception {
		List<DictionaryItem> items = getDictionary( idNodeData );
		String result = "";
		
		for ( DictionaryItem item : items ) {
			item.getNode().setDataLayer( null );
			item.getNode().setDataWindow( null );
		}
		
		try {
			JSONArray arrayObj = new JSONArray( items );
			result = arrayObj.toString();
		} catch ( Exception e  ) {
			e.printStackTrace();
		}
		
		return result;
	}	
	
	public List<DictionaryItem> getDictionaryByLayer( String layerName ) throws Exception {
		return rep.getDictionaryByLayer(layerName);
	}
	
	public List<DictionaryItem> getDictionary( int idNodeData ) throws Exception {
		List<DictionaryItem> result = rep.getList( idNodeData );
		return result;
	}
	
	public int createDictionary( NodeData node ) throws Exception {
		String layerName = node.getLayerName();
		String serviceUrl = node.getServiceUrl();
		int result = 0;
		
		if ( node.getLayerType() == LayerType.DTA ) {
			System.out.println("Criando dicionário para [" + node.getLayerType() + "] " + node.getLayerAlias() + "..." );
						
			try {
				DataLayer dl = node.getDataLayer();
				
				//System.out.println(" > Tabela " + dl.getTable().getName() );
				
				int serverPort = dl.getTable().getServer().getServerPort();
				String serverAddress = dl.getTable().getServer().getServerAddress();
				String databaseName = dl.getTable().getServer().getServerDatabase();
				String password = dl.getTable().getServer().getServerPassword();
				String user = dl.getTable().getServer().getServerUser();
				String tableName = dl.getTable().getName();
				String columns = dl.getPropertiesColumns();
				
				// Tenta remover o nome do esquema
				if ( tableName.contains(".") ) {
					String data1[] = tableName.split("\\.");
					//schemaName = data1[0];
					tableName = data1[1];
				}
				
				List<UserTableEntity> utes = getSchema( tableName, serverAddress, serverPort, databaseName, user, password,  columns  );
				result = utes.size();
				
				for( UserTableEntity ute : utes ) {
					String columnName = "";
					String dataType = "";
					
					for( String key : ute.getColumnNames() ) {
						String value = ute.getData( key );
						if( key.equals("column_name") ) columnName = value;
						if( key.equals("data_type") ) dataType = value;						
					}
					
					DictionaryItem di = new DictionaryItem( columnName, dataType, node );
					di.setIndexOrder(99);
					
					newTransaction();
					rep.insertItem( di );				
				}
				
				

			} catch (Exception e) {
				e.printStackTrace();
			}
			
		} else
		
		if ( node.getLayerType() == LayerType.WMS ) {
			//System.out.println("Atualizando dicionário para [" + node.getLayerType() + "] " + node.getLayerAlias() + "..." );
			GeoserverLayersSchema schema = null;
			try {
				schema = getLayerAttributeSchema( layerName, serviceUrl );
			} catch ( HttpHostConnectException ex ) {
				//System.out.println(" > conexao com '" + serviceUrl + "' excedeu o tempo limite");
			}
			
			if ( schema == null ) {
				//System.out.println(" > impossivel obter esquema de '" + serviceUrl );
				return 0;
			}
			
			if ( schema.getFeatureTypes().size() > 0 ) {
				// Especifiquei a camada, entao so virah um layer no resultado
				GeoserverLayer layer = schema.getFeatureTypes().get(0);
				result = layer.getProperties().size();
				// Para cada attributo deste layer, crio um item de dicionario associado ao Node...
				for ( GeoserverLayerAttribute attribute : layer.getProperties() ) {
					DictionaryItem di = new DictionaryItem( attribute, node );
					di.setVisible( true );
					newTransaction();
					rep.insertItem( di );
				}
			}
		} else {
			//System.out.println(" > tipo de Camada '" + node.getLayerType() + "' não suporta dicionário.");
		}
		
		return result;
	}
	
	public String getSchemaAsJson ( int idNodeData, String tableSchema, String tableName, String serverAddress, int serverPort, String databaseName, 
			String user, String password )  throws Exception {

		String res = "";
		try {
			if ( tableName.contains(".") ) {
				String data1[] = tableName.split("\\.");
				tableSchema = data1[0];
				tableName = data1[1];
			}		
	
			
			DictionaryService ds = new DictionaryService();
			List<DictionaryItem> dictItems  = ds.getDictionary(idNodeData);
	
			
			String query = "SELECT column_name,data_type,ordinal_position FROM information_schema.columns WHERE table_schema = '"+tableSchema+"' and table_name = '"+tableName+"' order by ordinal_position"; 
	
			String connectionString = "jdbc:postgresql://" + serverAddress + ":" + serverPort + "/" + databaseName;
			GenericService gs = new GenericService( connectionString, user,	password  );
	
			JSONArray arr = new JSONArray();
			List<UserTableEntity> schma = gs.genericFetchList(query);		
			for( UserTableEntity ute : schma ) {
				
				JSONObject obj = new JSONObject();
				for( String key : ute.getColumnNames() ) {
					String value = ute.getData( key );
					
					if( key.equals("column_name") ) {
						obj.put("columnName", value);
	
						String translatedName = "";
						for ( DictionaryItem item : dictItems ) {
							String originalName = item.getOriginalName();
							if ( value.equals( originalName ) ) {
								translatedName = item.getTranslatedName();
							}
						}				
						obj.put("translatedName", translatedName);					
						
					}
					if( key.equals("data_type") ) {
						obj.put("dataType", value);
					}
				}
				arr.put( obj );
				
			}
			
			
			JSONObject result = new JSONObject();
			result.put("attributes", arr);
			
			boolean foundSomeId = false;
			JSONArray dictIds = new JSONArray();
			for ( DictionaryItem item : dictItems ) {
				if( item.isPrimaryKey() ) {
					JSONObject obj = new JSONObject();
					String fieldName = item.getOriginalName();
					obj.put("fieldName", fieldName);
					dictIds.put( obj );
					foundSomeId = true;
				}
			}
			result.put("dictionaryIds", dictIds);
			
			if ( !foundSomeId ) throw new Exception("Não existem atributos identificadores configurados no dicionário para esta camada. Impossível estabelecer relação entre a camada e a tabela '" + 
			tableName + "'. Configure o Dicionário corretamente.");
			res = result.toString();
			
		} catch ( Exception e ) {
			res = "{ \"error\": true, \"msg\": \""+ e.getMessage()+"\" }";
		}
		
		rep.closeSession();
		return res;
	}
	
	public List<UserTableEntity> getSchema( String tableName, String serverAddress, int serverPort, String databaseName, 
			String user, String password, String columns  )  throws Exception {
		
		String query = "SELECT column_name,data_type FROM information_schema.columns WHERE table_name = '"+tableName+"' order by column_name"; // table_schema = 'public'

		String connectionString = "jdbc:postgresql://" + serverAddress + ":" + serverPort + "/" + databaseName;
		GenericService gs = new GenericService( connectionString, user,	password  );

		List<UserTableEntity> schma = gs.genericFetchList(query);
		List<UserTableEntity> result = new ArrayList<UserTableEntity>();

		for( UserTableEntity ute : schma ) {
			
			String columnName = "";
			for( String key : ute.getColumnNames() ) {
				String value = ute.getData( key );
				if( key.equals("column_name") ) columnName = value;
			}
			
			if ( columns.equals("*") ) {
				result.add( ute );				
			} else
				columns = " " + columns.replace("\"", " ").replace(",", " ") + " ";
				if ( columns.contains( " " + columnName + " " ) ) {
					result.add( ute );
				}
			
		}		
		
		return result;
	
	}
	
	/*
	public void listSchema( PostgresTable table, String whereClause, String columns ) throws Exception {
		int serverPort = table.getServer().getServerPort();
		String serverAddress = table.getServer().getServerAddress();
		String databaseName = table.getServer().getServerDatabase();
		String password = table.getServer().getServerPassword();
		String user = table.getServer().getServerUser();
		String tableName = table.getName();
		
		DictionaryService ds = new DictionaryService();
		List<UserTableEntity> utes = ds.getSchema( tableName, serverAddress, serverPort, databaseName, user, password, whereClause, columns  );
		for( UserTableEntity ute : utes ) {
			String columnName = "";
			String dataType = "";
			for( String key : ute.getColumnNames() ) {
				String value = ute.getData( key );
				if( key.equals("column_name") ) columnName = value;
				if( key.equals("data_type") ) dataType = value;						
			}
			System.out.println( columnName + "  " + dataType);
		}
		
	}
	*/
	
	public GeoserverLayersSchema getAllGeoserverAttributeSchema( ) throws Exception {
		String jsonSchema = getAllGeoserverAttributeSchemaAsJson( );
		Gson gson = new GsonBuilder().create();
		GeoserverLayersSchema schema = gson.fromJson( jsonSchema , GeoserverLayersSchema.class);
		return schema;
	}
	
	public String getAllGeoserverAttributeSchemaAsJson( ) throws Exception {
		String result = "";
		Config cfg = Configurator.getInstance().getConfig();
		String geoServer = cfg.getGeoserverUrl();
		String url = geoServer + "wfs?request=describeFeatureType&outputFormat=application/json";
		WebClient wc = new WebClient();
		result = wc.doGet( url );
		return result;
	}
	
	
	public GeoserverLayersSchema getLayerAttributeSchema( String layerName, String serviceUrl ) throws Exception {
		GeoserverLayersSchema schema = null;	
		String jsonSchema = getLayerAttributeSchemaAsJson( layerName, serviceUrl );
		
		try {
			Gson gson = new GsonBuilder().create();
			schema = gson.fromJson( jsonSchema , GeoserverLayersSchema.class);
		} catch ( Exception e ) {
			System.out.println("Erro ao converter JSON: ");
			System.out.println( jsonSchema );
		}
		return schema;
	}
	
	public String getLayerAttributeSchemaAsJson( String layerName, String serviceUrl ) throws Exception {
		/*
		 	http://10.5.115.122/geoserver/wfs?request=describeFeatureType&typename=osm:admin0&outputFormat=application/json 
		*/
		String result = "";
		String url = serviceUrl + "wfs?request=describeFeatureType&outputFormat=application/json&typename=" + layerName;
		WebClient wc = new WebClient();
		result = wc.doGet( url );
		return result;
	}

	
	public String getTableAttributeSchema( String tableName ) {
		/*
		
			SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
			FROM pg_attribute a
			     JOIN pg_class b ON (a.attrelid = b.relfilenode)
			WHERE b.relname = 'view_aerodromos' and a.attstattarget = -1;		
		
		*/
		
		String result = "";
		
		return result;
	}

	public String updateDictionaryItems(String dictionary) {
		String resp = "{ \"success\": true, \"msg\": \"Operação efetuada com sucesso.\" }";
		
		try {
			
			JSONArray ja = new JSONArray( dictionary );
			for( int x=0; x < ja.length(); x++ ) {
				JSONObject jo = ja.getJSONObject( x );
				
				String description = jo.getString("description" );
				String translatedName = jo.getString("translatedName" );
				String dataType = jo.getString("dataType" );
				int idDictionaryItem = jo.getInt("idDictionaryItem" );
				boolean visible = jo.getBoolean("visible");
				boolean primaryKey = jo.getBoolean("primaryKey");

				int indexOrder = 99;
				try {
					indexOrder = jo.getInt("indexOrder" );
				} catch ( Exception e ) {
					//
				}
				
				newTransaction();
				DictionaryItem item = rep.getItem( idDictionaryItem );
				item.setTranslatedName( translatedName );
				item.setDescription( description );
				item.setVisible(visible);
				item.setPrimaryKey(primaryKey);
				item.setIndexOrder(indexOrder);
				item.setDataType(dataType.toUpperCase());
				
				newTransaction();
				rep.updateItem( item );
				
			}
			
		} catch ( Exception e ) {
			resp = "{ \"error\": true, \"msg\": \"" + e.getMessage() + "\" }";
		}		
		
		return resp;

	}

	public String copyDictionary(int sourceNode) {
		String resp = "";
		try {
			// Pega o dicionario da camada de origem
			List<DictionaryItem> sourceDictionary = getDictionary( sourceNode );
			
			
			// Pega todas as camadas que possuem mesma origem que a informada : INCLUSIVE ELA MESMA
			NodeService ns = new NodeService();
			NodeData node = ns.getNode(sourceNode);
			String layerName = node.getLayerName(); 
			ns.newTransaction();
			List<NodeData> sameOrignNodes = ns.getSameOriginNodes( layerName );
			int count = sameOrignNodes.size();
			
			// Apaga todo o dicionario para esse tipo de camada
			String sql = "delete from dictionary where id_node_data in (  select id_node_data from node_data where layername = '"+layerName+"' )";
			rep.newTransaction();
			rep.executeQuery(sql, true);
			
			// Para cada camada  ...
			DictionaryRepository newConn = new DictionaryRepository();
			for( NodeData nodeTarget : sameOrignNodes ) {
				
				// Para cada item do dicionario de origem...
				for( DictionaryItem item : sourceDictionary ) {
					// Troca a origem pelo destino
					item.setNode(nodeTarget);
					newConn.newTransaction();					
					newConn.insertItem(item);
				}
				
			}
			
			resp = "{ \"success\": true, \"msg\": \"Operação efetuada com sucesso. Foram processadas "+ count +" camadas.\" }";
		} catch ( Exception e ) {
			e.printStackTrace();
			resp = "{ \"error\": true, \"msg\": \"" + e.getMessage() + "\" }";
		}		
		return resp;
	}

	public void scanDictionary() throws Exception {

		NodeService ns = new NodeService();
		Set<NodeData> nodes = ns.getList();
		
		
		for( NodeData node : nodes ) {

			newTransaction();
			try {
				getDictionary( node.getIdNodeData() );
			} catch ( NotFoundException nfe ) {
				try {
					int quant = createDictionary( node );
					if ( quant > 0 ) System.out.println(" > concluido com " + quant + " itens.");
				} catch ( Exception e ) {
					System.out.println("Erro ao tentar atualizar o dicionário: " + e.getMessage() );
				}
			}
			
			
		}
		
		if ( Configurator.getInstance().getFeicaoRootNode() == null ) {
			ns.newTransaction();
			Configurator.getInstance().setFeicaoRootNode( ns.createCRN() );
		} 
		
		
		
	}

	/*
	public void updateDictionaryItem( DictionaryItem item ) throws Exception {
		DictionaryItem oldItem = rep.getItem( item.getIdDictionaryItem() );
	}
	*/
	
}
