package br.mil.mar.casnav.mclm.persistence.services.apolo;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.misc.WebClient;

public class OrganizacoesMilitaresService extends BasicApoloService {

	public OrganizacoesMilitaresService() throws Exception {
		super();
	}

	
	public String getOrgMil( String orgid, User user ) throws Exception {
		
		String token = user.getHashKey();
		String idUser = user.getIdUser();
		String apolo = Configurator.getInstance().getApoloRESTAddress();
		
		String urlApi = apolo + "/SIGLMD-web/api/v1/organizacoes/militares/"+orgid+"?user-hash="+idUser+"&token="+token ;
		
		WebClient wc = new WebClient();
		String result = wc.doGet(urlApi);
		return result;
		
	}
	
}
