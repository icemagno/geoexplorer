package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.apolo.AerodromosService;

@Action(value="apoloGetAerodromo", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"})},
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class ApoloGetAerodromoAction extends BasicActionClass {
	private String codigo;
	
	public String execute(){

		try { 
			String result = "";
			
			AerodromosService as = new AerodromosService();
			
			result = as.getAerodromo(codigo, getLoggedUser() );
		
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

}
