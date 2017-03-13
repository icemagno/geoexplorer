package br.com.cmabreu.geoexplorer.misc;

import java.util.List;

public class GeoServerCapabilityCollection {
	private List<GeoServerCapability> capabilities;
	private int totalCount;
	
	public GeoServerCapabilityCollection(List<GeoServerCapability> capabilities) {
		this.capabilities = capabilities;
		totalCount = this.capabilities.size();
	}
	
	public int getTotalCount() {
		return totalCount;
	}
	
	public List<GeoServerCapability> getCapabilities() {
		return capabilities;
	}
	
}
