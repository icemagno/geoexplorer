package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.RouteService;

@Action(value="calcRoute", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class CalcRouteAction {
	private String source;
	private String target;
	private String directed;
	private Integer kpaths;

	
	public String execute(){

		try { 
			String result = "";
			
			RouteService rs = new RouteService();
			result = rs.calcRoute( source, target, kpaths, directed );
				
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}


	public void setSource(String source) {
		this.source = source;
	}


	public void setTarget(String target) {
		this.target = target;
	}


	public void setKpaths(Integer kpaths) {
		this.kpaths = kpaths;
	}
	
	public void setDirected(String directed) {
		this.directed = directed;
	}

	
}
