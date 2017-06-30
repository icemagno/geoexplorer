package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.IMNETService;



@Action(value="getAlerts", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetAlertsAction {
	
	public String execute(){

		try { 
			String resposta = "NO_ALERTS";
			
			try {
				IMNETService imnet = new IMNETService();
				resposta = imnet.getAlerts();
				
			} catch ( Exception ex ) {
				//ex.printStackTrace();
			}
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write(resposta);  
		} catch (Exception ex) {
			//
		}
		return "ok";
	}

	
}
