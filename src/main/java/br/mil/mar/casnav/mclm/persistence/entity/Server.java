package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="servers") 
public class Server {

	public Server(String name, String url, String version, String type) {
		this.url = url;
		this.name = name;
		this.version = version;
		this.type = type;
	}
	
	public Server() {
		// Necessário para uso do Hibernate
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_server")
	private int idServer;
	
	@Column(length=3)
	private String type;

	@Column(length=250)
	private String url;

	@Column(length=250)
	private String name;

	@Column(length=10)
	private String version;	
	
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

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}	
	
	public void setVersion(String version) {
		this.version = version;
	}
	
	public String getVersion() {
		return version;
	}
	
}
