package br.mil.mar.casnav.mclm.action;

import java.net.URLDecoder;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.misc.WebClient;

@Action(value="proxyRequest", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class ProxyRequestAction {
	private String targetUrl;
	
	public String execute(){

		try { 
			String result = "";
			
			if ( targetUrl != null ) {
				WebClient wc = new WebClient();
				result = wc.doGet(  URLDecoder.decode( targetUrl, "UTF-8")   ); 
				System.out.println("Resposta proxyRequest: " + result );
			}
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setTargetUrl(String targetUrl) {
		this.targetUrl = targetUrl;
	}
}
