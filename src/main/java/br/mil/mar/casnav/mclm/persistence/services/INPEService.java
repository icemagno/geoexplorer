package br.mil.mar.casnav.mclm.persistence.services;

import org.json.JSONObject;
import org.json.XML;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class INPEService {


	public synchronized String searchCidade(String nome) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://servicos.cptec.inpe.br/XML/listaCidades?city=" + nome;
		
		String result = wc.doGet(url, "ISO-8859-1");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();		
	}


	public synchronized String previsao4Dias(String localidade) throws Exception {
		WebClient wc = new WebClient();
		
		String url = "http://servicos.cptec.inpe.br/XML/cidade/"+localidade+"/previsao.xml";
		
		String result = wc.doGet(url, "ISO-8859-1");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();		
	}

	public synchronized String previsaoEstendida(String localidade) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://servicos.cptec.inpe.br/XML/cidade/"+localidade+"/estendida.xml";

		String result = wc.doGet(url, "ISO-8859-1");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();		
	}	


	public synchronized String condicoesAeroportos(String estacao) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://servicos.cptec.inpe.br/XML/estacao/"+estacao+"/condicoesAtuais.xml";
		
		String result = wc.doGet(url, "ISO-8859-1");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();		
	}		
	
	public synchronized String previsaoOndas(String localidade, String dia) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://servicos.cptec.inpe.br/XML/cidade/"+localidade+"/dia/"+dia+"/ondas.xml";
		
		String result = wc.doGet(url, "ISO-8859-1");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();		
	}		
	
	public synchronized String previsaoEstendidaLatLon(String lat, String lon) throws Exception {
		WebClient wc = new WebClient();
		              //http://servicos.cptec.inpe.br/XML/cidade/7dias/-22.90/-47.06/previsaoLatLon.xml
		              //http://servicos.cptec.inpe.br/XML/cidade/-22.71/-45.11/estendidaLatLon.xml
		String url = "http://servicos.cptec.inpe.br/XML/cidade/7dias/"+lat+"/"+lon+"/previsaoLatLon.xml";

		String result = wc.doGet(url, "ISO-8859-1");
		JSONObject obj = XML.toJSONObject( result );
		return obj.toString();		
	}		
	
	public synchronized String previsao7Dias(String localidade) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://servicos.cptec.inpe.br/XML/cidade/7dias/"+localidade+"/previsao.xml";

		String result = wc.doGet(url, "ISO-8859-1");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();		
	}


	public String getWeatherAerodromo(String codigo)  throws Exception {
		WebClient wc = new WebClient();
		
		String url = "http://servicos.cptec.inpe.br/XML/estacao/"+codigo+"/condicoesAtuais.xml";

		String result = wc.doGet(url, "ISO-8859-1");
		JSONObject obj = XML.toJSONObject( result );
		
		return obj.toString();	
	}	
	
	
}
