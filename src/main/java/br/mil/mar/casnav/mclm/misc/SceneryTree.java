package br.mil.mar.casnav.mclm.misc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.Scenery;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.services.DataLayerService;

public class SceneryTree {
	private int idScenery;
	private Date creationDate;
	private String sceneryName;	
	private int zoomLevel;	
	private String mapCenter;	
	private String baseMap;	
	private String baseServerURL;	
	private String description;		
	private String bbox;		
	private Boolean baseMapActive;	
	private Boolean isPublic;	    
	private Integer idUser;	
    private List<SceneryTreeNode> nodes;
	private Boolean graticule;

	public SceneryTree( Scenery scenery ) throws Exception {
		this.idScenery = scenery.getIdScenery();
		this.creationDate = scenery.getCreationDate();
		this.sceneryName = scenery.getSceneryName();
		this.zoomLevel = scenery.getZoomLevel();
		this.mapCenter = scenery.getMapCenter();
		this.baseMap = scenery.getBaseMap();
		this.baseServerURL = scenery.getBaseServerURL();
		this.description = scenery.getDescription();
		this.baseMapActive = scenery.getBaseMapActive();
		this.isPublic = scenery.getIsPublic();
		this.idUser = scenery.getIdUser();
		this.graticule = scenery.getGraticule();
		this.bbox = scenery.getMapBbox();
		
		this.nodes = new ArrayList<SceneryTreeNode>();
		
		DataLayerService dss = new DataLayerService();
		
		for ( SceneryNode sn : scenery.getNodes() ) {
			SceneryTreeNode stn = new SceneryTreeNode( sn, dss );
			nodes.add( stn );
		}
		
	}

	public int getIdScenery() {
		return idScenery;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public String getSceneryName() {
		return sceneryName;
	}

	public int getZoomLevel() {
		return zoomLevel;
	}

	public String getMapCenter() {
		return mapCenter;
	}

	public String getBaseMap() {
		return baseMap;
	}

	public String getBaseServerURL() {
		return baseServerURL;
	}

	public String getDescription() {
		return description;
	}

	public Boolean getBaseMapActive() {
		return baseMapActive;
	}

	public Boolean getIsPublic() {
		return isPublic;
	}

	public Integer getIdUser() {
		return idUser;
	}

	public List<SceneryTreeNode> getNodes() {
		return nodes;
	}

	public List<SceneryTreeNode> getNodes( int idNodeParent ) {
		List<SceneryTreeNode> result = new ArrayList<SceneryTreeNode>();
		for ( SceneryTreeNode node : nodes ) {
			if( node.getIdNodeParent() == idNodeParent ) result.add( node );
		}
		return result;
	}

	public Boolean getGraticule() {
		return graticule;
	}
	
	public String getBbox() {
		return bbox;
	}
	
	
}
