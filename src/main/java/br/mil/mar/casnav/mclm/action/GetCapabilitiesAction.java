package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.GetCapabilitiesService;

@Action(value="getCapabilities", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class GetCapabilitiesAction {
	private String url;
	private String version;
	
	public String execute(){
		String capabilities = "";
		
		try {
			try { 
				GetCapabilitiesService gcs = new GetCapabilitiesService();
				capabilities = gcs.getAsJson( url, version );
			} catch (Exception ex) {
				capabilities = "{ \"error\": true, \"msg\": \""+ex.getMessage()+".\" }";	
			}
	
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( capabilities );
			
		} catch ( Exception e ) {
			//e.printStackTrace();
		}
		
		return "ok";
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	public void setVersion(String version) {
		this.version = version;
	}
	
}
