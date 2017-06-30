package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.DataLayerService;

@Action(value="newFeatureStyle", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class NewFeatureStyleAction extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);

			int idFeatureStyle = -1;
			String tempIdFS = request.getParameter("idFeatureStyle");
			try {
				if ( tempIdFS != null && !tempIdFS.equals("") ) idFeatureStyle = Integer.valueOf( tempIdFS );
			} catch ( Exception ignored ) { }
			
			String featureStyleName = request.getParameter("featureStyleName");
			String iconAnchor = request.getParameter("iconAnchor");
			String iconScale = request.getParameter("iconScale");
			String iconAnchorXUnits = request.getParameter("iconAnchorXUnits");
			String iconAnchorYUnits = request.getParameter("iconAnchorYUnits");
			String iconOpacity = request.getParameter("iconOpacity");
			String iconColor = request.getParameter("iconColor");
			String iconRotation = request.getParameter("iconRotation");
			String iconSrc = request.getParameter("iconSrc");
			
			String textOffsetY = request.getParameter("textOffsetY");
			String textOffsetX = request.getParameter("textOffsetX");
			String textFont = request.getParameter("textFont");
			String textFillColor = request.getParameter("textFillColor");
			String textStrokeColor = request.getParameter("textStrokeColor");
			String textStrokeWidth = request.getParameter("textStrokeWidth");
			
			String polygonFillColor = request.getParameter("polygonFillColor");		
			String polygonFillPattern = request.getParameter("polygonFillPattern");		
			String polygonStrokeColor = request.getParameter("polygonStrokeColor");		
			String polygonFillOpacity = request.getParameter("polygonFillOpacity");		
			String polygonStrokeWidth = request.getParameter("polygonStrokeWidth");		
			String polygonLineDash = request.getParameter("polygonLineDash");		
			String polygonStrokeLinecap = request.getParameter("polygonStrokeLinecap");		

			String lineFillColor = request.getParameter("lineFillColor");		
			String lineStrokeColor = request.getParameter("lineStrokeColor");		
			String lineStrokeWidth = request.getParameter("lineStrokeWidth");		
			String lineLineDash = request.getParameter("lineLineDash");
			
			String ptrHDist = request.getParameter("ptrHDist");
			String ptrVDist = request.getParameter("ptrVDist");
			String ptrLength = request.getParameter("ptrLength");
			String ptrHeight = request.getParameter("ptrHeight");
			String ptrWidth = request.getParameter("ptrWidth");
			
			
			DataLayerService dss = new DataLayerService();
			String result = dss.insertUpdateFeatureStyle(idFeatureStyle, featureStyleName, iconAnchor, iconScale, iconAnchorXUnits,
					iconAnchorYUnits, iconOpacity, iconColor, iconRotation, iconSrc,
					textOffsetY, textOffsetX, textFont, textFillColor, textStrokeColor,
					textStrokeWidth, polygonFillColor, polygonFillPattern, polygonStrokeColor, polygonStrokeWidth, polygonLineDash, 
					polygonStrokeLinecap, polygonFillOpacity, lineFillColor, lineStrokeColor,  lineStrokeWidth, 
					lineLineDash, ptrHDist, ptrVDist, ptrLength, ptrHeight, ptrWidth);
				
				
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

}
