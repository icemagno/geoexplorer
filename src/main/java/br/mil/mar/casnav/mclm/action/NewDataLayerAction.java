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

@Action(value="newDtaLayer", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class NewDataLayerAction extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
			String dataLayerName = request.getParameter("dataLayerName");
			String hint = request.getParameter("hint");
			String displayColumn = request.getParameter("displayColumn");
			
			String institute = request.getParameter("institute");
			String whereClause = request.getParameter("whereClause");
			String propertiesColumns = request.getParameter("propertiesColumns");
			
			Integer layerFolderID = Integer.valueOf( request.getParameter("layerFolderID") );
			Integer idTable = Integer.valueOf( request.getParameter("idTable") );
			Integer idFeatureStyle = Integer.valueOf( request.getParameter("idFeatureStyle") );
			
			
			DataLayerService dss = new DataLayerService();
			String result = dss.insertDataLayer(dataLayerName, hint, idTable, institute, layerFolderID,  
					whereClause, propertiesColumns, displayColumn, idFeatureStyle);
				
				
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

}
