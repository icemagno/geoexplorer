package br.mil.mar.casnav.mclm.misc;

import java.net.Authenticator;
import java.net.PasswordAuthentication;

public class SimpleAuthenticator extends Authenticator {
	   private String username;
	   private String password;
          
	public SimpleAuthenticator(String username,String password) {
		this.username = username;
		this.password = password;
	}

	protected PasswordAuthentication getPasswordAuthentication() {
		return new PasswordAuthentication( username,password.toCharArray() );
	}	
	
}
