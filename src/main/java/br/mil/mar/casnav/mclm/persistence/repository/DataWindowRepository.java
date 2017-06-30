package br.mil.mar.casnav.mclm.persistence.repository;

import br.mil.mar.casnav.mclm.persistence.entity.DataWindow;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class DataWindowRepository extends BasicRepository {

	public DataWindowRepository() throws DatabaseConnectException {
		super();
	}

	public DataWindow getDataWindow(int idDataWindow ) throws NotFoundException {
		DaoFactory<DataWindow> df = new DaoFactory<DataWindow>();
		IDao<DataWindow> fm = df.getDao(this.session, DataWindow.class);
		DataWindow dataWindow = null;
		try {
			dataWindow = fm.getDO( idDataWindow );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return dataWindow;
	}	
	
	
	public DataWindow insertDataWindow(DataWindow dataWindow) throws Exception {
		DaoFactory<DataWindow> df = new DaoFactory<DataWindow>();
		IDao<DataWindow> fm = df.getDao(this.session, DataWindow.class);
		
		try {
			fm.insertDO( dataWindow );
			commit();
		} catch (InsertException e) {
			//e.printStackTrace();
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return dataWindow;
	}	
	
}
