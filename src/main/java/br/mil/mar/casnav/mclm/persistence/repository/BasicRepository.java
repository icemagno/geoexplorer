package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.UUID;

import org.hibernate.Session;
import org.hibernate.Transaction;

import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.infra.ConnFactory;

public class BasicRepository {
	protected Session session;
	private Transaction tx = null;
	private String sessionId;
	
	public String getSessionId() {
		return sessionId;
	}

	public BasicRepository() throws DatabaseConnectException {
		try {
			session = ConnFactory.getSession();
			if ( session != null ) {
				tx = session.beginTransaction();
			} else {
				throw new DatabaseConnectException( "Cannot open Database Session" );
			}
		} catch (Exception e ) {
			e.printStackTrace();
			throw new DatabaseConnectException( e.getMessage() );
		}
        UUID uuid = UUID.randomUUID();
        sessionId = uuid.toString().toUpperCase().substring(0,8);
	}
	

	public void newTransaction() {
		if ( !session.isOpen() ) {
			session = ConnFactory.getSession();
			if ( session != null ) {
				tx = session.beginTransaction();
			} else {
				//
			}
		} else {
			//
		}
	}
	
	public boolean isOpen() {
		return session.isOpen();
	}
	
	public void closeSession() {
		if( isOpen() ) {
			session.close();
		} else {
			//
		}
	}
	
	public void commit() {
		tx.commit(); 
	}
	
	public void rollBack() {
		tx.rollback();
	}
	

}
