package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.CommercialFlightService;



@Action(value="getAircraftsInBBOX", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetAircraftsInBBOXAction {
	private String minlat;
	private String minlon;
	private String maxlat;
	private String maxlon;

	
	public String execute(){

		try { 
			CommercialFlightService cfs = new CommercialFlightService();
			String resposta = cfs.getAircraftsInBBOX(minlat, minlon, maxlat, maxlon);
			

			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write(resposta);  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setMinlat(String minlat) {
		this.minlat = minlat;
	}

	public void setMinlon(String minlon) {
		this.minlon = minlon;
	}

	public void setMaxlat(String maxlat) {
		this.maxlat = maxlat;
	}

	public void setMaxlon(String maxlon) {
		this.maxlon = maxlon;
	}


	
}
