package br.mil.mar.casnav.mclm.persistence.services;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.misc.PathFinder;
import br.mil.mar.casnav.mclm.misc.RESTResponse;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.misc.WebClient;
import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.DictionaryItem;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.entity.Server;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;

public class LayerService {

	
	private BufferedImage convertToImage( String base64Image ) throws Exception {
		byte[] decoded = Base64.getDecoder().decode( base64Image.replace("data:image/png;base64,", "").getBytes(StandardCharsets.UTF_8) );
		BufferedImage image = new BufferedImage( 1000, 600, BufferedImage.TYPE_INT_RGB);
		ByteArrayInputStream bis = new ByteArrayInputStream( decoded );
		image = ImageIO.read(bis);
		bis.close();		
		return image;
	}
	
	
	public String getLayersAsImage( String urlList, String feiEncodedCanvas )  {
		
		String resposta = "{\"result\":\"error\"}";
		try {
			BufferedImage convertedImage = null;
			if ( ( feiEncodedCanvas != null) && !feiEncodedCanvas.equals("") ) {
				convertedImage = convertToImage( feiEncodedCanvas );
			} 
			
			WebClient wc = new WebClient();
			
			String uuid = UUID.randomUUID().toString().replace("-", "");
			String path = PathFinder.getInstance().getPath() + "/tempmaps/" + uuid;
			
			File temp = new File( path );
			List<File> images = new ArrayList<File>();
			
			temp.mkdirs();
			JSONArray arr = new JSONArray( urlList );
			for ( int x = 0; x < arr.length(); x++  ) {
				JSONObject jo = arr.getJSONObject(x);
				String url = jo.getString("url");
				String serial = jo.getString("id");
				
				String targetFile = path + "/" + serial + ".png";
				wc.saveImage(url, targetFile);
				images.add( new File(targetFile) );
			}
			
		    BufferedImage result = new BufferedImage( 1000, 600, BufferedImage.TYPE_INT_RGB);
		    Graphics2D g = (Graphics2D)result.getGraphics();
		    
		    g.setPaint ( new Color ( 255, 255, 255 ) );
		    g.fillRect ( 0, 0, result.getWidth(), result.getHeight() );	    
			
		    for( File image : images ) {
		        BufferedImage bi = ImageIO.read( image );
		        g.drawImage(bi, 0, 0, null);
		    }	
		    
		    if ( convertedImage != null ) {
		    	g.drawImage(convertedImage, 0, 0, null);
		    	ImageIO.write( convertedImage,"png", new File(path + "/feicoes.png") );	
		    }
		    
		    ImageIO.write( result,"png", new File( path + "/result.png" ) );		    
		    String urlPath = "tempmaps/" + uuid + "/result.png";
		    
		    resposta = "{\"result\":\"success\",\"imagePath\":\""+urlPath+"\",\"uuid\":\""+uuid+"\"}";

		} catch ( Exception e ) {
			e.printStackTrace();
		}
		    
	    return resposta;
	}
	
	/*
	public String getLayerAsFeatures( String requestUrl ) {
		String result = "";
		
		// http://www.geoservicos.ibge.gov.br/geoserver/wms?service=WFS&version=1.0.0&request=GetFeature&typeName=CGEO:C06_aglomerados_subnormais_2010&maxFeatures=50&outputFormat=json&srsName=EPSG:4326&bbox=-45.75805664062501,-24.161790257643688,-40.13305664062501,-21.028109978642803

		// http://www.geoservicos.ibge.gov.br/geoserver/CGEO/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CGEO:C06_aglomerados_subnormais_2010&maxFeatures=50&outputFormat=json
		//String requestUrl = serverUrl.replace("wms/", "") + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + layerName + 
		//		limit + "&bbox=" + bbox + "&outputFormat=json"; 
		
		try {
			WebClient ws = new WebClient();
			result = ws.doGet( requestUrl );
		} catch ( Exception e ) {
			e.printStackTrace();
		}
		
		return result;
	}
	*/
	
