package br.mil.mar.casnav.mclm.misc.dictionary;

import java.util.ArrayList;
import java.util.List;

public class GeoserverLayersSchema {
	private String elementFormDefault;
	private String targetNamespace;
	private String targetPrefix;
	private List<GeoserverLayer> featureTypes;
	
	public GeoserverLayersSchema() {
		featureTypes = new ArrayList<GeoserverLayer>(); 
	}
	
	public String getElementFormDefault() {
		return elementFormDefault;
	}
	
	public void setElementFormDefault(String elementFormDefault) {
		this.elementFormDefault = elementFormDefault;
	}
	
	public String getTargetNamespace() {
		return targetNamespace;
	}
	
	public void setTargetNamespace(String targetNamespace) {
		this.targetNamespace = targetNamespace;
	}
	
	public String getTargetPrefix() {
		return targetPrefix;
	}
	
	public void setTargetPrefix(String targetPrefix) {
		this.targetPrefix = targetPrefix;
	}
	
	public List<GeoserverLayer> getFeatureTypes() {
		return featureTypes;
	}
	
	public void setFeatureTypes(List<GeoserverLayer> featureTypes) {
		this.featureTypes = featureTypes;
	}
	
	
}
