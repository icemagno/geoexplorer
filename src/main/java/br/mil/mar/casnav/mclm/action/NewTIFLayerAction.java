package br.mil.mar.casnav.mclm.action;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.LayerService;

@Action(value="newTIFLayer", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class NewTIFLayerAction extends BasicActionClass {
	private String tifFileFileName;
	private String tifFileContentType;
	private File tifFile;
	
	public String execute(){
		

		try { 
			HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);

			String layerAlias = request.getParameter("layerAlias");
			String description = request.getParameter("description");
			String institute = request.getParameter("institute");
			
			String layerFolderIDS = request.getParameter("layerFolderID");
			
			int layerFolderID = Integer.valueOf( layerFolderIDS );
			
			LayerService ls = new LayerService();
			String result = ls.createTIFLayer( tifFileContentType, tifFile, tifFileFileName, layerAlias, description, institute, layerFolderID );
			
			System.out.println("Resposta de newTIFLayer: " + result );
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setTifFileFileName(String tifFileFileName) {
		this.tifFileFileName = tifFileFileName;
	}

	public void setTifFileContentType(String tifFileContentType) {
		this.tifFileContentType = tifFileContentType;
	}

	public void setTifFile(File tifFile) {
		this.tifFile = tifFile;
	}
	
	
}
