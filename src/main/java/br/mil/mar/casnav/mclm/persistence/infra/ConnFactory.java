package br.mil.mar.casnav.mclm.persistence.infra;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class ConnFactory {
	private static SessionFactory factory;
	private static String userName;
	private static String password;
	private static String databaseName;	
	private static String databasePort;	
	private static String databaseAddr;	
	
	
	public static void setCredentials( String user, String passwd, String database, String port, String addr ) {
		userName = user;
		password = passwd;
		databaseName = database;
		databasePort = port;
		databaseAddr = addr;
	}
	
	public static Session getSession() {
		if ( factory == null ) {
			
			try { 
				Configuration cfg1 = new Configuration();
				cfg1.configure("hibernate.cfg.xml");
				
				String url = "jdbc:postgresql://" + databaseAddr + ":" + databasePort + "/" + databaseName + "?ApplicationName=MCLMv2.0";
				cfg1.setProperty("hibernate.connection.username", userName);
				cfg1.setProperty("hibernate.connection.url", url);
			 	cfg1.setProperty("hibernate.connection.password", password);
				
				StandardServiceRegistryBuilder serviceRegistryBuilder1 = new StandardServiceRegistryBuilder();
				serviceRegistryBuilder1.applySettings( cfg1.getProperties() );
				ServiceRegistry serviceRegistry1 = serviceRegistryBuilder1.build();	
				
				factory = cfg1.buildSessionFactory(serviceRegistry1);			
				
			} catch (Throwable ex) { 
				ex.printStackTrace();
				return null;
			}
		} 
		
		Session session = factory.openSession();
		return session;
	}

	
}
