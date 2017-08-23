package br.mil.mar.casnav.mclm.persistence.services;

import org.json.JSONObject;
import org.json.XML;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.WebClient;

public class AISService {
	private String aisApiKey;	
	private String aisApiPass;		
	
	public AISService() throws Exception {
		Configurator cfg = Configurator.getInstance();
		aisApiKey = cfg.getAisApiKey();
		aisApiPass = cfg.getAisApiPass();
	}

	private String getServiceUrl() {
		return "http://www.aisweb.aer.mil.br/api/?apiKey=" + aisApiKey + "&apiPass=" + aisApiPass;
	}
	
	public synchronized String getAerodromo(String icaoCode)  throws Exception {
		WebClient wc = new WebClient();
		String url = getServiceUrl() + "&area=aero&IcaoCode=" + icaoCode;

		String result = wc.doGet(url, "UTF-8");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();	
	}	
	
	public synchronized String getNotam(String icaoCode)  throws Exception {
		// http://publicacoes.decea.gov.br/?i=publicacao&id=4059
		WebClient wc = new WebClient();
		String url = getServiceUrl() + "&area=notam&dist=N&IcaoCode=" + icaoCode;

		String result = wc.doGet(url, "UTF-8");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();	
	}	
	
	public synchronized String getMetarTaf(String icaoCode)  throws Exception {
		WebClient wc = new WebClient();
		String url = getServiceUrl() + "&area=met&IcaoCode=" + icaoCode;

		String result = wc.doGet(url, "UTF-8");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();	
	}	
	
	public synchronized String getFixos()  throws Exception {
		WebClient wc = new WebClient();
		String url = getServiceUrl() + "&area=fixos";

		String result = wc.doGet(url, "UTF-8");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();	
	}	
	
}
