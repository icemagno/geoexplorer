package br.mil.mar.casnav.mclm.persistence.services;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class ANAService {


	public synchronized String getReservatoriosMapa( String nomeRegiao ) throws Exception {
		// http://sar.ana.gov.br/Nordeste/CarregaMapa
		WebClient wc = new WebClient();
		String url = "http://sar.ana.gov.br/"+nomeRegiao+"/CarregaMapa";
		
		String result = wc.doGet(url, "UTF-8");
		return result;		
	}


	
}
