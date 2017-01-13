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

@Entity
@Table(name="data_layers") 
public class DataLayer {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_data_layer")
	private int idDataLayer;
	
	@Column(length=250, name="name")
	private String dataLayerName;	
	
	@Column(length=250)
	private String hint;
	
	@Column(length=250)
	private String whereClause;
	
	@Column(length=250)
	private String propertiesColumns;	
    
	@ManyToOne()
	@JoinColumn(name="id_table", foreignKey = @ForeignKey(name = "fk_datalayer_tables"))
	private PostgresTable table;	
	
    public DataLayer() {
    	
    }
    
    public DataLayer( String dataLayerName, String hint, String whereClause, String propertiesColumns, PostgresTable table ) {
    	this.dataLayerName = dataLayerName;
    	this.hint = hint;
    	this.propertiesColumns = propertiesColumns;
    	this.whereClause = whereClause;
    	this.table = table;

    }

	public String getHint() {
		return hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}

	public String getWhereClause() {
		return whereClause;
	}

	public void setWhereClause(String whereClause) {
		this.whereClause = whereClause;
	}

	public String getPropertiesColumns() {
		return propertiesColumns;
	}

	public void setPropertiesColumns(String propertiesColumns) {
		this.propertiesColumns = propertiesColumns;
	}
    
	public PostgresTable getTable() {
		return table;
	}
	
	public void setTable(PostgresTable table) {
		this.table = table;
	}
	
	public int getIdDataLayer() {
		return idDataLayer;
	}
	
	public void setIdDataLayer(int idDataLayer) {
		this.idDataLayer = idDataLayer;
	}

	public String getDataLayerName() {
		return dataLayerName;
	}

	public void setDataLayerName(String dataLayerName) {
		this.dataLayerName = dataLayerName;
	}
	
	
    
}
