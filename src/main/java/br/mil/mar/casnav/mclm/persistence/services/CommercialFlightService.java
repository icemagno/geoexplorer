package br.mil.mar.casnav.mclm.persistence.services;

import br.mil.mar.casnav.mclm.misc.WebClient;

public class CommercialFlightService {


	// https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=-21.78,-23.87,-46.84,-39.23&faa=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=7200&gliders=1&stats=1
	public synchronized String getAircraftsInBBOX(String minlat, String minlon, String maxlat, String maxlon) throws Exception {
		WebClient wc = new WebClient();
		String url = "https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds="+maxlon+","+minlon+","+maxlat+
				","+minlat+"&faa=1&mlat=1&flarm=1&adsb=1&gnd=0&air=1&vehicles=1&estimated=1&maxage=1000&gliders=1&stats=1";
		String result = wc.doGet(url);
		return result;
	}

	// https://data-live.flightradar24.com/clickhandler/?version=1.5&flight=d8fefd6
	public synchronized String getAircraftDetail( String flightID ) throws Exception {
		String version = "1.5";
		WebClient wc = new WebClient();
		String url = "https://data-live.flightradar24.com/clickhandler/?version="+version+"&flight=" + flightID;
		String result = wc.doGet(url);
		return result;
	}
	
	
}