	public String getAsFeatures( int idDataLayer, int idDataWindow, int idNodeData ) {
		String result = "";
		
		try {
			DataLayerService dls = new DataLayerService();
			DataLayer dl = dls.getDataLayer( idDataLayer );
				
			String sql = "SELECT row_to_json( fc )::json As featurecollection " +  
				"FROM ( SELECT 'FeatureCollection' As type, array_to_json( array_agg( f ) )::json As features " + 
				     "FROM (SELECT 'Feature' As type, " + 
				     "ST_AsGeoJSON( ST_Transform("+ dl.getTable().getGeometryColumnName() + ",4326) )::json As geometry, " +  
				     "row_to_json((SELECT l FROM (SELECT " + dl.getPropertiesColumns() + "," + dl.getLabelColumn() + " as mclm_label_column) As l))::json As properties " +  
					 "FROM " + dl.getTable().getName() + " As l where " + dl.getWhereClause() + ") As f) as fc; ";
	
			String jsonData = "";
			
			String connectionString = "jdbc:postgresql://" + dl.getTable().getServer().getServerAddress() +
					":" + dl.getTable().getServer().getServerPort() + "/" + dl.getTable().getServer().getServerDatabase();
			GenericService gs = new GenericService( connectionString, dl.getTable().getServer().getServerUser(), 
					dl.getTable().getServer().getServerPassword()  );
			
			List<UserTableEntity> utes = gs.genericFetchList( sql );
			
			if ( utes.size() > 0 ) {
				UserTableEntity ute = utes.get(0);
				jsonData = ute.getData("featurecollection");
			}


			JSONObject jsonTmpStyle = new JSONObject( dl.getStyle() );
			JSONObject jsonTmpData = new JSONObject( jsonData );
			JSONObject jsonTmpResult = new JSONObject();
			jsonTmpResult.put("data", jsonTmpData);
			jsonTmpResult.put("featureStyle", jsonTmpStyle);
			
			JSONArray jsonFeatures = jsonTmpData.getJSONArray("features");
			
			try {
				DictionaryService ds = new DictionaryService();
				List<DictionaryItem> dictItems = ds.getDictionary( idNodeData );
				for ( DictionaryItem item : dictItems ) {
					String originalName = item.getOriginalName();
					String translatedName = item.getTranslatedName();
					
					for ( int x=0; x < jsonFeatures.length(); x++ ) {
						JSONObject properties = jsonFeatures.getJSONObject(x).getJSONObject("properties");
						properties.put("data_window", idDataWindow);
						properties.put("node_data", idNodeData);

						
						if ( !item.isVisible() ) {
							properties.remove( originalName );
						} else {
						
							// Adiciona as chaves primarias com o nome do campo sem traducao.
							if ( item.isPrimaryKey() ) {
								
								if( !properties.has( originalName ) ) {
									// Lanca erro caso a coluna PK escolhida pelo usuario nao exista no resultset
									// vindo do banco. Nesse caso o usuario devera adicionar a PK como coluna de retorno
									// na consulta SQL acima para que ela venha no resultado.
									throw new Exception("A coluna definida como chave primária (" + originalName + ") não foi encontrada entre as colunas resultantes da consulta efetuada. Adicione esta coluna na camada '" + dl.getDataLayerName() + "'" );
								}
								
								Object value = properties.get( originalName );
								String primaryColumnName = "mclm_pk_" + originalName;
								properties.put(primaryColumnName, value);
								
							}
							
							// Troca o nome original pelo traduzido no dicionario
							if ( translatedName != null && !translatedName.equals("") && properties.has( originalName ) ) {
								Object value = properties.get( originalName );
								properties.remove( originalName );
								properties.put( translatedName, value );
							}
							
						}
					}
					
				}
			} catch ( NotFoundException nfe ) {
				// Ignored
			}
			
			result = jsonTmpResult.toString();
			
		} catch ( Exception e ) {
			e.printStackTrace();
			result = e.getMessage().replace("\"", "'");
		}
		return result;
	}
	
