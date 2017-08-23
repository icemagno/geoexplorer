package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.entity.Server;
import br.mil.mar.casnav.mclm.persistence.services.LayerService;
import br.mil.mar.casnav.mclm.persistence.services.ServerService;

@Action(value="newWMSLayer", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class NewWMSLayerAction extends BasicActionClass {
	
	public String execute(){

		try { 
			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
			
			String serverUrl = request.getParameter("serverUrl");
			String cqlFilter = request.getParameter("cqlFilter");
			String layerName = request.getParameter("layerName");
			String layerAlias = request.getParameter("layerAlias");
			String description = request.getParameter("description");
			String institute = request.getParameter("institute");
			
			int layerFolderID = Integer.valueOf( request.getParameter("layerFolderID") );
			
			int idServer;
			try {
				idServer = Integer.valueOf( request.getParameter("idServer") );
			} catch ( NumberFormatException e ) {
				Server server = new Server( institute, serverUrl, "1.1.1", "WMS" );
				ServerService ss = new ServerService();
				idServer = ss.insertServerWMS( server );
			}

			
			LayerService ls = new LayerService();
			String result =	ls.createWMSLayer( layerFolderID, serverUrl, description, institute, layerName, layerAlias, cqlFilter, idServer );

			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

}
