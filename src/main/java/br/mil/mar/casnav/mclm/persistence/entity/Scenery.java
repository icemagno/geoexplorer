package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Type;

@Entity
@Table(name="sceneries", indexes = {
	       @Index(columnList = "id_scenery", name = "scenery_hndx")
}) 
public class Scenery {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_scenery")
	private int idScenery;
	
	@Column(name="creation_date")
	@Type(type="timestamp")
	private Date creationDate;
	
	@Column(name="scenery_name", length=100)
	private String sceneryName;	
	
	@Column(name="zoom_level")
	private int zoomLevel = 4;	

	@Column(name="map_center", length=100)
	private String mapCenter = "-48.12,-15.8";
	
	@Column(name="map_bbox", length=200)
	private String mapBbox;	

	@Column(name="base_map", length=100)
	private String baseMap;	
	
	@Column(name="base_server_url", length=100)
	private String baseServerURL;	
	
	@Column(columnDefinition = "TEXT")
	private String description;		
	
    @Column
	private Boolean baseMapActive;	

    @Column(name="is_public")
	private Boolean isPublic;	    
    
	@Column(name="id_user")
	private Integer idUser;	
	
    @OneToMany(orphanRemoval=true,  mappedBy="scenery", fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<SceneryNode> nodes;

    @Column
	private Boolean graticule;

    public Scenery() {
    	this.creationDate = Calendar.getInstance().getTime();
		this.nodes = new HashSet<SceneryNode>();
		this.graticule = false;
		this.baseMapActive = true;
		this.isPublic = false;
	}
    
    public boolean isNodeInThisScenery( int idSceneryNode ) {
    	for ( SceneryNode node : nodes ) {
    		if ( node.getIdSceneryNode() == idSceneryNode ) return true;
    	}
    	return false;
    }
    
    
    public void addNode( SceneryNode node ) {
    	nodes.add( node );
    }
    
    /*
    public void removeNode( int idNode ) {
    	for ( SceneryLayer layer : layers ) {
    		Node node = layer.getNode(); 
    		if ( node.getIdNode() == idNode ) {
    			layers.remove( layer );
    			break;
    		}
    	}
    }
    */

	public Date getCreationDate() {
		return creationDate;
	}

	public int getIdScenery() {
		return idScenery;
	}

	public void setIdScenery(int idScenery) {
		this.idScenery = idScenery;
	}

	public Set<SceneryNode> getNodes() {
		return nodes;
	}

	public void setNodes(Set<SceneryNode> nodes) {
		this.nodes = nodes;
	}

	@Override
	public boolean equals(Object obj) {
	    if (this == obj) return true;
	    if (null == obj) return false;
	    if ( getClass() != obj.getClass() ) return false;
	    Scenery scenery = (Scenery) obj;
		return getIdScenery() == scenery.getIdScenery();
	}

	public String getSceneryName() {
		return sceneryName;
	}

	public void setSceneryName(String sceneryName) {
		this.sceneryName = sceneryName;
	}

	public int getZoomLevel() {
		return zoomLevel;
	}

	public void setZoomLevel(int zoomLevel) {
		this.zoomLevel = zoomLevel;
	}

	public String getMapCenter() {
		return mapCenter;
	}

	public void setMapCenter(String mapCenter) {
		this.mapCenter = mapCenter;
	}

	public String getBaseMap() {
		return baseMap;
	}

	public void setBaseMap(String baseMap) {
		this.baseMap = baseMap;
	}

	public String getBaseServerURL() {
		return baseServerURL;
	}

	public void setBaseServerURL(String baseServerURL) {
		this.baseServerURL = baseServerURL;
	}

	public Boolean getBaseMapActive() {
		return baseMapActive;
	}

	public void setBaseMapActive(Boolean baseMapActive) {
		this.baseMapActive = baseMapActive;
	}

	public Boolean getGraticule() {
		return graticule;
	}

	public void setGraticule(Boolean graticule) {
		this.graticule = graticule;
	}

	public Boolean getIsPublic() {
		return isPublic;
	}

	public void setIsPublic(Boolean isPublic) {
		this.isPublic = isPublic;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}
	
	public Integer getIdUser() {
		return idUser;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMapBbox() {
		return mapBbox;
	}
	
	public void setMapBbox(String mapBbox) {
		this.mapBbox = mapBbox;
	}
	
}
