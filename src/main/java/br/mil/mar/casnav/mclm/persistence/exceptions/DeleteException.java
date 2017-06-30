package br.mil.mar.casnav.mclm.persistence.exceptions;

public class DeleteException extends PersistenceException {
	private static final long serialVersionUID = 1L;
	
	public DeleteException( String message ) {
		super(message);
	}	

}
