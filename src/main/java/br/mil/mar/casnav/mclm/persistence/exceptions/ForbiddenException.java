package br.mil.mar.casnav.mclm.persistence.exceptions;

public class ForbiddenException extends Exception {
	private static final long serialVersionUID = 1L;

	public ForbiddenException( String message ) {
		super(message);
	}
	
}
