package br.mil.mar.casnav.mclm.persistence.repository;

import br.mil.mar.casnav.mclm.persistence.entity.FilterItem;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class FilterRepository extends BasicRepository {

	public FilterRepository() throws DatabaseConnectException {
		super();
	}

	public FilterItem getFilter(int idFilterItem) throws NotFoundException {
		DaoFactory<FilterItem> df = new DaoFactory<FilterItem>();
		IDao<FilterItem> fm = df.getDao(this.session, FilterItem.class);
		FilterItem filter = null;
		try {
			filter = fm.getDO( idFilterItem );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return filter;	
	}	
	
}
