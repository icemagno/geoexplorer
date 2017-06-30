package br.mil.mar.casnav.mclm.misc;

import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.Feicao;
import br.mil.mar.casnav.mclm.persistence.entity.FilterItem;
import br.mil.mar.casnav.mclm.persistence.services.DataLayerService;
import br.mil.mar.casnav.mclm.persistence.services.FilterService;

/*
 * Se mexer nesta estrutura, altere tambï¿½m 
 * em SceneryTreeNode
 * 
 */
public class TreeNode {
	// Especifico do TreePanel
	private String id;
	private boolean leaf;
	private String Cls;
	private boolean checked;
	private String text;
	private String iconCls;
	// -----------------------
	
	private String serviceUrl;
	private String originalServiceUrl;
	private String layerName;
	private String description;
	private String institute;
	private String layerAlias;
	private int index;
	private int idNodeParent;
	private int idNodeData;
	private String serialId;
	private String layerType;
	private int childrenCount;
	private boolean readOnly = false;
	private DataLayer dataLayer;
	private FilterItem filter;
	private int idDataWindow;
	private Feicao feicao;
	
	public TreeNode( UserTableEntity ute, DataLayerService dss, FilterService fs ) {
		this.childrenCount = Integer.valueOf( ute.getData("children") );

		this.idNodeParent = Integer.valueOf( ute.getData("id_node_parent") );
		this.index = Integer.valueOf( ute.getData("index_order") );
		this.layerName = ute.getData("layername");
		this.originalServiceUrl = ute.getData("originalserviceurl");
		this.serviceUrl = ute.getData("serviceurl");		
		this.description = ute.getData("description");		
		this.institute = ute.getData("institute");		
		this.layerAlias = ute.getData("layeralias");
		this.layerType = ute.getData("layertype");
		this.readOnly = Boolean.valueOf( ute.getData("read_only") );
		this.iconCls = "";
		this.idNodeData = Integer.valueOf( ute.getData("id_node_data") );
		
		try {
			this.idDataWindow = Integer.valueOf( ute.getData("id_data_window") );
		} catch ( Exception ignored ) {
			this.idDataWindow = -1;	
		}

		this.serialId = ute.getData("serialid");
		this.id = ute.getData("id_node_data");
		this.leaf = ( this.childrenCount == 0 );
		
		if ( this.layerName == null || this.layerName.equals("") ) {
			this.leaf = false;
		} else {
			if ( this.layerType.equals("KML") ) this.iconCls = "kml-icon";
			// ====================================================================================

			if ( this.layerType.equals("WMS") ) {
				this.iconCls = "wms-icon";
				String filterId = ute.getData("id_filter_item");
			
				if( filterId != null && !filterId.equals("") ) {
					try {
						int idFilterItem = Integer.valueOf( ute.getData("id_filter_item") );
						this.filter = fs.getFilter( idFilterItem );
					} catch ( Exception e ) {
							
					}
				}
				
			}
			// ====================================================================================
			if ( this.layerType.equals("FEI") ) {
				try {
					
					dss.newTransaction();
					Integer idFeicao = Integer.valueOf( ute.getData("id_feicao") );
					this.feicao = dss.getFeicao( idFeicao );
					
					this.institute = "Feição '" + this.feicao.getGeomType() + "' estilo '" + this.feicao.getStyle().getFeatureStyleName() +"'" ;
					
				} catch ( Exception e ) {
					e.printStackTrace();
				}
				this.iconCls = "fei-icon";
			}
			
			if ( this.layerType.equals("SHP") ) this.iconCls = "shp-icon";
			if ( this.layerType.equals("TIF") ) this.iconCls = "tif-icon";
			if ( this.layerType.equals("DTA") ) {
				// Anexa um DataLayer ao no com os dados da camada de banco e seu estilo
				try {
					dss.newTransaction();
					Integer idDataLayer = Integer.valueOf( ute.getData("id_data_layer") );
					this.dataLayer = dss.getDataLayer( idDataLayer );
					this.dataLayer.getTable().getServer().setTables( null );
				} catch ( Exception e ) {
					//e.printStackTrace();
				}
				this.iconCls = "cube-icon";
				
			}
		}
		
		this.checked = false;
		this.Cls = "";
		this.text =  ute.getData("layeralias");
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCls() {
		return Cls;
	}

	public void setCls(String cls) {
		Cls = cls;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public boolean isChecked() {
		return checked;
	}

	public boolean isReadOnly() {
		return readOnly;
	}
	
	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getServiceUrl() {
		return serviceUrl;
	}

	public void setServiceUrl(String serviceUrl) {
		this.serviceUrl = serviceUrl;
	}

	public String getOriginalServiceUrl() {
		return originalServiceUrl;
	}

	public void setOriginalServiceUrl(String originalServiceUrl) {
		this.originalServiceUrl = originalServiceUrl;
	}

	public String getLayerName() {
		return layerName;
	}

	public void setLayerName(String layerName) {
		this.layerName = layerName;
	}


	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getIdNodeParent() {
		return idNodeParent;
	}

	public void setIdNodeParent(int idNodeParent) {
		this.idNodeParent = idNodeParent;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getInstitute() {
		return institute;
	}

	public void setInstitute(String institute) {
		this.institute = institute;
	}

	public String getLayerAlias() {
		return layerAlias;
	}

	public void setLayerAlias(String layerAlias) {
		this.layerAlias = layerAlias;
	}

	public String getSerialId() {
		return serialId;
	}
	
	public void setSerialId(String serialId) {
		this.serialId = serialId;
	}
	
	public int getChildrenCount() {
		return childrenCount;
	}
	
	public void setChildrenCount(int childrenCount) {
		this.childrenCount = childrenCount;
	}

	public String getLayerType() {
		return layerType;
	}

	public void setLayerType(String layerType) {
		this.layerType = layerType;
	}
	
	public String getIconCls() {
		return iconCls;
	}

	public int getIdNodeData() {
		return idNodeData;
	}

	public void setIdNodeData(int idNodeData) {
		this.idNodeData = idNodeData;
	}

	public DataLayer getDataLayer() {
		return dataLayer;
	}

	public void setDataLayer(DataLayer dataLayer) {
		this.dataLayer = dataLayer;
	}

	public FilterItem getFilter() {
		return filter;
	}

	public void setFilter(FilterItem filter) {
		this.filter = filter;
	}

	public int getIdDataWindow() {
		return idDataWindow;
	}

	public void setIdDataWindow(int idDataWindow) {
		this.idDataWindow = idDataWindow;
	}
	
	public Feicao getFeicao() {
		return feicao;
	}	
	
}
