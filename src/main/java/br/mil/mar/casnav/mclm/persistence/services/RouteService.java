package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.Config;

public class RouteService {

	public String getNearestRoads( String coordinate ) throws Exception {

		Config cfg = Configurator.getInstance().getConfig();
		coordinate = coordinate.replace(",", " ");
		
		String sql = "SELECT array_to_json( array_agg( t ) ) as result FROM ( select osm_name,source,target from nearest_way('" + coordinate + "', 1, 4326) ) as t";
		String result = "";
		
		String connectionString = "jdbc:postgresql://" + cfg.getRoutingServer() +
				":" + cfg.getRoutingPort() + "/" + cfg.getRoutingDatabase();
		GenericService gs = new GenericService( connectionString, cfg.getRoutingUser(), cfg.getRoutingPassword()  );
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("result");
		}
		
		return result;
	}
	
	public String calcRoute( String source, String target, Integer kpaths, String directed ) throws Exception {
		Config cfg = Configurator.getInstance().getConfig();
		
		String sql = "SELECT array_to_json( array_agg( t ) ) as result "
				+ "FROM ( select r.km,r.way_name,r.seq, ST_AsGeoJSON(r.geom)::json as geometry from route_agg(" + source + ", " + target + ", " 
				+ kpaths + ", " + directed + ") as r ) as t";
		String result = "";
		
		System.out.println( sql );
		
		String connectionString = "jdbc:postgresql://" + cfg.getRoutingServer() +
				":" + cfg.getRoutingPort() + "/" + cfg.getRoutingDatabase();
		GenericService gs = new GenericService( connectionString, cfg.getRoutingUser(), cfg.getRoutingPassword()  );
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("result");
		}
		
		return result;
		
	}
	
	public String getPointsNearRoute( String routeGeometryText, String criteria, String source ) throws Exception {
		Config cfg = Configurator.getInstance().getConfig();
		
		int distanceLimitMeters = cfg.getDistanceFromRoute();
		
		
		String sql = "SELECT row_to_json( fc )::text As featurecollection " +  
				"FROM ( SELECT 'FeatureCollection' As type, array_to_json( array_agg( f ) ) As features " + 
				     "FROM (SELECT 'Feature' As type, " + 
				     "ST_AsGeoJSON( ST_Transform(way,4326) )::json As geometry, " +  
				     "row_to_json((SELECT l FROM (SELECT distance as \"Distância\", name as \"Nome\" , phone as \"Telefone\", operator as \"Operador\","+
				     	"street as \"Rua\" , alt_name as \"Nome Alt.\" , iata as \"IATA\", icao as \"ICAO\",aerodrome_type as \"Tipo\", wikidata as \"Wikidata\" , housename as \"Casa\" , website as \"Site\" , gauge as \"Bitola\", usage as \"Uso\" ,"+
				     	"email as \"Email\" , image , network as \"Rede\", ref, postcode as \"CEP\" , capacity as \"Capacidade\" , official_name as \"Nome Ofic.\" , sport as \"Tipo\" , lanes as \"Faixas\" , surface as \"Pavimento\" ,"+
				     	"oneway as \"Mão Única\", maxheight_physical as \"Altura Física\", maxheight as \"Altura\" , maxspeed as \"Veloc. Máx\" , ibge_geocode as \"IBGE Geocode\") As l)) As properties " +  
					 "FROM pointscanner('" + routeGeometryText + "','" + criteria.replace("'", "''") +"','"+source+"') As l where round(distance::numeric, 5) < " + distanceLimitMeters + ") As f) as fc; ";
		
		String result = "";
		
		String connectionString = "jdbc:postgresql://" + cfg.getRoutingServer() +
				":" + cfg.getRoutingPort() + "/" + cfg.getRoutingDatabase();
		GenericService gs = new GenericService( connectionString, cfg.getRoutingUser(), cfg.getRoutingPassword()  );
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("featurecollection");
		}
		
		return result;		
	}
	
}
