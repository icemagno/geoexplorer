package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.RouteService;

@Action(value="getPointsNearRoute", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }	
)   

@ParentPackage("default")
public class GetPointsNearRouteAction {
	private String route;
	private String criteria;
	private String source;
	
	public String execute(){

		try { 
			String result = "";
			
			RouteService rs = new RouteService();
			result = rs.getPointsNearRoute( route, criteria, source );
					
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setCriteria(String criteria) {
		this.criteria = criteria;
	}
	
	public void setRoute(String route) {
		this.route = route;
	}

	public void setSource(String source) {
		this.source = source;
	}
	
}
