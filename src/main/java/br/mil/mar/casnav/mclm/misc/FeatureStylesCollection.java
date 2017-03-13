package br.mil.mar.casnav.mclm.misc;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.FeatureStyle;

public class FeatureStylesCollection {
	private List<FeatureStyle> featureStyles;
	private int totalCount;

	public FeatureStylesCollection( List<FeatureStyle> featureStyles ) {
		this.featureStyles = featureStyles;
		totalCount = featureStyles.size();
	}
	
	public int getTotalCount() {
		return totalCount;
	}

	public List<FeatureStyle> getFeatureStyles() {
		return featureStyles;
	}
}
