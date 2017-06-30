package br.mil.mar.casnav.mclm.persistence.services;

import br.mil.mar.casnav.mclm.persistence.entity.FilterItem;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.repository.FilterRepository;

public class FilterService {
	private FilterRepository rep;

	public FilterService() throws DatabaseConnectException {
		this.rep = new FilterRepository();
	}	
	
	public FilterItem getFilter(int idFilterItem)  throws NotFoundException {
		return rep.getFilter( idFilterItem );
		
	}
	
	public void closeSession() {
		rep.closeSession();
	}	

}
