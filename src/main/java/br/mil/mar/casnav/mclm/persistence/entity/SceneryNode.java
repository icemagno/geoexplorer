package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import br.mil.mar.casnav.mclm.misc.LayerType;


@Entity
@Table(name="scenery_node") 
public class SceneryNode {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_scenery_node")
	private int idSceneryNode;

	@Column(name="id_node_parent")
	private int idNodeParent;

	@Column(name="id_node")
	private int id;

	@Column(name="index_order")
	private int indexOrder;	
	
	@Column(length=150)
	private String layerAlias;
	
	@Transient
	private int children;
	
	@Column(length=5)
	@Enumerated(EnumType.STRING)
	private LayerType layerType;	

	@Column
	private boolean selected;	
	
	@Column
	private int layerStackIndex = 0;

	@Column
	private int transparency = 1;	
	
	@ManyToOne()
	@JoinColumn(name="id_scenery", foreignKey = @ForeignKey(name = "fk_scenery_layer_scenery"))
	private Scenery scenery;		

	@ManyToOne()
	@JoinColumn(name="id_layer", foreignKey = @ForeignKey(name = "fk_scenery_layer_node"))
	private NodeData layer;	
	
	public int getTransparency() {
		return transparency;
	}

	public void setTransparency(int transparency) {
		this.transparency = transparency;
	}	
	
	public int getIdSceneryNode() {
		return idSceneryNode;
	}

	public void setIdSceneryNode(int idSceneryNode) {
		this.idSceneryNode = idSceneryNode;
	}

	public int getLayerStackIndex() {
		return layerStackIndex;
	}

	public void setLayerStackIndex(int layerStackIndex) {
		this.layerStackIndex = layerStackIndex;
	}

	public int getIdNodeParent() {
		return idNodeParent;
	}

	public void setIdNodeParent(int idNodeParent) {
		this.idNodeParent = idNodeParent;
	}

	public int getChildren() {
		return children;
	}

	public void setChildren(int children) {
		this.children = children;
	}

	public int getIndexOrder() {
		return indexOrder;
	}

	public void setIndexOrder(int indexOrder) {
		this.indexOrder = indexOrder;
	}


	public Scenery getScenery() {
		return scenery;
	}

	public void setScenery(Scenery scenery) {
		this.scenery = scenery;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public NodeData getLayer() {
		return layer;
	}

	public void setLayer( NodeData layer ) {
		if ( layer != null ) {
			this.layerAlias = layer.getLayerAlias();
			this.layerType = layer.getLayerType();
		}
		this.layer = layer;
	}

	public String getLayerAlias() {
		return layerAlias;
	}

	public void setLayerAlias(String layerAlias) {
		this.layerAlias = layerAlias;
	}

	public LayerType getLayerType() {
		return layerType;
	}

	public void setLayerType(LayerType layerType) {
		this.layerType = layerType;
	}

	
}
