package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.LayerService;

@Action(value="getAsFeatures", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }	
)   

@ParentPackage("default")
public class GetAsFeaturesAction {
	private Integer idDataLayer;
	private String bbox;
	
	public String execute(){

		try { 
			String result = "";
			
			if ( idDataLayer != null ) {
				
				LayerService ls = new LayerService();
				result = ls.getAsFeatures(  idDataLayer );
				
			}
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setBbox(String bbox) {
		this.bbox = bbox;
	}
	
	public void setIdDataLayer(Integer idDataLayer) {
		this.idDataLayer = idDataLayer;
	}

	
}
