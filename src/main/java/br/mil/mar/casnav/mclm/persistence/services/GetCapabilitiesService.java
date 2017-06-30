package br.mil.mar.casnav.mclm.persistence.services;

import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.geotools.data.ows.Layer;
import org.geotools.data.ows.WMSCapabilities;
import org.geotools.data.wms.WebMapServer;
import org.json.JSONObject;

import br.mil.mar.casnav.mclm.misc.GeoServerCapability;
import br.mil.mar.casnav.mclm.misc.GeoServerCapabilityCollection;

public class GetCapabilitiesService {
	
	
	public List<GeoServerCapability> getCapabilities( String url, String version ) throws Exception {
		String cgUrl = "wms?request=GetCapabilities&version=" + version;
		
		List<GeoServerCapability> capabilities = new ArrayList<GeoServerCapability>();
		String fullTarget = URLDecoder.decode( url, "UTF-8" ) + cgUrl;
		URL sourceServer = new URL( fullTarget );

		WMSCapabilities caps = null;
		WebMapServer wms = new WebMapServer( sourceServer, Integer.MAX_VALUE );
		caps = wms.getCapabilities();

		if ( caps != null ) {
			for( Iterator<Layer> i = caps.getLayerList().iterator(); i.hasNext(); ){
				Layer layer = (Layer) i.next();
				if( layer.getName() != null && layer.getName().length() != 0 ){
					GeoServerCapability capability = new GeoServerCapability();
					capability.setLayerName( layer.getName() );
					capability.setLayerTitle( layer.getTitle() );
					capability.setQueryable( layer.isQueryable() );
					capability.setServerUrl( url );
					capabilities.add( capability );
				}
			}		
		} else {
			throw new Exception("Empty Layers list from URL " + url );
		}
		return capabilities;
	}

	
	public String getAsJson( String url, String version ) throws Exception {
		List<GeoServerCapability> capabilities = getCapabilities( url, version );
		GeoServerCapabilityCollection gcc = new GeoServerCapabilityCollection( capabilities );
		JSONObject itemObj = new JSONObject( gcc );
		return itemObj.toString();		
	}
	
	
}
