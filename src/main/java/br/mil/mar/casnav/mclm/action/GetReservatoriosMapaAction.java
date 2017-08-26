package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.ANAService;



@Action(value="getReservatoriosMapa", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetReservatoriosMapaAction {
	String nomeRegiao;

	
	public String execute(){
		
		try { 

			ANAService ana = new ANAService();
			String resposta = ana.getReservatoriosMapa( nomeRegiao );
					
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write(resposta);  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setNomeRegiao(String nomeRegiao) {
		this.nomeRegiao = nomeRegiao;
	}
}
