package br.mil.mar.casnav.mclm.persistence.services;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class OSMService {
	//private String baseApiUrl = "http://api.openstreetmap.org/api/0.6";
	//private String baseApiUrl = "http://api06.dev.openstreetmap.org/api/0.6";
	private String baseApiUrl = "https://master.apis.dev.openstreetmap.org/api/0.6";
	private WebClient web;
	
	public OSMService() {
		this.web = new WebClient();
	}
	
	public void test() {
		
		
		String getCap = "/changeset/create";
		
		try {
			
			StringBuilder postData = new StringBuilder();
		
			
			postData.append("<osm>");
			postData.append("<changeset>");
			
			postData.append("<tag k=\"created_by\" v=\"JOSM 1.61\"/>");
			postData.append("<tag k=\"comment\" v=\"Just adding some streetnames\"/>	");		
			
			postData.append("</changeset>");			
			postData.append("</osm>");			

			web.doRESTRequest("PUT", baseApiUrl + getCap , postData.toString(), "icemagno", "antares2" );
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public String getMap( String left, String bottom, String right, String top ) {
		
		try {
			return web.doGet( baseApiUrl + "/map?bbox="+left+","+bottom+","+right+","+top ) ;			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
				
	}
	
	
	public String getCapabilities() {
		try {
			return web.doGet( baseApiUrl + "/capabilities" ) ;			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getPermissions() {
		try {
			return web.doGet( baseApiUrl + "/permissions" ) ;			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
