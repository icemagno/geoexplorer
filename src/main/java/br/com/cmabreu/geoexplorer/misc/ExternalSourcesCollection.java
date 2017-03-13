package br.com.cmabreu.geoexplorer.misc;

import java.util.List;

import br.com.cmabreu.geoexplorer.persistence.entity.Server;

public class ExternalSourcesCollection {
	private List<Server> servers;
	private int totalCount;

	public ExternalSourcesCollection( List<Server> servers ) {
		this.servers = servers;
		totalCount = servers.size();
	}
	
	public int getTotalCount() {
		return totalCount;
	}

	public List<Server> getServers() {
		return servers;
	}
}
