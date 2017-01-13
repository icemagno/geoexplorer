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
@Table(name="postgres_tables") 
public class PostgresTable {

	public PostgresTable( String name ) {
		this.name = name;
	}
	
	public PostgresTable() {
		// Necessário para uso do Hibernate
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_table")
	private int idTable;
	
	@Column(length=250)
	private String name;

	@Column(length=250)
	private String geometryColumnName;
	
	@ManyToOne()
	@JoinColumn(name="id_server", foreignKey = @ForeignKey(name = "fk_postgres_tables"))
	private Postgres server;
	
	public void setServer(Postgres server) {
		this.server = server;
	}
	
	public Postgres getServer() {
		return server;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIdTable() {
		return idTable;
	}
	
	public void setIdTable(int idTable) {
		this.idTable = idTable;
	}

	public String getGeometryColumnName() {
		return geometryColumnName;
	}

	public void setGeometryColumnName(String geometryColumnName) {
		this.geometryColumnName = geometryColumnName;
	}
	
	
	
}
