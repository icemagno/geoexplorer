package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.apolo.OrganizacoesMilitaresService;

@Action(value="apoloGetOM", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"})},
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class ApoloGetOMAction extends BasicActionClass {
	private String orgid;
	
	public String execute(){

		try { 
			String config = "";
			
			OrganizacoesMilitaresService oms = new OrganizacoesMilitaresService();
			
			config = oms.getOrgMil( orgid, getLoggedUser() );
		
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( config );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}
	
	public void setOrgid(String orgid) {
		this.orgid = orgid;
	}
}