	public String queryLayer( String targetUrl, String layerName, int idDataWindow, int idNodeData ) throws Exception {
		String result = "";
		WebClient wc = new WebClient();
		result = wc.doGet(  URLDecoder.decode( targetUrl, "UTF-8")   ); 

		JSONObject queryResult = new JSONObject( result );
		JSONArray jsonFeatures = queryResult.getJSONArray("features");
		
		try {
			DictionaryService ds = new DictionaryService();
			NodeService ns = new NodeService();
			NodeData node = ns.getNode(idNodeData);
			
			List<DictionaryItem> dictItems = ds.getDictionary( idNodeData );
			
			for ( int x=0; x < jsonFeatures.length(); x++ ) {
				JSONObject feature = jsonFeatures.getJSONObject(x);
				JSONObject properties = feature.getJSONObject("properties");			

				properties.put("data_window", idDataWindow);
				properties.put("node_data", idNodeData);
				properties.put("window_type", node.getWindowType().toString() );
				properties.put("layer_description", node.getDescription() );
				properties.put("layer_source", node.getInstitute() );					
				
				JSONArray attributes = new JSONArray();				
				
				for ( DictionaryItem item : dictItems ) {
					String originalName = item.getOriginalName();
					String translatedName = item.getTranslatedName();	
					int indexOrder = item.getIndexOrder();

					if ( item.isVisible() ) {
						JSONObject attribute = new JSONObject();
						attribute.put("indexOrder", indexOrder);
						attribute.put("originalName", originalName);
						attribute.put("translatedName", translatedName);
						attribute.put("dataType", item.getDataType().toString() );
						attribute.put("description", item.getDescription() );
						
						Object value = "";
						try {
							value = properties.get( originalName );
							if ( value.equals("null") ) value = "";
						} catch ( Exception e ) {
							//e.printStackTrace();
						}
					

						if ( item.isPrimaryKey() ) {
							if( !properties.has( originalName ) ) {
								// Lanca erro caso a coluna PK escolhida pelo usuario nao exista no resultset
								// vindo do banco. Nesse caso o usuario devera adicionar a PK como coluna de retorno
								// na consulta SQL acima para que ela venha no resultado.
								throw new Exception("A coluna definida como chave primária (" + originalName + ") não foi encontrada entre as colunas resultantes da consulta efetuada. Adicione esta coluna na camada '" + layerName + "' em " + node.getServer().getName() );
							}
							String primaryColumnName = "mclm_pk_" + originalName;
							attribute.put(primaryColumnName, value);
						}
						
						attribute.put("value", value);
						attributes.put( attribute );
						
						
					} 


					try {
						properties.remove( originalName );	
					} catch (Exception e) {
						System.out.println("Cannot remove " + originalName);
					}
					
					
				}
				
				//System.out.println( attributes.toString() );

				properties.put("attributes", attributes);
			}	
				
			result = queryResult.toString();
			
		} catch ( Exception e ) {
			result = "{ \"error\": true, \"msg\": \"" + e.getMessage().replace("\"", "'") + ".\" }";
		}
		
		
		
		return result;
	}
	
	public int createWorkspace( String workspaceName ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String serverRESTAPI = geoserverURL + "rest/workspaces/";
	
		StringBuilder postData = new StringBuilder();
		postData.append("<workspace>");
		postData.append("<name>" + workspaceName + "</name>");
		postData.append("</workspace>");
		
		WebClient wc = new WebClient();
		int result = wc.doRESTRequest( "POST", serverRESTAPI, postData.toString(), geoUser, geoPassword );		
			
		return result;
	}
	
