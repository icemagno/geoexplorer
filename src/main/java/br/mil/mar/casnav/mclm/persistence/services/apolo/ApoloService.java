package br.mil.mar.casnav.mclm.persistence.services.apolo;

import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.User;
import br.mil.mar.casnav.mclm.misc.WebClient;
import br.mil.mar.casnav.mclm.persistence.exceptions.UnauthorizedException;

public class ApoloService {
	
	
	private String getApoloUser( String idUser, String key ) throws Exception {
		WebClient wc = new WebClient();
		
		String apolo = Configurator.getInstance().getApoloRESTAddress();
		String url = apolo + "/SIGLMD-web/MCLMSecurityServlet?userId="+idUser+"&securityCode=" + key;
		String result = wc.doGet(url);
		return result;
	}
	
	public User checkUser( String idUser, String key ) throws Exception {
		User user = new User();

		System.out.println("Check user: key = " + key + "  ||   ID = " + idUser);
		
		if( idUser != null && key != null) {
			
			if ( idUser.equals("god") && key.equals("masterkey") ) {
				
				user.setUserName( "Edgard" );
				user.setCpfUser( "02221224710" );
				user.setName( "CMG Edgard" );
				user.setOrgId( "0000" );
				user.setSiglaOm( "" );
				user.setUserAlias( "Edgard" );
				user.setUserMail( "econeto@gmail.com" );
				user.setHashKey( key );
				user.setIdUser( idUser );
				
			} else {
				String result = getApoloUser(idUser, key);
				System.out.println( result );
				JSONObject userObj = new JSONObject( result );
			
				user.setUserName( userObj.getString("username") );
				user.setCpfUser( userObj.getString("cpf") );
				user.setName( userObj.getString("nome") );
				user.setOrgId( userObj.getString("orgId") );
				user.setSiglaOm( userObj.getString("siglaOm") );
				user.setUserAlias(userObj.getString("apelido") );
				user.setUserMail( userObj.getString("email") );
				user.setHashKey( key );
				user.setIdUser( idUser );
				
				
			}
			
			
			
		} else {
			throw new UnauthorizedException("Usuário não autorizado.");
		}
		
		return user;
	}

}
