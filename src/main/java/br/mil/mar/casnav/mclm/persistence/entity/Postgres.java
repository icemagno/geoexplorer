package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

@Entity
@Table(name="servers_postgres") 
public class Postgres {

	public Postgres(String name, String serverAddress, String serverUser, String serverPassword, String serverDatabase, int serverPort, String type) {
		this.serverAddress = serverAddress;
		this.name = name;
		this.serverUser = serverUser;
		this.serverPassword = serverPassword;
		this.serverDatabase = serverDatabase;
		this.serverPort = serverPort;
		this.type = type;
		this.tables = new ArrayList<PostgresTable>();
	}
	
	public Postgres() {
		// Necessário para uso do Hibernate
		this.tables = new ArrayList<PostgresTable>();
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_server")
	private int idServer;
	
    @OneToMany(orphanRemoval=true,  mappedBy="server", fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<PostgresTable> tables;	
	
	@Column(length=250)
	private String serverAddress;

	@Column(length=250)
	private String name;

	@Column(length=3)
	private String type;

	@Column(length=50)
	private String serverUser;
	
	@Column(length=50)
	private String serverDatabase;
	
	@Column(length=50)
	private String serverPassword;	
	
	@Column
	private Integer serverPort;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIdServer() {
		return idServer;
	}

	public void setIdServer(int idServer) {
		this.idServer = idServer;
	}

	public String getServerAddress() {
		return serverAddress;
	}

	public void setServerAddress(String serverAddress) {
		this.serverAddress = serverAddress;
	}

	public String getServerUser() {
		return serverUser;
	}

	public void setServerUser(String serverUser) {
		this.serverUser = serverUser;
	}

	public String getServerDatabase() {
		return serverDatabase;
	}

	public void setServerDatabase(String serverDatabase) {
		this.serverDatabase = serverDatabase;
	}

	public String getServerPassword() {
		return serverPassword;
	}

	public void setServerPassword(String serverPassword) {
		this.serverPassword = serverPassword;
	}

	public Integer getServerPort() {
		return serverPort;
	}

	public void setServerPort(Integer serverPort) {
		this.serverPort = serverPort;
	}

	public List<PostgresTable> getTables() {
		return tables;
	}
	
	public void setTables(List<PostgresTable> tables) {
		this.tables = tables;
	}
	
}
