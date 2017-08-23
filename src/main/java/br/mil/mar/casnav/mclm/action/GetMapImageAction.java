package br.mil.mar.casnav.mclm.action;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.LayerService;


@Action(value="getMapImage", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetMapImageAction {
	private String urlList;
	private String feiEncodedCanvas;
	
	public String execute(){

		LayerService ls = new LayerService();
		String resposta = ls.getLayersAsImage( urlList, feiEncodedCanvas );
		
	    try {
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write(resposta);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return "ok";
	}


	public void setUrlList(String urlList) {
		this.urlList = urlList;
	}

	public void setFeiEncodedCanvas(String feiEncodedCanvas) {
		this.feiEncodedCanvas = feiEncodedCanvas;
	}
	
	
}
