package br.mil.mar.casnav.mclm.misc;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.PostgresTable;

public class TablesCollection {
	private List<PostgresTable> tables;
	private int totalCount;

	public TablesCollection( List<PostgresTable> tables ) {
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
