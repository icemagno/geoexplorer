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

import br.mil.mar.casnav.mclm.misc.DataFieldType;

@Entity
@Table(name="data_field") 
public class DataField {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_data_field")
	private int idDataField;
	
	@ManyToOne()
	@JoinColumn(name="id_data_panel", foreignKey = @ForeignKey(name = "fk_datafield_datapanel"))
	private DataPanel dataPanel;	
	
	@Column(length=15)
	@Enumerated(EnumType.STRING)
	DataFieldType fieldType;
	
	@Column(length=250, name="name")
	private String fieldName;	

	@Column(length=250)
	private String caption;		
	
	@Column(length=250 )
	private String description;	
	
	@Column(name="field_order")
	private Integer order;
	
    public DataField() {
    	
    }

	public int getIdDataField() {
		return idDataField;
	}

	public void setIdDataField(int idDataField) {
		this.idDataField = idDataField;
	}

	public DataPanel getDataPanel() {
		return dataPanel;
	}

	public void setDataPanel(DataPanel dataPanel) {
		this.dataPanel = dataPanel;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public DataFieldType getFieldType() {
		return fieldType;
	}

	public void setFieldType(DataFieldType fieldType) {
		this.fieldType = fieldType;
	}

	
    
}
