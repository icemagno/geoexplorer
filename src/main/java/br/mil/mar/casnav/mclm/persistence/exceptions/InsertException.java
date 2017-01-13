package br.mil.mar.casnav.mclm.persistence.exceptions;

public class InsertException extends PersistenceException {
	private static final long serialVersionUID = 1L;
	
	public InsertException(String message){
		super(message);
	}
	
}
