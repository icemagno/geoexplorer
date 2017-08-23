package br.mil.mar.casnav.mclm.persistence.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class IMNETService {

	public synchronized String getCityAlertLevels( String lat, String lon ) throws Exception {
		// http://alert-as.inmet.gov.br/cv/mapa/cidade?lon=-61.31363281250047&lat=2.055596697060544
		String url = "http://alert-as.inmet.gov.br/cv/mapa/cidade?lon="+lon+"&lat=" + lat;
		WebClient wc = new WebClient();
		String result = wc.doGet(url);
		return result.replace("null(", "").replaceFirst(".$","");
	}
	
	public synchronized String getAlerts() throws Exception {
		String url = "http://alerts.inmet.gov.br/cap_12/rss/alert-as.rss";
		WebClient wc = new WebClient();
		String result = wc.doGet(url);
		
		JSONObject obj = XML.toJSONObject(result);
		JSONArray arr = obj.getJSONObject("rss").getJSONObject("channel").getJSONArray("item");
		
		for ( int x=0; x<arr.length();x++ ) {
			JSONObject item = arr.getJSONObject(x);
			String description = item.getString("description");
			
			JSONArray tableDescription = XML.toJSONObject(description).getJSONObject("table").getJSONArray("tr");
			
			JSONObject descObj = new JSONObject();
			for ( int y=0; y<tableDescription.length();y++ ) {
				
				try {
					String value = tableDescription.getJSONObject(y).getString("td");
					String key = tableDescription.getJSONObject(y).getJSONObject("th").getString("content");
					descObj.put(key, value);

				} catch ( Exception e ) { }
			}

			item.put("description", descObj.toString());
		}
		
		return obj.toString();
	}
	

	public synchronized String getAlertsFull() throws Exception {
		String url = "http://alerts.inmet.gov.br/cap_12/rss/alert-as.rss";
		WebClient wc = new WebClient();
		String result = wc.doGet(url);
		JSONObject obj = XML.toJSONObject(result);
		return obj.toString();
	}
	
	
	public synchronized String searchCidade(String nome) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://www.inmet.gov.br/portal/index.php?r=municipio/sugestMunicipio&term=" + nome;
		String result = wc.doGet(url);
		return result;
	}


	public synchronized String getWarningDetail(String source) throws Exception {
		WebClient wc = new WebClient();
		String result = wc.doGet( source.replace("https", "http") );
		JSONObject obj = XML.toJSONObject(result);
		return obj.toString();
	}

	
	

	
}
