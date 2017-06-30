
package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.SceneryService;

@Action (value = "updateSceneryData", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
) 

@ParentPackage("default")
public class UpdateCenarioDataAction extends BasicActionClass {
	private String mapCenter;
	private Integer idScenery;
	private Integer mapZoom;
	private String mapaBase;
	private String servidorBase;
	private String mapBbox;
	private Boolean mapaBaseAtivo;
	private Boolean gradeAtiva;
	
	public String execute () {
		String resp;
		
		try {
			SceneryService sns = new SceneryService();
			resp = sns.updateScenery( idScenery, mapCenter, mapZoom, mapaBase, servidorBase, mapBbox, mapaBaseAtivo, gradeAtiva );
				
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/json");
			response.getWriter().write( resp );  
		} catch (Exception ex) {
			ex.printStackTrace();
		}	
	
		return "ok";
	}

	public void setMapCenter(String mapCenter) {
		this.mapCenter = mapCenter;
	}

	public void setIdScenery(Integer idScenery) {
		this.idScenery = idScenery;
	}

	public void setMapZoom(Integer mapZoom) {
		this.mapZoom = mapZoom;
	}

	public void setMapaBase(String mapaBase) {
		this.mapaBase = mapaBase;
	}

	public void setServidorBase(String servidorBase) {
		this.servidorBase = servidorBase;
	}

	public void setMapBbox(String mapBbox) {
		this.mapBbox = mapBbox;
	}

	public void setMapaBaseAtivo(Boolean mapaBaseAtivo) {
		this.mapaBaseAtivo = mapaBaseAtivo;
	}

	public void setGradeAtiva(Boolean gradeAtiva) {
		this.gradeAtiva = gradeAtiva;
	}



	
}
