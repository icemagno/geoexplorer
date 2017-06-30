package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.StreetPhotoService;



@Action(value="getPhotosCloseTo", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetPhotosCloseToAction {
	private String lat;
	private String lon;
	private String distance;
	private String minca;
	private String maxca;
	private String maxresults;	
	
	public String execute(){

		try { 
			StreetPhotoService sps = new StreetPhotoService();
			String resposta = sps.getPhotosCloseTo(lat, lon, distance, minca, maxca, maxresults);
			
			
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

	public void setDistance(String distance) {
		this.distance = distance;
	}

	public void setMinca(String minca) {
		this.minca = minca;
	}

	public void setMaxca(String maxca) {
		this.maxca = maxca;
	}

	public void setMaxresults(String maxresults) {
		this.maxresults = maxresults;
	}


	
}
