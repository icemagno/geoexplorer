
package br.mil.mar.casnav.mclm.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

@Action (value = "logout", results = { @Result (location = "index.jsp", name = "ok") } ) 

@ParentPackage("default")
public class LogoutAction {
	
	public String execute () {
		
		ActionContext.getContext().getSession().put("key", null );
		ActionContext.getContext().getSession().put("idUser", null );
		ActionContext.getContext().getSession().put("loggedUser", null );
		
		return "ok";
	}
	
}
