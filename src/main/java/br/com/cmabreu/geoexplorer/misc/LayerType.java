package br.com.cmabreu.geoexplorer.misc;

// SHP : Shape File
// WMS : WMS (URL)
// KML : KML File
// FTR : Feature / Fei��o / Custom
// TIF : GeoTIFF
// FDR : Pasta na �rvore
// FEI : Feicao

public enum LayerType {
	SHP, WMS, KML, FTR, TIF, FDR, DTA, FEI;

	public String getLayerType() {
		return this.name();
	}
	
}
