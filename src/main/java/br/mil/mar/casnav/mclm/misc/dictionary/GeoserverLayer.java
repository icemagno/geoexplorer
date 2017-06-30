package br.mil.mar.casnav.mclm.misc.dictionary;

import java.util.ArrayList;
import java.util.List;

public class GeoserverLayer {
	private String typeName;
	private List<GeoserverLayerAttribute> properties;
	
	public GeoserverLayer() {
		properties = new ArrayList<GeoserverLayerAttribute>();
	}
	
	public String getTypeName() {
		return typeName;
	}
	
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	public List<GeoserverLayerAttribute> getProperties() {
		return properties;
	}
	
	public void setProperties(List<GeoserverLayerAttribute> properties) {
		this.properties = properties;
	}
	
	
	
}
