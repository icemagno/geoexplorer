package br.com.cmabreu.geoexplorer.misc;

import br.com.cmabreu.geoexplorer.persistence.entity.FeatureStyle;

public class DataLayerStylized {
	private FeatureStyle featureStyle;
	private String data;
	
	public DataLayerStylized( FeatureStyle featureStyle, String data ) {
		this.featureStyle = featureStyle;
		this.data = data;
	}
	
	
	public String getData() {
		return data;
	}
	
	public FeatureStyle getFeatureStyle() {
		return featureStyle;
	}
	
}
