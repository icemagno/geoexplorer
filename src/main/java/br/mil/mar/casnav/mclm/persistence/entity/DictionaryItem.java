package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import br.mil.mar.casnav.mclm.misc.dictionary.GeoserverLayerAttribute;

@Entity
@Table(name="dictionary") 
public class DictionaryItem {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_dictionary_item")
	private int idDictionaryItem;	
	
	@ManyToOne()
	@JoinColumn(name="id_node_data", foreignKey = @ForeignKey(name = "fk_dictionary_node"))
	private NodeData node;	
	
	@Column(length=250)
	private String originalName;	
	
	@Column(length=250)
	private String translatedName = "";
	
	@Column(length=250)
	private String description = "";	
	
	@Column(name="index_order")
	private Integer indexOrder;		
	
	@Column(length=80)
	private String dataType;	

    @Column(name="visible")
	private Boolean visible;		

    @Column(name="primary_key")
	private Boolean primaryKey;    
    
	public DictionaryItem( GeoserverLayerAttribute attribute, NodeData node ) {
		this.node = node;
		this.originalName = attribute.getName();
		this.dataType = attribute.getLocalType();
		this.visible = true;
		this.primaryKey = false;
	}
	
	public DictionaryItem( ) {
		this.visible = true;
		this.primaryKey = false;
		this.indexOrder = 99;
	}

	public DictionaryItem(String columnName, String dataType, NodeData node) {
		this.node = node;
		this.originalName = columnName;
		this.dataType = dataType;
		this.visible = true;
		this.primaryKey = false;
		this.indexOrder = 99;
	}

	public int getIdDictionaryItem() {
		return idDictionaryItem;
	}

	public void setIdDictionaryItem(int idDictionaryItem) {
		this.idDictionaryItem = idDictionaryItem;
	}

	public NodeData getNode() {
		return node;
	}

	public void setNode(NodeData node) {
		this.node = node;
	}

	public String getOriginalName() {
		return originalName;
	}

	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}

	public String getTranslatedName() {
		return translatedName;
	}

	public void setTranslatedName(String translatedName) {
		this.translatedName = translatedName;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}

	public Boolean getVisible() {
		return visible;
	}

	public void setVisible(Boolean visible) {
		this.visible = visible;
	}
	
	public void setPrimaryKey(Boolean primaryKey) {
		this.primaryKey = primaryKey;
	}
	
	public Boolean getPrimaryKey() {
		return primaryKey;
	}
	
	@Transient
	public Boolean isVisible() {
		return visible;
	}

	@Transient
	public Boolean isPrimaryKey() {
		return primaryKey;
	}

	public Integer getIndexOrder() {
		if ( indexOrder == null ) indexOrder = 0;  
		return indexOrder;
	}

	public void setIndexOrder(Integer indexOrder) {
		this.indexOrder = indexOrder;
	}	
	
	
	
}
