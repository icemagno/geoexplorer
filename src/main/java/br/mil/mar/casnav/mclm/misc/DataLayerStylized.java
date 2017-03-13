package br.mil.mar.casnav.mclm.misc;

import br.mil.mar.casnav.mclm.persistence.entity.FeatureStyle;

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
