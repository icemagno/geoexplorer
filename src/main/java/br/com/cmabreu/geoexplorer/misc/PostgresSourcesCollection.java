package br.com.cmabreu.geoexplorer.misc;

import java.util.List;

import br.com.cmabreu.geoexplorer.persistence.entity.Postgres;
import br.com.cmabreu.geoexplorer.persistence.entity.PostgresTable;

public class PostgresSourcesCollection {
	private List<Postgres> servers;
	private int totalCount;

	public PostgresSourcesCollection( List<Postgres> servers ) {
		
		for ( Postgres server : servers ) {
			for ( PostgresTable table : server.getTables() ) {
				table.setServer( null );
			}
		}
		
		this.servers = servers;
		totalCount = servers.size();
	}
	
	public int getTotalCount() {
		return totalCount;
	}

	public List<Postgres> getServers() {
		return servers;
	}
}
