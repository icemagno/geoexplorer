package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.DataLayer;
import br.mil.mar.casnav.mclm.persistence.entity.FeatureStyle;
import br.mil.mar.casnav.mclm.persistence.entity.Feicao;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class DataLayerRepository extends BasicRepository {

	public DataLayerRepository() throws DatabaseConnectException {
		super();
	}

	public void updateDataLayer( DataLayer dataLayer ) throws UpdateException {
		DaoFactory<DataLayer> df = new DaoFactory<DataLayer>();
		IDao<DataLayer> fm = df.getDao(this.session, DataLayer.class);
		try {
			fm.updateDO( dataLayer );
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
	}
	
	public DataLayer insertDataLayer( DataLayer dataLayer ) throws InsertException {
		DaoFactory<DataLayer> df = new DaoFactory<DataLayer>();
		IDao<DataLayer> fm = df.getDao(this.session, DataLayer.class);
		
		try {
			fm.insertDO( dataLayer );
			commit();
		} catch (InsertException e) {
			e.printStackTrace();
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return dataLayer;
	}
	
	public DataLayer getDataLayer( int idDataLayer ) throws Exception {
		DaoFactory<DataLayer> df = new DaoFactory<DataLayer>();
		IDao<DataLayer> fm = df.getDao(this.session, DataLayer.class);
		DataLayer server = null;
		try {
			server = fm.getDO( idDataLayer );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return server;
	}

	public List<DataLayer> getList() throws Exception {
		DaoFactory<DataLayer> df = new DaoFactory<DataLayer>();
		IDao<DataLayer> fm = df.getDao(this.session, DataLayer.class);
		List<DataLayer> server = null;
		try {
			server = fm.getList("select * from data_sources");
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return server;
	}

	
	public void deleteDataLayer(DataLayer server) throws DeleteException {
		DaoFactory<DataLayer> df = new DaoFactory<DataLayer>();
		IDao<DataLayer> fm = df.getDao(this.session, DataLayer.class);
		try {
			fm.deleteDO(server);
			commit();
		} catch (DeleteException e) {
			rollBack();
			closeSession();
			throw e;			
		}
		closeSession();
	}

	public FeatureStyle getStyle(int idFeatureStyle) throws Exception {
		DaoFactory<FeatureStyle> df = new DaoFactory<FeatureStyle>();
		IDao<FeatureStyle> fm = df.getDao(this.session, FeatureStyle.class);
		FeatureStyle style = null;
		try {
			style = fm.getDO( idFeatureStyle );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return style;
	}

	public FeatureStyle insertFeatureStyle(FeatureStyle style) throws Exception {
		DaoFactory<FeatureStyle> df = new DaoFactory<FeatureStyle>();
		IDao<FeatureStyle> fm = df.getDao(this.session, FeatureStyle.class);
		
		try {
			fm.insertDO( style );
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return style;
	}

	public FeatureStyle updateFeatureStyle(FeatureStyle style) throws Exception {
		DaoFactory<FeatureStyle> df = new DaoFactory<FeatureStyle>();
		IDao<FeatureStyle> fm = df.getDao(this.session, FeatureStyle.class);
		
		try {
			fm.updateDO( style );
			commit();
		} catch (UpdateException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return style;
	}

	
	public List<FeatureStyle> getStyleList() throws Exception {
		DaoFactory<FeatureStyle> df = new DaoFactory<FeatureStyle>();
		IDao<FeatureStyle> fm = df.getDao(this.session, FeatureStyle.class);
		List<FeatureStyle> styles = null;
		try {
			styles = fm.getList("select * from feature_styles");
		} catch ( Exception e ) {
			closeSession();
			throw e;
		}
		closeSession();
		return styles;
	}

	public Feicao insertFeicao(Feicao feicao) throws Exception {
		DaoFactory<Feicao> df = new DaoFactory<Feicao>();
		IDao<Feicao> fm = df.getDao(this.session, Feicao.class);
		
		try {
			fm.insertDO( feicao );
			commit();
		} catch (InsertException e) {
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return feicao;
	}

	public Feicao getFeicao(int idFeicao) throws Exception {
		DaoFactory<Feicao> df = new DaoFactory<Feicao>();
		IDao<Feicao> fm = df.getDao(this.session, Feicao.class);
		Feicao feicao = null;
		try {
			feicao = fm.getDO( idFeicao );
		} catch ( Exception e ) {
			closeSession();		
			throw e;
		} 
		closeSession();		
		return feicao;
	}		
}
