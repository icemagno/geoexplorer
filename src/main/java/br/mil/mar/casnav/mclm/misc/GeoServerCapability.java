package br.mil.mar.casnav.mclm.misc;

public class GeoServerCapability {
	private String layerName;
	private String layerTitle;
	private String serverUrl;
	private boolean queryable;
	
	public boolean isQueryable() {
		return queryable;
	}

	public void setQueryable(boolean queryable) {
		this.queryable = queryable;
	}

	public String getServerUrl() {
		return serverUrl;
	}

	public void setServerUrl(String serverUrl) {
		this.serverUrl = serverUrl;
	}

	public String getLayerName() {
		return layerName;
	}
	
	public void setLayerName(String layerName) {
		this.layerName = layerName;
	}
	
	public String getLayerTitle() {
		return layerTitle;
	}
	
	public void setLayerTitle(String layerTitle) {
		this.layerTitle = layerTitle;
	}

}
