package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.IMNETService;



@Action(value="getCityAlertLevels", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetCityAlertLevelsAction {
	String lat;
	String lon;
	
	public String execute(){
		
		try { 

			IMNETService imnet = new IMNETService();
			String resposta = imnet.getCityAlertLevels(lat, lon);
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write(resposta);  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setLat(String lat) {
		this.lat = lat;
	}
	
	public void setLon(String lon) {
		this.lon = lon;
	}
	
	
}
