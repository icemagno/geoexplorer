package br.mil.mar.casnav.mclm.misc;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("rawtypes")
public class UserTableEntity {
	private Map data;
	
	public UserTableEntity( Map data ) {
		this.data = data;
	}
	
	public boolean hasContent( String sampleData ) {
		for ( String ss : getColumnNames() ) {
			String data = getData(ss);
			if ( data.equals( sampleData ) ) {
				return true;
			}
		}
		return false;
	}
	
	public boolean hasColumn( String column ) {
		for( String columnName : getColumnNames() ) {
			if ( columnName.equals( column )  ) {
				return true;
			}
		}
		return false;
	}

	public void removeColumn( String columnName ) {
		data.remove(columnName);
	}
	
	@SuppressWarnings("unchecked")
	public void setData( String columnName, String value ) {
		data.remove(columnName);
		data.put( columnName, value);
	}
	
	public String getData( String columnName ) {
		Object value = data.get(columnName);
		if ( value != null ) {
			return value.toString();
		} 
		return "";
	}
	
	public List<String> getColumnNames() {
		List<String> result = new ArrayList<String>();
		for ( Object key :  data.keySet() ) {
			result.add( key.toString() );
		}
		return result;
	}

	public List<String> getDataValues() {
		List<String> result = new ArrayList<String>();
		for ( Object key :  data.keySet() ) {
			result.add( getData( key.toString() ) );
		}
		return result;
	}

	public List<String> getDataValuesBroken() {
		List<String> result = new ArrayList<String>();
		for ( Object key :  data.keySet() ) {
			result.add( getData( key.toString() ).replace(";", "; ") );
		}
		return result;
	}

	
}
