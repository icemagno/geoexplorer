
package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.SceneryService;

@Action (value = "createCenario", results = {  
	    @Result(name="ok", type="httpheader", params={"status", "200"})},
		interceptorRefs= { @InterceptorRef("seguranca")	 }
) 

@ParentPackage("default")
public class CreateCenarioAction extends BasicActionClass {
	private String nomeCenario;
	private String mapCenter;
	private String description;
	private String mapaBase;
	private String servidorBase;
	private String mapBbox;
	
	private Integer mapZoom;
	private Boolean mapaBaseAtivo;
	private Boolean gradeAtiva;
	private Boolean isPublic;
	
	public String execute () {

		try {

			SceneryService sc = new SceneryService();
			String resp = sc.createScenery( isPublic, gradeAtiva, nomeCenario, mapCenter, description, mapaBase, 
					servidorBase, mapZoom, mapaBaseAtivo, getLoggedUser(), mapBbox );
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/json");
			response.getWriter().write( resp );  
		} catch (Exception ex) {
			ex.printStackTrace();
		}	
	
		return "ok";
	}

	public void setNomeCenario(String nomeCenario) {
		this.nomeCenario = nomeCenario;
	}

	public void setMapCenter(String mapCenter) {
		this.mapCenter = mapCenter;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setMapaBase(String mapaBase) {
		this.mapaBase = mapaBase;
	}

	public void setServidorBase(String servidorBase) {
		this.servidorBase = servidorBase;
	}

	public void setMapZoom(Integer mapZoom) {
		this.mapZoom = mapZoom;
	}

	public void setMapaBaseAtivo(Boolean mapaBaseAtivo) {
		this.mapaBaseAtivo = mapaBaseAtivo;
	}

	public void setIsPublic(Boolean isPublic) {
		this.isPublic = isPublic;
	}
	
	public void setGradeAtiva(Boolean gradeAtiva) {
		this.gradeAtiva = gradeAtiva;
	}
	
	public void setMapBbox(String mapBbox) {
		this.mapBbox = mapBbox;
	}
}
