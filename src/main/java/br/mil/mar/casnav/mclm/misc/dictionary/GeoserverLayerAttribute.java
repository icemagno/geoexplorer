package br.mil.mar.casnav.mclm.misc.dictionary;

public class GeoserverLayerAttribute {
	private String name;
	private int maxOccurs;
	private int minOccurs;
	private boolean nillable;
	private String type;
	private String localType;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public int getMaxOccurs() {
		return maxOccurs;
	}
	
	public void setMaxOccurs(int maxOccurs) {
		this.maxOccurs = maxOccurs;
	}
	
	public int getMinOccurs() {
		return minOccurs;
	}
	
	public void setMinOccurs(int minOccurs) {
		this.minOccurs = minOccurs;
	}
	
	public boolean isNillable() {
		return nillable;
	}
	
	public void setNillable(boolean nillable) {
		this.nillable = nillable;
	}
	
	public String getLocalType() {
		return localType;
	}
	
	public void setLocalType(String localType) {
		this.localType = localType;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
}
