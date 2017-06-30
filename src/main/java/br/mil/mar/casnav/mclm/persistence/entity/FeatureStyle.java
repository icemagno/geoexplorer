package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="feature_styles") 
public class FeatureStyle {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_feature_style")
	private int idFeatureStyle;		
	
	public FeatureStyle() {
		//
	}
	
	public FeatureStyle(int idFeatureStyle, String featureStyleName, String iconAnchor, String iconScale, String iconAnchorXUnits,
			String iconAnchorYUnits, String iconOpacity, String iconColor, String iconRotation, String iconSrc,
			String textOffsetY, String textOffsetX, String textFont, String textFillColor, String textStrokeColor,
			String textStrokeWidth, String polygonFillColor, String polygonFillPattern, String polygonStrokeColor, String polygonStrokeWidth,
			String polygonLineDash, String polygonStrokeLinecap, String polygonFillOpacity, String lineFillColor, String lineStrokeColor, 
			String lineStrokeWidth, String lineLineDash, String ptrHDist, String ptrVDist, String ptrLength, String ptrHeight, String ptrWidth ) {
		super();

		this.idFeatureStyle = idFeatureStyle;
		this.featureStyleName = featureStyleName;
		this.iconAnchor = iconAnchor;
		this.iconScale = iconScale;
		this.iconAnchorXUnits = iconAnchorXUnits;
		this.iconAnchorYUnits = iconAnchorYUnits;
		this.iconOpacity = iconOpacity;
		this.iconColor = iconColor;
		this.iconRotation = iconRotation;
		this.iconSrc = iconSrc;
		
		this.textOffsetY = textOffsetY;
		this.textOffsetX = textOffsetX;
		this.textFont = textFont;
		this.textFillColor = textFillColor;
		this.textStrokeColor = textStrokeColor;
		this.textStrokeWidth = textStrokeWidth;
		
		this.polygonFillPattern = polygonFillPattern;
		this.polygonFillColor = polygonFillColor;
		this.polygonFillOpacity = polygonFillOpacity;
		this.polygonStrokeColor = polygonStrokeColor;
		this.polygonStrokeWidth = polygonStrokeWidth;
		this.polygonLineDash = polygonLineDash;
		this.polygonStrokeLinecap = polygonStrokeLinecap;
		
		this.ptrHDist = ptrHDist;
		this.ptrVDist = ptrVDist;
		this.ptrLength = ptrLength;
		this.ptrHeight = ptrHeight;
		this.ptrWidth = ptrWidth;
		
		this.lineFillColor = lineFillColor;
		this.lineStrokeColor = lineStrokeColor;
		this.lineStrokeWidth = lineStrokeWidth;
		this.lineLineDash = lineLineDash;
	}

	@Column(length=250) private String featureStyleName;
	@Column(length=25) private String iconAnchor;
	@Column(length=25) private String iconScale;
	@Column(length=25) private String iconAnchorXUnits;
	@Column(length=25) private String iconAnchorYUnits;
	@Column(length=25) private String iconOpacity;
	@Column(length=25) private String iconColor;
	@Column(length=25) private String iconRotation;
	@Column(length=25) private String iconSrc;

	@Column(length=25) private String textOffsetY;
	@Column(length=25) private String textOffsetX;
	@Column(length=25) private String textFont;
	@Column(length=25) private String textFillColor;
	@Column(length=25) private String textStrokeColor;
	@Column(length=25) private String textStrokeWidth;
	
	@Column(length=25) private String lineFillColor;
	@Column(length=25) private String lineStrokeColor;
	@Column(length=25) private String lineStrokeWidth;
	@Column(length=25) private String lineLineDash;

	@Column(length=25) private String polygonFillPattern;
	@Column(length=25) private String polygonFillColor;
	@Column(length=25) private String polygonFillOpacity;
	@Column(length=25) private String polygonStrokeColor;
	@Column(length=25) private String polygonStrokeWidth;
	@Column(length=25) private String polygonLineDash;
	@Column(length=25) private String polygonStrokeLinecap;
	
	@Column(length=25) private String ptrHDist;
	@Column(length=25) private String ptrVDist;
	@Column(length=25) private String ptrLength;
	@Column(length=25) private String ptrHeight;
	@Column(length=25) private String ptrWidth;	
	
	public int getIdFeatureStyle() {
		return idFeatureStyle;
	}
	
	public void setIdFeatureStyle(int idFeatureStyle) {
		this.idFeatureStyle = idFeatureStyle;
	}
	
	public String getIconAnchor() {
		return iconAnchor;
	}
	
	public void setIconAnchor(String iconAnchor) {
		this.iconAnchor = iconAnchor;
	}
	
	public String getIconScale() {
		return iconScale;
	}
	
	public void setIconScale(String iconScale) {
		this.iconScale = iconScale;
	}
	
	public String getIconAnchorXUnits() {
		return iconAnchorXUnits;
	}
	
	public void setIconAnchorXUnits(String iconAnchorXUnits) {
		this.iconAnchorXUnits = iconAnchorXUnits;
	}
	
	public String getIconAnchorYUnits() {
		return iconAnchorYUnits;
	}
	
