package br.mil.mar.casnav.mclm.misc;

// SHP : Shape File
// WMS : WMS (URL)
// KML : KML File
// FTR : Feature / Feição / Custom
// TIF : GeoTIFF
// FDR : Pasta na árvore
// FEI : Feicao
// CRN : Root Node para os Cenários / Feições

public enum LayerType {
	SHP, WMS, KML, FTR, TIF, FDR, DTA, FEI, CRN;

	public String getLayerType() {
		return this.name();
	}
	
}
