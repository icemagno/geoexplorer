package br.mil.mar.casnav.mclm.persistence.services;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class StreetPhotoService {

	/*
		https://www.mapillary.com/developer/api-documentation/#introduction
		
		https://a.mapillary.com/v3/images/?lookat=12.9981086701,55.6075236275&bbox=12.9981086701,55.6075236275,13.0006076843,55.6089295863&client_id=Ymx2LVBGakp6a0xXM3hOWmw1b0pPdzo1ZjM1ZWQ5YzU0ZDE0NDZj
		
		https://a.mapillary.com/v3/sequences?page=3&per_page=200&client_id=Ymx2LVBGakp6a0xXM3hOWmw1b0pPdzo1ZjM1ZWQ5YzU0ZDE0NDZj
		
		https://a.mapillary.com/v3/sequences?bbox=16.430300,7.241686,16.438757,7.253186&userkeys=AGfe-07BEJX0-kxpu9J3rA&client_id=Ymx2LVBGakp6a0xXM3hOWmw1b0pPdzo1ZjM1ZWQ5YzU0ZDE0NDZj
		
	*/
	
	
	public String getPhotosCloseTo(String lat, String lon, String distance, String minca, String maxca, String limit) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://api.mapillary.com/v1/im/close?lat="+lat+"&lon="+lon+"&distance="+distance+"&minca="+minca+"&maxca="+maxca+"&limit=" + limit;
		String result = wc.doGet(url); 
		return result;
	}

	public synchronized String getPhotosInBBOX(String minlat, String minlon, String maxlat, String maxlon, String maxresults) throws Exception {
		WebClient wc = new WebClient();
		String url = "http://api.mapillary.com/v1/im/search?min-lat="+minlat+"&max-lat="+maxlat+
				"&min-lon="+minlon+"&max-lon="+maxlon+"&max-results="+maxresults+"&geojson=true";
		
		System.out.println("Get Photos: " + url);
		String result = wc.doGet(url);
		
		System.out.println(" >> " + result);
		System.out.println("======================================");
		
		return result;
	}

}