	public int addLayerFromWMSStore( String workspaceName, String storeName, String layerName, String sourceLayer ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String serverRESTAPI = geoserverURL + "rest/workspaces/" + workspaceName + "/wmsstores/" + storeName + "/wmslayers/";
		
		StringBuilder postData = new StringBuilder();
		postData.append("<wmsLayer>");
		postData.append("<name>" + layerName + "</name>");
		postData.append("<nativeName>" + sourceLayer + "</nativeName>");
		postData.append("<store>" + storeName + "</store>");
		postData.append("</wmsLayer>");
		
		WebClient wc = new WebClient();
		int result = wc.doRESTRequest( "POST", serverRESTAPI, postData.toString(), geoUser, geoPassword );		
		return result;		
		
	}
	
	public String deleteLayer( int idNode ) throws Exception {
		
		String result = "{ \"success\": true, \"msg\": \"Operação efetuada com sucesso.\" }";
		
		try {
			NodeService ns = new NodeService();
			NodeData node = ns.getNode(idNode);
			
			DictionaryService ds = new DictionaryService();
			ds.deleteDictionary( idNode );
			
			/*
			if ( node.getLayerType() == LayerType.FEI ) {
				Integer idNodeData = node.getIdNodeData();
				try {
					SceneryNodeService sns = new SceneryNodeService(); 
					SceneryNode sn = sns.getSceneryNodeByNodeData( idNodeData );
					// Se achou eh pq pertence a um cenario
					throw new Exception("Esta Feição pertence ao Cenário '" + sn.getScenery().getSceneryName() + "'.");
					
				} catch ( NotFoundException nfe ) {
					// Nao achou ... apaga!
					ns.newTransaction();
					ns.deleteNode(node);
					return result;
				}
			}
			*/			
			
			if ( node.getLayerType() == LayerType.FDR ) {
				// É uma pasta. Apaga somente o nó SE ESTIVER VAZIO.
				if ( node.getChildren() > 0 ) {
					throw new Exception("A pasta não está vazia.");
				} else {
					ns.newTransaction();
					ns.deleteNode(node);
				}
				return result;
			}
			
			Integer idNodeData = node.getIdNodeData();
			try {
				SceneryNodeService sns = new SceneryNodeService(); 
				SceneryNode sn = sns.getSceneryNodeByNodeData( idNodeData );
				// Se achou eh pq pertence a um cenario
				throw new Exception("Esta Camada pertence ao Cenário '" + sn.getScenery().getSceneryName() + "'.");
				
			} catch ( NotFoundException nfe ) {
				// Nao achou ... apaga!
				ns.newTransaction();
				ns.deleteNode(node);
			}
			
			if ( node.getLayerType() == LayerType.FEI ) {
				// Se for feição, ja apagou no codigo acima. So sair...
				return result;
			}
			
			String layerName = node.getLayerName();
			String workspaceName = "";
			boolean splited = false;
			if ( layerName.contains(":") ) {
				String[] workspaceAndLayer = layerName.split(":");
				workspaceName = workspaceAndLayer[0];
				layerName = workspaceAndLayer[1];
				splited = true;
			} 
			
			Configurator cfg = Configurator.getInstance();
			String geoUser = cfg.getGeoserverUser();
			String geoPassword = cfg.getGeoserverPassword();
			String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
			
			if ( node.getLayerType() == LayerType.KML ) {
				String filePath = node.getServiceUrl();
				String saveDirectory = PathFinder.getInstance().getPath() + "/" + filePath;
				File fil = new File( saveDirectory );
				fil.delete();
			}
				
			// Que tal um bloco SWITCH aqui?
			String serverRESTAPI = "";
			String serverRESTAPILayerGroup = "";
			
			if ( node.getLayerType() == LayerType.FTR ) {
				// Uma feature.... 
			}

			if ( node.getLayerType() == LayerType.SHP ) {
				if ( !splited ){
					throw new Exception("Nome da camada malformado. Deve ser no padrão 'workspace:layer' e está '" + layerName + "'");
				}
				// http://localhost:8080/geoserver/rest/workspaces/<ws>/datastores/<ds>?recurse=true
				serverRESTAPI = geoserverURL + "rest/workspaces/" + workspaceName + "/datastores/" + layerName + "?recurse=true";
			}
			if ( node.getLayerType() == LayerType.TIF ) { 
				if ( !splited ){
					throw new Exception("Nome da camada malformado. Deve ser no padrão 'workspace:layer' e está '" + layerName + "'");
				}
				// http://localhost:8080/geoserver/rest/workspaces/my_ws/coveragestores/my_cover?recurse=true
				serverRESTAPI = geoserverURL + "rest/workspaces/" + workspaceName + "/coveragestores/" + layerName + "?recurse=true";
			}
			
		
			//ns.newTransaction();
			//ns.deleteNode(node);
			
			/*
			 * isso eh muito perigoso!
			if ( node.getLayerType() == LayerType.WMS ) { 
				// http://localhost:8080/geoserver/rest/layers/<layer>
				serverRESTAPI = geoserverURL + "rest/layers/" + layerName;
				serverRESTAPILayerGroup = geoserverURL + "rest/layergroups/" + layerName;
			}
			*/			
			
			if ( !serverRESTAPI.equals("") ) {
				System.out.println("DELETE " + serverRESTAPI );
				WebClient wc = new WebClient();
				
				int res = 0;
				if ( !serverRESTAPILayerGroup.equals("") ) {
					res = wc.doRESTRequest( "DELETE", serverRESTAPI, "", geoUser, geoPassword );
				} else {
					// é um grupo de camadas...
					res = wc.doRESTRequest( "DELETE", serverRESTAPILayerGroup, "", geoUser, geoPassword );
				}

				
				if ( res != 0 ) {
					result = "{ \"success\": true, \"msg\": \"Sucesso, mas a camada original não foi removida do servidor de origem ('" + geoserverURL+ "').\" }";
					//throw new Exception("Erro ao remover camada '" + layerName + "': Código " + res );
				}
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			result = "{ \"error\": true, \"msg\": \"" + e.getMessage()+ ".\" }";
		}
		
		return result;		
		
	}

	
	public int createSHPStore( File file, String storeName, String workspaceName ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String serverRESTAPI = geoserverURL + "rest/workspaces/" + workspaceName + "/datastores/" + storeName + "/file.shp";
		
        int resp = createWorkspace( workspaceName );
        
        if ( resp == RESTResponse.CREATED ) {
        	System.out.println("Workspace Externo " + workspaceName + " criado com sucesso.");
        } else {
        	System.out.println("Erro '"+resp+"' ao criar o Workspace Externo " + workspaceName );
        }		
		
		WebClient wc = new WebClient();
		int result = wc.doPutFile( file, "application/zip", serverRESTAPI, "", geoUser, geoPassword );
		return result;		
		
	}
	

	public int createTIFStore( File file, String storeName, String workspaceName ) throws Exception {
		
		Configurator cfg = Configurator.getInstance();
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		
        int resp = createWorkspace( workspaceName );

        if ( resp == RESTResponse.CREATED ) {
        	System.out.println("Workspace Externo " + workspaceName + " criado com sucesso.");
        } else {
        	System.out.println("Erro '"+resp+"' ao criar o Workspace Externo " + workspaceName );
        }		

		String serverRESTAPI = geoserverURL + "rest/workspaces/" + workspaceName + "/coveragestores/" + storeName + 
				"/file.geotiff"; // + file.getName();
		
		WebClient wc = new WebClient();
		int result = wc.doPutFile( file, "image/tiff", serverRESTAPI, "", geoUser, geoPassword );

		System.out.println( serverRESTAPI );

		return result;		
	}
		
	
	public int createStoreFromWMSService( String storeName, String targetWorkspace, String capabilitiesURL ) throws Exception {
		Configurator cfg = Configurator.getInstance();
		String geoserverURL = cfg.getGeoserverUrl().replace("wms/", "");
		String geoUser = cfg.getGeoserverUser();
		String geoPassword = cfg.getGeoserverPassword();
		String serverRESTAPI = geoserverURL + "rest/workspaces/" + targetWorkspace + "/wmsstores"; 
		
		StringBuilder postData = new StringBuilder();
		postData.append("<wmsStore>");
		postData.append("<name>" + storeName + "</name>");
		postData.append("<type>WMS</type>");
		postData.append("<enabled>true</enabled>");

		postData.append("<maxConnections>10</maxConnections>");
		postData.append("<connectTimeout>30</connectTimeout>");
		postData.append("<readTimeout>60</readTimeout>");
		
		postData.append("<capabilitiesURL>" + capabilitiesURL + "</capabilitiesURL>");
		postData.append("</wmsStore>");
		
		WebClient wc = new WebClient();
		int result = wc.doRESTRequest( "POST", serverRESTAPI, postData.toString(), geoUser, geoPassword );	
		return result;
	}
	
	
	public String makeExternalLayerLocal( String serverUrl, String layerName ) throws Exception {
		URL source = new URL(serverUrl);
        String newStoreName = source.getHost().replaceAll("/", "").replace("wmslayers", "").replaceAll("\\.", "_");		
		
        Configurator cfg = Configurator.getInstance();
		//String geoserverURL = cfg.getGeoserverUrl();
		String externalWorkspaceName = cfg.getExternalWorkspaceName();        
        
        // Tenta criar o Workspace padrao para camadas externas. Ignora se jah existir.
        int resp = createWorkspace( externalWorkspaceName );
        
        if ( resp == RESTResponse.CREATED ) {
        	System.out.println("Workspace Externo " + externalWorkspaceName + " criado com sucesso.");
        } else {
        	System.out.println("Erro '"+resp+"' ao criar o Workspace Externo " + externalWorkspaceName );
        }
        
        
        // Tenta criar o WMS Store ...
		int res = createStoreFromWMSService( newStoreName, externalWorkspaceName, serverUrl );
		
		if ( res != RESTResponse.CREATED ) {
			System.out.println( "Erro " + res + " recebido pelo GeoServer ao criar novo Store '"+newStoreName+"' para o serviÃ§o externo WMS." );
			//throw new Exception( "Erro " + res + " recebido pelo GeoServer ao criar novo Store '"+newStoreName+"' para o serviÃ§o externo WMS." );
		} else {
			System.out.println( "Store '"+newStoreName+"' criado no Workspace " + externalWorkspaceName );
		}
		
		
		// Tenta criar a camada WMS...
		String sourceLayer = layerName;
		if ( sourceLayer.contains(":") ) {
			String[] workspaceAndLayer = sourceLayer.split(":");
            //String workspace = workspaceAndLayer[0];
			layerName = workspaceAndLayer[1];
        }

		res = addLayerFromWMSStore( externalWorkspaceName, newStoreName, layerName, sourceLayer );		
		
		if ( res != RESTResponse.CREATED ) {
			System.out.println("Erro ao criar camada " + layerName + " no store/workspace " + newStoreName + "/" + externalWorkspaceName + " a partir da camada externa " + sourceLayer);
		} else {
			System.out.println("Sucesso ao criar camada " + layerName + " no store/workspace " + newStoreName + "/" + externalWorkspaceName + " a partir da camada externa " + sourceLayer);
		}
		
		String result = externalWorkspaceName + ":" + layerName;
        return result;
	}
	
	
    // Cria uma camada WMS
	public String createWMSLayer(int layerFolderID, String serverUrl, String description, String institute,
			String layerName, String layerAlias, String cqlFilter, int idServer) {

		if ( !serverUrl.endsWith("/") ) serverUrl = serverUrl + "/";
		if ( !serverUrl.contains("/wms") ) serverUrl = serverUrl + "wms/";
		
		String result = "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
		try {
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, serverUrl, description, institute, layerName, layerAlias, LayerType.WMS);
			
			ServerService ss = new ServerService();
			Server server = ss.getServerWMS( idServer );
			
			node.setCqlFilter(cqlFilter);
			node.setServer( server );
			
	        Configurator cfg = Configurator.getInstance();
	        String originalServer = node.getOriginalServiceUrl(); 
	        
	    	node.setOriginalServiceUrl( originalServer );        
	        if ( cfg.isExternalLayersToLocalServer() ) {
	        	// Transferir a camada para o servidor geoserver base
	        	// Transfere para local. Seta a URL de servico como a mesma URL, mas trocando o servidor.
	        	String newLayerName = makeExternalLayerLocal( serverUrl, layerName);
	        	node.setServiceUrl( cfg.getGeoserverUrl() );
	        	node.setLayerName( newLayerName );
	        } else {
	        	// Nao transfere para local. Seta a URL de servico como a original.
	        	node.setServiceUrl( node.getOriginalServiceUrl() );
	        }
			
			ns.addNode( node );	
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		return result;
	}

	public String createSHPLayer(String shpFileContentType, File shpFile, String shpFileFileName, String layerAlias,
			String description, String institute, int layerFolderID) {

		try {
			Configurator cfg = Configurator.getInstance();
			String serverUrl = cfg.getGeoserverUrl();
			String externalWorkspaceName = cfg.getExternalWorkspaceName();
			String storeName = shpFileFileName.replace(".zip", "").replace(" ", "_");
			String layerName = cfg.getExternalWorkspaceName() + ":" + storeName; 
			
			String saveDirectory = Configurator.getInstance().getShapeFileTargetPath();
			File destFile = new File( saveDirectory + File.separator + shpFileFileName );
			FileUtils.copyFile(shpFile, destFile);

			createSHPStore(destFile, storeName, externalWorkspaceName);
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "", description, institute, layerName, layerAlias, LayerType.SHP);
			node.setServiceUrl( serverUrl );
			ns.addNode( node );
			
			return "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
		} catch ( Exception e ) {
			return "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";	
		}
		 
	}

