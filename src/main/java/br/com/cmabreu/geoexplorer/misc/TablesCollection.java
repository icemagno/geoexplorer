package br.com.cmabreu.geoexplorer.misc;

import java.util.List;

import br.com.cmabreu.geoexplorer.persistence.entity.PostgresTable;

public class TablesCollection {
	private List<PostgresTable> tables;
	private int totalCount;

	public TablesCollection( List<PostgresTable> tables ) {
		
		for ( PostgresTable table : tables ) {
			table.getServer().setTables( null );
		}
		
		this.tables = tables;
		totalCount = tables.size();
	}
	
	public int getTotalCount() {
		return totalCount;
	}

	public List<PostgresTable> getTables() {
		return tables;
	}

}
