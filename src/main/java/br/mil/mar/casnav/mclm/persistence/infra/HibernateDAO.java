package br.mil.mar.casnav.mclm.persistence.infra;

import java.math.BigInteger;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.hibernate.transform.Transformers;

import br.mil.mar.casnav.mclm.persistence.exceptions.DeleteException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.exceptions.UpdateException;

public class HibernateDAO<T> implements IDao<T>  {
	private Class<T> classe;
	private Session session;
	private String sqlDLL;
	private boolean globalWithCommit;
	private long startTime;    
	private long estimatedTime;	
	
	public long getEstimatedTime() {
		return estimatedTime;
	}
	
	public HibernateDAO(Session session, Class<T> classe) {

		this.session = session;
		this.classe = classe;
		startTime = System.nanoTime();
	}
	
	public int insertDO(T objeto) throws InsertException {
		int res = -1;
		try { 
			res = (Integer)session.save(objeto);
		} catch (HibernateException e) {
			throw new InsertException ( e.getMessage() );
		}
		if ( res == -1 ) {
			throw new InsertException("Unknown error by insert in " + this.classe.getSimpleName() );
		}
		estimatedTime = System.nanoTime() - startTime;
		return res;		
	}


	public int getCount(String tableName, String criteria) throws Exception {
        Query query = session.createSQLQuery( "select count(*) from " + tableName + " " + criteria );
        Integer retorno = ( (BigInteger)query.uniqueResult() ).intValue();
		estimatedTime = System.nanoTime() - startTime;
        return retorno;
	}

	
	public List<?> genericAccess(String hql) throws Exception {
        Query query = session.createSQLQuery(hql);
        //Each row is a list of properties in the query
        List<?> rows = query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
		estimatedTime = System.nanoTime() - startTime;
        return rows;
	}


	public void executeQuery(String hql, boolean withCommit) throws Exception {
		sqlDLL = hql;
		globalWithCommit = withCommit;
		session.doWork(new Work() {
		    @Override
		    public void execute(Connection connection) throws SQLException {
		    	Statement st = connection.createStatement();
		    	String sql = sqlDLL;
		    	st.execute(sql);
		    	if( globalWithCommit ) {
			    	try {
			    		connection.commit();
			    	} catch ( Exception ignored ) {
			    	} finally {
				    	try { st.close(); } catch ( Exception e ) {  }
			    		connection.close();
			    	}
		    	}
		    }
		});
		
	}
	
	
	public void deleteDO(T objeto) throws DeleteException {
		try {
			session.delete(objeto);
		} catch (HibernateException e) {
			throw new DeleteException( e.getMessage() );
		} 				
		estimatedTime = System.nanoTime() - startTime;
	}
	

	public void updateDO(T objeto) throws UpdateException {
		try {
			session.saveOrUpdate(objeto);
		} catch (HibernateException e) {
			throw new UpdateException( e.getMessage() );
		} 			
		estimatedTime = System.nanoTime() - startTime;
	}


	@SuppressWarnings("unchecked")
	public List<T> getList(String criteria) throws NotFoundException {
		try {
			List<T> retorno;
			retorno = (List<T>)session.createSQLQuery(criteria).addEntity(this.classe).list(); 
			if ( retorno.size() == 0 ) {
				throw new NotFoundException("No records found for entity " + this.classe);
			}
			estimatedTime = System.nanoTime() - startTime;
			return retorno;
		} catch (HibernateException e) {
			e.printStackTrace();
			throw new NotFoundException( e.getMessage() );
		} 		
	}


	@SuppressWarnings("unchecked")
	public T getDO(int id) throws NotFoundException {
		Object objeto = session.get(classe, id);
		if ( objeto == null ){
			throw new  NotFoundException(classe.getSimpleName() + ": ID " + id + " not found.");
		}
		estimatedTime = System.nanoTime() - startTime;
		return (T)objeto;		
	}


}
