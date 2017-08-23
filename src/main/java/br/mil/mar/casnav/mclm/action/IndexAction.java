
package br.mil.mar.casnav.mclm.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

@Action (value = "index", results = { @Result (location = "index.jsp", name = "ok") } ) 

@ParentPackage("default")
public class IndexAction {
	private String userId;
	private String key;
	
	public String execute () {
		
		System.out.println(" KEY      > " + key );
		System.out.println(" userId   > " + userId );
		
		ActionContext.getContext().getSession().put("key", key );
		ActionContext.getContext().getSession().put("userId", userId );
		
		return "ok";
	}
	

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public void setKey(String key) {
		this.key = key;
	}
	
}
