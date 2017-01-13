package br.mil.mar.casnav.mclm.misc;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.Server;

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
