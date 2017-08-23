package br.mil.mar.casnav.mclm.persistence.exceptions;

public class UnauthorizedException extends Exception {
	private static final long serialVersionUID = 1L;

	public UnauthorizedException( String message ) {
		super(message);
	}
	
}
