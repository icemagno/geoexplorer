package br.mil.mar.casnav.mclm.misc;

import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.Feicao;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.services.DataLayerService;

/*
 * Se mexer nesta estrutura, altere também 
 * em TreeNode
 * 
 */
public class SceneryTreeNode {
	// Especifico do TreePanel
	private String id;
	private boolean leaf;
	private String Cls;
	private boolean checked;
	private String text;
	private String iconCls;
	// -----------------------	
	
	private int idSceneryNode;
	private int idNodeParent;
	private int indexOrder;	
	private String layerType;
	private String serviceUrl;
	private String originalServiceUrl;
	private String description;
	private String institute;
	private String layerName;
	private String layerAlias;
	private String serialId;	
	private String referenceLayerSerial;
	private boolean readOnly;
	private boolean selected;
	private int layerStackIndex;
	private int transparency;	
	private DataLayer dataLayer;
	private Feicao feicao;
	
	
	public SceneryTreeNode( SceneryNode sn, DataLayerService dss ) {
		this.idSceneryNode = sn.getIdSceneryNode();
		this.idNodeParent = sn.getIdNodeParent();
		this.indexOrder = sn.getIndexOrder();
		this.layerType = sn.getLayerType().toString();
		this.layerAlias = sn.getLayerAlias();
		this.readOnly = false;
		this.layerStackIndex = sn.getLayerStackIndex();
		this.transparency = sn.getTransparency();
		this.checked = sn.isSelected();
		this.selected = sn.isSelected();
		
		if ( sn.getLayer() != null ) {
			this.serviceUrl = sn.getLayer().getServiceUrl();
			this.originalServiceUrl = sn.getLayer().getOriginalServiceUrl();
			this.description = sn.getLayer().getDescription();
			this.institute = sn.getLayer().getInstitute();
			this.layerName = sn.getLayer().getLayerName();
			this.serialId = sn.getLayer().getSerialId();
		} else {
			// Não pode ser "null" porque a conversão para JSON vai omitir o atributo.
			this.serviceUrl = "";
			this.originalServiceUrl = "";
			this.description = "";
			this.institute = "";
			this.layerName = "";
			this.serialId = "";
		}
		
		// Precisa para ser compativel com o TreeNode do ExtJS
		this.id = String.valueOf( sn.getId() );
		this.text = this.layerAlias;
		
		if ( this.layerName == null || this.layerName.equals("") ) {
			this.leaf = false;
		} else {
			this.leaf = true;
			if ( this.layerType.equals("KML") ) this.iconCls = "kml-icon";
			if ( this.layerType.equals("WMS") ) this.iconCls = "wms-icon";
			if ( this.layerType.equals("SHP") ) this.iconCls = "shp-icon";
			if ( this.layerType.equals("TIF") ) this.iconCls = "tif-icon";
			
			if ( this.layerType.equals("FEI") ) {
				try {
					dss.newTransaction();
					String[] dssData = this.layerName.split(":");
					Integer idFeicao = Integer.valueOf( dssData[1] );
					this.feicao = dss.getFeicao( idFeicao );
				} catch ( Exception e ) {
					e.printStackTrace();
				}
				this.iconCls = "fei-icon";
			}
			
			if ( this.layerType.equals("DTA") ) {
				
				try {
					dss.newTransaction();
					String[] dssData = this.layerName.split(":");
					Integer idDataLayer = Integer.valueOf( dssData[1] );
					this.dataLayer = dss.getDataLayer( idDataLayer );
				} catch ( Exception e ) {
					//
				}
				this.iconCls = "cube-icon";
				
			}			
			
		}
		
	}


	public int getIdSceneryNode() {
		return idSceneryNode;
	}


	public int getIdNodeParent() {
		return idNodeParent;
	}


	public int getIndexOrder() {
		return indexOrder;
	}


	public String getLayerType() {
		return layerType;
	}


	public String getServiceUrl() {
		return serviceUrl;
	}


	public String getOriginalServiceUrl() {
		return originalServiceUrl;
	}


	public String getDescription() {
		return description;
	}


	public String getInstitute() {
		return institute;
	}


	public String getLayerName() {
		return layerName;
	}


	public String getLayerAlias() {
		return layerAlias;
	}


	public String getSerialId() {
		return serialId;
	}


	public String getReferenceLayerSerial() {
		return referenceLayerSerial;
	}


	public boolean isReadOnly() {
		return readOnly;
	}


	public int getLayerStackIndex() {
		return layerStackIndex;
	}


	public int getTransparency() {
		return transparency;
	}


	public String getId() {
		return id;
	}


	public boolean isLeaf() {
		return leaf;
	}


	public String getCls() {
		return Cls;
	}


	public boolean isChecked() {
		return checked;
	}


	public String getText() {
		return text;
	}


	public String getIconCls() {
		return iconCls;
	}

	public boolean isSelected() {
		return selected;
	}
	
	public DataLayer getDataLayer() {
		return dataLayer;
	}
	
	public Feicao getFeicao() {
		return feicao;
	}
	
}
