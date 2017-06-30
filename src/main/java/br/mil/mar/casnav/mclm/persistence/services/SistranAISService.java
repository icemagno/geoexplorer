package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import sistram4.web.Navio;
import sistram4.web.SistramAis3;
import sistram4.web.SistramAis3Service;

public class SistranAISService {
	
	private String convCood( String what ) {
		double degrees = 0;
		double minutes = 0;
		double seconds = 0;
		
		if( what.contains("S") || what.contains("N")  ) {
			degrees = Double.valueOf( what.substring(0, 2) );
			minutes = Double.valueOf( what.substring(2, 4) );
			seconds = Double.valueOf( what.substring(4, 6) );
		}

		if( what.contains("W") || what.contains("E")  ) {
			degrees = Double.valueOf( what.substring(0, 3) );
			minutes = Double.valueOf( what.substring(3, 5) );
			seconds = Double.valueOf( what.substring(5, 7) );
		}
		
		double decimal = ( (minutes * 60) +seconds) / (60*60);
		double answer = degrees + decimal;
		
		if( what.contains("S") || what.contains("W")  ) {
			answer = -answer;
		}
		
		return String.valueOf( answer);
	}
	
	/*
	private String convertLatLon( String coord  ) {
		// 224022S,0403246W
		// 22 40 22 S,040 32 46 W
		String[] coorArr = coord.split(",");
		String lat = coorArr[0];
		String lon = coorArr[1];
		return convCood( lat ) + "," + convCood( lon );
	}
	*/
	
	public String getShips() throws Exception {
		String result = "{type:\"FeatureCollection\",features:";
				
		
		SistramAis3Service ais = new SistramAis3Service();
		SistramAis3 port = ais.getSistramAis3Port();
		
		List<Navio> lista = port.getShipList();
		
		String shipName = "";
		String lat = "";
		String oLat = "";
		String lon = "";
		String oLon = "";
		String course = "";
		String irin = "";
		String imo = "";
		String speed = "";
		String shipType = "";
		String fromPort = "";
		String toPort = "";
		String mmsi = "";
		
		String features = "[";
		String sep = "";
		for ( Navio nav : lista ) {
			
			shipName = nav.getName().replace("\"", "");
			oLat = nav.getLatitude();
			oLon = nav.getLongitude();
			lat = convCood( oLat );
			lon = convCood( oLon );
			course = nav.getCourse();
			irin = nav.getIrin();
			imo = nav.getImo();
			speed = nav.getSpeed();
			shipType = nav.getType();
			fromPort = nav.getStartingport();
			toPort = nav.getPortarrival();
			mmsi = nav.getMmsi();
			
			String feature = sep + "{\"type\":\"Feature\",\"geometry\":{\"type\":\"Point\",\"coordinates\":["+lon+","+lat+"]},\"properties\":";
			
			feature = feature + "{\"latitude\":\""+oLat+"\",\"longitude\":\""+oLon+"\",\"course\":\""+course+"\",\"irin\":\""+irin+"\",\"imo\":\""+imo+"\",\"speed\":\""+speed+"\"," +
			"\"shipType\":\""+shipType+"\",\"fromPort\":\""+fromPort+"\",\"toPort\":\""+toPort+"\",\"mmsi\":\""+mmsi+"\",\"shipName\":\""+shipName+"\"}";
			
			feature = feature + "}";
			features = features + feature;
			sep = ",";
			
		}
		
		features = features + "]";
		result = result + features + "}";
		
		return result;
		
	}
	
	
}
