package br.mil.mar.casnav.mclm.action;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.misc.User;


public class BasicActionClass {
	private User loggedUser;
	private String serverBaseUrl;
	
	@SuppressWarnings("rawtypes")
	public void dumpParameters() {
		HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
	    
		Map m = request.getParameterMap();
        Set s = m.entrySet();
        Iterator it = s.iterator();			
        while(it.hasNext()){
        	@SuppressWarnings("unchecked")
			Map.Entry<String,String[]> entry = (Map.Entry<String,String[]>)it.next();
              String key = entry.getKey();
              String[] value = entry.getValue();
              System.out.println(key+" :: ");
              
              if(value.length>1){    
                  for (int i = 0; i < value.length; i++) {
                	  System.out.println("  > "+value[i].toString() );
                  }
              }else System.out.println("  > "+value[0].toString());	              
              
        }		
	}
	
	public String getServerBaseUrl() {
		return serverBaseUrl;
	}
	
	public User getLoggedUser() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();		
		
		loggedUser = (User)session.getAttribute("loggedUser");
		return loggedUser;
	}
	
	public void setMessageText(String messageText) {
		messageText = messageText.replaceAll("[\n\r]", "");
		ActionContext.getContext().getSession().put("messageText", messageText );
	}

	public String getMessageText() {
		String messageText = (String)ActionContext.getContext().getSession().get("messageText");
		setMessageText("");
		return messageText;
	}

	public BasicActionClass() {
		HttpServletRequest request = ServletActionContext.getRequest();
		serverBaseUrl = request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/";
	}

	
}
