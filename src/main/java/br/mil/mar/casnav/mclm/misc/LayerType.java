package br.mil.mar.casnav.mclm.misc;

// SHP : Shape File
// WMS : WMS (URL)
// KML : KML File
// FTR : Feature / Feição / Custom
// TIF : GeoTIFF
// FDR : Pasta na Árvore
// FEI : Feicao

public enum LayerType {
	SHP, WMS, KML, FTR, TIF, FDR, DTA, FEI;

	public String getLayerType() {
		return this.name();
	}
	
}
