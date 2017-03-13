package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.services.ConfigService;

@Action(value="saveConfig", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class SaveConfigAction extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			String result = "{ \"success\": true, \"msg\": \"Configuração atualizada com sucesso.\" }";
			
			try {
				HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
				boolean useProxy = Boolean.valueOf( request.getParameter("useProxy") );
				boolean externalLayersToLocalServer = Boolean.valueOf( request.getParameter("externalLayersToLocalServer") );
				String nonProxyHosts = request.getParameter("nonProxyHosts");
				String externalWorkspaceName = request.getParameter("externalWorkspaceName");
				String proxyPassword = request.getParameter("proxyPassword");
				String proxyUser = request.getParameter("proxyUser");
				String proxyHost = request.getParameter("proxyHost");
				String geoserverPassword = request.getParameter("geoserverPassword");
				String geoserverUser = request.getParameter("geoserverUser");
				String mapCenter = request.getParameter("mapCenter");
				String baseLayer = request.getParameter("baseLayer");
				String shapeFileTargetPath = request.getParameter("shapeFileTargetPath");
				String geoserverUrl = request.getParameter("geoserverUrl");
				int mapZoom = Integer.valueOf( request.getParameter("mapZoom") );
				int queryFactorRadius = Integer.valueOf( request.getParameter("queryFactorRadius") );
				int proxyPort = Integer.valueOf( request.getParameter("proxyPort") );
				int idConfig = Integer.valueOf( request.getParameter("idConfig") );

				int routingPort = Integer.valueOf( request.getParameter("routingPort") );
				int distanceFromRoute = Integer.valueOf( request.getParameter("distanceFromRoute") );
				
				String routingServer = request.getParameter("routingServer");
				String routingUser = request.getParameter("routingUser");
				String routingPassword = request.getParameter("routingPassword");
				String routingDatabase = request.getParameter("routingDatabase");
				
				String apoloServer = request.getParameter("apoloServer");

				
				Config config = new Config(idConfig, geoserverUrl, baseLayer, useProxy, externalLayersToLocalServer, externalWorkspaceName, 
							proxyHost, nonProxyHosts, proxyUser, proxyPassword, proxyPort, geoserverUser, 
							geoserverPassword, mapZoom, queryFactorRadius, mapCenter, shapeFileTargetPath, 
							routingServer, routingUser, routingPassword, routingPort, routingDatabase,	
							apoloServer, distanceFromRoute);	
				
				
				ConfigService cs = new ConfigService();
				cs.updateConfig(config);
				
			} catch ( Exception e ) {
				result = "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";
				e.printStackTrace();
			}
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	
}