	public String createKMLLayer(String kmlFileContentType, File kmlFile, String kmlFileFileName, String layerAlias,
			String description, String institute, int layerFolderID) {

		try {
			
			Configurator cfg = Configurator.getInstance();
			String storeName = kmlFileFileName.replace(".zip", "");
			String layerName = cfg.getExternalWorkspaceName() + ":" + storeName; 
			
			String saveDirectory = PathFinder.getInstance().getPath() + "/kmlFolderStorage"; 
			
			File destFile = new File( saveDirectory + File.separator + kmlFileFileName );
			FileUtils.copyFile(kmlFile, destFile);
		
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "" , description, institute, layerName, layerAlias, LayerType.KML);
			node.setServiceUrl( "kmlFolderStorage/" + kmlFileFileName );
			ns.addNode( node );		
			
			
			return "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
		} catch ( Exception e ) {
			return "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";	
		}
		
	}

	
	public String createTIFLayer(String tifFileContentType, File tifFile, String tifFileFileName, String layerAlias,
			String description, String institute, int layerFolderID) {
		
		try {
			Configurator cfg = Configurator.getInstance();
			String serverUrl = cfg.getGeoserverUrl();
			String storeName = tifFileFileName.replace(".tiff", "").replace(".tif", "");
			String externalWorkspaceName = cfg.getExternalWorkspaceName();
			String layerName = externalWorkspaceName + ":" + storeName; 
			
			String saveDirectory = Configurator.getInstance().getShapeFileTargetPath();
			//String saveDirectory = PathFinder.getInstance().getPath() + "/kmlFolderStorage";

			File destFile = new File( saveDirectory + File.separator + tifFileFileName );
			FileUtils.copyFile(tifFile, destFile);

			createTIFStore(destFile, storeName, externalWorkspaceName);
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "", description, institute, layerName, layerAlias, LayerType.TIF);
			node.setServiceUrl( serverUrl );
			ns.addNode( node );			
			
			destFile.delete();
			
			return "{ \"success\": true, \"msg\": \"Camada " + layerName + " criada com sucesso.\" }";
		} catch ( Exception e ) {
			return "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";	
		}

		
	}	
	
}
