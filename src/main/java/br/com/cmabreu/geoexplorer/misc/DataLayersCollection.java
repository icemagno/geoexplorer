package br.com.cmabreu.geoexplorer.misc;

import java.util.List;

import br.com.cmabreu.geoexplorer.persistence.entity.DataLayer;

public class DataLayersCollection {
	private List<DataLayer> dataLayers;
	private int totalCount;

	public DataLayersCollection( List<DataLayer> dataLayers ) {
		this.dataLayers = dataLayers;
		totalCount = dataLayers.size();
	}
	
	public int getTotalCount() {
		return totalCount;
	}

	public List<DataLayer> getServers() {
		return dataLayers;
	}
}
