package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.DataLayersCollection;
import br.mil.mar.casnav.mclm.misc.FeatureStylesCollection;
import br.mil.mar.casnav.mclm.misc.LayerType;
import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.FeatureStyle;
import br.mil.mar.casnav.mclm.persistence.entity.Feicao;
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
		
		rep.newTransaction();
		rep.updateDataLayer(oldDataLayer);

	}	

	public DataLayer getDataLayer(int idDataLayer) throws Exception{
		return rep.getDataLayer(idDataLayer);
	}

	public Feicao getFeicao(int idFeicao) throws Exception{
		return rep.getFeicao(idFeicao);
	}

	public void newTransaction() {
		if ( !rep.isOpen() ) {
			rep.newTransaction();
		}
	}
	
	public void closeSession() {
		rep.closeSession();
	}
	
	public FeatureStyle getFeatureStyle( int idFeatureStyle ) {
		try {
			return rep.getStyle( idFeatureStyle );
		} catch ( Exception e ) {
			return null;
		}
	}
	
	public String insertDataLayer(String dataLayerName, String hint, Integer idTable, String institute,
			Integer layerFolderID, String whereClause, String propertiesColumns, String displayColumn, int idFeatureStyle) throws InsertException {
		
		String result = "{ \"success\": true, \"msg\": \"Camada de Dados criada com sucesso.\" }";
		
		try {
			FeatureStyle style = getFeatureStyle( idFeatureStyle );
			
			ServerService ss = new ServerService();
			PostgresTable table = ss.getTable( idTable );
			
			DataLayer dataLayer = new DataLayer(dataLayerName, hint,  whereClause, propertiesColumns, table,
					displayColumn, style);
			
			newTransaction();
			dataLayer = rep.insertDataLayer( dataLayer );
			
			String layerAlias = table.getName() + ":" + dataLayer.getIdDataLayer();
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(layerFolderID, "", hint, institute, layerAlias, dataLayer, LayerType.DTA);
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
		
		rep.closeSession();
		
		return itemObj.toString();		
	}
	
	private void updateFeatureStyle( FeatureStyle style ) throws Exception {
		FeatureStyle newStyle = rep.getStyle( style.getIdFeatureStyle() ); 
		newStyle.setFeatureStyleName( style.getFeatureStyleName() );
		newStyle.setIconAnchor( style.getIconAnchor() );
		newStyle.setIconAnchorXUnits( style.getIconAnchorXUnits() );
		newStyle.setIconAnchorYUnits( style.getIconAnchorYUnits() );
		newStyle.setIconOpacity( style.getIconOpacity() );
		newStyle.setIconColor( style.getIconColor() );
		newStyle.setIconRotation( style.getIconRotation() );
		newStyle.setIconScale( style.getIconScale() );
		newStyle.setIconSrc( style.getIconSrc() );
		
		newStyle.setLineFillColor( style.getLineFillColor() );
		newStyle.setLineLineDash( style.getLineLineDash() );
		newStyle.setLineStrokeColor( style.getLineStrokeColor() );
		newStyle.setLineStrokeWidth( style.getLineStrokeWidth() );
		
		newStyle.setPolygonFillColor( style.getPolygonFillColor() );
		newStyle.setPolygonFillOpacity( style.getPolygonFillOpacity() );
		newStyle.setPolygonFillPattern( style.getPolygonFillPattern() );
		newStyle.setPolygonLineDash( style.getPolygonLineDash() );
		newStyle.setPolygonStrokeColor( style.getPolygonStrokeColor() );
		newStyle.setPolygonStrokeLinecap( style.getPolygonStrokeLinecap());
		newStyle.setPolygonStrokeWidth( style.getPolygonStrokeWidth() );
		
		newStyle.setTextFillColor( style.getTextFillColor() );
		newStyle.setTextFont( style.getTextFont() );
		newStyle.setTextOffsetX( style.getTextOffsetX() );
		newStyle.setTextOffsetY( style.getTextOffsetY() );
		newStyle.setTextStrokeColor( style.getTextStrokeColor() );
		newStyle.setTextStrokeWidth( style.getTextStrokeWidth() );
		
		newStyle.setPtrHDist( style.getPtrHDist() );
		newStyle.setPtrHeight( style.getPtrHeight() );
		newStyle.setPtrVDist( style.getPtrVDist() );
		newStyle.setPtrLength( style.getPtrLength() );
		newStyle.setPtrWidth( style.getPtrWidth() );
		
		newTransaction();
		rep.updateFeatureStyle(newStyle);
	}

	public String insertUpdateFeatureStyle(int idFeatureStyle, String featureStyleName, String iconAnchor, String iconScale,
			String iconAnchorXUnits, String iconAnchorYUnits, String iconOpacity, String iconColor, String iconRotation,
			String iconSrc, String textOffsetY, String textOffsetX, String textFont, String textFillColor,
			String textStrokeColor, String textStrokeWidth, String polygonFillColor, String polygonFillPattern, String polygonStrokeColor, 
			String polygonStrokeWidth, String polygonLineDash, String polygonStrokeLinecap, String polygonFillOpacity, String lineFillColor, 
			String lineStrokeColor, String lineStrokeWidth, String lineLineDash, String ptrHDist, String ptrVDist, String ptrLength, String ptrHeight, String ptrWidth ) {
		
		String result = "{ \"success\": true, \"msg\": \"Estilo criado com sucesso.\" }";
		
		try {
			FeatureStyle style = new FeatureStyle(idFeatureStyle, featureStyleName, iconAnchor, iconScale, iconAnchorXUnits,
					iconAnchorYUnits, iconOpacity, iconColor, iconRotation, iconSrc,
					textOffsetY, textOffsetX, textFont, textFillColor, textStrokeColor,
					textStrokeWidth, polygonFillColor, polygonFillPattern, polygonStrokeColor, polygonStrokeWidth,
					polygonLineDash, polygonStrokeLinecap, polygonFillOpacity, lineFillColor, lineStrokeColor, lineStrokeWidth, lineLineDash,
					ptrHDist, ptrVDist, ptrLength, ptrHeight, ptrWidth);
			
			
			if ( style.getIdFeatureStyle() > -1 ) {
				updateFeatureStyle( style );
			} else 
				rep.insertFeatureStyle( style );
			
		} catch ( Exception ex ) {
			ex.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
		}
		
		return result;
	}

	public String getFeatureStylesAsJson() {
		String result = "{ \"success\": true, \"msg\": \"Estilo criado com sucesso.\" }";
		
		try {
			List<FeatureStyle> featureStyles = getStyleList();
			FeatureStylesCollection esc = new FeatureStylesCollection( featureStyles );
			JSONObject itemObj = new JSONObject( esc );
			
			rep.closeSession();
			
			result = itemObj.toString();				
			
		} catch (Exception e) {
			e.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+e.getMessage()+".\" }";	
		}
		
		return result;
	}

	private List<FeatureStyle> getStyleList() throws Exception {
		return rep. getStyleList();
	}

	public String insertFeicao(String data, int idFeatureStyle) {
		String result = "";
		
		try {
		
			FeatureStyle style = getFeatureStyle( idFeatureStyle );
			
			JSONObject itemObj = new JSONObject( data );
			JSONArray featureColl = itemObj.getJSONArray("features");
			
			JSONObject feature0 = featureColl.getJSONObject(0); 
			JSONObject geometria = feature0.getJSONObject("geometry") ; 
			JSONObject propriedades = feature0.getJSONObject("properties"); 
			
			String geomType = geometria.getString("type");  
			String feicaoNome = propriedades.getString("feicaoNome");  
			String feicaoDescricao = propriedades.getString("feicaoDescricao");  
			
			Feicao feicao = new Feicao( geomType, feicaoNome, feicaoDescricao, data, style );
			
			newTransaction();
			feicao = rep.insertFeicao( feicao );
			
			String jsonFeicao = new JSONObject( feicao ).toString();
			
			String layerAlias = feicaoNome + ":" + feicao.getIdFeicao();
			
			
			//----------------------------------------------------------------
			layerAlias = layerAlias.replace(" ", "_");
			//----------------------------------------------------------------

			
			NodeData feicaoNode = Configurator.getInstance().getFeicaoRootNode();
			if ( feicaoNode == null  ) {
				throw new Exception("Pasta de armazenamento de Feições não encontrada.");
			}
			int feicaoRootNodeId = feicaoNode.getIdNodeData();
			
			
			NodeService ns = new NodeService();
			NodeData node = new NodeData(feicaoRootNodeId, "", feicaoDescricao, "Feição", layerAlias, feicaoNome, LayerType.FEI);
			
			node.setFeicao( feicao );
			
			node.setReadOnly( false );
			node = ns.addNode( node );					
			
			result = "{ \"success\": true, \"msg\": \"Fei��o criada com sucesso.\",\"feicao\":" + jsonFeicao + ",\"layerAlias\":\""+ layerAlias+ "\",\"idLayer\":\""+node.getIdNodeData()+"\"}";
			
		} catch ( Exception e ) {
			e.printStackTrace();
			result = "{ \"error\": true, \"msg\": \""+e.getMessage()+".\" }";	
		}

		return result;
	}

	
}
