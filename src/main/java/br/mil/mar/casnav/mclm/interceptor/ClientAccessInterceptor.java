package br.mil.mar.casnav.mclm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.persistence.services.apolo.ApoloService;

public class ClientAccessInterceptor implements Interceptor {
	private static final long serialVersionUID = -2344136157076941239L;

	
	public String intercept(ActionInvocation invocation) {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		
		// System.out.println( "[" + session.getId() +  "] [" + invocation.getAction().getClass().getSimpleName() + "] [" + request.getRequestURI() + "]");

		User loggedUser = (User)session.getAttribute("loggedUser");
		if (loggedUser == null) {
			try {
				String userId = (String)session.getAttribute("userId");
				String key = (String)session.getAttribute("key");
				
				ApoloService as = new ApoloService();
				User user = as.checkUser(userId, key);
				
				session.setAttribute("loggedUser", user);
				
			} catch ( Exception e ) {
				
				e.printStackTrace();
				
				// Quando nao encontrar usuario logado no APOLO...
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setStatus( HttpServletResponse.SC_UNAUTHORIZED );
				response.setStatus( HttpServletResponse.SC_FORBIDDEN );
				return "notLogged";			
			}
			
		} else {
			System.out.println(" > Logged User: " + loggedUser.getName() );
		}
		
		
		
		try {
			return invocation.invoke();
		} catch ( Exception ignored ) {
			return "notLogged";
		}
	}
 
	@Override
	public void destroy() {
		//logger.info("system stop"); 
	}

	
	@Override
	public void init() {
		//logger.info("system init");
	}	
	
}
