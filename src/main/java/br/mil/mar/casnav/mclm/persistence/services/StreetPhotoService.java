package br.mil.mar.casnav.mclm.persistence.services;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class StreetPhotoService {

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
