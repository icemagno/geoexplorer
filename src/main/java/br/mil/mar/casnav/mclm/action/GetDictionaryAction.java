package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.DictionaryService;

@Action(value="getDictionary", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }	
)   

@ParentPackage("default")
public class GetDictionaryAction {
	
	public String execute(){

		try { 

			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
			String layerName = request.getParameter("layerName");			
			String serviceUrl = request.getParameter("serviceUrl");			
			int idNodeData = Integer.valueOf( request.getParameter("idNodeData") );			
			
			DictionaryService ds = new DictionaryService();
			String result = ds.getListAsJson( idNodeData, layerName, serviceUrl );
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return "ok";
	}


	
}