	public void setIconAnchorYUnits(String iconAnchorYUnits) {
		this.iconAnchorYUnits = iconAnchorYUnits;
	}
	
	public String getIconOpacity() {
		return iconOpacity;
	}
	
	public String getIconColor() {
		return iconColor;
	}
	
	public void setIconColor(String iconColor) {
		this.iconColor = iconColor;
	}
	
	public String getIconRotation() {
		return iconRotation;
	}
	
	public void setIconRotation(String iconRotation) {
		this.iconRotation = iconRotation;
	}
	
	public String getIconSrc() {
		return iconSrc;
	}
	
	public void setIconSrc(String iconSrc) {
		this.iconSrc = iconSrc;
	}
	
	public String getTextOffsetY() {
		return textOffsetY;
	}
	
	public void setTextOffsetY(String textOffsetY) {
		this.textOffsetY = textOffsetY;
	}
	
	public String getTextOffsetX() {
		return textOffsetX;
	}
	
	public void setTextOffsetX(String textOffsetX) {
		this.textOffsetX = textOffsetX;
	}
	
	public String getTextFont() {
		return textFont;
	}
	
	public void setTextFont(String textFont) {
		this.textFont = textFont;
	}
	
	public String getTextFillColor() {
		return textFillColor;
	}

	public void setTextFillColor(String textFillColor) {
		this.textFillColor = textFillColor;
	}
	
	public String getTextStrokeColor() {
		return textStrokeColor;
	}
	
	public void setTextStrokeColor(String textStrokeColor) {
		this.textStrokeColor = textStrokeColor;
	}
	
	public String getTextStrokeWidth() {
		return textStrokeWidth;
	}
	
	public void setTextStrokeWidth(String textStrokeWidth) {
		this.textStrokeWidth = textStrokeWidth;
	}

	public String getFeatureStyleName() {
		return featureStyleName;
	}

	public void setFeatureStyleName(String featureStyleName) {
		this.featureStyleName = featureStyleName;
	}

	public String getPolygonFillColor() {
		return polygonFillColor;
	}

	public void setPolygonFillColor(String polygonFillColor) {
		this.polygonFillColor = polygonFillColor;
	}

	public String getPolygonStrokeColor() {
		return polygonStrokeColor;
	}

	public void setPolygonStrokeColor(String polygonStrokeColor) {
		this.polygonStrokeColor = polygonStrokeColor;
	}

	public String getPolygonStrokeWidth() {
		return polygonStrokeWidth;
	}

	public void setPolygonStrokeWidth(String polygonStrokeWidth) {
		this.polygonStrokeWidth = polygonStrokeWidth;
	}

	public String getPolygonLineDash() {
		return polygonLineDash;
	}

	public void setPolygonLineDash(String polygonLineDash) {
		this.polygonLineDash = polygonLineDash;
	}

	public String getPolygonStrokeLinecap() {
		return polygonStrokeLinecap;
	}

	public void setPolygonStrokeLinecap(String polygonStrokeLinecap) {
		this.polygonStrokeLinecap = polygonStrokeLinecap;
	}

	public String getLineFillColor() {
		return lineFillColor;
	}

	public void setLineFillColor(String lineFillColor) {
		this.lineFillColor = lineFillColor;
	}

	public String getLineStrokeColor() {
		return lineStrokeColor;
	}

	public void setLineStrokeColor(String lineStrokeColor) {
		this.lineStrokeColor = lineStrokeColor;
	}

	public String getLineStrokeWidth() {
		return lineStrokeWidth;
	}

	public void setLineStrokeWidth(String lineStrokeWidth) {
		this.lineStrokeWidth = lineStrokeWidth;
	}

	public String getLineLineDash() {
		return lineLineDash;
	}

	public void setLineLineDash(String lineLineDash) {
		this.lineLineDash = lineLineDash;
	}

	public String getPolygonFillPattern() {
		return polygonFillPattern;
	}

	public void setPolygonFillPattern(String polygonFillPattern) {
		this.polygonFillPattern = polygonFillPattern;
	}

	public void setIconOpacity(String iconOpacity) {
		this.iconOpacity = iconOpacity;
	}

	public String getPolygonFillOpacity() {
		return polygonFillOpacity;
	}

	public void setPolygonFillOpacity(String polygonFillOpacity) {
		this.polygonFillOpacity = polygonFillOpacity;
	}

	public String getPtrHDist() {
		return ptrHDist;
	}

	public void setPtrHDist(String ptrHDist) {
		this.ptrHDist = ptrHDist;
	}

	public String getPtrVDist() {
		return ptrVDist;
	}

	public void setPtrVDist(String ptrVDist) {
		this.ptrVDist = ptrVDist;
	}

	
	public String getPtrLength() {
		return ptrLength;
	}

	public void setPtrLength(String ptrLength) {
		this.ptrLength = ptrLength;
	}

	public String getPtrHeight() {
		return ptrHeight;
	}

	public void setPtrHeight(String ptrHeight) {
		this.ptrHeight = ptrHeight;
	}

	public String getPtrWidth() {
		return ptrWidth;
	}

	public void setPtrWidth(String ptrWidth) {
		this.ptrWidth = ptrWidth;
	}
	
	
	
}
